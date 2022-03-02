exports.employee = {
    create: "/create",
    get: "/get",
    getAll: "/getAll",
    delete: "/delete",
    update: "/update",
    getWithUsername: "/get-with-username",
    getAllEmployeeRole: "/getAllEmployeeRole"
}

exports.management = {
    create: "/create",
    delete: "/delete",
    getWithManagerId: "/get/managerId",
    getWithEmployeeId: "/get/employeeId",
    getAll: "/getAll",
    get: "/get",
    getWithId: "/get/id"
}

exports.enrollment = {
    create: "/create",
    delete: "/delete",
    getWithCourseId: "/get/courseId",
    getWithEmployeeId: "/get/employeeId",
    getAll: "/getAll",
    get: "/get",
    getWithId: "/get/id"
}

exports.approvalRequest = {
    create: "/create",
    get: "/get",
    getWithManagerId: "/get/manager",
    getWithEmployeeId: "/get/employee",
    getAll: "/getAll",
    delete: "/delete",
    update: "/update",
}

exports.managementAddress = "http://localhost:8080/api/management"
exports.employeeAddress = "http://localhost:8080/api/employees"
exports.enrollmentAddress = "http://localhost:8080/api/enrollment"
exports.approvalRequestAddress = "http://localhost:8080/api/approvalRequest"

