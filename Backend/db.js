const sqlitedb = require('./db/sqlitedb.js');
const mysqldb = require('./db/mysql.js');

const dotenv = require('dotenv');
dotenv.config();

const usemysql = process.env.USE_MYSQL;

//if(usemysql == true){
    module.exports = mysqldb;
/*}else{
    module.exports = sqlitedb;
}*/