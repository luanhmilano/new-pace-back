/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { CreateTarefaLoteTesteUseCase } from './CreateTarefaLoteTesteUseCase';
import { CreateTarefaLoteTesteDTO } from '../../DTO/CreateTarefaLoteTesteDTO';

export class CreateTarefaLoteTesteController {
  constructor(
    private createTarefaLoteTesteUseCase: CreateTarefaLoteTesteUseCase,
  ) {}
  async handle(request: Request, response: Response): Promise<Response> {
    const data: CreateTarefaLoteTesteDTO = request.body;
    try {
      const result = await this.createTarefaLoteTesteUseCase.execute(data);
      console.log(result);
      return response.status(200).json(result);
    } catch (error: any) {
      return response.status(400).json({
        message: error.message || 'Unexpected error',
      });
    }
  }
}
