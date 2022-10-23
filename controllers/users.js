const fs = require('fs').promises;
const path = require('path');
const { NOT_FOUND, SERVER_INTERNAL } = require('../utils/utils');
const { User } = require('../models/user');

const dataPath = path.join(__dirname, '../', 'data', 'cards.json');

const getUsers = (req, res) => {
  fs.readFile(dataPath, { encoding: 'utf8' })
    .then((users) => res.send({ data: JSON.parse(users) }))
    .catch(() => {
      res.status(500).send({ message: 'Internal server error' });
    });
};

const getUser = (req, res) => {
  const { id } = req.params;
  fs.readFile(dataPath, { encoding: 'utf8' })
    .then((users) => {
      const data = JSON.parse(users);
      const user = data.find((element) => element._id === id);

      if (!user) {
        res.status(NOT_FOUND).send({ message: 'User ID not found' });
        return;
      }
      res.send(user);
    })
    .catch(() => {
      res.status(SERVER_INTERNAL).send({ message: 'Internal server error' });
    });
};

const createUser = (req, res) => {
  console.log(req.body);
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({
           message: `${Object.values(err.errors)
                      .map(error => error.message)
                      .join(', ')}`
        })
      } else {
          res.status(500).send({message: 'Internal server error'});
      }
    });
};

module.exports = { getUser, getUsers, createUser };
