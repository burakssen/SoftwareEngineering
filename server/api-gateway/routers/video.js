const express = require("express");
const {video} = require("../common/constants/endpoints/video");

const {
    createVideoController,
    deleteVideoController,
    getAllVideosController,
    getVideoController,
    updateVideoController
} = require("../controllers/video");

const {validateToken, adminAuth} = require("../authorization/token");
const {admin} = require("../authorization/authorization");

//Initializes router
const router = express.Router();

//Calls validators and corresponding function
router.post(
    video.register,
    validateToken,
    adminAuth,
    createVideoController
);

router.post(
    video.get,
    validateToken,
    getVideoController
);

router.post(
    video.getAll,
    validateToken,
    getAllVideosController
);

router.post(
    video.erase,
    validateToken,
    adminAuth,
    deleteVideoController
);

router.put(
    video.update,
    validateToken,
    adminAuth,
    updateVideoController
);

module.exports = router;
