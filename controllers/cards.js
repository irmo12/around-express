const Card = require('../models/card');
const {
  NOT_FOUND, SERVER_INTERNAL, BAD_REQ, CREATED,
} = require('../utils/utils');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => {
      res.status(SERVER_INTERNAL).send({ message: 'Internal server error' });
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.status(CREATED).send({ data: card }))
    .catch(() => {
      res.status(SERVER_INTERNAL).send({ message: 'Internal server error' });
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .orFail()
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(BAD_REQ).send({
          message: 'No card found with that id',
        });
      } else {
        res.status(SERVER_INTERNAL).send({ message: 'Internal server error' });
      }
    });
};

module.exports = { getCards, createCard, deleteCard };
