const asyncHandler = require("../middleware/async");
const dotenv = require("dotenv");
dotenv.config();

const {
    saveNewLinkDataAccess,
    deleteLinkDataAccess,
    getLinkDataAccess,
    getAllLinksDataAccess,
    updateLinkDataAccess
} = require("../dataAccess/Link");

exports.registerLinkService = asyncHandler(async (newLink, res) => {
    return await saveNewLinkDataAccess(newLink, res);
});

exports.deleteLinkService = asyncHandler(async (linkId, res) => {
    return await deleteLinkDataAccess(linkId, res);
});

exports.getLinkService = asyncHandler(async (linkId, res) => {
    return await getLinkDataAccess(linkId, res);
});

exports.getAllLinksService = asyncHandler(async (res) => {
    return await getAllLinksDataAccess(res);
});

exports.updateLinkService = asyncHandler(async (updatedLink, res) => {
    return await updateLinkDataAccess(updatedLink, res);
});