export const getDataAtual = () => {
  const dataAtual = new Date();

  const dia = String(dataAtual.getDate()).padStart(2, '0');
  const mes = String(dataAtual.getMonth() + 1).padStart(2, '0'); // O mês é 0-indexado, então adicione 1
  const ano = dataAtual.getFullYear();

  const dataFormatada = `${dia}-${mes}-${ano}`;

  return dataFormatada;
};
