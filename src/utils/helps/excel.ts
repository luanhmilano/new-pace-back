/* eslint-disable @typescript-eslint/no-explicit-any */
import * as xlsx from 'xlsx';

/**
 * Função de leitura do arquivo Excel.
 * Recebe o caminho do arquivo e transforma a tabela em um arquivo JSON.
 * @param filePath - Caminho do arquivo Excel.
 * @returns Conteúdo do arquivo Excel em formato JSON.
 */

export const readExcelFile = (filePath: string): any[] => {
  const workbook = xlsx.readFile(filePath);
  const sheetNameList = workbook.SheetNames;
  return xlsx.utils.sheet_to_json(workbook.Sheets[sheetNameList[0]]);
};
