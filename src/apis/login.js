// @flow

import _ from 'lodash';
import hash from 'password-hash';
import mongoCollections from '../mongo-collections';
import getUserByEmail from '../services/getUserByEmail';
import getUserAuth from '../services/getUserAuth';

/**
* Login user and return auth
*
* @param {any} req The request object
* @param {any} res The response object
* @param {Function} next The callback function
*/
export default async function login(req, res, next) {
    try {
        const { email, password, role } = req.body;
        if (!email) {
            return res.status(400).send('User email is required');
        }
        if (!password) {
            return res.status(400).send('User password is required');
        }
        const { UserRoles } = await mongoCollections();
        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(404).send('User not found');
        }
        if (!hash.verify(password, user.password)) {
            return res.status(401).send('Password is incorrect');
        }
        const token = getUserAuth(user);
        return res.status(200).send({
            id: user._id,
            email: user.email,
            fullName: user.fullName,
            token,
            tokenType: process.env.TOKEN_TYPE
        });
    } catch (e) {
        console.error(e);
        return next(e);
    }
};
