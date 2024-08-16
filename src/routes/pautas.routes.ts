import { Router } from 'express';
import PautaController from '../controllers/pauta.controller';

export const routerPautas = Router();

routerPautas.post('/pautas', async (req, res) => {
  return PautaController.create(req, res);
});

routerPautas.get('/pautas', async (req, res) => {
  return PautaController.getAll(req, res);
});

routerPautas.get('/pautas/:id', async (req, res) => {
  return PautaController.getById(req, res);
});

routerPautas.get('/pautas-audi/:id', async (req, res) => {
  return PautaController.getByIdWithAudiencias(req, res);
});

routerPautas.put('/pautas/:id', async (req, res) => {
  return PautaController.update(req, res);
});

routerPautas.delete('/pautas/:id', async (req, res) => {
  return PautaController.delete(req, res);
});

routerPautas.get('/orgaos-julgadores', async (req, res) => {
  return PautaController.getOrgaosJulgadores(req, res);
});

routerPautas.get('/salas/:orgao_julgador', async (req, res) => {
  return PautaController.getSalasByOrgaoJulgador(req, res);
});
