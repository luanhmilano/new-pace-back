/* eslint-disable @typescript-eslint/no-explicit-any */
const compararVara: any = (a: string, b: string): number => {
  const regex = /^(\d+)\D*/; // Captura o número no início da string
  const numA = RegExp(regex).exec(a)?.[1];
  const numB = RegExp(regex).exec(b)?.[1];

  if (numA && numB) {
    // Converte os números para inteiros para comparar corretamente
    return parseInt(numA, 10) - parseInt(numB, 10);
  }

  // Se não tiver número, ordena como string normal
  return a.localeCompare(b);
};

export default compararVara;
