exports.endpoints = {
    create: "/createProgress",
    get: "/getProgress",
    getAll: "/getAllProgress",
    delete: "/deleteProgress",
    update: "/updateProgress",
    getProgressWithEmployeeId: "/getProgressWithEmployeeId",
    getProgressWithEmployeeIdVideoId: "/getProgressWithEmployeeIdAndVideoID"
}

exports.reportingMicroServiceAddress = "http://localhost:5003/api/reporting"