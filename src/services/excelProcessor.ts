import * as xlsx from 'xlsx';
import { Audiencia } from '@prisma/client';
import prisma from '../config';

export const processExcel = async (filePath: string): Promise<Audiencia[]> => {
    const workbook = xlsx.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const json = xlsx.utils.sheet_to_json(sheet);

    const audiencias: Audiencia[] = [];

    json.forEach(async (row: any) => {
        const [datePart, timePart] = (row['Data'] as string).split(' ');
        const audiencia = await prisma.audiencia.create({
            data: {
                data: new Date(datePart),
                hora: timePart,
                processo: row['Processo'] as string,
                orgaoJulgador: row['Órgão Julgador'] as string,
                partes: (row['Partes'] as string).split(' - ')[0],
                classe: row['Classe'] as string,
                tipoAudiencia: row['Tipo de audiência'] as string,
                sala: row['Sala'] as string,
                situacao: row['Situação'] as string,
            },
        });
        audiencias.push(audiencia)
    });
    return audiencias;
}