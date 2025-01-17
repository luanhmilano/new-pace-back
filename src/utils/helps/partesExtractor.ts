export const extractPartes = (partes: string): string => {
  const civilMatch = partes
    .match(/^([A-Z\s]+)\s+registrado\(a\) civilmente como/i)?.[1]
    ?.trim();
  if (civilMatch) {
    return civilMatch.length === 0 ? 'MENOR' : civilMatch;
  }

  // Verifique o padrão "NOME - CPF: " ou "NOME - CNPJ: "
  const regex = /([A-Z\s]+(?:-[A-Z\s]+)*)\s*-\s*CPF:|CNPJ:/i;
  const match = partes.match(regex)?.[1]?.trim();
  if (match) {
    return match.length === 0 ? 'MENOR' : match;
  }

  const result = partes.split(' - ')[0]?.trim();
  return result.length === 0 ? 'MENOR' : result;
};
