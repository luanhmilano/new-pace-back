export const convertDataToDefault = (data: string): string => {
  const [year, month, day] = data.split('-');

  // Retorna a data no formato "dia/mês/ano"
  return `${day}/${month}/${year}`;
};
