const express = require('express');
const router = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const {NOT_FOUND, SERVER_INTERNAL} = require('./utils/utils');
const { urlencoded } = require('express');

mongoose.connect('mongodb://localhost:27017/aroundb',{
  useNewUrlParser: true,
});

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(urlencoded({ extended: true }));

app.use('/', router);

app.use('*', (req, res) => {
  res.status(NOT_FOUND).send({ message: 'Requested resource not found' });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
