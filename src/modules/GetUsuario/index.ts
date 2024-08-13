import { GetUsuarioUseCase } from './GetUsuarioUseCase';
import { GetUsuarioController } from './GetUsuarioController';
import { RequestGetUsuario } from '../../sapiensOperations/request/RequestGetUsuario';

const requestGetUsuario = new RequestGetUsuario();
const getUsuarioUseCase = new GetUsuarioUseCase(requestGetUsuario);
const getUsuarioController = new GetUsuarioController(getUsuarioUseCase);

export { getUsuarioUseCase, getUsuarioController };
