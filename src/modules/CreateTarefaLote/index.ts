import { CreateTarefaLoteController } from './CreateTarefaLoteController';
import { CreateTarefaLoteUseCase } from './CreateTarefaLoteUseCase';

export const createTarefaLoteUseCase = new CreateTarefaLoteUseCase();
export const createTarefaLoteController = new CreateTarefaLoteController(
  createTarefaLoteUseCase,
);
