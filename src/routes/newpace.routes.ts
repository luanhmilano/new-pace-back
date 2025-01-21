import { Router, Request, Response } from 'express';
import { upload } from '../middlewares/upload.middleware';
import { extractInfoMiddleware } from '../middlewares/extractInfo.middleware';
import { organizeAudienciasInPautas } from '../utils/organizePautas';
import etlService from '../services/etl.service';

export const routerNewPace = Router();

routerNewPace.post(
  '/upload',
  upload.single('file'),
  extractInfoMiddleware,
  async (req: Request, res: Response) => {
    try {
      if (!req.file || !req.body.fileGenerationDate) {
        throw new Error('Arquivo ou data de geração não fornecidos.');
      }

      const audienciasRaw = await etlService.extract(
        req.file.path,
        req.body.fileGenerationDate,
      );

      if (!audienciasRaw.data) {
        throw new Error(audienciasRaw.error || 'Erro na extração dos dados.');
      }

      const audienciasClean = await etlService.transform(
        audienciasRaw.data,
        req.body.fileGenerationDate,
      );

      if (!audienciasClean) {
        throw new Error('Erro na parte de transformação.');
      }

      await etlService.load(audienciasClean, req.body.fileGenerationDate);

      await organizeAudienciasInPautas();

      console.log('Audiências extraídas com sucesso.');
      res.status(201).send('RECEBA!');
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(400);
    }
  },
);
