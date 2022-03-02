const app = require('../app');
const request = require('supertest');
const {BAD_REQUEST, SUCCESS} = require("../common/constants/statusCodes");

describe("Enrollment",() => {
    describe("Given user data, creates enrollment", () => {
        test("should respond with a 200 status code", async () => {
            const employee = await request(app).post("/api/employees/create").send({
                name: (Math.random() + 1).toString(36).substring(7),
                surname:  (Math.random() + 1).toString(36).substring(7),
                username: (Math.random() + 1).toString(36).substring(7),
                password: (Math.random() + 1).toString(36).substring(4),
                email: (Math.random() + 1).toString(36).substring(7)+"@gmaill.com",
                positionName: "employeee",
                isManager: false
            })

            const create = await request(app).post("/api/enrollment/create").send({
                courseId: 1,
                employeeId: employee.body.employee.id
            })

            expect(create.statusCode).toBe(SUCCESS);
        });
        test("send second time enrollment request", async () => {
            const employee = await request(app).post("/api/employees/create").send({
                name: (Math.random() + 1).toString(36).substring(7),
                surname:  (Math.random() + 1).toString(36).substring(7),
                username: (Math.random() + 1).toString(36).substring(7),
                password: (Math.random() + 1).toString(36).substring(4),
                email: (Math.random() + 1).toString(36).substring(7)+"@gmaill.com",
                positionName: "employeee",
                isManager: false
            })

            let create = await request(app).post("/api/enrollment/create").send({
                courseId: 1,
                employeeId: employee.body.employee.id
            })

            create = await request(app).post("/api/enrollment/create").send({
                courseId: 1,
                employeeId: employee.body.employee.id
            })

            expect(create.statusCode).toBe(BAD_REQUEST);
        });
        test("Get enrollment", async () => {
            const employee = await request(app).post("/api/employees/create").send({
                name: (Math.random() + 1).toString(36).substring(7),
                surname:  (Math.random() + 1).toString(36).substring(7),
                username: (Math.random() + 1).toString(36).substring(7),
                password: (Math.random() + 1).toString(36).substring(4),
                email: (Math.random() + 1).toString(36).substring(7)+"@gmaill.com",
                positionName: "employeee",
                isManager: false
            })

            const create = await request(app).post("/api/enrollment/create").send({
                courseId: 1,
                employeeId: employee.body.employee.id
            })

            const response = await request(app).post("/api/enrollment/get").send({
                courseId: 1,
                employeeId: employee.body.employee.id
            })

            expect(response.statusCode).toBe(SUCCESS);
        });
        test("Create enrollment with error", async () => {
            response = await request(app).post("/api/enrollment/create").send({
                managerId: -1,
                employeeId: -1
            })
            expect(response.statusCode).toBe(BAD_REQUEST);
        });
        test("Get all management", async () => {
            response = await request(app).get("/api/enrollment/getAll")
            expect(response.statusCode).toBe(SUCCESS);
        });
        test("Get enrollment with employee id", async () => {
            const employee = await request(app).post("/api/employees/create").send({
                name: (Math.random() + 1).toString(36).substring(7),
                surname:  (Math.random() + 1).toString(36).substring(7),
                username: (Math.random() + 1).toString(36).substring(7),
                password: (Math.random() + 1).toString(36).substring(4),
                email: (Math.random() + 1).toString(36).substring(7)+"@gmaill.com",
                positionName: "employeee",
                isManager: false
            })
            let response = await request(app).post("/api/enrollment/get/employeeId").send({
                employeeId: employee.body.employee.id
            })
            expect(response.statusCode).toBe(SUCCESS);
        });
        test("Get enrollment with course id", async () => {
            let response = await request(app).post("/api/enrollment/get/courseId").send({
                courseId: 1
            })
            expect(response.statusCode).toBe(SUCCESS);
        });
        test("Get enrollment with course id and employee id", async () => {
            let response = await request(app).post("/api/enrollment/get/courseEmployee").send({
                courseIds: [],
                employeeId: 2
            })
            expect(response.statusCode).toBe(SUCCESS);
        });
        test("Get enrollment with enrollment id", async () => {
            let response = await request(app).post("/api/enrollment/get/id").send({
                enrollmentId : 1
            })
            expect(response.statusCode).toBe(SUCCESS);
        });

        test("Delete enrollment", async () => {
            let response = await request(app).post("/api/enrollment/delete").send({
                enrollmentId : 1
            })
            expect(response.statusCode).toBe(SUCCESS);
        });
    });
});