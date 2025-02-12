import { IAudienciaPartial } from '../../services/dtos/IAudiencia';

export async function dataWorker(
  linha: IAudienciaPartial,
  isExcelOld: boolean,
): Promise<{ datePart: string; timePart: string }> {
  try {
    if (!linha.data) {
      throw new Error(`Data vazia encontrada row: ${JSON.stringify(linha)}`);
    }

    console.log(linha.data);
    let datePart: string = '';
    let timePart: string = '';

    try {
      if (isExcelOld) {
        [datePart, timePart] = linha.data.split(' ');
      } else {
        const match = RegExp(/(.+\/\d{2})(\d{2}:\d{2})/).exec(linha.data);
        const matchNovissomo = linha.data.split(' ');

        if (match) {
          datePart = match[1];
          timePart = match[2];
        } else if (matchNovissomo.length === 2) {
          [datePart, timePart] = matchNovissomo;
        } else {
          throw new Error('Formato de data/hora inválido.');
        }
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }

    const dateParts = datePart.split('/');

    if (dateParts.length !== 3) {
      throw new Error(
        `Linha cabeçalho encontrada row: ${JSON.stringify(linha)}`,
      );
    }

    console.log(`Date parts: ${JSON.stringify(dateParts)}`);

    const day = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1;
    let year = parseInt(dateParts[2], 10);

    if (year < 100) {
      year += 2000;
    }

    console.log(
      `Parsed date parts - day: ${day}, month: ${month + 1}, year: ${year}`,
    );

    const date = new Date(year, month, day);
    if (isNaN(date.getTime())) {
      throw new Error(`Invalid date value for row: ${JSON.stringify(linha)}`);
    }

    const formattedDate = date.toISOString().split('T')[0];

    return {
      datePart: formattedDate,
      timePart,
    };
  } catch (error: unknown) {
    if (error instanceof Error) console.error(error.message);
    throw new Error('Linha inválida.');
  }
}
