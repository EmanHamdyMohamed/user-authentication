import mongoCollections from '../mongo-collections';
import hash from 'password-hash';

/**
 *  Create new user
 * 
 * @param {string} fullName User full name
 * @param {string} email User email
 * @param {string} password User password
 * @param {string} role User role
*/
export default async function createUser(fullName, email, password, role) {
    if (!email) {
        throw new Error('User email is required');
    }
    if (!password) {
        throw new Error('User password is required');
    }
    if (!role) {
        role = 'user';
    }
    const { Users } = await mongoCollections();
    const passwordHash = hash.generate(password);
    const user = await Users.create({
        fullName,
        email,
        password: passwordHash,
        roles: [role]
    });
    return user;
}