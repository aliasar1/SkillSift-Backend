const swaggerAutogen = require('swagger-autogen');

const doc = {
    info: {
        title: 'skillsift-api-docs',
        description: 'This is API doc for testing apis using swagger.',
    },
    host: 'localhost:8000'
}

const outputFile = './swagger-output.json';
const routes = ['./utils/routes.js'];

swaggerAutogen(outputFile, routes);