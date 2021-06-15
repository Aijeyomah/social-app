import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { resolvers, typeDefs } from './app/graphql';
import config, { appConfig } from './config';
import initLogger from './config/logger';
import { constants ,errorResolver,} from './app/utils';

// const { v1 } = constants;

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



import cron from 'node-cron';


function CreateSchedule(time, task) {
    return cron.schedule(time,task);
}

const S1 = CreateSchedule('*/5 * * * * *', () => {
   logger.info(`hello ada `);
   
  });

const S2 = CreateSchedule('*/5 * * * * *', () => {
    logger.info(`hello john`);
 
  });


const S3 = CreateSchedule('*/5 * * * * *', () => {
    logger.info(`hello everyone`);
  
  });

const S4 = CreateSchedule('*/5 * * * * *', () => {
    logger.info(`running a task every minute at the second`);
   
  });

const scheduleList = [ S1, S2, S3, S4 ];

function RunSchedules(schedules = []) {
    for (const schedule of schedules) {
        schedule.start();
    }
}



RunSchedules(scheduleList);

