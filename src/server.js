const express = require("express");

const app = express();

app.get("/", (req, res) => {
  console.log("hello from Express");
  res.status(200);
  res.json({
    message: "Hello",
  });
});

module.exports = app;
