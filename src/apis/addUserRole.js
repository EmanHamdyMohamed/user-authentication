// @flow

import _ from 'lodash';
import jwt from 'jsonwebtoken';
import mongoCollections from '../mongo-collections';
import getUserByEmail from '../services/getUserByEmail';

/**
* Add Role to registered user
*
* @param {any} req The request object
* @param {any} res The response object
* @param {Function} next The callback function
*/
export default async function addUserRole(req, res, next) {
    try {
        const { email, role } = req.body;
        const token = _.get(req.headers, 'authorization', null);
        if (!token) {
            return res.status(401).send('Invalid token');
        }
        if (!email) {
            return res.status(400).send('User email is required');
        }
        if (!role) {
            return res.status(400).send('User role is required');
        }
        const { Users } = await mongoCollections();
        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(404).send('User not found');
        }
        const tokenValues = token.split(' ');
        if (tokenValues.length !== 2 || tokenValues[0] !== process.env.TOKEN_TYPE) {
            return res.status(401).send('Invalid token');
        }
        let payload = {};
        try {
            payload = await jwt.verify(tokenValues[1], process.env.API_SECRET);
        } catch (e) {
            console.error(e);
            return res.status(401).send('Invalid token');
        }
        if (!_.includes(payload.roles, 'admin')) {
            return res.status(401).send('Unauthorized user');
        }
        let roles = user.roles;
        if (!roles) {
            roles = [];
        }
        roles.push(role);
        roles = _.uniq(roles);
        const updatedUser = await Users.update({ email }, { roles });
        return res.status(200).send({
            id: updatedUser._id,
            email: updatedUser.email,
            fullName: updatedUser.fullName,
        });
    } catch (e) {
        console.error(e);
        return next(e);
    }
};
