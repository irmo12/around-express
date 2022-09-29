import cards from "./data/cards.json";

const router = require("express").Router();

router.get("/users", (req, res) => {
  res.send(users);
});

router.get("/users/:id", (req, res) => {
  if (!users[req.params.id]) {
    res.send({ error: `This user doesn't exist` });
    return;
  }
  res.send(users[req.params.id]);
});

module.exports = router;
