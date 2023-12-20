const express = require('express');
const jwt = require('jsonwebtoken');
const log = require('./log.js');
const db = require('./db.js')
require('dotenv').config();

const secretKey = process.env.KEY;

exports.Auth = function(req, res){
    req.body.name = req.body.name.toLowerCase();
    db.auth( req.body.name, req.body.passwort, (authenticated, result) => {
        console.log(result);
        result = result[0];
        if (authenticated) {
            const tokenPayload = {
              id: result.id,
              name: result.name,
              uuid: result.uuid
            };
            console.log(tokenPayload);
            res.json({token: jwt.sign(tokenPayload, secretKey)});
            console.log("Authentication successful");
        } else {
            console.log("Authentication failed");
            res.status(401).json({ message: 'Authentication failed' });
        }
    });
}


exports.isAuth = function(req, res, next){
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
        log.normalLog(req.originalUrl,req.method,token,'Missing token');
        return res.status(401).json({ message: 'Missing token' });
    }

    try {
        jwt.verify(token, secretKey);
        log.normalLog(req.originalUrl,req.method,token,'Valid token');
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token'});
        log.normalLog(req.originalUrl,req.method,token,'Invalid token');
    }
}

exports.getData = function(token){
    try {
        return jwt.decode(token);
    } catch (err) {
        return null;
    }
}