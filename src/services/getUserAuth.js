// @flow

import jwt from 'jsonwebtoken';

/**
* Return user auth jwt token
*
* @param {Object} user The User object details(fullName, email, id, roles)
*/
export default function getUserAuth(user) {
    const payload = {
        email: user.email,
        fullName: user.fullName || '',
        id: user.id,
        roles: user.roles
    };
    const token = jwt.sign(payload, process.env.API_SECRET, {
        expiresIn: '1d',
    });
    return token;
};
