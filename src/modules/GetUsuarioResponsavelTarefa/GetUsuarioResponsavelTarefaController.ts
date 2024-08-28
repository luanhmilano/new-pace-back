/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { GetUsuarioResponsavelTarefaDTO } from '../../DTO/GetUsuarioResponsavelTarefaDTO';
import { GetUsuarioResponsavelTarefaUseCase } from './GetUsuarioResponsavelTarefaUseCase';

export class GetUsuarioResponsavelTarefaController {
  constructor(
    private getUsuarioResponsavelTarefaUseCase: GetUsuarioResponsavelTarefaUseCase,
  ) {}
  async handle(request: Request, response: Response): Promise<Response> {
    const data: GetUsuarioResponsavelTarefaDTO = request.body;
    try {
      const result =
        await this.getUsuarioResponsavelTarefaUseCase.execute(data);
      return response.status(200).json(result);
    } catch (error: any) {
      return response.status(400).json({
        message: error.message || 'Unexpected error',
      });
    }
  }
}
