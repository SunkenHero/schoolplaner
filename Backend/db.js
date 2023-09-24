const crypto = require('crypto')
const sqlite3 = require('sqlite3').verbose();
const format = require('date-format');
const db = new sqlite3.Database('db/userdb.sqlite');

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, password TEXT, uuid TEXT)");

    db.run("CREATE TABLE IF NOT EXISTS homework (id INTEGER PRIMARY KEY AUTOINCREMENT,fach TEXT, name TEXT, description TEXT, fertig BOOL default 0, createdate DATE default current_timestamp, date DATE)")
    
    exports.createUser = function createUser(name, password) {
        db.get("SELECT id FROM users WHERE name = ?", name, (err, row) => {
            if (err) {
                console.error(err.message);
            }
            if (!(row)) {
                const uuid = crypto.randomUUID();
                const insertUser = db.prepare("INSERT INTO users (name, password, uuid) VALUES (?, ?, ?)");
                insertUser.run(name, password, uuid);
                insertUser.finalize();
            }
        });
    }

    exports.deleteUser = function deleteUser(id) {
        db.get("SELECT id FROM users WHERE id = ?", id, (err, row) => {
            if (err) {
                console.error(err.message);
            }
            if (row) {
                db.run("DELETE FROM users WHERE id = ?", id, (err) => {
                    if (err) {
                        console.error(err.message);
                    }
                });
            }
        });
    }

    exports.auth = function auth(name, password, callback) {

        db.get("SELECT * FROM users WHERE name = ? AND password = ?", name, password, (err, row) => {
            if (err) {
                console.error(err.message);
                callback(false, null);
            } else {
                callback(!!row, row);
            }
        });
    }

    exports.getAllHomework = function getAllHomework(callback){
        db.all("SELECT * FROM homework WHERE date BETWEEN current_timestamp and '2030-12-29' ORDER BY date", (err,result) =>{
            console.log(result);
            if (err) {
                console.error(err.message);
                callback(err,null);
            } else {
                callback(null,result);
            }
        });
    }

    exports.getUnfinishedHomework = function getUnfinishedHomework(callback){
        db.all("SELECT * FROM homework WHERE date BETWEEN current_timestamp and '2030-12-29' AND fertig = 0 ORDER BY date", (err,result) =>{
            console.log(result);
            if (err) {
                console.error(err.message);
                callback(err,null);
            } else {
                callback(null,result);
            }
        });
    }

    exports.getHomework = function getHomework(req, callback){
        const id = req.params.id;
        db.get("SELECT * FROM homework WHERE id = ?", id,(err,row)=>{
            if (err) {
                console.error(err.message);
                callback(err,null);
            } else {
                callback(null,row);
            }
        });
    }

    exports.createHomework = function createHomework(req, callback){
        const fach = req.body.fach;
        const name = req.body.name;
        const description = req.body.description;
        const date = req.body.date;

        var Date1 = new Date(date);
        Date1 = format('yyyy-MM-dd', Date1);
        db.get("INSERT INTO homework (fach, name, description, date) VALUES (?, ?, ?,?)", fach, name, description, Date1, (err, row) => {
            if (err) {
                console.error(err);
                callback(err,false);
            } else {
                callback(null,true);
            }
        });
    }

    exports.updateHomework = function updateHomework(req, callback){
        const fach = req.body.fach;
        const id = req.params.id;
        const name = req.body.name;
        const description = req.body.description;
        const date = req.body.date;

        var Date1 = new Date(date);
        Date1 = format('yyyy-MM-dd', Date1);
        db.get("UPDATE homework SET fach = ? name = ?, description = ?, date = ? WHERE id = ?", fach, name, description, Date1, id, (err, row) => {
            if (err) {
                console.error(err.message);
                callback(err,false);
            } else {
                callback(null,true);
            }
        });
    }
    
    exports.checkHomework = function deleteHomework(req, callback){
        const id = req.params.id;
        db.get("UPDATE homework SET fertig = 1 WHERE id = ?", id, (err, row) => {
            if (err) {
                console.error(err.message);
                callback(err,false);
            } else {
                callback(null,true);
            }
        });
    }

    exports.deleteHomework = function deleteHomework(req, callback){
        const id = req.params.id;
        db.get("DELETE FROM homework WHERE id = ?", id, (err, row) => {
            if (err) {
                console.error(err.message);
                callback(err,false);
            } else {
                callback(null,true);
            }
        });
    }

    exports.listUsers = function listUsers() {
        db.each("SELECT id, name, password, uuid FROM users", (err, row) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`${row.id}: ${row.name} - ${row.password} - ${row.uuid}`);
            }
        });
    }
});