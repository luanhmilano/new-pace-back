import { RequestGetEspecieTarefa } from '../../sapiensOperations/request/RequestGetEspecieTarefa';
import { GetEspecieTarefaController } from './GetEspecieTarefaController';
import { GetEspecieTarefaUseCase } from './GetEspecieTarefaUseCase';

const requestGetEspecieTarefa = new RequestGetEspecieTarefa();
const getEspecieTarefaUseCase = new GetEspecieTarefaUseCase(
  requestGetEspecieTarefa,
);
const getEspecieTarefaController = new GetEspecieTarefaController(
  getEspecieTarefaUseCase,
);

export { getEspecieTarefaUseCase, getEspecieTarefaController };
