const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger.json'
const endpointsFiles = ['./app.js']

const basicInformation = {
    info: {
        version: "1.0.0",
        title: "API - Backend Clases",
        description: "Web Services Documentation"
    },
}
swaggerAutogen(outputFile, endpointsFiles, basicInformation);