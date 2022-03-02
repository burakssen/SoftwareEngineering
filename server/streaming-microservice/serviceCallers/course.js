const asyncHandler = require("../middleware/async");
const dotenv = require("dotenv");
const axios = require('axios');

dotenv.config();

const url = "http://localhost:5000/api/";

exports.getAllCoursesByVideoIdServiceCaller = asyncHandler(async (payload) => {
    const res = await axios.post(url + "course/getAllCoursesByVideoId", payload);
    return res.data;
});

