import * as xlsx from 'xlsx';
import { Audiencia } from '@prisma/client';

export const generateExcel = (audiencias: Audiencia[]): Buffer => {
  const data = audiencias.map((audiencia) => ({
    'Pauta ID': audiencia.pautaId,
    Data: audiencia.data,
    Hora: audiencia.hora,
    Turno: audiencia.turno,
    Processo: audiencia.processo,
    'Órgão Julgador': audiencia.orgao_julgador,
    Partes: audiencia.partes,
    Classe: audiencia.classe,
    'Tipo de Audiência': audiencia.tipo_audiencia,
    Sala: audiencia.sala,
    Situação: audiencia.situacao,
    'Data de Geração': audiencia.data_geracao,
    Mudanças: audiencia.changes,
  }));

  const worksheet = xlsx.utils.json_to_sheet(data);
  const workbook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(workbook, worksheet, 'Audiências');

  return xlsx.write(workbook, { type: 'buffer', bookType: 'xlsx' });
};
