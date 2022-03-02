const express = require("express");

const {endpoints} = require("../common/constants/endpoints/authorization");

const {loginController, logoutController} = require("../authorization/authorization");

//Initializes router
const router = express.Router();

//Calls validators and corresponding function
router.post(
    endpoints.login,
    loginController
);

router.post(
    endpoints.logout,
    logoutController
)

module.exports = router;
