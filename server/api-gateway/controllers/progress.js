const asyncHandler = require("../middleware/async");
const dotenv = require("dotenv");

dotenv.config();

const {
    SUCCESS,
} = require("../common/constants/statusCodes");

const {
    createProgressService,
    deleteProgressService,
    updateProgressService,
    getProgressService,
    getAllProgressService,
    getProgressWithEmployeeIdService,
    getProgressWithEmployeeIdVideoIdService
} = require("../serviceCallers/progress");
const {ADMIN} = require("../common/constants/roles");


exports.createProgressController = asyncHandler(async (req, res) => {
    if(req.role !== ADMIN){
        req.body.employeeId = req.id;
    }
    const result = await createProgressService(req.body);
    res.status(SUCCESS).json({...result});
});

exports.getProgressController = asyncHandler(async (req, res) => {
    const result = await getProgressService(req.body);
    res.status(SUCCESS).json({...result});
});

exports.getAllProgressController = asyncHandler(async (req, res) => {
    const result = await getAllProgressService();
    res.status(SUCCESS).json({...result});
});

exports.deleteProgressController = asyncHandler(async (req, res) => {
    const result = await deleteProgressService(req.body);
    res.status(SUCCESS).json({...result});
});

exports.updateProgressController = asyncHandler(async (req, res) => {
    if(req.role !== ADMIN){
        req.body.employeeId = req.id;
    }
    const result = await updateProgressService(req.body);
    res.status(SUCCESS).json({...result});
});

exports.getProgressWithEmployeeIdController = asyncHandler(async  (req,res) => {
   const result = await getProgressWithEmployeeIdService(req.body);
   res.status(SUCCESS).json({...result});
});

exports.getProgressWithEmployeeIdVideoIdController = asyncHandler(async  (req,res) => {
    if(req.role !== ADMIN){
        req.body.id = req.id;
    }
    const result = await getProgressWithEmployeeIdVideoIdService(req.body);
    res.status(SUCCESS).json({...result});
});