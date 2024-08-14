import { GetPastaController } from './GetPastaController';
import { GetPastaUseCase } from './GetPastaUseCase';
import { RequestGetPastaProcessoJudicial } from '../../sapiensOperations/request/RequestGetPastaProcessoJudicial';

const requestGetPasta = new RequestGetPastaProcessoJudicial();
const getPastaProcessoJudicialUseCase = new GetPastaUseCase(requestGetPasta);
const getPastaProcessoJudicialController = new GetPastaController(
  getPastaProcessoJudicialUseCase,
);

export { getPastaProcessoJudicialUseCase, getPastaProcessoJudicialController };
