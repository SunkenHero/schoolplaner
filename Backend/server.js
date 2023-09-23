const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const auth = require('./auth.js');
const db = require('./db.js');

const app = express();

app.use(bodyParser.json());


app.post('/auth', auth.Auth );

app.use('/api',auth.isAuth);
app.get('/api', (req, res) => {
  console.log('protected');
  res.json({ message: 'API access granted!' });
});

app.use('/api/*', auth.isAuth);

app.get('/api/homework', (req, res) => {
    db.getAllHomework((err, result)=>{
        if(err) {
            res.json({message: "Error"})
        } else {
            res.json(result)
        }
    })
});

app.get('/api/homework/:id', (req, res) => {
    db.getHomework(req, (err, result)=>{
        if (err) {
            res.json({message: "Error"})
        } else {
            res.json(result)
        }
        });
});

app.post('/api/homework', (req, res) => {
    db.createHomework(req, (err, result)=>{
        if (err) {
            res.json({message: "Error"})
        } else {
            res.json({message: "Success"})
        }
    });
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

