import prisma from '../config/prisma';
import { logChanges } from '../utils/helps/changeLogger';
import { cleanDataSet } from '../utils/helps/cleanData';
import { readExcelFile } from '../utils/helps/excel';
import { getGeracaoAndChanges } from '../utils/helps/getGeracaoAndChanges';
import { verifyExcelUpdate } from '../utils/helps/verifyExcelUpdate';
import { prepareToLoad } from '../utils/prepareToLoad';
import { IAudienciaFull } from './dtos/IAudiencia';

class ETLService {
  async extract(
    filePath: string,
    fileGenerationDate: Date,
  ): Promise<{ data: JSON[] | null; error: string | null }> {
    try {
      const isExcelUpdate = await verifyExcelUpdate(
        filePath,
        fileGenerationDate,
      );

      if (isExcelUpdate) {
        const json = readExcelFile(filePath);
        return { data: json, error: null };
      }

      return {
        data: null,
        error: 'Erro desconhecido ao verificar atualização do Excel.',
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Erro desconhecido na extração.');
    }
  }

  async transform(
    linhasExcel: JSON[],
    fileGenerationDate: Date,
  ): Promise<IAudienciaFull[] | null> {
    try {
      const cleanedData = cleanDataSet(linhasExcel);

      const audiencias = await prepareToLoad(
        cleanedData.audiencias,
        cleanedData.isExcelOld,
        fileGenerationDate,
      );
      return audiencias;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      }
      return null;
    }
  }

  async load(
    audiencias: IAudienciaFull[],
    fileGenerationDate: Date,
  ): Promise<void> {
    for (const row of audiencias) {
      const processo = row.processo;

      const existingAudiencia = await prisma.audiencia.findUnique({
        where: { processo },
      });

      const { changes } = await getGeracaoAndChanges(row, fileGenerationDate);

      if (existingAudiencia) {
        const changesLog = logChanges(existingAudiencia, row);
        if (changes.length > 0) {
          const changesText = changesLog.join('\n');
          const dateText = `${fileGenerationDate.toISOString().split('T')[0]} \n${changesText}\n`;
          row.changes = `${changes}${changes ? '\n' : ''}${dateText}`;
          console.log(`Changes for processo ${existingAudiencia.processo}:`);
          changesLog.forEach((change) => console.log(`  - ${change}`));

          await prisma.audiencia.update({
            where: { processo },
            data: {
              ...row,
              data_geracao: fileGenerationDate,
            },
          });
        }
      } else {
        await prisma.audiencia.create({
          data: row,
        });
      }
    }
  }
}

export default new ETLService();
