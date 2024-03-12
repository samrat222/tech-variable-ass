const mongoose = require("mongoose");
require("dotenv").config();

const DB_URL = process.env.DB_URL;

const connect = async (req, res) => {
  try {
    await mongoose.connect(DB_URL).then(() => {
      console.log("Db connection successfull");
    });
  } catch (error) {
    res.status(400).json({ message: "Not connected" });
  }
};

connect();
