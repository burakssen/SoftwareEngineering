const asyncHandler = require("../middleware/async");
const dotenv = require("dotenv");
const {endpoints, courseMicroServiceAddress} = require("../common/constants/endpoints/course");
const axios = require('axios');

dotenv.config();

exports.createCourseService = asyncHandler(async (payload) => {
    const res = await axios.post(courseMicroServiceAddress + endpoints.create, payload);
    return res.data;
});

exports.getCourseService = asyncHandler(async (payload) => {
    const res = await axios.post(courseMicroServiceAddress + endpoints.get, payload);
    return res.data;
});

exports.getAllCoursesService = asyncHandler(async () => {
    const res = await axios.post(courseMicroServiceAddress + endpoints.getAll);
    return res.data;
});

exports.deleteCourseService = asyncHandler(async (payload) => {
    const res = await axios.post(courseMicroServiceAddress + endpoints.delete, payload);
    return res.data;
});

exports.updateCourseService = asyncHandler(async (payload) => {
    const res = await axios.put(courseMicroServiceAddress + endpoints.update, payload);
    return res.data;
});

exports.getAllVideoIdsByCourseIdService = asyncHandler(async (payload) => {
    const res = await axios.post(courseMicroServiceAddress + endpoints.getAllVideoIdsByCourseId, payload);
    return res.data;
});

exports.getAllCoursesOfEmployeeService = asyncHandler(async (payload) => {
    const res = await axios.post(courseMicroServiceAddress + endpoints.getAllCoursesOfEmployee, payload);
    return res.data;
});

exports.createNewVideoCourseMatchingService = asyncHandler(async (payload) => {
    const res = await axios.post(courseMicroServiceAddress + endpoints.createNewVideoCourseMatching, payload);
    return res.data;
});

exports.getAllCategoriesService = asyncHandler(async (payload) => {
    const res = await axios.get(courseMicroServiceAddress + endpoints.getAllCategories, payload);
    return res.data;
});

exports.deleteVideoCourseMatchingService = asyncHandler( async (payload) => {
    const res = await axios.post(courseMicroServiceAddress + endpoints.deleteVideoCourseMatching, payload);
    return res.data;
});

exports.getAllVideoCourseMatchingsService = asyncHandler( async () => {
    const res = await axios.get(courseMicroServiceAddress + endpoints.getAllVideoCourseMatchings);
    return res.data;
})

exports.getCategoryByIdService = asyncHandler(async (payload) => {
    const res = await axios.post(courseMicroServiceAddress + endpoints.getCategory, payload);
    return res.data;
});

exports.updateCategoryByIdService = asyncHandler(async (payload) => {
    const res = await axios.put(courseMicroServiceAddress + endpoints.updateCategory, payload);
    return res.data;
});

exports.deleteCategoryByIdService = asyncHandler(async (payload) => {
    const res = await axios.post(courseMicroServiceAddress + endpoints.deleteCategory, payload);
    return res.data;
});

exports.createCategoryByIdService = asyncHandler(async (payload) => {
    const res = await axios.post(courseMicroServiceAddress + endpoints.createCategory, payload);
    return res.data;
});