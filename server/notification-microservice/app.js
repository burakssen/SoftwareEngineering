const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const hpp = require("hpp");
const dotenv = require("dotenv");
const xss = require("xss-clean");

const errorHandler = require("./middleware/errorHandler");
const notificationRouter = require("./routers/notification");

dotenv.config();

//Starts application
const app = express();

// Body parser
app.use(express.json());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

// Mount to routers
app.use("/api/notification/", notificationRouter);

app.use(errorHandler);

module.exports = app;
