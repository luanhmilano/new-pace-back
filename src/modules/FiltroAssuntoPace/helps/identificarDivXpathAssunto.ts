/* eslint-disable @typescript-eslint/no-explicit-any */
import { getXPathText } from './GetTextoPorXPATH';

export const identificarDivXpathAssunto = (capaFormatada: any): number => {
  let linhaAtual = 1;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const xpathInicial = `/html/body/div/div[${linhaAtual}]/div/b`;

    const assunto = getXPathText(capaFormatada, xpathInicial);

    if (assunto.trim() === 'Assuntos') {
      console.log('Linha correta: ', xpathInicial);
      return linhaAtual;
    }

    linhaAtual++;
  }
};
