import 'dotenv/config';
import { json, urlencoded } from 'express';
import cors from 'cors';
import cookieSession from 'cookie-session';
import passport from 'passport';
import config from './env';
import { addTokenToData, constants , errorResponse, successResponse} from '../app/utils';
import apiV1Routes from '../app/routes/v1';
import http from 'http';
require('../app/services/passport');

const { STREAM_RUNNING, WELCOME, v1 } = constants;

const appConfig = (app, graphqlServer) => {

  const server = http.createServer(app);

  //Configure Session Storage
  app.use(cookieSession({
    name: 'session-name',
    keys: ['key1', 'key2']
  }))

  // adds security middleware to handle potential attacks from HTTP requests
  // app.use(helmet());
  // adds middleware for cross-origin resource sharing configuration
  app.use(cors());
  // adds a heartbeat route for the culture
  app.use(json());
  // adds middleware that parses requests with x-www-form-urlencoded data encoding
  app.use(urlencoded({ extended: true }));
  
  // serves v1 api routes
  app.use(v1, apiV1Routes);

  graphqlServer.applyMiddleware({ app, path: `${v1}/graphql` });
  graphqlServer.installSubscriptionHandlers(server);

  // Auth Routes
  app.use(passport.initialize());
  app.use(passport.session());
  app.get('/google', passport.authenticate('google', { scope: ['openid', 'email', 'profile'] }));

  app.get('/auth/google/callback', passport.authenticate('google', {
      failureRedirect: `http://${process.env.CLIENT_URL}/signup`
  }), async(req, res) => {
    const token = await addTokenToData(req.user)
    res.redirect('/');
});
  
  passport.serializeUser((user, done) => {
      done(null, user);
  });
  

  passport.deserializeUser(async(user, done) => done(null, user));

  app.get('/', (req, res) => successResponse(res, { message: WELCOME }));

  app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login' }))
  // handles all forwarded errors
  app.use((err, req, res, next) => errorResponse(req, res, err));

  const port = process.env.PORT || config.PORT;
  
  server.listen(port, () => {
    logger.info(
      `🚀🚀  ${STREAM_RUNNING} Server ready at http://localhost:${port}${graphqlServer.graphqlPath}`
    );
  });
};
export default appConfig;
