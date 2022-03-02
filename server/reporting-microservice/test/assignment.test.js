const app = require('../app');
const request = require('supertest');

describe("assignment",() => {
    describe("create", () => {
        test("Create attempt in case deadline is not specified", async () => {
            let response = await request(app).post("/api/assignment/createAssignment").send({
                assignmentDate: "2018-09-15",
                notes: "sdfsdf",
                enrollmentId: 15,
                managementId: 45,
                courseId: 3,
                managerId: 4,
                employeeId: 10
            })

            expect(response.statusCode).toBe(400);
        });

        test("Create attempt in case non-existing management record", async () => {
            let response = await request(app).post("/api/assignment/createAssignment").send({
                deadline: "2018-09-15",
                assignmentDate: "2018-09-15",
                notes: "sdfsdf",
                enrollmentId: 15,
                managementId: 45,
                courseId: 3,
                managerId: 4,
                employeeId: 10
            })

            expect(response.statusCode).toBe(200);
            expect(response.text).toBe('{"error":"Management does not exist"}');
        });

        test("Create attempt in case manager and employee is the same person", async () => {
            let response = await request(app).post("/api/assignment/createAssignment").send({
                deadline: "2018-09-15",
                assignmentDate: "2018-09-15",
                notes: "sdfsdf",
                enrollmentId: 15,
                managementId: 10,
                courseId: 3,
                managerId: 2,
                employeeId: 2
            })

            expect(response.statusCode).toBe(200);
            expect(response.text).toBe('{"error":"Employee cannot be same as manager"}');
        });

        test("Create attempt in case everything is okay", async () => {
            let response = await request(app).post("/api/assignment/createAssignment").send({
                deadline: "2018-09-15",
                assignmentDate: "2018-09-15",
                notes: "sdfsdf",
                enrollmentId: 149,
                managementId: 19,
                courseId: 13,
                managerId: 2,
                employeeId: 1
            })

            expect(response.statusCode).toBe(200);
        });
    });


    describe("get", () => {
        test("Get attempt in case id is not specified", async () => {
            let response = await request(app).get("/api/assignment/getAssignment").send({

            })

            expect(response.statusCode).toBe(400);
        });

        test("Get attempt in case desired record does not exist", async () => {
            let response = await request(app).get("/api/assignment/getAssignment").send({
                id: 9879
            })

            expect(response.statusCode).toBe(500);
            expect(response.text).toBe('{"err":"There is no record with given Id"}');
        });

        test("Get attempt in case everything is okay", async () => {
            let response = await request(app).get("/api/assignment/getAssignment").send({
                id: 14
            })
            expect(response.statusCode).toBe(200);
        });
    });

    describe("getAll", () => {
        test("Get all attempt in case everything is okay", async () => {
            let response = await request(app).post("/api/assignment/getAllAssignments").send({

            })

            expect(response.statusCode).toBe(200);
        });
    });

    describe("delete", () => {
        test("Delete attempt in case manager is unauthorized", async () => {
            let response = await request(app).post("/api/assignment/deleteAssignment").send({
                id: 14,
                managerId: 4
            })

            expect(response.statusCode).toBe(200);
            expect(response.text).toBe('{"error":"Manager has not any authority for this assignment"}');
        });

        test("Delete attempt in case desired record does not exist", async () => {
            let response = await request(app).post("/api/assignment/deleteAssignment").send({
                id: 1465,
                managerId: -1
            })

            expect(response.statusCode).toBe(500);
            expect(response.text).toBe('{"err":"There is no record with given Id"}');
        });

        test("Delete attempt in case id is not specified", async () => {
            let response = await request(app).post("/api/assignment/deleteAssignment").send({
                managerId: 1
            })

            expect(response.statusCode).toBe(400);
        });

        test("Delete attempt in case everything is okay", async () => {
            let response = await request(app).post("/api/assignment/deleteAssignment").send({
                id: 191,
                managerId: 1
            })

            expect(response.statusCode).toBe(200);
        });
    });

    describe("update", () => {
        test("Update attempt in case id is not specified", async () => {
            let response = await request(app).put("/api/assignment/updateAssignment").send({
                assignmentDate: "2018-09-15",
                deadline: "2018-09-15",
                notes: "sdfsdf",
                enrollmentId: 15,
                managementId: 10,
                managerId: -1,
            })

            expect(response.statusCode).toBe(400);
        });

        test("Update attempt in case desired record does not exist", async () => {
            let response = await request(app).put("/api/assignment/updateAssignment").send({
                id: 15656,
                assignmentDate: "2018-09-15",
                deadline: "2018-09-15",
                notes: "sdfsdf",
                enrollmentId: 15,
                managementId: 10,
                managerId: -1,
            })

            expect(response.statusCode).toBe(500);
            expect(response.text).toBe('{"err":"There is no record with given Id"}');
        });

        test("Update attempt in case manager is unauthorized", async () => {
            let response = await request(app).put("/api/assignment/updateAssignment").send({
                id: 14,
                assignmentDate: "2018-09-15",
                deadline: "2018-09-15",
                notes: "updated note",
                enrollmentId: 7,
                managementId: 10,
                managerId: 2,
            })

            expect(response.statusCode).toBe(500);
            expect(response.text).toBe('{"error":"Manager has not any authority for this assignment"}');
        });

        test("Update attempt in case everything is okay", async () => {
            let response = await request(app).put("/api/assignment/updateAssignment").send({
                id: 14,
                deadline: "2018-09-15",
                assignmentDate: "2018-09-15",
                notes: "new note",
                enrollmentId: 7,
                managementId: 10,
                managerId: 1,
            })

            expect(response.statusCode).toBe(200);
        });
    });
    describe("getWithEmployee", () => {
        test("Get with employee attempt in case employeeId is not specified", async () => {
            let response = await request(app).post("/api/assignment/getWithEmployee").send({

            })

            expect(response.statusCode).toBe(400);
        });

        test("Get with employee attempt in case everything is okay", async () => {
            let response = await request(app).post("/api/assignment/getWithEmployee").send({
                employeeId: 4
            })

            expect(response.statusCode).toBe(200);
        });
    });

    describe("getWithManager", () => {
        test("Get with manager attempt in case managerId is not specified", async () => {
            let response = await request(app).post("/api/assignment/getWithManager").send({

            })

            expect(response.statusCode).toBe(400);
        });

        test("Get all attempt in case everything is okay", async () => {
            let response = await request(app).post("/api/assignment/getWithManager").send({
                managerId: 1
            })

            expect(response.statusCode).toBe(200);
        });
    });

});