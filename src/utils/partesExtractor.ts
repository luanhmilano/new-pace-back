export const extractPartes = (partes: string): string => {
    
    const civilMatch = partes.match(/^([A-Z\s]+)\s+registrado\(a\) civilmente como/i);
    if (civilMatch && civilMatch[1]) {
      return civilMatch[1].trim();
    }
  
    // Verifique o padrão "NOME - CPF: " ou "NOME - CNPJ: "
    const regex = /([A-Z\s]+(?:-[A-Z\s]+)*)\s*-\s*CPF:|CNPJ:/i;
    const match = partes.match(regex);
    if (match && match[1]) {
      return match[1].trim();
    }

    return partes.split(' - ')[0].trim();
  };
  