const express = require("express");
const app = express();
const router = require("./routes/router");

app.use(express.json());
app.use(router);
app.listen(5000, () => {
  console.log("Server running on port 5000");
});

//http://localhost:5000/todo-api/todo-test/get-back-info
