import http from 'http';
import express from 'express';
import swaggerUI from 'swagger-ui-express';
import apis from './apis';
import mongoCollections from './mongo-collections';

require('dotenv').config();

const app = express();
app.use(express.json());

const server = http.createServer(app);

const { API_PORT } = process.env;
console.log('API_PORT, ', API_PORT);
const port = process.env.PORT || API_PORT;

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Library API",
            version: "1.0.0",
            description: "User Authentication",
            termsOfService: "",
            contact: {
                name: "API Support",
                url: "",
                email: "emanhamdy645@gmail.com",
            },
        },
        servers: [{
            url: "http://localhost:7550",
            description: "My API Documentation",
        }],
  },
  apis: ['./apis/*.js'],
};

const swaggerDocument = require('./swagger.json');
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(`/api/v1/user`, apis());

// server listening 
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// TODO move to init script
mongoCollections().then((collections) => {
  collections.Users.findOne({ email: 'admin@email.com' }).then((UserAdmin) => {
      if (!UserAdmin) {
          collections.Users.create({
              email: 'admin@email.com',
              password: 'sha1$a1fd07f4$1$06d205070e793129adda5dbd01f5b9dbcb6b9e3d',
              roles: ['admin']
          });
      }
  })
});

module.exports = app;