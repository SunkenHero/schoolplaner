const crypto = require('crypto')
const sqlite3 = require('sqlite3').verbose();
const format = require('date-format');
const db = new sqlite3.Database('db/userdb.sqlite');

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, password TEXT, uuid TEXT)");

    db.run("CREATE TABLE IF NOT EXISTS homework (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, createdate DATE default current_timestamp, date DATE)")
    
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
        db.each("SELECT * FROM homework", (err,row) =>{
            if (err) {
                console.error(err.message);
                callback(null);
            } else {
                callback(row);
            }
        });
    }

    exports.getHomework = function getHomework(id, callback){
        db.get("SELECT * FROM homework WHERE id = ?", id,(err,row)=>{
            if (err) {
                console.error(err.message);
                callback(null);
            } else {
                callback(row);
            }
        });
    }

    exports.createHomework = function createHomework(name, description, date){
        var Date1 = new Date(date);
        Date1 = format('yyyy-MM-dd', Date1);
        const insertHomework = db.prepare("INSERT INTO homework (name, description, date) VALUES (?, ?, ?)");
        
        insertHomework.run(name, description, Date1)
        insertHomework.finalize();
        console.log(Date1);
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