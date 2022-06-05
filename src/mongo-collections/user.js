import mongoose from 'mongoose';

const { Schema } = mongoose;

/**
 * 
 *
 * @param {any} mongooseInstance Mongo db instance
 * @returns {any} users mongo collection
 */
 module.exports = (mongooseInstance) => {
    const Users = new Schema({
        fullName: {
            type: String,
            default: null
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
        roles: [String]
    }, {
        autoIndex: true,
        skipVersioning: { dontVersionMe: true }
    });
    if (mongooseInstance.models.Users) {
        return mongooseInstance.models.Users;
    }
    return mongooseInstance.model('Users', Users);
};