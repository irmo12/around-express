const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { urlencoded } = require('express');
const { NOT_FOUND } = require('./utils/utils');
const router = require('./routes');

mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
});

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.user = {
    _id: '635b8216375b68719da57927',
  };
  next();
});

app.use('/', router);

app.use('*', (req, res) => {
  res.status(NOT_FOUND).send({ message: 'Requested resource not found' });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
