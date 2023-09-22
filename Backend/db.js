const crypto = require('crypto')
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/userdb.sqlite');

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, password TEXT, uuid TEXT)");

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