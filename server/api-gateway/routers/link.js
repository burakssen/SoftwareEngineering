const express = require("express");
const {endpoints} = require("../common/constants/endpoints/link");

const {
    createLinkController,
    deleteLinkController,
    getAllLinksController,
    getLinkController,
    updateLinkController
} = require("../controllers/link");

const {validateToken, adminAuth} = require("../authorization/token");

//Initializes router
const router = express.Router();

//Calls validators and corresponding function
router.post(
    endpoints.create,
    validateToken,
    adminAuth,
    createLinkController
);

router.post(
    endpoints.get,
    validateToken,
    getLinkController
);

router.get(
    endpoints.getAll,
    validateToken,
    getAllLinksController
);

router.post(
    endpoints.delete,
    validateToken,
    adminAuth,
    deleteLinkController
);

router.put(
    endpoints.update,
    validateToken,
    adminAuth,
    updateLinkController
);

module.exports = router;
