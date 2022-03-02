const express = require("express");
const { endpoints } = require("../common/constants/endpoints/link");

const {
    registerLinkController,
    deleteLinkController,
    getLinkController,
    getAllLinksController,
    updateLinkController
} = require("../controllers/link");

const { validationHandler } = require("../utils/validator");
const { requestValidator } = require("../validators/link");

//Initializes router
const router = express.Router();

//Calls validators and corresponding function
router.post(
    endpoints.create,
    requestValidator(endpoints.create),
    validationHandler,
    registerLinkController
);

router.delete(
    endpoints.delete,
    requestValidator(endpoints.delete),
    validationHandler,
    deleteLinkController,
);

router.get(
    endpoints.get,
    requestValidator(endpoints.get),
    validationHandler,
    getLinkController
);

router.get(
    endpoints.getAll,
    getAllLinksController,
);

router.put(
    endpoints.update,
    requestValidator(endpoints.update),
    validationHandler,
    updateLinkController
);

module.exports = router;