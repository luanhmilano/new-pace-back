/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { FiltroAudienciasPaceUseCase } from './FiltroAudienciasPaceUseCase';
import { ILoginDTO } from '../../DTO/LoginDTO';

export class FiltroAudienciasPaceController {
  constructor(
    private getInformationsForPaceUseCase: FiltroAudienciasPaceUseCase,
  ) {}
  async handle(request: Request, response: Response): Promise<Response> {
    const { cpf, senha } = request.body;
    const { audiencias } = request.body;
    const data: ILoginDTO = {
      cpf: cpf,
      senha: senha,
    };
    try {
      const result = await this.getInformationsForPaceUseCase.execute(
        data,
        audiencias,
      );
      return response.status(200).json(result);
    } catch (error: any) {
      return response.status(400).json({
        message: error.message || 'Unexpected error',
      });
    }
  }
}
