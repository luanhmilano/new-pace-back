/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { FiltroAudienciasPaceUseCase } from './FiltroAudienciasPaceUseCase';
import { ILoginDTO } from '../../DTO/LoginDTO';
import audienciaService from '../../services/audiencia.service';

export class FiltroAudienciasPaceController {
  constructor(
    private filtroAudiencasPaceUseCase: FiltroAudienciasPaceUseCase,
  ) {}
  async handle(request: Request, response: Response): Promise<Response> {
    const { cpf, senha } = request.body;
    const { processos } = request.body;
    const data: ILoginDTO = {
      cpf: cpf,
      senha: senha,
    };
    try {
      const result = await this.filtroAudiencasPaceUseCase.execute(
        data,
        processos,
      );

      if (result.length > 0) {
        for (const i of result) {
          const updatedAudiencia = await audienciaService.updateContestacao(
            i.processo,
            i.tipo,
          );
        }
      }
      return response.status(200).json(result);
    } catch (error: any) {
      return response.status(400).json({
        message: error.message || 'Unexpected error',
      });
    }
  }
}
