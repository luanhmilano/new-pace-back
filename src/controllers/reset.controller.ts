import { Request, Response } from 'express';
import { resetAudienciasAndPautas } from '../services/reset.service';

export const resetData = async (_req: Request, res: Response) => {
  try {
    await resetAudienciasAndPautas();
    console.log('Data reset successfully');
    res.status(200).send('Data reset successfully');
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};
