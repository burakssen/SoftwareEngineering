const asyncHandler = require("../middleware/async");
const dotenv = require("dotenv");

dotenv.config();

const {
    SUCCESS,
    SERVER_ERROR
} = require("../common/constants/statusCodes");

const {
    registerLinkService,
    deleteLinkService,
    getLinkService,
    getAllLinksService,
    updateLinkService
} = require("../services/Link");


// @desc      Create a new Link
// @route     POST /api/link/createLink
// @access    Public
exports.registerLinkController = asyncHandler(async (req, res) => {
    const result = await registerLinkService(req.body, res);
    res.status(SUCCESS).json({ newLink : result});
});


// @desc      Delete existing Link with given id
// @route     POST /api/link/deleteLink
// @access    Public
exports.deleteLinkController = asyncHandler(async (req, res) => {
    const result = await deleteLinkService(req.body.id, res);
    if(result == 0){
        res.status(SERVER_ERROR).json({err : "There is no record with given Id"})
    }else{
        res.status(SUCCESS).json({ deletedLink: result});
    }
});


// @desc      Get existing Link with given id
// @route     GET /api/link/getLink
// @access    Public
exports.getLinkController = asyncHandler(async (req, res) => {
    const result = await getLinkService(req.body.id, res);
    if(result == null){
        res.status(SERVER_ERROR).json({err : "There is no record with given Id"})
    }else{
        res.status(SUCCESS).json({ link : result});
    }
});


// @desc      Get all existing categories
// @route     GET /api/link/getAllCategories
// @access    Public
exports.getAllLinksController = asyncHandler(async (req, res) => {
    const result = await getAllLinksService(res);
    res.status(SUCCESS).json({ allLinks : result});
});


// @desc      Update existing Link with given id
// @route     GET /api/link/updateLink
// @access    Public
exports.updateLinkController = asyncHandler(async (req, res) => {
    const result = await updateLinkService(req.body, res);
    if(result == null){
        res.status(SERVER_ERROR).json({ err : "There is no record with given Id"});
    }else{
        res.status(SUCCESS).json({ updatedLink : result});
    }
});