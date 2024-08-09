import { PrismaClient } from '@prisma/client';
import request from 'supertest';
import app from '../app';
import { processExcel } from '../utils/excelProcessor';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

const data = new Date(2024, 10 - 1, 16, Number(17), Number(13));

describe('audiencia.controller', () => {
  let audienciaId: number;

  beforeAll(async () => {
    await prisma.audiencia.deleteMany();
  });

  afterAll(async () => {
    await prisma.audiencia.deleteMany({});
    await prisma.$disconnect();
  });

  /*
    test('deve criar uma nova audiência', async () => {
        const response = await request(app).post('/audiencias').send({
            data: '2024-07-25',
            hora: '10:00',
            processo: '0000001-00.2024.5.00.0001',
            orgao_julgador: 'Orgão Julgador',
            partes: 'Parte 1 vs Parte 2',
            classe: 'Classe',
            tipo_audiencia: 'Tipo',
            sala: '1',
            situacao: 'Situação',
            data_geracao: data,
            turno: 'Turno',
            changes: '',
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        audienciaId = response.body.id;
    });

    test('deve atualizar uma audiência', async () => {
        const response = await request(app).put(`/audiencias/${audienciaId}`).send({
            data: '2024-07-26',
            hora: '11:00',
            processo: '0000001-00.2024.5.00.0001',
            orgao_julgador: 'Orgão Julgador',
            partes: 'Parte 1 vs Parte 2',
            classe: 'Classe',
            tipo_audiencia: 'Tipo',
            sala: '2',
            situacao: 'Atualizada',
        });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data', '2024-07-26');
    });

    test('deve retornar audiências por filtragem', async () => {
        const response = await request(app).get('/audiencias_filter').query({
            startDate: '2024-07-25',
            endDate: '2024-07-26',
            turno: 'MANHÃ',
            orgao_julgador: 'Orgão Julgador',
            sala: '1',
        });

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(0);
    });
    
    test('deve exportar as audiências em um excel', async () => {
        const response = await request(app)
        .get('/audiencias/export')
        .expect('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
        .expect('Content-Disposition', 'attachment; filename=audiencias.xlsx');
        
        expect(response.status).toBe(200);
    });
    */

  test('deve processar e armazenar audiências de um xlsx', async () => {
    const filePath = path.join(__dirname, 'teste.xlsx');
    console.log(`Path to test-data.xlsx: ${filePath}`);
    const fileGenerationDate = new Date();

    const audiencias = await processExcel(filePath, fileGenerationDate);

    expect(audiencias).toBeDefined();
    expect(audiencias.length).toBeGreaterThan(0);

    const storedAudiencia = await prisma.audiencia.findFirst({
      where: { processo: audiencias[0].processo },
    });

    expect(storedAudiencia).toBeDefined();
  });
});
