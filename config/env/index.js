import rootPath from 'app-root-path';
import development from './development';
import production from './production';
import test from './test';

const {
  SMART_PORT: PORT,
  SMART_NODE_ENV: NODE_ENV,
  SMART_SECRET: SECRET,
} = process.env;

const currentEnv = {
  development,
  production,
  test
}[NODE_ENV || 'production'];

export default {
  ...process.env,
  ...currentEnv,
  rootPath,
  PORT,
  SECRET,
  NODE_ENV
};
