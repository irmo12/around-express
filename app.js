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
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const app = express();

app.use(bodyParser.json());
app.use(urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.user = {
    _id: '635b8216375b68719da57927'
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
