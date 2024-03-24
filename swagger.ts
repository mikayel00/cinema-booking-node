import swaggerAutogen from 'swagger-autogen';

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;

const doc = {
    info: {
        version: 'v1.0.0',
        title: 'Cinema booking application',
        description: 'Documentation of Cinema booking application'
    },
    servers: [
        {
            url: `http://${host}:${port}/api/v1`,
            description: ''
        },
    ],
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./src/routes/index.ts'];

swaggerAutogen({openapi: '3.0.0'})(outputFile, endpointsFiles, doc);
