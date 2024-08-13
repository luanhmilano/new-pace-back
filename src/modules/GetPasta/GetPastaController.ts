/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { GetPastaUseCase } from './GetPastaUseCase';

export class GetPastaController {
  constructor(private GetPastaUseCase: GetPastaUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    const { Coockie, id } = request.body;
    try {
      const result = await this.GetPastaUseCase.execute(Coockie, id);
      return response.status(200).json(result);
    } catch (error: any) {
      return response.status(400).json({
        message: error.message || 'Unexpected error',
      });
    }
  }
}
