# User-Authentication Backend


Backend register and login users with roles

## Prerequisites
1. Download and install Docker
2. Download and install Node.js and npm

## Installation

```
cd user-authentication
npm install
```

## Configuration

## Running complete docker app

Beforehand please make sure that you are not running any webserver on port 7550.
Try opening `http://localhost:7550` in a browser and if you see anything else than `Server not found` message that means you have to stop the webserver before running.

First try running:

```
docker-compose -f ./docker-compose.yaml build backend
```

```
docker-compose -f docker-compose.yaml up
```

It should download all required docker images and run the whole app.

```
docker-compose -f docker-compose.yaml up -d
```

TO see logs run 

```
docker logs -f user-authentication_backend_1
```

To run unit test

```
npm run test
```

For Api documentation

```
http://localhost:7550/api-docs/
```