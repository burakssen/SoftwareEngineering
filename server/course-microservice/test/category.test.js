const app = require('../app');
const request = require('supertest');

describe("Category",() => {
    describe("Create", () => {
        test("should respond with a 200 status code", async () => {
            let response = await request(app).post("/api/course/createCategory").send({
                name: "new category"
            });

            expect(response.statusCode).toBe(200);
        });

        test("should respond with a 400 status code", async () => {
            let response = await request(app).post("/api/course/createCategory").send({

            });

            expect(response.statusCode).toBe(400);
        });
    });

    describe("Get", () => {
        test("should respond with a 200 status code", async () => {
            let response = await request(app).post("/api/course/getCategory").send({
                id: 1
            });

            expect(response.statusCode).toBe(200);
        });

        test("should respond with a 400 status code", async () => {
            let response = await request(app).post("/api/course/getCategory").send({
            });

            expect(response.statusCode).toBe(400);
        });

        test("should respond with a 500 status code", async () => {
            let response = await request(app).post("/api/course/getCategory").send({
                id: 99
            });

            expect(response.statusCode).toBe(500);
        });

    })

    describe("GetAll", () => {
        test("should respond with a 200 status code", async () => {
            let response = await request(app).get("/api/course/getAllCategories")

            expect(response.statusCode).toBe(200);
        });
    })

    describe("Update", () => {
        test("should respond with a 200 status code", async () => {
            let response = await request(app).put("/api/course/updateCategory").send({
                id: 4,
                name: "NEW NEW Name"
            });

            expect(response.statusCode).toBe(200);
        });

        test("should respond with a 200 status code", async () => {
            let response = await request(app).put("/api/course/updateCategory").send({
                name: "NEW NEW Name"
            });

            expect(response.statusCode).toBe(400);
        });

        test("should respond with a 400 status code", async () => {
            let response = await request(app).put("/api/course/updateCategory").send({
                id: 99,
                name: "NEW NEW Name"
            });

            expect(response.statusCode).toBe(500);
        });
    })

    describe("Delete", () => {
        test("should respond with a 200 status code", async () => {
            let response = await request(app).post("/api/course/deleteCategory").send({
                id: 4
            });

            console.log(response);

            expect(response.statusCode).toBe(200);
        });

        test("should respond with a 400 status code", async () => {
            let response = await request(app).post("/api/course/deleteCategory").send({

            });

            expect(response.statusCode).toBe(400);
        });

        test("should respond with a 500 status code", async () => {
            let response = await request(app).post("/api/course/deleteCategory").send({
                id: 99
            });

            expect(response.statusCode).toBe(500);
        });
    });
});