import { Router } from "express";
import PautaController from "../controllers/pauta.controller";
import AudienciaController from "../controllers/audiencia.controller";

const routes = Router();

// ROTAS PAUTAS
routes.post('/pautas', PautaController.create);
routes.get('/pautas', PautaController.getAll);
routes.get('/pautas/:id', PautaController.getById);
routes.get('/pautas/:id/audiencias', PautaController.getByIdWithAudiencias); // Nova rota
routes.put('/pautas/:id', PautaController.update);
routes.delete('/pautas/:id', PautaController.delete);


// ROTAS AUDIÊNCIAS
routes.post('/audiencias', AudienciaController.createAudiencia);
routes.get('/audiencias', AudienciaController.getAudiencias);
routes.get('/audiencias/:id', AudienciaController.getAudienciaById);
routes.put('/audiencias/:id', AudienciaController.updateAudiencia);
routes.delete('/audiencias/:id', AudienciaController.deleteAudiencia);
// Rota para exportar audiências para Excel
routes.get('/export-audiencias', AudienciaController.exportAudiencias);
// Rota para GET com filtros
routes.get('/audiencias-filter', AudienciaController.getAudienciasByFilters);

export default routes;