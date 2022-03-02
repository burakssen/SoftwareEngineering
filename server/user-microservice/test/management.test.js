const app = require('../app');
const request = require('supertest');
const {BAD_REQUEST, SUCCESS} = require("../common/constants/statusCodes");

describe("Management",() => {
    describe("Given user data, creates management", () => {
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
            const manager = await request(app).post("/api/employees/create").send({
                name: (Math.random() + 1).toString(36).substring(7),
                surname:  (Math.random() + 1).toString(36).substring(7),
                username: (Math.random() + 1).toString(36).substring(7),
                password: (Math.random() + 1).toString(36).substring(4),
                email: (Math.random() + 1).toString(36).substring(7)+"@gmaill.com",
                positionName: "employeee",
                isManager: true
            })
            console.log(manager)
            const response = await request(app).post("/api/management/create").send({
                managerId: manager.body.employee.id,
                employeeId: employee.body.employee.id
            })

            const _delete = await request(app).post("/api/management/delete").send({
                managementId: response.body.management.id,
            })

            response.body.management.id

            expect(response.statusCode).toBe(SUCCESS);
        });

        test("create management without manager", async () => {
            const employee = await request(app).post("/api/employees/create").send({
                name: (Math.random() + 1).toString(36).substring(7),
                surname:  (Math.random() + 1).toString(36).substring(7),
                username: (Math.random() + 1).toString(36).substring(7),
                password: (Math.random() + 1).toString(36).substring(4),
                email: (Math.random() + 1).toString(36).substring(7)+"@gmaill.com",
                positionName: "employeee",
                isManager: false
            })
            const manager = await request(app).post("/api/employees/create").send({
                name: (Math.random() + 1).toString(36).substring(7),
                surname:  (Math.random() + 1).toString(36).substring(7),
                username: (Math.random() + 1).toString(36).substring(7),
                password: (Math.random() + 1).toString(36).substring(4),
                email: (Math.random() + 1).toString(36).substring(7)+"@gmaill.com",
                positionName: "employeee",
                isManager: false
            })
            const response = await request(app).post("/api/management/create").send({
                managerId: manager.body.employee.id,
                employeeId: employee.body.employee.id
            })


            expect(response.statusCode).toBe(BAD_REQUEST);
        });
        test("create management without manager", async () => {
            const employee = await request(app).post("/api/employees/create").send({
                name: (Math.random() + 1).toString(36).substring(7),
                surname:  (Math.random() + 1).toString(36).substring(7),
                username: (Math.random() + 1).toString(36).substring(7),
                password: (Math.random() + 1).toString(36).substring(4),
                email: (Math.random() + 1).toString(36).substring(7)+"@gmaill.com",
                positionName: "employeee",
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
            let response = await request(app).post("/api/management/create").send({
                managerId: manager.body.employee.id,
                employeeId: employee.body.employee.id
            })
            response = await request(app).post("/api/management/create").send({
                managerId: manager.body.employee.id,
                employeeId: employee.body.employee.id
            })

            expect(response.statusCode).toBe(BAD_REQUEST);
        });
        test("Get management", async () => {
            const employee = await request(app).post("/api/employees/create").send({
                name: (Math.random() + 1).toString(36).substring(7),
                surname:  (Math.random() + 1).toString(36).substring(7),
                username: (Math.random() + 1).toString(36).substring(7),
                password: (Math.random() + 1).toString(36).substring(4),
                email: (Math.random() + 1).toString(36).substring(7)+"@gmaill.com",
                positionName: "employeee",
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
             const create= await request(app).post("/api/management/create").send({
                managerId: manager.body.employee.id,
                employeeId: employee.body.employee.id
            })
            const response = await request(app).post("/api/management/get").send({
                managerId: manager.body.employee.id,
                employeeId: employee.body.employee.id
            })

            const _delete = await request(app).post("/api/management/delete").send({
                managementId: create.body.management.id,
            })
            expect(response.statusCode).toBe(SUCCESS);
        });
        test("Create management with error", async () => {
            response = await request(app).post("/api/management/create").send({
                managerId: -1,
                employeeId: 3
            })
            expect(response.statusCode).toBe(BAD_REQUEST);
        });
        test("Get all management", async () => {
            response = await request(app).get("/api/management/getAll")
            expect(response.statusCode).toBe(SUCCESS);
        });
        test("Get management with employee id", async () => {
            const employee = await request(app).post("/api/employees/create").send({
                name: (Math.random() + 1).toString(36).substring(7),
                surname:  (Math.random() + 1).toString(36).substring(7),
                username: (Math.random() + 1).toString(36).substring(7),
                password: (Math.random() + 1).toString(36).substring(4),
                email: (Math.random() + 1).toString(36).substring(7)+"@gmaill.com",
                positionName: "employeee",
                isManager: false
            })
            response = await request(app).post("/api/management/get/employeeId").send({
                employeeId: employee.body.employee.id
            })
            expect(response.statusCode).toBe(SUCCESS);
        });
        test("Get management with manager id", async () => {
            const manager = await request(app).post("/api/employees/create").send({
                name: (Math.random() + 1).toString(36).substring(7),
                surname:  (Math.random() + 1).toString(36).substring(7),
                username: (Math.random() + 1).toString(36).substring(7),
                password: (Math.random() + 1).toString(36).substring(4),
                email: (Math.random() + 1).toString(36).substring(7)+"@gmaill.com",
                positionName: "employeee",
                isManager: true
            })
            response = await request(app).post("/api/management/get/managerId").send({
                managerId: manager.body.employee.id
            })
            expect(response.statusCode).toBe(SUCCESS);
        });
        test("Create management with error", async () => {
            response = await request(app).post("/api/management/create").send({
                managerId: -1,
                employeeId: -1
            })
            expect(response.statusCode).toBe(BAD_REQUEST);
        });
        test("Get management with id", async () => {
            response = await request(app).post("/api/management/get/id").send({
                managementId: 1
            })
            expect(response.statusCode).toBe(SUCCESS);
        });
    });
});