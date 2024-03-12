const express = require("express");
const app = express();
require("./db");
const cors = require("cors");
const auth = require("./Router/auth.routes");
const task = require("./Router/task.routes");

app.use(express.json());
app.use(cors());

app.listen(3000, () => {
  console.log("Server started");
});

app.use("/api/v1", auth);
app.use("/api/v2", task);
