import { Request, Response } from 'express';
import { resetAudienciasAndPautas } from '../services/resetService';

export const resetData = async (_req: Request, res: Response) => {
  try {
    await resetAudienciasAndPautas();
    res.status(200).send('Data reset successfully');
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
