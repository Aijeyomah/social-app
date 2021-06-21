import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { resolvers, typeDefs } from './app/graphql';
import config, { appConfig } from './config';
import initLogger from './config/logger';
import { constants ,errorResolver,} from './app/utils';

 const { v1 } = constants;

// create express app
const app = express();

// initialize logger
const winstonLogger = initLogger(config.NODE_ENV);

// sets logger as a global variable
global.logger = winstonLogger;

 /**
   * GraphQL server
   */
  const graphqlServer = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
    introspection: true,
    context: ({req}) => req,
    formatError: (err) => errorResolver(err),

  });

appConfig(app, graphqlServer);
