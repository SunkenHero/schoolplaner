const express = require('express');
const bodyParser = require('body-parser');
const auth = require('./auth.js');
const cors = require('cors');
const SocketServer = require('ws').Server;

const homeworkRoute = require('./routes/homework.js');

const app = express();

app.use(bodyParser.json());

const corsOptions = {
    origin: 'http://10.8.0.4:50000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

app.use(cors(corsOptions));

app.post('/auth', auth.Auth );

app.use('/api',auth.isAuth);
app.get('/api', (req, res) => {
  console.log('protected');
  res.json({ message: 'API access granted!' });
});

app.use('/api/*', auth.isAuth);

app.use('/api/homework/',homeworkRoute);

/*app.get('/decode', (req, res) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  const decoded = jwt.decode(token);
  res.json(decoded);
});*/

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

//idee aus https://dzone.com/articles/static-content-rest-endpoints-and-websockets-with

const wss = new SocketServer({ server});

wss.on('connection', function connection(ws) {
    console.log("connection ...");

    //on connect message
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
        wss.emit('message', message);
    });

    ws.send('message from server at: ' + new Date());
});