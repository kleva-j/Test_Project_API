import express from 'express';
import dotenv from 'dotenv';

import bodyParser from 'body-parser';
import compression from 'compression';
import hpp from 'hpp';
import cors from 'cors';
import helmet from 'helmet';

import Routes from './Routes';
import logger, { winston } from './Middlewares/logger';

dotenv.config();

const app = express();

Routes(app);

app.logger = winston;

const PORT = process.env.PORT || 2020;

app
  .use(cors({
    origin: true,
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTION',
    credentials: true,
    exposedHeaders: ['authorization'],
  }))

  .use(helmet())

  .use(helmet.noSniff())

  .use(helmet.ieNoOpen())

  .use(helmet.frameguard({ action: 'sameorigin' }))

  .use(helmet.xssFilter())

  .use(helmet.referrerPolicy({
    policy: ['no-referrer', 'unsafe-url'],
  }))

  .use(helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'", 'default.com'],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      sandbox: ['allow-forms', 'allow-scripts'],
      reportUri: '/report-violation',
      objectSrc: ["'none'"],
      upgradeInsecureRequests: true,
      workerSrc: false,
    },
  }))

  .set('trust proxy', true)

  .set('x-powered-by', false)

  .disable('x-powered-by')

  .use(compression())

  .use((req, _, next) => {
    logger();
    req.logger = winston;
    return next();
  })

  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))

  .use(hpp())

  .use('*', (_, res) => res.status(200).json({ message: 'Hello World API' }))
  .listen(PORT, () => app.logger.info(`Server running on port ${PORT}`));
