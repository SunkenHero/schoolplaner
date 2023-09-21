const express = require('express');
const bodyParser = require('body-parser');
const auth = require('./auth.js');
const jwt = require('jsonwebtoken');

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/login', (req, res) => {
  res.send('Login')
});

app.delete('/hausaufgabe/{id}', (req, res) => {
  res.send('Logout')
});

app.put('/put', (req, res) => { 
  res.send('Put')
});

app.listen(port, () => {
  console.log('Listening on port ' + String(port))
})