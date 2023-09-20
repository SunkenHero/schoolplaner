//cocaine is fun
const express = require('express')
const app = express()
const port = 3000

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