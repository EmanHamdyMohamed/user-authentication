// @flow

import express from 'express';
import bodyParser from 'body-parser';
import register from './register';
import login from './login';
import addUserRole from './addUserRole';
import deleteUserRole from './deleteUserRole';

// import Acl from '../components/acl';
// import ReqRes from '../components/middlewares/reqRes';
// import TokenValidation from '../components/middlewares/tokenValidation';

const router = express.Router();
router.use(bodyParser.json());

/**
 * 
 *
 * @returns {undefined}
 */
export default function () {
    // router.use(ReqRes);
    // router.use(TokenValidation);

    
    router.route('/signup').post(register);
    router.route('/login').post(login);
    router.route('/roles-add').post(addUserRole);
    router.route('/roles-delete').delete(deleteUserRole);
    
    return router;
}
