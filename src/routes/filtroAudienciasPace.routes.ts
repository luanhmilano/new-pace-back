import { Router } from 'express';
import { filtroAudienciasPaceController } from '../modules/FiltroAudienciasPace';
import { getEspecieTarefaController } from '../modules/GetEspecieTarefa';
import { getSetorResponsavelTarefaController } from '../modules/GetSetorResponsavelTarefa';
import { getUsuarioResponsavelController } from '../modules/GetUsuarioResponsavelTarefa';
import { createTarefaLoteController } from '../modules/CreateTarefaLote';
import { filtroAssuntoPaceController } from '../modules/FiltroAssuntoPace';
import { createTarefaLoteTesteController } from '../modules/CreateTarefaLoteTeste';

export const routerFiltroAudienciasPace = Router();

routerFiltroAudienciasPace.post('/filtroAudienciasPace', async (req, res) => {
  return filtroAudienciasPaceController.handle(req, res);
});

routerFiltroAudienciasPace.post('/filtroAssuntoPace', async (req, res) => {
  return filtroAssuntoPaceController.handle(req, res);
});

routerFiltroAudienciasPace.get('/getEspecieTarefa', async (req, res) => {
  return getEspecieTarefaController.handle(req, res);
});

routerFiltroAudienciasPace.get(
  '/getSetorResponsavelTarefa',
  async (req, res) => {
    return getSetorResponsavelTarefaController.handle(req, res);
  },
);

routerFiltroAudienciasPace.get('/getUsuarioResponsavel', async (req, res) => {
  return getUsuarioResponsavelController.handle(req, res);
});

routerFiltroAudienciasPace.post('/insertTarefasLote', async (req, res) => {
  return createTarefaLoteController.handle(req, res);
});

routerFiltroAudienciasPace.post('/insertTarefasLoteTeste', async (req, res) => {
  return createTarefaLoteTesteController.handle(req, res);
});
