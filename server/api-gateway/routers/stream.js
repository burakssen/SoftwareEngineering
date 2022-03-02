const express = require("express");
const {stream} = require("../common/constants/endpoints/video");

const {
    videoTokenController
} = require("../authorization/authorization");

const {validateToken} = require("../authorization/token");

//Initializes router
const router = express.Router();

router.post(
    stream.videoToken,
    validateToken,
    videoTokenController
);

module.exports = router;
