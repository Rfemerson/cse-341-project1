const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Contact API',
        description: 'API for managing contacts',
    },
    host: 'cse-341-project1-ty88.onrender.com',
    schemes: ['https'],
}; 

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);