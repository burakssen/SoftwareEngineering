const app = require('../app');
const request = require('supertest');

describe("Video Course Matching",() => {
    describe("Create", () => {
        test("should respond with a 200 status code", async () => {
            let response = await request(app).post("/api/course/createVideoCourseMatching").send({
                order: 1,
                videoId: 3,
                courseId: 1
            });

            expect(response.statusCode).toBe(200);
        });

        test("should respond with a 400 status code", async () => {
            let response = await request(app).post("/api/course/createVideoCourseMatching").send({

            });

            expect(response.statusCode).toBe(400);
        });

        test("should respond with a 500 status code", async () => {
            let response = await request(app).post("/api/course/createVideoCourseMatching").send({
                order: 1,
                courseId: 1
            });

            console.log(response);

            expect(response.statusCode).toBe(500);
        });
    });

    describe("Get", () => {
        test("should respond with a 200 status code", async () => {
            let response = await request(app).get("/api/course/getVideoCourseMatching").send({
                id: 3
            });

            console.log(response);

            expect(response.statusCode).toBe(200);
        });

        test("should respond with a 400 status code", async () => {
            let response = await request(app).get("/api/course/getVideoCourseMatching").send({

            });

            expect(response.statusCode).toBe(400);
        });

        test("should respond with a 500 status code", async () => {
            let response = await request(app).get("/api/course/getVideoCourseMatching").send({
                id: 99
            });

            expect(response.statusCode).toBe(500);
        });
    });

    describe("GetAll", () => {
        test("should respond with a 200 status code", async () => {
            let response = await request(app).get("/api/course/getAllVideoCourseMatchings").send({})

            expect(response.statusCode).toBe(200);
        });
    });


    describe("Get Videos By Course Id", () => {
        test("should respond with a 200 status code", async () => {
            let response = await request(app).post("/api/course/getAllVideosByCourseId").send({
                id: 2
            });

            console.log(response);

            expect(response.statusCode).toBe(200);
        });

        test("should respond with a 400 status code", async () => {
            let response = await request(app).post("/api/course/getAllVideosByCourseId").send({
            });

            expect(response.statusCode).toBe(400);
        });

        test("should respond with a 500 status code", async () => {
            let response = await request(app).post("/api/course/getAllVideosByCourseId").send({
                id: 99
            });

            console.log(response);

            expect(response.statusCode).toBe(500);
        });
    });

    describe("Get Courses By Video Id", () => {
        test("should respond with a 200 status code", async () => {
            let response = await request(app).post("/api/course/getAllCoursesByVideoId").send({
                id: 3
            });

            expect(response.statusCode).toBe(200);
        });

        test("should respond with a 400 status code", async () => {
            let response = await request(app).post("/api/course/getAllCoursesByVideoId").send({
            });

            expect(response.statusCode).toBe(400);
        });

        test("should respond with a 500 status code", async () => {
            let response = await request(app).post("/api/course/getAllCoursesByVideoId").send({
                id: 99
            });

            expect(response.statusCode).toBe(500);
        });
    });

    describe("Update", () => {
        test("should respond with a 200 status code", async () => {
            let response = await request(app).put("/api/course/updateVideoCourseMatching").send({
                id: 2,
                videoId: 1,
                courseId: 1
            });

            expect(response.statusCode).toBe(200);
        });

        test("should respond with a 400 status code", async () => {
            let response = await request(app).put("/api/course/updateVideoCourseMatching").send({
            });

            expect(response.statusCode).toBe(400);
        });

        test("should respond with a 500 status code", async () => {
            let response = await request(app).put("/api/course/updateVideoCourseMatching").send({
                id: 99
            });

            expect(response.statusCode).toBe(500);
        });
    });

    describe("Delete", () => {
        test("should respond with a 200 status code", async () => {
            let response = await request(app).post("/api/course/deleteVideoCourseMatching").send({
                id: 3
            });

            console.log(response);
            expect(response.statusCode).toBe(200);
        });

        test("should respond with a 400 status code", async () => {
            let response = await request(app).post("/api/course/deleteVideoCourseMatching").send({
            });

            expect(response.statusCode).toBe(400);
        });

        test("should respond with a 500 status code", async () => {
            let response = await request(app).post("/api/course/deleteVideoCourseMatching").send({
                id: 99
            });

            expect(response.statusCode).toBe(500);
        });
    });

});