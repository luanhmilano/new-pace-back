export async function contestacaoIsInvalid(
  paginaContestacao: string,
): Promise<string> {
  if (paginaContestacao.includes('TIPO 1')) {
    return 'TIPO 1';
  }

  if (paginaContestacao.includes('TIPO 2')) {
    return 'TIPO 2';
  }

  if (paginaContestacao.includes('TIPO 3')) {
    return 'TIPO 3';
  }

  if (paginaContestacao.includes('TIPO 4')) {
    return 'TIPO 4';
  }

  if (paginaContestacao.includes('TIPO 5')) {
    return 'TIPO 5';
  }

  return 'SEM TIPO';
}
