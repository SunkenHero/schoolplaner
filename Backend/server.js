const express = require('express');
const bodyParser = require('body-parser');
const auth = require('./auth.js');
const jwt = require('jsonwebtoken');
const e = require('express');

const app = express();

app.use(bodyParser.json());


app.post('/auth', auth.Auth );

app.use('/api',auth.isAuth);
app.get('/api', (req, res) => {
  console.log('protected');
  res.json({ message: 'API access granted!' });
});

app.use('/api/*', auth.isAuth);

app.get('/api/homeworken', (req, res) => {
  
});

app.post('/api/homework', (req, res) => {
  
});

app.get('/api/homework/:id', (req, res) => {
  
});

app.put('/api/homework/:id/', (req, res) => {
 
});

app.delete('/api/homework/:id/', (req, res) => {
  
});

app.get('/decode', (req, res) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  const decoded = jwt.decode(token);
  res.json(decoded);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

