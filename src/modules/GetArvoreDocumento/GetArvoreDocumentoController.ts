/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { IGetArvoreDocumentoDTO } from '../../DTO/GetArvoreDocumentoDTO';
import { GetArvoreDocumentoUseCase } from './GetArvoreDocumentoUseCase';

export class GetArvoreDocumentoController {
  constructor(private requestInformationForSamir: GetArvoreDocumentoUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    const data: IGetArvoreDocumentoDTO = request.body;
    try {
      const result = await this.requestInformationForSamir.execute(data);
      return response.status(200).json(result);
    } catch (error: any) {
      return response.status(400).json({
        message: error.message || 'Unexpected error',
      });
    }
  }
}
