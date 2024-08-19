import { Router } from 'express';
import { filtroAudienciasPaceController } from '../modules/FiltroAudienciasPace';
import { getEspecieTarefaController } from '../modules/GetEspecieTarefa';

export const routerFiltroAudienciasPace = Router();

routerFiltroAudienciasPace.post('/filtroAudienciasPace', async (req, res) => {
  return filtroAudienciasPaceController.handle(req, res);
});

routerFiltroAudienciasPace.get('/getEspecieTarefa', async (req, res) => {
  return getEspecieTarefaController.handle(req, res);
});
