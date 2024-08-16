/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express';
import { routerInsertSapiens } from './insertSapiensForPace.routes';
import { routerPautas } from './pautas.routes';
import { routerAudi } from './audiencias.routes';
import { routerFiltroAudienciasPace } from './filtroAudienciasPace.routes';

export const routespace = express();

routespace.use('/newpace', routerInsertSapiens);
routespace.use('/newpace', routerPautas);
routespace.use('/newpace', routerAudi);
routespace.use('/newpace', routerFiltroAudienciasPace);

routespace.use((req, res, next) => {
  const error = new Error('I`m Goku!!');
  next(error);
});

routespace.use((error: any, req: any, res: any) => {
  res.status(error.status || 500);
  res.json({ error: error.message });
});
