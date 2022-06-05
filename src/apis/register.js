// @flow

import createUser from '../services/createUser';
import getUserByEmail from '../services/getUserByEmail';
import getUserAuth from '../services/getUserAuth';

/**
* Create new user to db
*
* @param {any} req The request object
* @param {any} res The response object
* @param {Function} next The callback function
*/
export default async function register(req, res, next) {
    try {
        const { email, password, role, fullName } = req.body;
        if (!email) {
            return res.status(400).send('User email is required');
        }
        if (!password) {
            return res.status(400).send('User password is required');
        }
        console.log(email);
        const existUser = await getUserByEmail(email);
        if (existUser) {
            return res.status(400).send('User with such email already registered');
        }
        const user = await createUser(fullName, email, password, role);
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
