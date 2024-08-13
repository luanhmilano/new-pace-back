import { Router } from 'express';
import audienciaController from '../controllers/audiencia.controller';

export const routerAudi = Router();

routerAudi.post('/audiencias', async (req, res) => {
  return audienciaController.createAudiencia(req, res);
});

routerAudi.get('/audiencias', async (req, res) => {
  return audienciaController.getAudiencias(req, res);
});

routerAudi.get('/audiencias/:id', async (req, res) => {
  return audienciaController.getAudienciaById(req, res);
});

routerAudi.put('/audiencias/:id', async (req, res) => {
  return audienciaController.updateAudiencia(req, res);
});

routerAudi.delete('/audiencias/:id', async (req, res) => {
  return audienciaController.deleteAudiencia(req, res);
});

routerAudi.get('/audiencias-export', async (req, res) => {
  return audienciaController.exportAudiencias(req, res);
});

routerAudi.get('/audiencias-filter', async (req, res) => {
  return audienciaController.getAudienciasByFilters(req, res);
});
