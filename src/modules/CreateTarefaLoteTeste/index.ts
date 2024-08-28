import { CreateTarefaLoteTesteController } from './CreateTarefaLoteTesteController';
import { CreateTarefaLoteTesteUseCase } from './CreateTarefaLoteTesteUseCase';

export const createTarefaLoteTesteUseCase = new CreateTarefaLoteTesteUseCase();
export const createTarefaLoteTesteController =
  new CreateTarefaLoteTesteController(createTarefaLoteTesteUseCase);
