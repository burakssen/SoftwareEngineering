const dotenv = require("dotenv");
dotenv.config();

const app = require("./app");

app.listen(process.env.PORT || 5001, () => {
  console.log(`Server started at ${process.env.PORT || 5001}`);
});
