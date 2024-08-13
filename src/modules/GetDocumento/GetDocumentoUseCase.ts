import axios from 'axios';
import { IGetDocumentoDTO } from '../../DTO/GetDocumentoDTO';
import { RequestHeaders } from '../../sapiensOperations/request/RequestHeaders';

export class GetDocumentoUseCase {
  async execute(data: IGetDocumentoDTO): Promise<string> {
    const requestHeaderUploadArquivo = new RequestHeaders();
    const headers = await requestHeaderUploadArquivo.execute(data.cookie);
    const baseURL = `https://sapiens.agu.gov.br/documento/${data.idDocument}`;
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
