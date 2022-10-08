const express = require('express');
const router = require('./routes');
const {NOT_FOUND, SERVER_INTERNAL} = require('../utils');

const { PORT = 3000 } = process.env;

const app = express();

app.use('/', router);

app.get('*', (req, res) => {
  res.status(NOT_FOUND).send({ message: 'Requested resource not found' });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
