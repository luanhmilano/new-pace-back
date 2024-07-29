import { Request, Response } from 'express';
import { organizeAudienciasInPautas } from '../services/PautaService';

export const organizePautas = async (_req: Request, res: Response) => {
  try {
    await organizeAudienciasInPautas();
    res.status(200).send('Pautas organized successfully');
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
