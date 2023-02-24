require('dotenv').config();
const express = require('express');
const cors = require('cors');
const https = require('https');
const fs = require('fs');
const app = express();
const PORT = 443;

app.use(cors());
app.use(express.json());

require('./routes/Login')(app);
require('./routes/Group')(app);
require('./routes/Device')(app);


const server = https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}, app);

server.listen(PORT, () => {
  console.log(`listening on ${PORT}`)
});


