"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
app.get("/", (req, res) => {
  res.send("hello world");
});
app.listen(3000, () => {
  console.log("Serve running on port 3000");
});

console.log("pw");
