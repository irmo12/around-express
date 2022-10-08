const router = require('express').Router();
const fs = require('fs').promises;
const path = require('path');
const {NOT_FOUND, SERVER_INTERNAL} = require('../utils');

const dataPath = path.join(__dirname, '../', 'data', 'cards.json');

router.get('/', (req, res) => {
  fs.readFile(dataPath, { encoding: 'utf-8' })
    .then((cards) => res.send({ data: JSON.parse(cards) }))
    .catch(() => {
      res.status(SERVER_INTERNAL).send({ message: 'Internal server error' });
    });
});

module.exports = { cardsRoute: router };
