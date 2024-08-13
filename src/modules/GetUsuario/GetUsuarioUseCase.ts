/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestSapiens } from '../../pythonRequest/requestSapiens';
import { RequestGetUsuario } from '../../sapiensOperations/request/RequestGetUsuario';

export class GetUsuarioUseCase {
  constructor(private RequestGetUsuario: RequestGetUsuario) {}
  async execute(cookie: string): Promise<any> {
    const getUsuario = await this.RequestGetUsuario.execute();

    const response = await RequestSapiens(cookie, getUsuario);

    return response;
  }
}
