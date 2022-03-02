const express = require("express");

const {stream} = require("../common/constants/endpoints/stream");

const {streamVideoController} = require("../controllers/stream");
const {validateToken} = require("../authorization/token");

//Initializes router
const router = express.Router();

//Calls validators and corresponding function
router.get(
    stream,
    validateToken,
    streamVideoController
);

module.exports = router;
