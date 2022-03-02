const app = require('../app');
const request = require('supertest');
const path = require("path");

describe("/POST  /video",() => {
    describe("Given video data", () => {
        test("If all data is given should respond with a 200 status code", async () => {

            let response = await request(app).post("/api/video/register")
                .field("title", "test-video")
                .field("description", "test-description")
                .field("duration", 1000)
                .field("videoPath", "server/streaming-microservice/videos/intro.mp4")
                .field("coverPhoto", "test-cover-photo")
                .field("files", "videoFile")
                .attach("videoFile", path.resolve(__dirname, "../videos/intro.mp4"))

            expect(response.statusCode).toBe(200);
        });

        test("If title is not given should respond with a 400 status code", async () => {

            let response = await request(app).post("/api/video/register")
                .field("description", "test-description")
                .field("duration", 1000)
                .field("videoPath", "server/streaming-microservice/videos/intro.mp4")
                .field("coverPhoto", "test-cover-photo")
                .field("files", "videoFile")
                .attach("videoFile", path.resolve(__dirname, "../videos/intro.mp4"))

            expect(response.statusCode).toBe(400);
        });

        test("If file is not given should respond with 400", async () => {
            let response = await request(app).post("/api/video/register")
                .field("title", "test-video")
                .field("description", "test-description")
                .field("duration", 1000)
                .field("videoPath", "server/streaming-microservice/videos/intro.mp4")
                .field("coverPhoto", "test-cover-photo")

            expect(response.statusCode).toBe(400);
        });

        test("If file path is exist but file does not exists should respond with 500", async () => {
            let response = await request(app).post("/api/video/register")
                .field("title", "test-video")
                .field("description", "test-description")
                .field("duration", 1000)
                .field("videoPath", "fdşkgmdşf")
                .field("coverPhoto", "test-cover-photo")
                .attach("files", path.resolve(__dirname, "../videos/intro.mp4"))

            expect(response.statusCode).toBe(500);
        })


    });

    describe("Get Videos Update Videos", () => {
        test("get a video",async () => {
            let response = await request(app).post("/api/video/get").send({
                id: 2
            });

            expect(response.statusCode).toBe(200);
        })

        test("if id is not given get a video",async () => {
            let response = await request(app).post("/api/video/get").send({

            });

            expect(response.statusCode).toBe(400);
        })

        test("Get All Videos",async () => {
            let response = await request(app).post("/api/video/getAll").send({})

            expect(response.statusCode).toBe(200);
        })

        test("Delete a video",async () => {
            let response = await request(app).post("/api/video/erase").send({
                id: 1
            });

            expect(response.statusCode).toBe(200);
        });

        test("if id is not given Delete a video",async () => {
            let response = await request(app).post("/api/video/erase").send({

            });

            expect(response.statusCode).toBe(400);
        })

        test("Update a Video",async () => {
            let response = await request(app).put("/api/video/update").send({
                id: 2,
                title: "Denemee222"
            });

            expect(response.statusCode).toBe(200);
        })

        test("if id is not given Update a Video",async () => {
            let response = await request(app).put("/api/video/update").send({
                title: "Denemee222"
            });

            expect(response.statusCode).toBe(400);
        })
    });
});