import { RequestHeaders } from '../../sapiensOperations/request/RequestHeaders';
import axios from 'axios';

export class GetCapaUseCase {
  async execute(nup: string, cookie: string): Promise<string> {
    const requestHeaderUploadArquivo = new RequestHeaders();
    const headers = await requestHeaderUploadArquivo.execute(cookie);
    const baseURL = `https://sapiens.agu.gov.br/visualizador/capa?nup=${nup}`;
    return await axios
      .get(baseURL, { headers })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        return new Error(error);
      });
  }
}
