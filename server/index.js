import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import logger from 'morgan';
import dotenv from 'dotenv';

import Routes from './Routes';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 2020;

const { log } = console;

app
  .use(helmet())
  .use(logger('dev'))
  .use(cors({ origin: true }))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(Routes)
  .use('*', (_, res) => res.status(200).json({ message: 'Hello World API' }))
  .listen(PORT, () => log(`Server running on port ${PORT}`));
