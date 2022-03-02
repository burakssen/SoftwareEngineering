const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
  try {
    const db = process.env.DB_URI;
    // TODO: Add database connection
    console.log("DB Connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
