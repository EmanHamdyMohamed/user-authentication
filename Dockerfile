FROM node:16

COPY ./ /app
WORKDIR /app

# babel-node
RUN npm install
RUN npm install -g jest nodemon @babel/node

ARG NODE_ENV
ENV NODE_ENV ${NODE_ENV:-development}
# ENV PATH /app/node_modules/.bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin

CMD [ "npm", "run", "start" ]
EXPOSE 7550
