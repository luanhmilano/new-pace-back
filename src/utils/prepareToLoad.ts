import { IAudienciaFull, IAudienciaPartial } from '../services/dtos/IAudiencia';
import { dataWorker } from './helps/dataWorker';
import { determineTurno } from './helps/determineTurno';
import { getGeracaoAndChanges } from './helps/getGeracaoAndChanges';
import { extractPartes } from './helps/partesExtractor';

export async function prepareToLoad(
  audiencias: IAudienciaPartial[],
  isExcelOld: boolean,
  fileGenerationDate: Date,
): Promise<IAudienciaFull[]> {
  const audienciasArray: IAudienciaFull[] = [];

  for (const row of audiencias) {
    const { dataGeracao, changes } = await getGeracaoAndChanges(
      row,
      fileGenerationDate,
    );

    try {
      const { datePart, timePart } = await dataWorker(row, isExcelOld);
      const audi: IAudienciaFull = {
        data: datePart,
        hora: timePart,
        processo: row.processo,
        orgao_julgador: row.orgao_julgador,
        partes: extractPartes(row.partes),
        classe: row.classe,
        tipo_audiencia: row.tipo_audiencia,
        sala: String(row.sala),
        situacao: row.situacao,
        assunto: row.assunto,
        data_geracao: dataGeracao,
        changes,
        turno: determineTurno(timePart),
      };

      audienciasArray.push(audi);
    } catch (error: unknown) {
      if (error instanceof Error) console.error(error.message);
      continue;
    }
  }

  return audienciasArray;
}
