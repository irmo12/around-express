const router = require("express").Router();
const fs = require('fs').promises;
const path = require('path');
const dataPath = path.join(__dirname, '../', 'data', 'users.json');

router.get("/", (req, res) => {
  fs.readFile(dataPath, { encoding: "utf8" })
    .then((users) => res.send({ data: JSON.parse(users) }))
    .catch(() => {
      res.status(500).send({ "message": "Internal server error" });
    });
});

router.get("/:id", (req, res) => {
  fs.readFile(dataPath, { encoding: "utf8" })
    .then((users) => {
      const user = (users).find((user) => user._id === req.params.id);

      if (!user) {
        res.status(404).send({ "message": "User ID not found" });
        return;
      }
      res.send(user);
    })

    .catch(() => {
      res.status(500).send({ "message": "Internal server error" });
    });
});

module.exports = { usersRoute: router };
