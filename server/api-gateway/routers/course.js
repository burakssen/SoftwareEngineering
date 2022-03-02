const express = require("express");
const {endpoints} = require("../common/constants/endpoints/course");

const {
    createCourseController,
    deleteCourseController,
    getAllCoursesController,
    getCourseController,
    updateCourseController,
    getAllVideoIdsByCourseIdController,
    getAllCoursesOfEmployeeController,
    createNewVideoCourseMatchingController,
    getAllCategoriesController,
    deleteVideoCourseMatchingController,
    getAllVideoCourseMatchingsController,
    deleteCategoryByIdController,
    getCategoryByIdController,
    updateCategoryByIdController,
    createCategoryByIdController
} = require("../controllers/course");

const {validateToken, adminAuth} = require("../authorization/token");
const {admin} = require("../authorization/authorization");

//Initializes router
const router = express.Router();

//Calls validators and corresponding function
router.post(
    endpoints.create,
    validateToken,
    adminAuth,
    createCourseController
);

router.post(
    endpoints.get,
    validateToken,
    getCourseController
);

router.post(
    endpoints.getAll,
    validateToken,
    getAllCoursesController
);

router.post(
    endpoints.delete,
    validateToken,
    adminAuth,
    deleteCourseController
);

router.put(
    endpoints.update,
    validateToken,
    adminAuth,
    updateCourseController
);

router.post(
    endpoints.getAllVideoIdsByCourseId,
    validateToken,
    getAllVideoIdsByCourseIdController
);

router.post(
    endpoints.getAllCoursesOfEmployee,
    validateToken,
    getAllCoursesOfEmployeeController
);

router.post(
    endpoints.createNewVideoCourseMatching,
    validateToken,
    createNewVideoCourseMatchingController
);


router.post(
  endpoints.getAllCategories,
  validateToken,
  adminAuth,
  getAllCategoriesController
);

router.post(
  endpoints.deleteVideoCourseMatching,
  validateToken,
  adminAuth,
  deleteVideoCourseMatchingController
);

router.get(
  endpoints.getAllVideoCourseMatchings,
  validateToken,
  adminAuth,
  getAllVideoCourseMatchingsController
);
router.post(
    endpoints.deleteCategory,
    validateToken,
    adminAuth,
    deleteCategoryByIdController
);

router.post(
    endpoints.getCategory,
    validateToken,
    getCategoryByIdController
);

router.put(
    endpoints.updateCategory,
    validateToken,
    adminAuth,
    updateCategoryByIdController
);

router.post(
    endpoints.createCategory,
    validateToken,
    adminAuth,
    createCategoryByIdController
);
module.exports = router;
