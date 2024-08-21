/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { ILoginDTO } from '../../DTO/LoginDTO';
import { FiltroAssuntoPaceUseCase } from './FiltroAssuntoPaceUseCase';
import audienciaService from '../../services/audiencia.service';

export class FiltroAssuntoPaceController {
  constructor(private filtroAssuntoPaceUseCase: FiltroAssuntoPaceUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    const { cpf, senha } = request.body;
    const { processos } = request.body;
    const data: ILoginDTO = {
      cpf: cpf,
      senha: senha,
    };
    try {
      const result = await this.filtroAssuntoPaceUseCase.execute(
        data,
        processos,
      );

      if (result.length > 0) {
        for (const i of result) {
          const updatedAudiencia = await audienciaService.updateAssunto(
            i.processo,
            i.assunto,
          );
          console.log(updatedAudiencia);
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
