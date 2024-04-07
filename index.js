const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
const app = require('./app');

const DB = process.env.DB_URL.replace("<password>", process.env.DB_USER_PASS);

mongoose
  .connect(DB)
  .then(() => console.log("DB connection is successfull"))
  .catch((err) => console.log("DB connection error: ", err));

app.listen(8000, "localhost", () => {
  console.log("Server is up and running.");
});
