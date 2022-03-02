const express = require("express");
const { endpoints } = require("../common/constants/endpoints/videoCourseMatching");

const {
    registerVideoCourseMatchingController,
    deleteVideoCourseMatchingController,
    getVideoCourseMatchingController,
    getAllVideoCourseMatchingsController,
    updateVideoCourseMatchingController,
    getAllVideosByCourseIdController,
    getAllCoursesByVideoIdController
} = require("../controllers/videoCourseMatching");

const { validationHandler } = require("../utils/validator");
const { requestValidator } = require("../validators/videoCourseMatching");

//Initializes router
const router = express.Router();

//Calls validators and corresponding function
router.post(
    endpoints.create,
    requestValidator(endpoints.create),
    validationHandler,
    registerVideoCourseMatchingController
);

router.post(
    endpoints.delete,
    requestValidator(endpoints.delete),
    validationHandler,
    deleteVideoCourseMatchingController,
);

router.get(
    endpoints.get,
    requestValidator(endpoints.get),
    validationHandler,
    getVideoCourseMatchingController
);

router.get(
    endpoints.getAll,
    getAllVideoCourseMatchingsController,
);

router.put(
    endpoints.update,
    requestValidator(endpoints.update),
    validationHandler,
    updateVideoCourseMatchingController
);

router.post(
    endpoints.getAllVideosByCourseId,
    requestValidator(endpoints.getAllVideosByCourseId),
    validationHandler,
    getAllVideosByCourseIdController,
);

router.post(
    endpoints.getAllCoursesByVideoId,
    requestValidator(endpoints.getAllCoursesByVideoId),
    validationHandler,
    getAllCoursesByVideoIdController,
);

module.exports = router;