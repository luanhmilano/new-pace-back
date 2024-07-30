import { cleanDataSet } from '../utils/cleanData';
import prisma from '../config/prisma';
import { Audiencia } from '@prisma/client';
import fs from 'fs';
import { readExcelFile } from '../utils/excel';

interface AudienciaRow {
  Data: string;
  Processo: string;
  'Órgão Julgador': string;
  Partes: string;
  Classe: string;
  'Tipo de audiência': string;
  Sala: string;
  Situação: string;
}

export const processExcel = async (filePath: string, fileGenerationDate: Date): Promise<Audiencia[]> => {
    console.log(filePath)
  // Verifique se o arquivo existe
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  const lastProcessedDate = await prisma.audiencia.findFirst({
    orderBy: { data_geracao: 'desc' },
    select: { data_geracao: true },
  });

  if (lastProcessedDate && fileGenerationDate <= lastProcessedDate.data_geracao) {
    throw new Error('Uploaded file is not the most recent.');
  }

  const json = readExcelFile(filePath);
  const cleanedData = cleanDataSet(json);
  //console.log(json)

  const audiencias: Audiencia[] = [];

  for (const row of cleanedData) {
    //console.log(row)
    const [datePart, timePart] = (row.Data).split(' ');
    //console.log(datePart)

    if (!datePart || !timePart) {
        //console.warn(`Invalid date or time format for row: ${JSON.stringify(row)}`);
        continue;
    }

    const dateParts = datePart.split('/');
    if (dateParts.length !== 3) {
      console.warn(`Invalid date format for row: ${JSON.stringify(row)}`);
      continue;
    }

    const day = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1; // Months are 0-based in JavaScript Date
    let year = parseInt(dateParts[2], 10);

    if (year < 100) {
        year += 2000;
    }

    console.log(`Parsed date parts - day: ${day}, month: ${month + 1}, year: ${year}`);

    const date = new Date(year, month, day);
    if (isNaN(date.getTime())) {
      console.warn(`Invalid date value for row: ${JSON.stringify(row)}`);
      continue;
    }

    const formattedDate = date.toISOString().split('T')[0]; // Formata a data como "YYYY-MM-DD"
    console.log(`Constructed Date: ${formattedDate}`);

    const processo = row.Processo;

    const existingAudiencia = await prisma.audiencia.findUnique({
      where: { processo },
    });

    const audienciaData = {
      data: formattedDate,
      hora: timePart,
      processo,
      orgao_julgador: row['Órgão Julgador'],
      partes: (row.Partes).split(' - ')[0],
      classe: row.Classe,
      tipo_audiencia: row['Tipo de audiência'],
      sala: String(row.Sala),
      situacao: row.Situação,
      data_geracao: fileGenerationDate,
    };

    if (existingAudiencia) {
      const updatedAudiencia = await prisma.audiencia.update({
        where: { processo },
        data: audienciaData,
      });
      audiencias.push(updatedAudiencia);
    } else {
       // if (row.Data !== "Data") {
            //console.log(audienciaData)
            const newAudiencia = await prisma.audiencia.create({
              data: audienciaData,
            });
            audiencias.push(newAudiencia);
        //}
    }
  }
  return audiencias;
};
