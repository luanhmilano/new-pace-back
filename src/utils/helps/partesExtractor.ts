export const extractPartes = (partes: string): string => {
  const institutoMatch = RegExp(/^([A-Z\s]+)(?=INSTITUTO)/i).exec(partes);
  if (institutoMatch) {
    return institutoMatch[1].trim();
  }

  const civilMatch = RegExp(
    /^([A-Z\s]+)\s+registrado\(a\) civilmente como/i,
  ).exec(partes);
  if (civilMatch) {
    return civilMatch[1].trim() || 'MENOR';
  }

  const cpfCnpjMatch = RegExp(
    /([A-Z\s]+(?:-[A-Z\s]+)*)\s*-\s*CPF:|CNPJ:/i,
  ).exec(partes);
  if (cpfCnpjMatch) {
    return cpfCnpjMatch[1].trim() || 'MENOR';
  }

  const result = partes.split(' - ')[0]?.trim();
  return result.length === 0 ? 'MENOR' : result;
};
