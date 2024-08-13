import { GetProcessoJudicialController } from './GetProcessoJudicialController';
import { GetProcessoJudicialUseCase } from './GetProcessoJudicialUseCase';
import { RequestSapiensJudicial } from '../../sapiensOperations/request/RequestSapiensJudicial';

const requestSapiensJudicial = new RequestSapiensJudicial();
const getProcessoJudicialUseCase = new GetProcessoJudicialUseCase(
  requestSapiensJudicial,
);
const getProcessoJudicialController = new GetProcessoJudicialController(
  getProcessoJudicialUseCase,
);

export { getProcessoJudicialUseCase, getProcessoJudicialController };
