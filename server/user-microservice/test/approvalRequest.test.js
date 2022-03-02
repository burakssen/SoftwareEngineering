const app = require('../app');
const request = require('supertest');
const {BAD_REQUEST, SUCCESS} = require("../common/constants/statusCodes");

describe("Approval Request",() => {
    describe("Given user data, creates approval request", () => {
        test("should respond with a 200 status code", async () => {
            const employee = await request(app).post("/api/employees/create").send({
                name: (Math.random() + 1).toString(36).substring(7),
                surname:  (Math.random() + 1).toString(36).substring(7),
                username: (Math.random() + 1).toString(36).substring(7),
                password: (Math.random() + 1).toString(36).substring(4),
                email: (Math.random() + 1).toString(36).substring(7)+"@gmaill.com",
                positionName: "employee",
                isManager: false
            })
            console.log(employee)

            const create = await request(app).post("/api/approvalRequest/create").send({
                courseId: 2,
                employeeId: employee.body.employee.id
            })
            console.log(create)
            expect(create.statusCode).toBe(SUCCESS);
        });
        test("send second approval request", async () => {
            const employee = await request(app).post("/api/employees/create").send({
                name: (Math.random() + 1).toString(36).substring(7),
                surname:  (Math.random() + 1).toString(36).substring(7),
                username: (Math.random() + 1).toString(36).substring(7),
                password: (Math.random() + 1).toString(36).substring(4),
                email: (Math.random() + 1).toString(36).substring(7)+"@gmaill.com",
                positionName: "employee",
                isManager: false
            })
            console.log(employee)

            let create = await request(app).post("/api/approvalRequest/create").send({
                courseId: 2,
                employeeId: employee.body.employee.id
            })
            create = await request(app).post("/api/approvalRequest/create").send({
                courseId: 2,
                employeeId: employee.body.employee.id
            })
            console.log(create)
            expect(create.statusCode).toBe(BAD_REQUEST);
        });
        test("send second approval request to enrolled course", async () => {
            const employee = await request(app).post("/api/employees/create").send({
                name: (Math.random() + 1).toString(36).substring(7),
                surname:  (Math.random() + 1).toString(36).substring(7),
                username: (Math.random() + 1).toString(36).substring(7),
                password: (Math.random() + 1).toString(36).substring(4),
                email: (Math.random() + 1).toString(36).substring(7)+"@gmaill.com",
                positionName: "employee",
                isManager: false
            })
            console.log(employee)

            let create = await request(app).post("/api/enrollment/create").send({
                courseId: 2,
                employeeId: employee.body.employee.id
            })
            create = await request(app).post("/api/approvalRequest/create").send({
                courseId: 2,
                employeeId: employee.body.employee.id
            })
            console.log(create)
            expect(create.statusCode).toBe(BAD_REQUEST);
        });
        test("send second approval request with manager", async () => {
            const employee = await request(app).post("/api/employees/create").send({
                name: (Math.random() + 1).toString(36).substring(7),
                surname:  (Math.random() + 1).toString(36).substring(7),
                username: (Math.random() + 1).toString(36).substring(7),
                password: (Math.random() + 1).toString(36).substring(4),
                email: (Math.random() + 1).toString(36).substring(7)+"@gmaill.com",
                positionName: "employee",
                isManager: false
            })
            const manager = await request(app).post("/api/employees/create").send({
                name: (Math.random() + 1).toString(36).substring(7),
                surname:  (Math.random() + 1).toString(36).substring(7),
                username: (Math.random() + 1).toString(36).substring(7),
                password: (Math.random() + 1).toString(36).substring(4),
                email: (Math.random() + 1).toString(36).substring(7)+"@gmaill.com",
                positionName: "employeee",
                isManager: true
            })
            const response = await request(app).post("/api/management/create").send({
                managerId: manager.body.employee.id,
                employeeId: employee.body.employee.id
            })
            create = await request(app).post("/api/approvalRequest/create").send({
                courseId: 2,
                employeeId: employee.body.employee.id
            })
            console.log(create)
            expect(create.statusCode).toBe(SUCCESS);
        });

        test("send second approval request with manager", async () => {
            const employee = await request(app).post("/api/employees/create").send({
                name: (Math.random() + 1).toString(36).substring(7),
                surname:  (Math.random() + 1).toString(36).substring(7),
                username: (Math.random() + 1).toString(36).substring(7),
                password: (Math.random() + 1).toString(36).substring(4),
                email: (Math.random() + 1).toString(36).substring(7)+"@gmaill.com",
                positionName: "employee",
                isManager: false
            })
            const manager = await request(app).post("/api/employees/create").send({
                name: (Math.random() + 1).toString(36).substring(7),
                surname:  (Math.random() + 1).toString(36).substring(7),
                username: (Math.random() + 1).toString(36).substring(7),
                password: (Math.random() + 1).toString(36).substring(4),
                email: (Math.random() + 1).toString(36).substring(7)+"@gmaill.com",
                positionName: "employeee",
                isManager: true
            })
            const response = await request(app).post("/api/management/create").send({
                managerId: manager.body.employee.id,
                employeeId: employee.body.employee.id
            })
            let create = await request(app).post("/api/approvalRequest/create").send({
                courseId: 2,
                employeeId: employee.body.employee.id
            })

            let get = await request(app).post("/api/approvalRequest/get/manager").send({
                managerId: manager.body.employee.id,
            })
            expect(get.statusCode).toBe(SUCCESS);
        });

        test("update approval request", async () => {
            const employee = await request(app).post("/api/employees/create").send({
                name: (Math.random() + 1).toString(36).substring(7),
                surname:  (Math.random() + 1).toString(36).substring(7),
                username: (Math.random() + 1).toString(36).substring(7),
                password: (Math.random() + 1).toString(36).substring(4),
                email: (Math.random() + 1).toString(36).substring(7)+"@gmaill.com",
                positionName: "employee",
                isManager: false
            })
            const manager = await request(app).post("/api/employees/create").send({
                name: (Math.random() + 1).toString(36).substring(7),
                surname:  (Math.random() + 1).toString(36).substring(7),
                username: (Math.random() + 1).toString(36).substring(7),
                password: (Math.random() + 1).toString(36).substring(4),
                email: (Math.random() + 1).toString(36).substring(7)+"@gmaill.com",
                positionName: "employeee",
                isManager: true
            })
            const response = await request(app).post("/api/management/create").send({
                managerId: manager.body.employee.id,
                employeeId: employee.body.employee.id
            })
            let create = await request(app).post("/api/approvalRequest/create").send({
                courseId: 2,
                employeeId: employee.body.employee.id
            })

            let update = await request(app).post("/api/approvalRequest/update").send({
                approvalRequestId: create.body.approvalRequest.id,
                managerId: manager.body.employee.id,
                decision : 1
            })
            expect(update.statusCode).toBe(SUCCESS);
        });

        test("update approval request second time", async () => {
            const employee = await request(app).post("/api/employees/create").send({
                name: (Math.random() + 1).toString(36).substring(7),
                surname:  (Math.random() + 1).toString(36).substring(7),
                username: (Math.random() + 1).toString(36).substring(7),
                password: (Math.random() + 1).toString(36).substring(4),
                email: (Math.random() + 1).toString(36).substring(7)+"@gmaill.com",
                positionName: "employee",
                isManager: false
            })
            const manager = await request(app).post("/api/employees/create").send({
                name: (Math.random() + 1).toString(36).substring(7),
                surname:  (Math.random() + 1).toString(36).substring(7),
                username: (Math.random() + 1).toString(36).substring(7),
                password: (Math.random() + 1).toString(36).substring(4),
                email: (Math.random() + 1).toString(36).substring(7)+"@gmaill.com",
                positionName: "employeee",
                isManager: true
            })
            const response = await request(app).post("/api/management/create").send({
                managerId: manager.body.employee.id,
                employeeId: employee.body.employee.id
            })
            let create = await request(app).post("/api/approvalRequest/create").send({
                courseId: 2,
                employeeId: employee.body.employee.id
            })

            let update = await request(app).post("/api/approvalRequest/update").send({
                approvalRequestId: create.body.approvalRequest.id,
                managerId: manager.body.employee.id,
                decision : 2
            })
            update = await request(app).post("/api/approvalRequest/update").send({
                approvalRequestId: create.body.approvalRequest.id,
                managerId: manager.body.employee.id,
                decision : 1
            })
            expect(update.statusCode).toBe(BAD_REQUEST);
        });





        test("Create approval request with error", async () => {
            let response = await request(app).post("/api/approvalRequest/create").send({
                managerId: -1,
                employeeId: -1
            })
            expect(response.statusCode).toBe(BAD_REQUEST);
        });
        test("Get all approval requests", async () => {
            let response = await request(app).get("/api/approvalRequest/getAll")
            expect(response.statusCode).toBe(SUCCESS);
        });
        test("Get approval request with employee id", async () => {
            const employee = await request(app).post("/api/employees/create").send({
                name: (Math.random() + 1).toString(36).substring(7),
                surname:  (Math.random() + 1).toString(36).substring(7),
                username: (Math.random() + 1).toString(36).substring(7),
                password: (Math.random() + 1).toString(36).substring(4),
                email: (Math.random() + 1).toString(36).substring(7)+"@gmaill.com",
                positionName: "employeee",
                isManager: false
            })
            let response = await request(app).post("/api/approvalRequest/get/employee").send({
                employeeId: employee.body.employee.id
            })
            expect(response.statusCode).toBe(SUCCESS);
        });
        test("Update approval request", async () => {
            let response = await request(app).post("/api/approvalRequest/update").send({
                approvalRequestId: 1,
                managerId: 1,
                decision : 1
            })
            expect(response.statusCode).toBe(SUCCESS);
        });
        test("Get approval request with approval request id", async () => {
            let response = await request(app).post("/api/approvalRequest/get/").send({
                approvalRequestId : 1
            })
            expect(response.statusCode).toBe(SUCCESS);
        });

        test("Delete approval request", async () => {
            let response = await request(app).post("/api/approvalRequest/delete").send({
                approvalRequestId : 1
            })
            expect(response.statusCode).toBe(SUCCESS);
        });
    });
});