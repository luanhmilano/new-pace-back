/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { GetProcessoJudicialUseCase } from './GetProcessoJudicialUseCase';

export class GetProcessoJudicialController {
  constructor(private GetProcessoJudicialUseCase: GetProcessoJudicialUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    const { Coockie, numeroDoProcesso } = request.body;
    try {
      const result = await this.GetProcessoJudicialUseCase.execute(
        Coockie,
        numeroDoProcesso,
      );
      return response.status(200).json(result);
    } catch (error: any) {
      return response.status(400).json({
        message: error.message || 'Unexpected error',
      });
    }
  }
}
