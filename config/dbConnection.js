const mongoose = require('mongoose');

const connectDb = async () => {
  try {
    const db = process.env.DB
    mongoose.connect(db);
    console.log(`Connected to ${db}...`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDb;