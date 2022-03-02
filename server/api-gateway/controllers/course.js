const asyncHandler = require("../middleware/async");
const dotenv = require("dotenv");

dotenv.config();

const {
    SUCCESS,
} = require("../common/constants/statusCodes");

const {
    createCourseService,
    deleteCourseService,
    updateCourseService,
    getCourseService,
    getAllCoursesService,
    getAllVideoIdsByCourseIdService,
    getAllCoursesOfEmployeeService,
    createNewVideoCourseMatchingService,
    getAllCategoriesService,
    deleteVideoCourseMatchingService,
    getAllVideoCourseMatchingsService,
    deleteCategoryByIdService,
    getCategoryByIdService,
    updateCategoryByIdService,
    createCategoryByIdService
} = require("../serviceCallers/course");

exports.createCourseController = asyncHandler(async (req, res) => {
    const result = await createCourseService(req.body);
    res.status(SUCCESS).json({...result});
});

exports.getCourseController = asyncHandler(async (req, res) => {
    const result = await getCourseService(req.body);
    res.status(SUCCESS).json({...result});
});

exports.getAllCoursesController = asyncHandler(async (req, res) => {
    const result = await getAllCoursesService();
    res.status(SUCCESS).json({...result});
});

exports.deleteCourseController = asyncHandler(async (req, res) => {
    const result = await deleteCourseService(req.body);
    res.status(SUCCESS).json({...result});
});

exports.updateCourseController = asyncHandler(async (req, res) => {
    const result = await updateCourseService(req.body);
    res.status(SUCCESS).json({...result});
});

exports.getAllVideoIdsByCourseIdController = asyncHandler(async (req, res) => {
    const result = await getAllVideoIdsByCourseIdService(req.body);
    res.status(SUCCESS).json({...result});
});

exports.getAllCoursesOfEmployeeController= asyncHandler(async (req, res) => {
    const result = await getAllCoursesOfEmployeeService(req.body);
    res.status(SUCCESS).json({...result});
});

exports.createNewVideoCourseMatchingController = asyncHandler(async (req, res) => {
    const result = await createNewVideoCourseMatchingService(req.body);
    res.status(SUCCESS).json({...result});
});

exports.getAllCategoriesController = asyncHandler(async (req, res) => {
    const result = await getAllCategoriesService(req.body);
    res.status(SUCCESS).json({...result});
});

exports.deleteVideoCourseMatchingController = asyncHandler( async (req, res) => {
   const result = await deleteVideoCourseMatchingService(req.body);
   res.status(SUCCESS).json({...result});
});

exports.getAllVideoCourseMatchingsController = asyncHandler( async (req, res) => {
    const result = await getAllVideoCourseMatchingsService();
    res.status(SUCCESS).json({...result});
});

exports.deleteCategoryByIdController = asyncHandler(async (req, res) => {
    const result = await deleteCategoryByIdService(req.body);
    res.status(SUCCESS).json({...result});
});

exports.getCategoryByIdController = asyncHandler(async (req, res) => {
    const result = await getCategoryByIdService(req.body);
    res.status(SUCCESS).json({...result});
});

exports.updateCategoryByIdController = asyncHandler(async (req, res) => {
    const result = await updateCategoryByIdService(req.body);
    res.status(SUCCESS).json({...result});
});

exports.createCategoryByIdController = asyncHandler(async (req, res) => {
    const result = await createCategoryByIdService(req.body);
    res.status(SUCCESS).json({...result});
});
