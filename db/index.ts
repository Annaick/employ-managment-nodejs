// db/index.js
const knex = require('knex');
import config from "knexfile";

const db = knex(config.development);

export default db;