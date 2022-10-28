const {
  NOT_FOUND, SERVER_INTERNAL, BAD_REQ, CREATED,
} = require('../utils/utils');
const User = require('../models/user');
const user = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => {
      res.status(SERVER_INTERNAL).send({ message: 'Internal server error' });
    });
};

const getUser = (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      console.log(err.name);
      if (err.name === 'DocumentNotFoundError') {
        res.status(BAD_REQ).send({
          message: 'No user found with that id',
        });
      } else {
        res.status(SERVER_INTERNAL).send({ message: 'Internal server error' });
      }
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(CREATED).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQ).send({
          message: `${Object.values(err.errors)
            .map((error) => error.message)
            .join(', ')}`,
        });
      } else {
        res.status(SERVER_INTERNAL).send({ message: 'Internal server error' });
      }
    });
};

module.exports = { getUser, getUsers, createUser };
