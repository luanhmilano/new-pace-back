import { IAudienciaPartial } from '../../services/dtos/IAudiencia';
import prisma from '../../config/prisma';

export async function getGeracaoAndChanges(
  row: IAudienciaPartial,
  fileGenerationDate: Date,
): Promise<{ dataGeracao: Date; changes: string }> {
  const processo = row.processo;

  const existingAudiencia = await prisma.audiencia.findUnique({
    where: { processo },
  });

  let initialDataGeracao = fileGenerationDate;
  let existingChanges = '';
  if (existingAudiencia) {
    initialDataGeracao = existingAudiencia.data_geracao;
    existingChanges = existingAudiencia.changes || '';
  }

  return { dataGeracao: initialDataGeracao, changes: existingChanges };
}
