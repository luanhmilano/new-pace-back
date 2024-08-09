import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import { upload } from './middlewares/upload.middleware';
import { extractInfoMiddleware } from './middlewares/extractInfo.middleware';
import { processExcel } from './utils/excelProcessor';
import { resetData } from './controllers/reset.controller';
import routes from './routes/routes';
import { organizeAudienciasInPautas } from './utils/organizePautas';
import { setupSwagger } from './swagger';

const app = express();

app.use(cors());
app.use(json());

app.use(routes);

setupSwagger(app);

// Rota para upload de arquivos Excel
app.post(
  '/upload',
  upload.single('file'),
  extractInfoMiddleware,
  async (req, res) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const audiencias = await processExcel(
        req.file!.path,
        req.body.fileGenerationDate,
      );
      await organizeAudienciasInPautas(); // Organiza as pautas após o upload, sem enviar resposta
      console.log('Audiências extraídas com sucesso.');
      res.status(201).send('Siiiiu'); // Envia a resposta aqui
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(400);
    }
  },
);

// Rota para resetar dados
app.post('/reset-data', resetData);

export default app;
