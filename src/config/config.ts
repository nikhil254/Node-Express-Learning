import dotenv from "dotenv";
dotenv.config();

export const config = {
  app: {
    port: process.env.SERVER_PORT || 4000,
  },
  environment: process.env.NODE_ENV || 'development',
  db: {
    username: process.env.DB_USERNAME as string,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME as string,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: parseInt(process.env.DB_PORT || '5432', 10),
    logging: process.env.DB_LOGGING === 'true',
  }
};
