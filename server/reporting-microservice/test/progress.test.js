const app = require('../app');
const request = require('supertest');

describe("Progress",() => {
    describe("create Progress", () => {
        test("Create Progress attempt in case videoId is not entered", async () => {
            let response = await request(app).post("/api/reporting/createProgress").send({
                watchedTime: 60,
                employeeId: 1
            })

            expect(response.statusCode).toBe(400);
        });

        test("Create Progress attempt in case everything is okay", async () => {
            let response = await request(app).post("/api/reporting/createProgress").send({
                watchedTime: 60,
                videoId: 1,
                employeeId: 1
            })

            expect(response.statusCode).toBe(200);
        });
    });

    describe("get Progress", () => {
        test("Get Progress attempt in case id is not entered", async () => {
            let response = await request(app).post("/api/reporting/getProgress").send({
            })

            expect(response.statusCode).toBe(400);
        });

        test("Get Progress attempt in case record does not exist", async () => {
            let response = await request(app).post("/api/reporting/getProgress").send({
                id: 654654
            })

            expect(response.statusCode).toBe(500);
        });

        test("Get Progress attempt in case everything is okay", async () => {
            let response = await request(app).post("/api/reporting/getProgress").send({
               id: 4
            })

            expect(response.statusCode).toBe(200);
        });
    });

    describe("get all Progresses", () => {

        test("Create Progress attempt in case everything is okay", async () => {
            let response = await request(app).post("/api/reporting/getAllProgress").send({
            })

            expect(response.statusCode).toBe(200);
        });
    });

    describe("Delete Progresses", () => {

        test("Delete Progress attempt in case id is not entered", async () => {
            let response = await request(app).post("/api/reporting/deleteProgress").send({
            })

            expect(response.statusCode).toBe(400);
        });

        test("Delete Progress attempt in case record does not exist", async () => {
            let response = await request(app).post("/api/reporting/deleteProgress").send({
                id: 65465
            })

            expect(response.statusCode).toBe(500);
        });

        test("Delete Progress attempt in case everything is okay", async () => {
            let response = await request(app).post("/api/reporting/deleteProgress").send({
                id: 25
            })

            expect(response.statusCode).toBe(200);
        });
    });

    describe("Update Progresses", () => {

        test("Update Progress attempt in case id is not entered", async () => {
            let response = await request(app).put("/api/reporting/updateProgress").send({
            })

            expect(response.statusCode).toBe(400);
        });

        test("Update Progress attempt in case record does not exist", async () => {
            let response = await request(app).put("/api/reporting/updateProgress").send({
                id: 65464
            })

            expect(response.statusCode).toBe(400);
        });

        test("Update Progress attempt in case everything is okay", async () => {
            let response = await request(app).put("/api/reporting/updateProgress").send({
                id: 4,
                watchedTime: 65,
                videoId: 1,
                employeeId: 1
            })

            expect(response.statusCode).toBe(200);
        });
    });

    describe("Get Progress with employee", () => {

        test("Get Progress with employee in case id is not entered", async () => {
            let response = await request(app).post("/api/reporting/getProgressWithEmployeeId").send({
            })

            expect(response.statusCode).toBe(400);
        });

        test("Get Progress with employee in case record does not exist", async () => {
            let response = await request(app).post("/api/reporting/getProgressWithEmployeeId").send({
                id: 654654
            })

            expect(response.statusCode).toBe(200);
        });

        test("Get Progress with employee in case everything is okay", async () => {
            let response = await request(app).post("/api/reporting/getProgressWithEmployeeId").send({
                id: 1
            })

            expect(response.statusCode).toBe(200);
        });
    });

    describe("Get Progress with employee and video", () => {

        test("Get Progress with employee and video attempt in case of invalid input", async () => {
            let response = await request(app).post("/api/reporting/getProgressWithEmployeeIdAndVideoID").send({
            })

            expect(response.statusCode).toBe(400);
        });

        test("Get Progress with employee and video attempt in case record does not exist", async () => {
            let response = await request(app).post("/api/reporting/getProgressWithEmployeeIdAndVideoID").send({
                id: 1654,
                videoId: 5654
            })

            expect(response.statusCode).toBe(500);
        });

        test("Get Progress with employee and video attempt in case everything is okay", async () => {
            let response = await request(app).post("/api/reporting/getProgressWithEmployeeIdAndVideoID").send({
                id: 1,
                videoId: 5
            })

            expect(response.statusCode).toBe(200);
        });
    });
});