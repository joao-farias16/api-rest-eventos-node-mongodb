const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Loja",
            version: "2.0.0",
            description: "Documentação da API REST da Loja"
        },
        servers: [
            {
                url: "http://localhost:3000"
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            },
            parameters: {
                UserIdHeader: {
                    in: "header",
                    name: "x-user-id",
                    required: true,
                    schema: {
                        type: "integer"
                    },
                    description: "ID do usuário autenticado"
                }
            }
        },
        security: [
            {
                bearerAuth: []
            }
        ]
    },
    apis: ["./src/routes/*.js"]
};

module.exports = swaggerJsdoc(options);