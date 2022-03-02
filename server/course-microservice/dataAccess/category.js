const { category } = require("../models");
const {SERVER_ERROR} = require("../common/constants/statusCodes");

// All database access operations must be handled here.
exports.saveNewCategoryDataAccess = async (categoryName, res) => {
    return await category.create({
        name: categoryName
    });
}

exports.deleteCategoryDataAccess = async (categoryId, res) => {
    return await category.destroy({
        where: {
            id: categoryId,
        }
    });
}

exports.getCategoryDataAccess = async (categoryId, res) => {
    return await category.findOne({
        where: {
            id: categoryId
        }
    });
}

exports.getAllCategoriesDataAccess = async (res) => {
    return await category.findAll();
}

exports.updateCategoryDataAccess = async (updatedCategory, res) => {
    const updateRes = await category.update({ name: updatedCategory.name }, {
        where: {
            id: updatedCategory.id
        },
        returning: true
    });

    if(updateRes[0] != 0) {
        return updateRes[1][0].dataValues;
    }
    return null;
}