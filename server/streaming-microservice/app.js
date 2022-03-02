const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const hpp = require("hpp");
const dotenv = require("dotenv");
const xss = require("xss-clean");
const cookieParser = require("cookie-parser");
const fileUpload = require('express-fileupload');

const errorHandler = require("./middleware/errorHandler");
const videoRouter = require("./routers/video");
const streamRouter = require("./routers/stream");

dotenv.config();

//Starts application
const app = express();

// Cookie parser
app.use(cookieParser());

// Body parser
app.use(express.json());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Prevent http param pollution
app.use(hpp());

app.use(fileUpload());

// Enable CORS
app.use(cors({credentials: true, origin: 'http://127.0.0.1:3000'}));

// Mount to routers
app.use("/api/video/", videoRouter);
app.use("/api/stream/", streamRouter);

app.use(errorHandler);

module.exports = app;
