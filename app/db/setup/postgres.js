import promise from 'bluebird';
import pg from 'pg-promise';
import config from '../../../config/env';

const { DATABASE_URL } = config;

const camelizeColumns = (data) => {
    const template = data[0] || {};
    Object.keys(template).forEach((prop) => {
      const camel = pg.utils.camelize(prop);
      if (!(camel in template)) {
        data.forEach((el) => {
          const d = el;
          d[camel] = d[prop];
          delete d[prop];
        });
      }
    });
  };

const options = {
    promiseLib: promise,
    receive: (data, result, e) => camelizeColumns(data),
};

const pgp = pg(options);

const db = pgp( DATABASE_URL);

export default db;