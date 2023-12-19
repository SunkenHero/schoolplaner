const mysql = require('mysql2');
const crypto = require('crypto');
const format = require('date-format');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.MYSQL_ADDR ||'localhost',
    port: process.env.MYSQL_PORT || '3306',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PSWD || 'pwd',
    database: process.env.MYSQL_USER || 'homework'
});

db.connect((err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the MySQL server.');
    db.query("SELECT * FROM users", (err, result) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log(result);
        }
    });
});


exports.createUser = function createUser(req, callback) {
    const name = req.body.name;
    const password = req.body.password;
    const uuid = crypto.randomBytes(16).toString("hex");
    db.query("INSERT INTO users (name, password, uuid) VALUES (?, ?, ?)", [name, password, uuid], (err, row) => {
        if (err) {
            console.error(err.message);
            callback(err, false);
        } else {
            callback(null, true);
        }
    });
}

exports.deleteUser = function deleteUser(req, callback) {
    const id = req.params.id;
    db.query("DELETE FROM users WHERE id = ?", id, (err, row) => {
        if (err) {
            console.error(err.message);
            callback(err, false);
        } else {
            callback(null, true);
        }
    });
}

exports.auth = function auth(name, password, callback) {
    console.log(name, password);
    
    db.query("SELECT * FROM users WHERE name = ? AND password = ?", [name, password], (err, row) => {
        if (err) {
            console.error(err.message);
            callback(false, err);
        } else {
            callback(true, row);
        }
    });
}

exports.getAllHomework = function getAllHomework(callback) {
    var date = new Date();
    day = date.getDay();
    date.setDate(date.getDate() - day + 1 + ((day == 6) ? 7 : 0));

    var newdate = new Date();
    newdate.setDate(date.getDate() + 7);

    db.query("SELECT * FROM homework WHERE date BETWEEN '" + date.toISOString().split('T')[0] + "' and '" + newdate.toISOString().split('T')[0] + "' ORDER BY date", (err, result) => {
        if (err) {
            console.error(err.message);
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
}

exports.getUnfinishedHomework = function getUnfinishedHomework(callback) {
    db.query("SELECT * FROM homework WHERE done = 0 ORDER BY date", (err, result) => {
        if (err) {
            console.error(err.message);
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
}

exports.getHomework = function getHomework(req, callback) {
    const id = req.params.id;
    db.query("SELECT * FROM homework WHERE id = ?", id, (err, result) => {
        if (err) {
            console.error(err.message);
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
}  

exports.getHomeworkByDate = function getHomeworkByDate(req, callback) {
    const year = req.params.year;
    const month = req.params.month;
    const day = req.params.day;

    const newdate = new Date(year + "-" + month + "-" + day);
    newdate.setDate(newdate.getDate() + 7);

    db.query("SELECT * FROM homework WHERE date BETWEEN '" + year + "-" + month + "-" + day + "' and '" + newdate.toISOString().split('T')[0] + "' ORDER BY date", (err, result) => {
        if (err) {
            console.error(err.message);
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
}

exports.getHomeworkByDateUnFinished = function getHomeworkByDateUnFinished(req, callback) {
    const year = req.params.year;
    const month = req.params.month;
    const day = req.params.day;

    const newdate = new Date(year + "-" + month + "-" + day);
    newdate.setDate(newdate.getDate() + 7);

    db.query("SELECT * FROM homework WHERE date BETWEEN '" + year + "-" + month + "-" + day + "' and '" + newdate.toISOString().split('T')[0] + "' AND done = 0 ORDER BY date", (err, result) => {
        if (err) {
            console.error(err.message);
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
}

exports.createHomework = function createHomework(req, callback) {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.decode(token);

    const fach = req.body.fach;
    const name = req.body.name;
    const description = req.body.description;
    const date = req.body.date;
    const author = decoded.name;

    var Date1 = new Date(date);

    db.query("INSERT INTO homework (fach, name, description, date, author, update_author) VALUES (?, ?, ?, ?, ?, ?)", [fach, name, description, Date1.toISOString().split('T')[0], author, author], (err, row) => {
        if (err) {
            console.error(err.message);
            callback(err, false);
        } else {
            callback(null, true);
        }
    });
}

exports.updateHomework = function updateHomework(req, callback) {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.decode(token);

    const id = req.params.id;
    const fach = req.body.fach;
    const name = req.body.name;
    const description = req.body.description;
    const date = req.body.date;
    const done = req.body.done;

    const author = decoded.name;


    var Date1 = new Date(date);

    db.query("UPDATE homework SET fach = ?, name = ?, description = ?, date = ?, done = ?, update_author =?, WHERE id = ?", [fach, name, description, Date1.toISOString().split('T')[0], done, author ,id], (err, row) => {
        if (err) {
            console.error(err.message);
            callback(err, false);
        } else {
            callback(null, true);
        }
    });
}

exports.checkHomework = function checkHomework(req, callback) {
    const id = req.params.id;
    const done = req.body.done;

    db.query("UPDATE homework SET done = ? WHERE id = ?", [done, id], (err, row) => {
        if (err) {
            console.error(err.message);
            callback(err, false);
        } else {
            callback(null, true);
        }
    });
}

exports.deleteHomework = function deleteHomework(req, callback) {
    const id = req.params.id;

    db.query("DELETE FROM homework WHERE id = ?", id, (err, row) => {
        if (err) {
            console.error(err.message);
            callback(err, false);
        } else {
            callback(null, true);
        }
    });
}

exports.listUsers = function listUsers(callback) {
    db.query("SELECT * FROM users", (err, result) => {
        if (err) {
            console.error(err.message);
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
}
