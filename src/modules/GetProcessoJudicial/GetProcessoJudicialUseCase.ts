/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestSapiens } from '../../pythonRequest/requestSapiens';
import { RequestSapiensJudicial } from '../../sapiensOperations/request/RequestSapiensJudicial';

export class GetProcessoJudicialUseCase {
  constructor(private RequestGetProcessoJudicial: RequestSapiensJudicial) {}
  async execute(cookie: string, numeroDoProcesso: string): Promise<any> {
    const getProcesso =
      await this.RequestGetProcessoJudicial.execute(numeroDoProcesso);

    const response = await RequestSapiens(cookie, getProcesso);

    return response;
    //Retorna o ID
  }
}
