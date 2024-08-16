import { Router } from 'express';
import { loginController } from '../modules/LoginUsuario';

export const routerInsertSapiens = Router();

routerInsertSapiens.post('/login', async (req, res) => {
  return loginController.handle(req, res);
});
