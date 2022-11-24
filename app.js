require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

require('./routes/Login')(app);
require('./routes/Group')(app);
require('./routes/Device')(app);

const server = app.listen(PORT, () => {
  console.log(`listening on ${PORT}`)
});


