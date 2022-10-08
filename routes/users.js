const router = require('express').Router();
const fs = require('fs').promises;
const path = require('path');
const {NOT_FOUND, SERVER_INTERNAL} = require('../utils');

const dataPath = path.join(__dirname, '../', 'data', 'users.json');

router.get('/', (req, res) => {
  fs.readFile(dataPath, { encoding: 'utf8' })
    .then((users) => res.send({ data: JSON.parse(users) }))
    .catch(() => {
      res.status(500).send({ message: 'Internal server error' });
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  fs.readFile(dataPath, { encoding: 'utf8' })
    .then((users) => {
      const data = JSON.parse(users);
      const user = (data).find((element) => element._id === id);

      if (!user) {
        res.status(NOT_FOUND).send({ message: 'User ID not found' });
        return;
      }
      res.send(user);
    })

    .catch(() => {
      res.status(SERVER_INTERNAL).send({ message: 'Internal server error' });
    });
});

module.exports = { usersRoute: router };
