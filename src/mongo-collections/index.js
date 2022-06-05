// @flow

import Promise from 'bluebird';
import mongoose from 'mongoose';
import _ from 'lodash';
import fs from 'fs';
import path from 'path';

let db = null;
const collections = {};
mongoose.Promise = Promise;

/**
 * Loads mongo collection schemas
 *
 * @returns mongo db collections
 */
export default async function connect() {
    if (!db) {
        const mongoConfig = {
            useNewUrlParser: true,
            retryWrites: false,
            directConnection: true
        };
        console.log('mongo url: ', process.env.MONGO_URL);
        db = await mongoose.connect(process.env.MONGO_URL, mongoConfig);
    }
    mongoose.set('debug', true);
    const basename = path.basename(__filename);
    const collectionsFiles = fs.readdirSync(__dirname).filter((file) => {
        return (file.indexOf('.') !== 0)
        && (file !== basename)
        && (file.slice(-3) === '.js')
        && file.indexOf('test') < 0;
    });
    _.each(collectionsFiles, (file) => {
        const model = require(path.join(__dirname, file))(mongoose);
        collections[model.modelName] = model;
    });
    return collections;
}