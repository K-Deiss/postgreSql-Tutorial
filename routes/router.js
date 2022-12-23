const express = require("express");
const router = express.Router();

router.use("/todo-api", require("./api"));

router.get("/", (req, res) => {
  res.send("Connected to main route");
});

module.exports = router;
