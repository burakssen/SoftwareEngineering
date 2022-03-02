const app = require('../app');
const request = require('supertest');

describe("Link",() => {
    describe("Create", () => {
        test("should respond with a 200 status code", async () => {
            let response = await request(app).post("/api/course/createLink").send({
                platform: "Zofdgdghom",
                meetingLink: "hgdfghdfhgdfhg",
                meetingTime: new Date(),
                capacity: 10002,
                courseId: 2
            });

            expect(response.statusCode).toBe(200);
        });

        test("should respond with a 400 status code", async () => {
            let response = await request(app).post("/api/course/createLink").send({
                platform: "Zofdgdghom",
                meetingLink: "hgdfghdfhgdfhg",
                meetingTime: new Date(),
                capacity: 10002
            });

            expect(response.statusCode).toBe(400);
        });
    })

    describe("Get", () => {
        test("should respond with a 200 status code", async () => {
            let response = await request(app).get("/api/course/getLink").send({
                id: 1
            });

            expect(response.statusCode).toBe(200);
        });

        test("should respond with a 400 status code", async () => {
            let response = await request(app).get("/api/course/getLink").send({

            });

            expect(response.statusCode).toBe(400);
        });

        test("should respond with a 500 status code", async () => {
            let response = await request(app).get("/api/course/getLink").send({
                id: 99
            });

            expect(response.statusCode).toBe(500);
        });
    });

    describe("GetAll", () => {
        test("should respond with a 200 status code", async () => {
            let response = await request(app).get("/api/course/getAllLinks")
            expect(response.statusCode).toBe(200);
        });
    })

    describe("Update", () => {
        test("should respond with a 200 status code", async () => {
            let response = await request(app).put("/api/course/updateLink").send({
                id: 1,
                platform: "Google"
            });


            expect(response.statusCode).toBe(200);
        });

        test("should respond with a 500 status code", async () => {
            let response = await request(app).put("/api/course/updateLink").send({
                id: 99,
                platform: "Google"
            });

            expect(response.statusCode).toBe(500);
        });

        test("should respond with a 400 status code", async () => {
            let response = await request(app).put("/api/course/updateLink").send({
                platform: "Google"
            });

            expect(response.statusCode).toBe(400);
        });
    })

    describe("Delete", () => {
        test("should respond with a 200 status code", async () => {
            let response = await request(app).delete("/api/course/deleteLink").send({
                id: 1
            });

            expect(response.statusCode).toBe(200);
        });


        test("should respond with a 500 status code", async () => {
            let response = await request(app).delete("/api/course/deleteLink").send({
                id: 99
            });

            expect(response.statusCode).toBe(500);
        });

        test("should respond with a 400 status code", async () => {
            let response = await request(app).delete("/api/course/deleteLink").send({
            });

            expect(response.statusCode).toBe(400);
        });
    });


});