const express = require('express');
const jwt = require('jsonwebtoken');
const log = require('./log.js');
require('dotenv').config();

const secretKey = process.env.KEY;

exports.Auth = function(req, res){
  
},


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
    const decoded = jwt.decode(token);
    return decoded;
  } catch (err) {
    return null;
  }
}