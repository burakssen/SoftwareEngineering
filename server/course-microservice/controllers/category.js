const asyncHandler = require("../middleware/async");
const dotenv = require("dotenv");

dotenv.config();

const {
    SUCCESS,
    SERVER_ERROR
} = require("../common/constants/statusCodes");

const { 
    registerCategoryService, 
    deleteCategoryService, 
    getCategoryService, 
    getAllCategoriesService, 
    updateCategoryService
} = require("../services/category");


// @desc      Create a new category
// @route     POST /api/course/createCategory
// @access    Public
exports.registerCategoryController = asyncHandler(async (req, res) => {
    const result = await registerCategoryService(req.body.name, res);
    res.status(SUCCESS).json({ newCategory : result});
});


// @desc      Delete existing category with given id
// @route     POST /api/course/deleteCategory
// @access    Public
exports.deleteCategoryController = asyncHandler(async (req, res) => {
    const result = await deleteCategoryService(req.body.id, res);
    if(result == 0){
        res.status(SERVER_ERROR).json({ err: "There is no record with given Id"});
    }else{
        res.status(SUCCESS).json({ deletedCategory: result});
    }
});


// @desc      Get existing category with given id
// @route     GET /api/course/getCategory
// @access    Public
exports.getCategoryController = asyncHandler(async (req, res) => {
    const result = await getCategoryService(req.body.id, res);
    if(result == null){
        res.status(SERVER_ERROR).json({err : "There is no record with given Id"})
    }else{
        res.status(SUCCESS).json({ category : result});
    }
});


// @desc      Get all existing categories
// @route     GET /api/course/getAllCategories
// @access    Public
exports.getAllCategoriesController = asyncHandler(async (req, res) => {
    const result = await getAllCategoriesService(res);
    res.status(SUCCESS).json({ allCategories : result});
});


// @desc      Update existing category with given id
// @route     GET /api/course/updateCategory
// @access    Public
exports.updateCategoryController = asyncHandler(async (req, res) => {
    const result = await updateCategoryService(req.body, res);
    if(result == null){
        res.status(SERVER_ERROR).json({err : "There is no record with given Id"})
    }else{
        res.status(SUCCESS).json({ updatedCategory : result});
    }
});