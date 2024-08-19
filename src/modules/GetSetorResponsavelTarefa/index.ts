import { RequestGetSetorResponsavelTarefa } from '../../sapiensOperations/request/RequestGetSetorResponsavelTarefa';
import { GetSetorResponsavelTarefaController } from './GetSetorResponsavelController';
import { GetSetorResponsavelTarefaUseCase } from './GetSetorResponsavelUseCase';

const requestGetSetorResponsavelTarefa = new RequestGetSetorResponsavelTarefa();
const getSetorResponsavelTarefaUseCase = new GetSetorResponsavelTarefaUseCase(
  requestGetSetorResponsavelTarefa,
);
const getSetorResponsavelTarefaController =
  new GetSetorResponsavelTarefaController(getSetorResponsavelTarefaUseCase);

export {
  getSetorResponsavelTarefaUseCase,
  getSetorResponsavelTarefaController,
};
