const jwt = require('jsonwebtoken');
const log = require('./log.js');
const db = require('./db.js')
require('dotenv').config();

const secretKey = process.env.KEY;

db.listUsers()

db.auth("tobias.weiss", "testpasswd", (authenticated, result) => {
    if (authenticated) {
        const tokenPayload = {
          id: result.id,
          name: result.name,
          uuid: result.uuid
        };
        token = jwt.sign(tokenPayload, secretKey)
        console.log("Authentication successful");
        console.log("Token: " + token);
    } else {
        console.log("Authentication failed");
    }
});

db.getAllHomework((result) =>{
    console.log(result)
})