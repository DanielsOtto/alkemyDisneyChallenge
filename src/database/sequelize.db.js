import { Sequelize } from 'sequelize';
import { DB, USER_DB, USER_PASS, DB_HOST, DB_DIALECT } from '../config/config.js';

const db = new Sequelize(DB, USER_DB, USER_PASS, {
  host: DB_HOST,
  dialect: DB_DIALECT
});

export default db;