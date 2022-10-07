const express = require("express");
const router = require("./routes");

const { PORT = 3000, BASE_PATH } = process.env;

const app = express();

app.use("/", router);

app.get("*", (req, res) => {
  res.status(404).send({ "message": "Requested resource not found" });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
  console.log(BASE_PATH);
});
