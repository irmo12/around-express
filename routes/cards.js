const router = require("express").Router();
const fs = require("fs").promises;

router.get("/", (req, res) => {
  fs.readFile("../data/cards.json", { encoding: "utf-8" })
    .then((cards) => res.send({ cards }))
    .catch(() => {
      res.send({ "message": "Internal server error" }.status(500));
    });
});

router.get("/:id", (req, res) => {
  if (!cards[req.params.id]) {
    res.send({ "message": `This card doesn't exist` });
    return;
  }
  res.send(cards[req.params.id]);
});

module.exports = { cardsRoute: router };
