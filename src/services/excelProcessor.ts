import { Audiencia } from '@prisma/client';
import { cleanDataSet } from '../utils/cleanData';
import { readExcelFile } from '../utils/excel';
import { extractPartes } from '../utils/partesExtractor';
import { logChanges } from '../utils/changeLogger';
import { determineTurno } from '../utils/helps/determineTurno';
import prisma from '../config/prisma';
import fs from 'fs';

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

  const audiencias: Audiencia[] = [];

  for (const row of cleanedData) {
    //console.log(row)
    const [datePart, timePart] = (row.Data).split(' ');
    //console.log(datePart)

    const dateParts = datePart.split('/');
    if (dateParts.length !== 3) {
      //console.warn(`Invalid date format for row: ${JSON.stringify(row)}`);
      continue;
    }

    const day = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1;
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

    const processo = row.Processo;

    const existingAudiencia = await prisma.audiencia.findUnique({
      where: { processo },
    });

    let initialDataGeracao = fileGenerationDate;
    let existingChanges = '';
    if (existingAudiencia) {
      initialDataGeracao = existingAudiencia.data_geracao;
      existingChanges = existingAudiencia.changes || '';
    }

    const audienciaData = {
      data: formattedDate,
      hora: timePart,
      processo,
      orgao_julgador: row['Órgão Julgador'],
      partes: extractPartes(row.Partes),
      classe: row.Classe,
      tipo_audiencia: row['Tipo de audiência'],
      sala: String(row.Sala),
      situacao: row.Situação,
      data_geracao: initialDataGeracao,
      turno: determineTurno(timePart),
      changes: existingChanges,
    };

    if (existingAudiencia) {
      // Verifique se alguma informação mudou
      const changes = logChanges(existingAudiencia, audienciaData);

      if (changes.length > 0) {
        const changesText = changes.join('\n');
        const dateText = `${fileGenerationDate.toISOString().split('T')[0]} \n${changesText}\n`;
        audienciaData.changes = `${existingChanges}${existingChanges ? '\n' : ''}${dateText}`;
        console.log(`Changes for processo ${existingAudiencia.processo}:`);
        changes.forEach(change => console.log(`  - ${change}`));

        const updatedAudiencia = await prisma.audiencia.update({
          where: { processo },
          data: {
            ...audienciaData,
            data_geracao: fileGenerationDate,
          },
        });
        audiencias.push(updatedAudiencia)
      } else {
        audiencias.push(existingAudiencia);
      }

    } else {
      const newAudiencia = await prisma.audiencia.create({
        data: audienciaData,
      });
      audiencias.push(newAudiencia);
    }
  }

  return audiencias;
};
