const express = require('express');
require('dotenv').config();

const cors = require('cors');

const app = express();

const PORT = 8080;

const routes = require('./routes');
const startWebSocketServer = require('./websockets/index');
// const { addRootUser } = require('./controllers/loginController');



app.use(cors());
app.use(express.json());
app.use(routes);

require('./routes/Login')(app);
require('./routes/Group')(app);
// local test address to be changed when deployed
const server = app.listen(PORT, () => {
  console.log(`listening on ${PORT}`)
});

startWebSocketServer(server);

