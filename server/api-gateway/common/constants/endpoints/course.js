exports.endpoints = {
    create: "/createCourse",
    get: "/getCourse",
    getAll: "/getAllCourses",
    delete: "/deleteCourse",
    update: "/updateCourse",
    getAllVideoIdsByCourseId: "/getAllVideosByCourseId",
    getAllCoursesOfEmployee: "/getAllCoursesOfEmployee",
    createNewVideoCourseMatching: "/createVideoCourseMatching",
    deleteVideoCourseMatching: "/deleteVideoCourseMatching",
    getAllVideoCourseMatchings: "/getAllVideoCourseMatchings",
    getAllCategories: "/getAllCategories",
    getCategory: "/getCategory",
    updateCategory: "/updateCategory",
    deleteCategory: "/deleteCategory",
    createCategory: "/createCategory"
}

exports.courseMicroServiceAddress = "http://localhost:5000/api/course"