import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import { upload } from './middlewares/uploadMiddleware';
import { extractInfoMiddleware } from './middlewares/extractInfoMiddleware';
import { processExcel } from './services/excelProcessor';
import { resetData } from './controllers/resetController';
import routes from './routes/routes';
import { organizeAudienciasInPautas } from './utils/organizePautas';
import { setupSwagger } from './swagger';

const app = express();

app.use(cors());
app.use(json());

app.use(routes)

setupSwagger(app);

// Rota para upload de arquivos Excel
app.post('/upload', upload.single('file'), extractInfoMiddleware, async (req, res) => {
  try {
    const audiencias = await processExcel(req.file!.path, req.body.fileGenerationDate);
    await organizeAudienciasInPautas(); // Organiza as pautas após o upload, sem enviar resposta
    console.log("Audiências extraídas com sucesso.")
    res.status(201).send("Siiiiu"); // Envia a resposta aqui
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Rota para resetar dados
app.post('/reset-data', resetData);

export default app;
