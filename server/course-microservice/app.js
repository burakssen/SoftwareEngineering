const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const hpp = require("hpp");
const dotenv = require("dotenv");
const xss = require("xss-clean");

const errorHandler = require("./middleware/errorHandler");
const categoryRouter = require("./routers/category");
const courseRouter = require("./routers/course");
const linkRouter = require("./routers/link");
const videoCourseMatchingRouter = require("./routers/videoCourseMatching");

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
app.use("/api/course/", categoryRouter);
app.use("/api/course/", courseRouter);
app.use("/api/course/", linkRouter);
app.use("/api/course/", videoCourseMatchingRouter);


app.use(errorHandler);

module.exports = app;
