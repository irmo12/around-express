
const cards = require("express").Router();

cards.get("/cards", (req, res) => {
  res.send(cards.json);
});

router.get("/users/:id", (req, res) => {
  if (!cards[req.params.id]) {
    res.send({ error: `This card doesn't exist` });
    return;
  }
  res.send(cards[req.params.id]);
});

module.exports = cards;
