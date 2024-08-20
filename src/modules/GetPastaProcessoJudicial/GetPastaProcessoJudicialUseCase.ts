import { RequestSapiens } from '../../pythonRequest/requestSapiens';
import { ResponseGetPasta } from '../../sapiensOperations/response/ResponseGetPasta';
import { RequestGetPastaProcessoJudicial } from '../../sapiensOperations/request/RequestGetPastaProcessoJudicial';

export class GetPastaProcessoJudicialUseCase {
  constructor(
    private requestGetPastaProcessoJudicial: RequestGetPastaProcessoJudicial,
  ) {}
  async execute(
    numeroProcessoJudicial: string,
    cookie: string,
  ): Promise<ResponseGetPasta> {
    const getPastaProcessoJudicial =
      await this.requestGetPastaProcessoJudicial.execute(
        numeroProcessoJudicial,
      );

    const response: ResponseGetPasta = await RequestSapiens(
      cookie,
      getPastaProcessoJudicial,
    );

    return response;
  }
}
