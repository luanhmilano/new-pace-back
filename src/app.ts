import express from 'express';
import { json } from 'body-parser';
import multer from 'multer';
import { createAudiencia, getAudiencias } from './controllers/audienciaController';
import { createPauta, getPautas } from './controllers/pautaController';
import { processExcel } from './services/excelProcessor';

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(json());

app.post('/upload', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    const audiencias = await processExcel(req.file.path);
    res.status(201).json(audiencias);
});

app.post('/audiencias', createAudiencia);
app.get('/audiencias', getAudiencias);

app.post('/pautas', createPauta);
app.get('/pautas', getPautas);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});