import { cleanDataSet } from '../utils/cleanData';
import prisma from '../config/prisma';
import { Audiencia } from '@prisma/client';
import fs from 'fs';
import { readExcelFile } from '../utils/excel';

const determineTurno = (hora: string): string => {
  const [hour] = hora.split(':').map(Number);
  return hour < 13 ? 'MANHÃ' : 'TARDE';
};

const logChanges = (existing: Audiencia, updated: Partial<Audiencia>) => {
  const changes = [];
  if (existing.data !== updated.data) changes.push(`Data: ${existing.data} -> ${updated.data}`);
  if (existing.hora !== updated.hora) changes.push(`Hora: ${existing.hora} -> ${updated.hora}`);
  if (existing.orgao_julgador !== updated.orgao_julgador) changes.push(`Órgão Julgador: ${existing.orgao_julgador} -> ${updated.orgao_julgador}`);
  if (existing.partes !== updated.partes) changes.push(`Partes: ${existing.partes} -> ${updated.partes}`);
  if (existing.classe !== updated.classe) changes.push(`Classe: ${existing.classe} -> ${updated.classe}`);
  if (existing.tipo_audiencia !== updated.tipo_audiencia) changes.push(`Tipo de audiência: ${existing.tipo_audiencia} -> ${updated.tipo_audiencia}`);
  if (existing.sala !== updated.sala) changes.push(`Sala: ${existing.sala} -> ${updated.sala}`);
  if (existing.situacao !== updated.situacao) changes.push(`Situação: ${existing.situacao} -> ${updated.situacao}`);
  if (existing.turno !== updated.turno) changes.push(`Turno: ${existing.turno} -> ${updated.turno}`);

  if (changes.length > 0) {
    console.log(`Changes for processo ${existing.processo}:`);
    changes.forEach(change => console.log(`  - ${change}`));
  }
};

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

    //console.log(`Parsed date parts - day: ${day}, month: ${month + 1}, year: ${year}`);

    const date = new Date(year, month, day);
    if (isNaN(date.getTime())) {
      console.warn(`Invalid date value for row: ${JSON.stringify(row)}`);
      continue;
    }

    const formattedDate = date.toISOString().split('T')[0]; // Formata a data como "YYYY-MM-DD"
    const turno = determineTurno(timePart);

    const processo = row.Processo;

    const existingAudiencia = await prisma.audiencia.findUnique({
      where: { processo },
    });

    let initialDataGeracao = fileGenerationDate;
    if (existingAudiencia) {
      initialDataGeracao = existingAudiencia.data_geracao;
    }

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
      data_geracao: initialDataGeracao,
      turno: turno,
    };

    if (existingAudiencia) {
      // Verifique se alguma informação mudou
      const hasChanges = 
        existingAudiencia.data !== audienciaData.data ||
        existingAudiencia.hora !== audienciaData.hora ||
        existingAudiencia.orgao_julgador !== audienciaData.orgao_julgador ||
        existingAudiencia.partes !== audienciaData.partes ||
        existingAudiencia.classe !== audienciaData.classe ||
        existingAudiencia.tipo_audiencia !== audienciaData.tipo_audiencia ||
        existingAudiencia.sala !== audienciaData.sala ||
        existingAudiencia.situacao !== audienciaData.situacao ||
        existingAudiencia.turno !== audienciaData.turno;

      if (hasChanges) {
        logChanges(existingAudiencia, audienciaData);
        // Atualizar somente os campos alterados e a data de geração
        const updatedAudiencia = await prisma.audiencia.update({
          where: { processo },
          data: { 
            ...audienciaData,
            data_geracao: fileGenerationDate, // Atualiza a data de geração
          },
        });
        audiencias.push(updatedAudiencia);
      } else {
        // Se não houver mudanças, mantenha a audiência existente
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
