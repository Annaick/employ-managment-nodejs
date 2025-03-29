import type { Knex } from "knex";

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "postgresql",
    connection: {
      database: process.env.POSTGRES_DB || "nodejs-db",
      user: process.env.POSTGRES_USER || "user",
      password: process.env.POSTGRES_PASSWORD || "1234",
      host: process.env.POSTGRES_HOST || "localhost",
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

module.exports = config;
