export async function contestacaoIsInvalid(
  paginaContestacao: string,
): Promise<string> {
  if (paginaContestacao.includes('TIPO 1')) {
    return 'CONTESTAÇÃO TIPO 1';
  }

  if (paginaContestacao.includes('TIPO 2')) {
    return 'CONTESTAÇÃO TIPO 2';
  }

  if (paginaContestacao.includes('TIPO 3')) {
    return 'CONTESTAÇÃO TIPO 3';
  }

  if (paginaContestacao.includes('TIPO 4')) {
    return 'CONTESTAÇÃO TIPO 4';
  }

  if (paginaContestacao.includes('TIPO 5')) {
    return 'CONTESTAÇÃO TIPO 5';
  }

  if (!paginaContestacao.includes('TIPO')) {
    return 'TIPOLOGIA NÃO IDENTIFICADA - ANALISAR CONTESTAÇÃO';
  }

  return '';
}
