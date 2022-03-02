const asyncHandler = require("../middleware/async");
const dotenv = require("dotenv");
dotenv.config();

const {
    saveNewCategoryDataAccess,
    deleteCategoryDataAccess,
    getCategoryDataAccess,
    getAllCategoriesDataAccess,
    updateCategoryDataAccess
} = require("../dataAccess/category");

exports.registerCategoryService = asyncHandler(async (categoryName, res) => {
    return await saveNewCategoryDataAccess(categoryName, res);
});

exports.deleteCategoryService = asyncHandler(async (categoryId, res) => {
    return await deleteCategoryDataAccess(categoryId, res);
});

exports.getCategoryService = asyncHandler(async (categoryId, res) => {
    return await getCategoryDataAccess(categoryId, res);
});

exports.getAllCategoriesService = asyncHandler(async (res) => {
    return await getAllCategoriesDataAccess(res);
});

exports.updateCategoryService = asyncHandler(async (updatedCategory, res) => {
    return await updateCategoryDataAccess(updatedCategory, res);
});