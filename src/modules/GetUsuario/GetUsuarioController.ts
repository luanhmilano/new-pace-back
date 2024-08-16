/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { GetUsuarioUseCase } from './GetUsuarioUseCase';

export class GetUsuarioController {
  constructor(private GetUsuarioUseCase: GetUsuarioUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    const { Coockie } = request.body;
    try {
      const result = await this.GetUsuarioUseCase.execute(Coockie);
      return response.status(200).json(result);
    } catch (error: any) {
      return response.status(400).json({
        message: error.message || 'Unexpected error',
      });
    }
  }
}
