import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import { upload } from './middlewares/uploadMiddleware';
import { extractInfoMiddleware } from './middlewares/extractInfoMiddleware';
import { processExcel } from './services/excelProcessor';
import { createAudiencia, getAudiencias, getAudienciaById, updateAudiencia, deleteAudiencia, exportAudiencias, getAudienciasByFilters } from './controllers/audienciaController';
import { organizePautas } from './controllers/pautaController';
import { resetData } from './controllers/resetController';
import { organizeAudienciasInPautas } from './services/PautaService';
import routes from './routes/routes';

const app = express();

app.use(cors());
app.use(json());

app.use(routes)

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

// Rotas de CRUD para audiências
app.post('/audiencias', createAudiencia);
app.get('/audiencias', getAudiencias);
app.get('/audiencias/:id', getAudienciaById);
app.put('/audiencias/:id', updateAudiencia);
app.delete('/audiencias/:id', deleteAudiencia);

// Rota para organizar pautas
app.post('/organize-pautas', organizePautas);

// Rota para resetar dados
app.post('/reset-data', resetData);

// Rota para exportar audiências para Excel
app.get('/export-audiencias', exportAudiencias);

// Rota pde GET com filtros
app.get('/audiencias-filter', getAudienciasByFilters);

export default app;
