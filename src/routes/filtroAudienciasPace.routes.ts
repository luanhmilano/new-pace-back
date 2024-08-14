import { Router } from 'express';
import { filtroAudienciasPaceController } from '../modules/FiltroAudienciasPace';

export const routerFiltroAudienciasPace = Router();

routerFiltroAudienciasPace.post('/filtroAudienciasPace', async (req, res) => {
  return filtroAudienciasPaceController.handle(req, res);
});
