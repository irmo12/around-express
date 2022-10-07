const router = require('express').Router();
const fs = require('fs').promises;
const path = require('path');

const dataPath = path.join(__dirname, '../', 'data', 'cards.json');

router.get('/', (req, res) => {
  fs.readFile(dataPath, { encoding: 'utf-8' })
    .then((cards) => res.send({ data: JSON.parse(cards) }))
    .catch(() => {
      res.status(500).send({ message: 'Internal server error' });
    });
});

module.exports = { cardsRoute: router };
