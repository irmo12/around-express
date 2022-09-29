const express = require('express');
const path = require('path');
const routes = require('./routes');

const { PORT = 3000 } = process.env;

const app = express();
app.use('/', routes);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
})