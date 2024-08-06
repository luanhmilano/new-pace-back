import { PrismaClient } from "@prisma/client";
import { processExcel } from "../utils/excelProcessor";
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

describe('Audiencia Tests', () => {
    beforeAll(async () => {
        await prisma.$connect();
    });
    
    afterAll(async () => {
        await prisma.$disconnect();
    });

    test('Deve processar e armazenar audiências de um xlsx', async () => {
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