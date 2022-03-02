const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const hpp = require("hpp");
const dotenv = require("dotenv");
const xss = require("xss-clean");

const errorHandler = require("./middleware/errorHandler");
const employeeRouter = require("./routers/employee");
const courseRouter = require("./routers/course");
const authorizationRouter = require("./routers/authorization");
const managementRouter = require("./routers/management");
const enrollmentRouter = require("./routers/enrollment");
const approvalRequestRouter = require("./routers/approvalRequest");
const linkRouter = require("./routers/link");
const videoRouter = require("./routers/video");
const streamRouter = require("./routers/stream");
const notificationRouter = require("./routers/notification");
const assignmentRouter = require("./routers/assignment");
const progressRouter = require("./routers/progress");

const cookieParser = require("cookie-parser");

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

// Enable CORS
app.use(cors({credentials: true, origin: 'http://127.0.0.1:3000'}));

// Mount to routers
app.use("/api/employees/", employeeRouter);
app.use("/api/authentication/", authorizationRouter);
app.use("/api/management/", managementRouter);
app.use("/api/enrollment/", enrollmentRouter);
app.use("/api/approvalRequest/", approvalRequestRouter);
app.use("/api/course/", courseRouter);
app.use("/api/video/", videoRouter);
app.use("/api/notification/", notificationRouter);
app.use("/api/course/", linkRouter);
app.use("/api/stream/", streamRouter);
app.use("/api/assignment/", assignmentRouter);
app.use("/api/reporting/", progressRouter);

app.use(errorHandler);

module.exports = app;
