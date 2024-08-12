/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express';
import { routerInsertSapiens } from './insertSapiensForPace.routes';

export const routespace = express();

routespace.use('/newpace', routerInsertSapiens);

routespace.use((req, res, next) => {
  const error = new Error('I`m Batman!!');
  next(error);
});

routespace.use((error: any, req: any, res: any) => {
  res.status(error.status || 500);
  res.json({ error: error.message });
});
