import { Sequelize } from 'sequelize';
import { config } from './config';

const sequelizeInstance = new Sequelize(config.db.database, config.db.username, config.db.password, {
  dialect: config.db.dialect as 'postgres', // Make sure config.db.dialect is defined as 'postgres'
  host: config.db.host,
  port: config.db.port,
  logging: config.db.logging === true ? (msg) => console.log(`[Sequelize Log]: ${msg}`) : false,
  retry: {
    max: 5,
    match: [/ETIMEDOUT/, /ECONNREFUSED/],
    backoffBase: 1000,
    backoffExponent: 2,
  },
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

export { sequelizeInstance };