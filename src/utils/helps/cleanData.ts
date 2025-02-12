/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAudienciaPartial } from '../../services/dtos/IAudiencia';

/**
 * Remove caracteres indesejados de um texto.
 * @param text Texto a ser sanitizado.
 * @returns Texto sanitizado.
 */
const sanitizeText = (text: string | undefined): string => {
  if (typeof text === 'string') {
    return text.replace(/[\r\n]+/g, '');
  }
  return String(text || '').trim();
};

/**
 * Valida e limpa um único item do conjunto de dados.
 * @param item Item a ser processado.
 * @returns Um objeto limpo do tipo IAudienciaPartial.
 * @throws Erro se o item não possuir a estrutura esperada.
 */
const cleanData = (
  item: any,
): { audiencia: IAudienciaPartial; fieldCount: number } => {
  if (!item || typeof item !== 'object') {
    throw new Error('Item inválido. Esperado um objeto.');
  }
  const fieldCount = Object.keys(item).length;

  const dateKey = Object.keys(item).find((key) =>
    key.startsWith('Todas as expressões'),
  );
  const dataValue = dateKey ? sanitizeText(item[dateKey]) : '';

  const commonFields = {
    data: dataValue || sanitizeText(item['Data/Hora']),
    processo: sanitizeText(item['Processo'] || item['__EMPTY']),
    orgao_julgador: sanitizeText(item['Órgão julgador'] || item['__EMPTY_1']),
    partes: sanitizeText(item['Partes'] || item['__EMPTY_2']),
    classe: sanitizeText(item['Classe judicial'] || item['__EMPTY_3']),
  };

  let audiencia: IAudienciaPartial;

  if (fieldCount === 8) {
    audiencia = {
      ...commonFields,
      tipo_audiencia: sanitizeText(
        item['Tipo de audiência'] || item['__EMPTY_4'],
      ),
      sala: sanitizeText(item['Sala'] || item['__EMPTY_5']),
      situacao: sanitizeText(item['Situação'] || item['__EMPTY_6']),
    };
  } else {
    audiencia = {
      ...commonFields,
      advogados: sanitizeText(item['Advogados'] || item['__EMPTY_4']),
      assunto: sanitizeText(item['Assunto'] || item['__EMPTY_5']),
      tipo_audiencia: sanitizeText(item['Tipo'] || item['__EMPTY_6']),
      sala: sanitizeText(item['Sala'] || item['__EMPTY_7']),
      situacao: sanitizeText(item['Situação'] || item['__EMPTY_8']),
    };
  }

  return { audiencia, fieldCount };
};

/**
 * Limpa e valida um conjunto de dados.
 * @param dataSet Conjunto de dados a ser processado.
 * @returns Um array de objetos IAudienciaPartial limpos.
 */
export const cleanDataSet = (
  dataSet: JSON[],
): { audiencias: IAudienciaPartial[]; isExcelOld: boolean } => {
  if (!Array.isArray(dataSet)) {
    throw new Error('Conjunto de dados inválido. Esperado um array.');
  }

  const cleanedData: IAudienciaPartial[] = [];
  let isExcelOld = false;

  dataSet.forEach((item, index) => {
    try {
      const { audiencia, fieldCount } = cleanData(item);
      if (fieldCount === 8) {
        isExcelOld = true;
      }
      cleanedData.push(audiencia);
    } catch (error: unknown) {
      console.error(`Erro ao processar item na posição ${index}:`, error);
    }
  });

  return { audiencias: cleanedData, isExcelOld };
};
