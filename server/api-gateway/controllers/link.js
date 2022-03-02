const asyncHandler = require("../middleware/async");
const dotenv = require("dotenv");

dotenv.config();

const {
    SUCCESS,
} = require("../common/constants/statusCodes");

const {
    createLinkService,
    deleteLinkService,
    updateLinkService,
    getLinkService,
    getAllLinksService
} = require("../serviceCallers/link");


exports.createLinkController = asyncHandler(async (req, res) => {
    const result = await createLinkService(req.body);
    res.status(SUCCESS).json({...result});
});

exports.getLinkController = asyncHandler(async (req, res) => {
    const result = await getLinkService(req.body);
    res.status(SUCCESS).json({...result});
});

exports.getAllLinksController = asyncHandler(async (req, res) => {
    const result = await getAllLinksService();
    res.status(SUCCESS).json({...result});
});

exports.deleteLinkController = asyncHandler(async (req, res) => {
    const result = await deleteLinkService(req.body);
    res.status(SUCCESS).json({...result});
});

exports.updateLinkController = asyncHandler(async (req, res) => {
    const result = await updateLinkService(req.body);
    res.status(SUCCESS).json({...result});
});