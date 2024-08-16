import { Request, Response } from 'express';
import { LoginUseCase } from './login.useCase';

export class LoginController {
  constructor(private loginUseCase: LoginUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    const { cpf, senha } = request.body;
    try {
      const cookie = await this.loginUseCase.execute({ cpf, senha });
      return response.status(200).json(cookie);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return response.status(400).json({
        message: error.message || 'Unexpected error',
      });
    }
  }
}
