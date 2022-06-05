// @flow

import mongoCollections from '../mongo-collections';

/**
* Find user object in db by user email
*
* @param {string} email User email
*/
export default async function getUserByEmail(email) {
    const { Users } = await mongoCollections();
    const user = await Users.findOne({ email });
    return user;
};
