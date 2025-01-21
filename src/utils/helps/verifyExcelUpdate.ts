import prisma from '../../config/prisma';
import fs from 'fs';

export async function verifyExcelUpdate(
  filePath: string,
  fileGenerationDate: Date,
): Promise<boolean> {
  try {
    console.log(filePath);

    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }

    const lastProcessedDate = await prisma.audiencia.findFirst({
      orderBy: { data_geracao: 'desc' },
      select: { data_geracao: true },
    });

    const dia = lastProcessedDate?.data_geracao.getDate();
    const mes = lastProcessedDate?.data_geracao.getMonth();
    const ano = lastProcessedDate?.data_geracao.getFullYear();
    const hour = lastProcessedDate?.data_geracao.getHours();
    const minuto = lastProcessedDate?.data_geracao.getMinutes();
    console.log(dia, mes! + 1, ano, hour, minuto);

    if (
      lastProcessedDate &&
      fileGenerationDate <= lastProcessedDate.data_geracao
    ) {
      throw new Error(
        `Planilha desatualizada, envie uma mais atual que: ${dia}/${mes! + 1}/${ano} - ${hour}:${minuto}`,
      );
    }

    return true;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      throw error;
    }
    return false;
  }
}
