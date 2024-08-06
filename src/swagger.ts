import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'New Pace API',
            version: '1.0.0',
            description: 'Documentação da API do New Pace',
        },
        servers: [
            {
                url: 'http://localhost:3000', // Desenvolvimento
            },
        ],
        components: {
            schemas: {
              Pauta: {
                type: 'object',
                properties: {
                  id: {
                    type: 'integer',
                  },
                  data: {
                    type: 'string',
                    format: 'date',
                  },
                  turno: {
                    type: 'string',
                  },
                  orgao_julgador: {
                    type: 'string',
                  },
                  sala: {
                    type: 'string',
                  },
                  audiencias: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Audiencia',
                    },
                  },
                },
                example: {
                  id: 1,
                  data: '2024-07-25',
                  turno: 'MANHÃ',
                  orgao_julgador: 'Orgão Julgador',
                  sala: '1',
                  audiencias: [],
                },
              },
              Audiencia: {
                type: 'object',
                properties: {
                  id: {
                    type: 'integer',
                  },
                  data: {
                    type: 'string',
                    format: 'date',
                  },
                  hora: {
                    type: 'string',
                    format: 'time',
                  },
                  processo: {
                    type: 'string',
                  },
                  orgao_julgador: {
                    type: 'string',
                  },
                  partes: {
                    type: 'string',
                  },
                  classe: {
                    type: 'string',
                  },
                  tipo_audiencia: {
                    type: 'string',
                  },
                  sala: {
                    type: 'string',
                  },
                  situacao: {
                    type: 'string',
                  },
                  pautaId: {
                    type: 'integer',
                  },
                },
                example: {
                  id: 1,
                  data: '2024-07-25',
                  hora: '10:00',
                  processo: '0000001-00.2024.5.00.0001',
                  orgao_julgador: 'Orgão Julgador',
                  partes: 'Parte',
                  classe: 'Classe',
                  tipo_audiencia: 'Tipo',
                  sala: '1',
                  situacao: 'Situação',
                  pautaId: 1,
                },
              }
            },
        }
    },
    apis: ['./src/routes/*.ts', './src/controllers/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export function setupSwagger(app: Express) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}