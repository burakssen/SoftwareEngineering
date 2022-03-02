const app = require('../app');
const request = require('supertest');
const {BAD_REQUEST, SUCCESS} = require("../common/constants/statusCodes");

describe("Employee",() => {
    describe("Given user data, creates user", () => {
        test("should respond with a 200 status code", async () => {
            let response = await request(app).post("/api/employees/create").send({
                name: (Math.random() + 1).toString(36).substring(7),
                surname: (Math.random() + 1).toString(36).substring(7),
                username: (Math.random() + 1).toString(36).substring(7),
                password: "zufirzuafirdem1",
                email: (Math.random() + 1).toString(36).substring(7)+"@gmaill.com",
                positionName: "employeee",
                isManager: false
            })
            expect(response.statusCode).toBe(SUCCESS);
        });
    });

    describe("When some data is missing", () => {
        test("When name is missing should respond with a 400 status code", async () => {
            let response = await request(app).post("/api/employees/create").send({
                surname: "Demir",
                username: "zuafir",
                password: "zuafirzuafir",
                email: "zuafir@gmaill.com",
                positionName: "employee",
                isManager: false
            })
            expect(response.statusCode).toBe(BAD_REQUEST);
        });

        test("When surname is missing should respond with a 400 status code", async () => {
            let response = await request(app).post("/api/employees/create").send({
                name: "Zuafir",
                username: "zuafir",
                password: "zuafirzuafir",
                email: "zuafir@gmaill.com",
                positionName: "employee",
                isManager: false
            })
            expect(response.statusCode).toBe(BAD_REQUEST);
        });

        test("When username is missing should respond with a 400 status code", async () => {
            let response = await request(app).post("/api/employees/create").send({
                name: "Zuafir",
                surname: "Demir",
                password: "zuafirzuafir",
                email: "zuafir@gmaill.com",
                positionName: "employee",
                isManager: false
            })
            expect(response.statusCode).toBe(BAD_REQUEST);
        });

        test("When password is missing should respond with a 400 status code", async () => {
            let response = await request(app).post("/api/employees/create").send({
                name: "Zuafir",
                surname: "Demir",
                username : "Zuafir",
                email: "zuafir@gmaill.com",
                positionName: "employee",
                isManager: false
            })
            expect(response.statusCode).toBe(BAD_REQUEST);
        });

        test("When email is missing should respond with a 400 status code", async () => {
            let response = await request(app).post("/api/employees/create").send({
                name: "Zuafir",
                surname: "Demir",
                username : "Zuafir",
                password: "ZuafirZuafir",
                positionName: "employee",
                isManager: false
            })
            expect(response.statusCode).toBe(BAD_REQUEST);
        });

        test("When position name is missing should respond with a 400 status code", async () => {
            let response = await request(app).post("/api/employees/create").send({
                name: "Zuafir",
                surname: "Demir",
                username : "Zuafir",
                password: "ZuafirZuafir",
                email: "zuafir@gmaill.com",
                isManager: false
            })
            expect(response.statusCode).toBe(BAD_REQUEST);
        });

        test("When is manager is missing should respond with a 400 status code", async () => {
            let response = await request(app).post("/api/employees/create").send({
                name: "Zuafir",
                surname: "Demir",
                username : "Zuafir",
                password: "ZuafirZuafir",
                email: "zuafir@gmaill.com",
                positionName: "employee"
            })
            expect(response.statusCode).toBe(BAD_REQUEST);
        });
    });

    describe("When some data is unique", () => {
       test("When inserting new data non unique data on username should respond with a 400 status code", async () => {
           let response = await request(app).post("/api/employees/create").send({
               name: "dfhigdfhg",
               surname: "jfgdfg",
               username: "zuafir",
               password: "dfhgdfhg",
               email: "löşdfg@gmail.com",
               positionName: "manager",
               isManager: false
           });
           expect(response.statusCode).toBe(BAD_REQUEST);
       });

        test("When inserting new data non unique data on email should respond with a 400 status code", async () => {
            let response = await request(app).post("/api/employees/create").send({
                name: "dfhigdfhg",
                surname: "jfgdfg",
                username: "afddfg",
                password: "dfhgdfhg",
                email: "zuafir@gmaill.com",
                positionName: "manager",
                isManager: false
            });
            expect(response.statusCode).toBe(BAD_REQUEST);
        });
        test("Get employee with non-exist id", async () => {
            let response = await request(app).post("/api/employees/get").send({
                id: 75454,
            });
            expect(response.statusCode).toBe(BAD_REQUEST);
        });
        test("Get all employees", async () => {
            let response = await request(app).post("/api/employees/getAll");
            expect(response.statusCode).toBe(SUCCESS);
        });
        test("Get all employees with role", async () => {
            let response = await request(app).post("/api/employees/getAllEmployeeRole");
            expect(response.statusCode).toBe(SUCCESS);
        });
        test("Delete employee", async () => {
            const employee = await request(app).post("/api/employees/create").send({
                name: (Math.random() + 1).toString(36).substring(7),
                surname:  (Math.random() + 1).toString(36).substring(7),
                username: (Math.random() + 1).toString(36).substring(7),
                password: (Math.random() + 1).toString(36).substring(4),
                email: (Math.random() + 1).toString(36).substring(7)+"@gmaill.com",
                positionName: "employeee",
                isManager: false
            })
            let response = await request(app).post("/api/employees/delete").send({
                id: employee.body.employee.id,
            });
            expect(response.statusCode).toBe(SUCCESS);
        });
        test("Update employee with non-exist id", async () => {
            let response = await request(app).put("/api/employees/update").send({
                id: 1340,
                name: "dfhigdfhg",
                surname: "jfgdfg",
                username: "zuafir",
                password: "dfhgdfhg",
                email: "löşdfg@gmail.com",
                positionName: "manager",
                isManager: false
            });
            expect(response.statusCode).toBe(BAD_REQUEST);
        });
        test("Update employee", async () => {
            const employee = await request(app).post("/api/employees/create").send({
                name: (Math.random() + 1).toString(36).substring(7),
                surname:  (Math.random() + 1).toString(36).substring(7),
                username: (Math.random() + 1).toString(36).substring(7),
                password: "basabrbbsbdadasde",
                email: (Math.random() + 1).toString(36).substring(7)+"@gmaill.com",
                positionName: "employeee",
                isManager: false
            })
            let response = await request(app).put("/api/employees/update").send({
                id: employee.body.employee.id,
                name: (Math.random() + 1).toString(36).substring(7),
                surname: (Math.random() + 1).toString(36).substring(7),
                username: (Math.random() + 1).toString(36).substring(7),
                password: "basabrbbsbdadasde",
                email: (Math.random() + 1).toString(36).substring(7)+"@gmail.com",
                positionName: "manager",
                isManager: true
            });
            let deleteEmp = await request(app).post("/api/employees/delete").send({
                id: employee.body.employee.id,
            });
            expect(response.statusCode).toBe(SUCCESS);
        });
        test("Get employee with username", async () => {
            const employee = await request(app).post("/api/employees/create").send({
                name: (Math.random() + 1).toString(36).substring(7),
                surname:  (Math.random() + 1).toString(36).substring(7),
                username: "basarbasarbara",
                password: "basarbasarbara",
                email: (Math.random() + 1).toString(36).substring(7)+"@gmaill.com",
                positionName: "employeee",
                isManager: false
            })
            let response = await request(app).post("/api/employees/get-with-username").send({
                username: "basarbasarbara",
            });

            let deleteEmp = await request(app).post("/api/employees/delete").send({
                id: employee.body.employee.id,
            });
            expect(response.statusCode).toBe(SUCCESS);
        });
    });
});
