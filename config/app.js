import 'dotenv/config';
import { json, urlencoded } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import config from './env';
import { constants , errorResponse, successResponse} from '../app/utils';
import apiV1Routes from '../app/routes/v1';

const { REDIS_RUNNING, STREAM_RUNNING, WELCOME, v1 } = constants;

const appConfig = (app) => {
  // adds security middleware to handle potential attacks from HTTP requests
  app.use(helmet());
  // adds middleware for cross-origin resource sharing configuration
  app.use(cors());
  // adds a heartbeat route for the culture
  app.use(json());
  // adds middleware that parses requests with x-www-form-urlencoded data encoding
  app.use(urlencoded({ extended: true }));

  app.use(v1, apiV1Routes);

  app.get('/', (req, res) => successResponse(res, { message: WELCOME }));
  // serves v1 api routes

  // handles all forwarded errors
  app.use((err, req, res, next) => errorResponse(req, res, err));

  const port = process.env.PORT || config.PORT;
  
  app.listen(port, () => {
    logger.info(`${STREAM_RUNNING} ${port}`);
  });
};
export default appConfig;
