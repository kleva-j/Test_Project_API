// import bodyParser from 'body-parser';
// import compression from 'compression';
// import hpp from 'hpp';
// import cors from 'cors';
// import helmet from 'helmet';
// import logger, { winston } from './logger';

// const Middleware = (app) => {
//   const { log } = console;
//   log(app, '>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<\\///');
//   app
//     .use(cors({
//       origin: true,
//       methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTION',
//       credentials: true,
//       exposedHeaders: ['authorization'],
//     }))

//     .use(helmet())

//     .use(helmet.noSniff())

//     .use(helmet.ieNoOpen())

//     .use(helmet.frameguard({ action: 'sameorigin' }))

//     .use(helmet.xssFilter())

//     .use(helmet.referrerPolicy({
//       policy: ['no-referrer', 'unsafe-url'],
//     }))

//     .use(helmet.contentSecurityPolicy({
//       directives: {
//         defaultSrc: ["'self'", 'default.com'],
//         scriptSrc: ["'self'", "'unsafe-inline'"],
//         sandbox: ['allow-forms', 'allow-scripts'],
//         reportUri: '/report-violation',
//         objectSrc: ["'none'"],
//         upgradeInsecureRequests: true,
//         workerSrc: false,
//       },
//     }))

//     .set('trust proxy', true)

//     .set('x-powered-by', false)

//     .disable('x-powered-by')

//     .use(compression())

//     .use((req, _, next) => {
//       logger();
//       req.logger = winston;
//       return next();
//     })

//     .use(bodyParser.json())
//     .use(bodyParser.urlencoded({ extended: false }))

//     .use(hpp());
// };

// export default Middleware;
