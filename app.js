const express = require('express');
const path = require('path');
const { users, cards } = require('./routes');
const bodyParser = require('body-parser');


const { PORT = 3000, BASE_PATH } = process.env;

const app = express();
app.use(express.static(path.join(__dirname, 'data')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/users', users);
app.use('/cards', cards);


app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
  console.log(BASE_PATH);
})