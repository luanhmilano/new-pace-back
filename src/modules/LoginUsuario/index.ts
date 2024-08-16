import { LoginUseCase } from './login.useCase';
import { LoginController } from './login.controller';

const loginUseCase = new LoginUseCase();
const loginController = new LoginController(loginUseCase);

export { loginUseCase, loginController };
