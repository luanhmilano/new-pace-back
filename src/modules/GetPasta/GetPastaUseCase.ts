/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestSapiens } from '../../pythonRequest/requestSapiens';
import { RequestGetPastaProcessoJudicial } from '../../sapiensOperations/request/RequestGetPastaProcessoJudicial';

export class GetPastaUseCase {
  constructor(
    private RequestGetPastaProcessoJudicial: RequestGetPastaProcessoJudicial,
  ) {}
  async execute(cookie: string, id: string): Promise<any> {
    const getPasta = await this.RequestGetPastaProcessoJudicial.execute(id);

    const response = await RequestSapiens(cookie, getPasta);

    return response;
    //Retorna a NUP
  }
}
