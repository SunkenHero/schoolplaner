const sqlitedb = require('./db/sqlitedb.js');
const mysqldb = require('./db/mysql.js');

require('dotenv').config();

const usemysql = process.env.USE_MYSQL || true;

module.exports = mysqldb;
