import type { Knex } from "knex";
import * as dotenv from "dotenv";

dotenv.config();

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "mysql",
    connection: {
      database: process.env.DB_DATABASE || "employee",
      user: process.env.DB_USERNAME || "root",
      password: process.env.DB_PASSWORD || "",
      host: process.env.DB_HOST || "127.0.0.1",
      port: parseInt(process.env.DB_PORT || "3306", 10),
    },
    migrations: {
      directory: './db/migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './db/seeds',
    },
  },
};

export default config;
