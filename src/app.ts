import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import { routespace } from './routes';
import { setupSwagger } from './swagger';

const app = express();

app.use(cors());
app.use(json());

setupSwagger(app);

app.use(routespace);

export default app;
