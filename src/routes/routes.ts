import { Router } from "express";
import PautaController from "../controllers/pautaController";

const routes = Router();

routes.post('/pautas', PautaController.create);
routes.get('/pautas', PautaController.getAll);
routes.get('/pautas/:id', PautaController.getById);
routes.get('/pautas/:id/audiencias', PautaController.getByIdWithAudiencias); // Nova rota
routes.put('/pautas/:id', PautaController.update);
routes.delete('/pautas/:id', PautaController.delete);

export default routes;