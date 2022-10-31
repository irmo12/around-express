const User = require('../models/user');
const {
  OK, SERVER_INTERNAL, BAD_REQ, CREATED, NOT_FOUND,
} = require('../utils/utils');

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
      if (err.name === 'DocumentNotFoundError') {
        res.status(NOT_FOUND).send({
          message: 'No user found with that id',
        });
      } else if (err.name === 'CastError') {
        res.status(BAD_REQ).send({ message: 'cast error, check body' });
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

const patchUser = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { name: req.body.name, about: req.body.about },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => res.status(OK).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQ).send({
          message: `${Object.values(err.errors)
            .map((error) => error.message)
            .join(', ')}`,
        });
      } else if (err.name === 'DocumentNotFoundError') {
        res.status(NOT_FOUND).send({ message: 'no such user' });
      } else {
        res.status(SERVER_INTERNAL).send({ message: "couldn't update profile" });
      }
    });
};

const patchUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail()
    .then((user) => res.status(OK).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQ).send({
          message: `${Object.values(err.errors)
            .map((error) => error.message)
            .join(', ')}`,
        });
      } else if (err.name === 'DocumentNotFoundError') {
        res.status(NOT_FOUND).send('no such user');
      } else {
        res.status(SERVER_INTERNAL).send({ message: "couldn't update picture" });
      }
    });
};

module.exports = {
  getUser,
  getUsers,
  createUser,
  patchUser,
  patchUserAvatar,
};
