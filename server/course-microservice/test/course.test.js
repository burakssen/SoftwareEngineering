const app = require('../app');
const request = require('supertest');

describe("Course",() => {
    describe("Create course", () => {
        test("should respond with a 200 status code", async () => {
            let response = await request(app).post("/api/course/createCourse").send({
                name: "Programming with C++",
                description: "You can learn C++ by this course",
                coverPhotoPath: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/800px-ISO_C%2B%2B_Logo.svg.png",
                duration: "22:07",
                isLive: false,
                categoryId: 1
            });

            expect(response.statusCode).toBe(200);
        });

        test("should respond with a 400 status code", async () => {
            let response = await request(app).post("/api/course/createCourse").send({
                description: "You can learn C++ by this course",
                coverPhotoPath: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/800px-ISO_C%2B%2B_Logo.svg.png",
                duration: "22:07",
                isLive: false,
                categoryId: 1
            });

            expect(response.statusCode).toBe(400);
        });

        test("validation check", async () => {
            let response = await request(app).post("/api/course/createCourse").send({

            });

            expect(JSON.stringify(response.body)).toBe('{"errors":[{"msg":"Name is required","param":"name","location":"body"},{"msg":"Name should be between 2-32 characters","param":"name","location":"body"},{"msg":"Description is required","param":"description","location":"body"},{"msg":"duration attribute is required","param":"duration","location":"body"},{"msg":"isLive attribute is required","param":"isLive","location":"body"},{"msg":"categoryId is required","param":"categoryId","location":"body"}]}');
        });
    });

    describe("Delete a course", () => {
       test("Should respond with 200 status code", async () => {
           let response = await request(app).post("/api/course/deleteCourse").send({
                id: 3
           });

           console.log(response);

           expect(response.statusCode).toBe(200);
       });

        test("Should respond with 500 status code", async () => {
            let response = await request(app).post("/api/course/deleteCourse").send({
                id: 90
            });

            expect(response.statusCode).toBe(500);
        });
    });

    describe("Get All Course", () => {
       test("Should respond with a 200 status code", async () => {
           let response = await request(app).post("/api/course/getAllCourses").send({

           });

           expect(response.statusCode).toBe(200);
       });
    });

    describe("Get a course", () => {
        test("Should respond with a 200 status code", async () => {
            let response = await request(app).post("/api/course/getCourse").send({
                id: 2
            });

            expect(response.statusCode).toBe(200);
        });

        test("Should respond with a 500 status code", async () => {
            let response = await request(app).post("/api/course/getCourse").send({
                id: 90
            });

            expect(response.statusCode).toBe(500);
        });
    });

    describe("Update a course", () => {
       test("Should respond with a 200 status code", async () => {
           let response = await request(app).put("/api/course/updateCourse").send({
               id: 2,
               name: "Hello"
           });

           expect(response.statusCode).toBe(200);
       });

        test("Should respond with a 500 status code", async () => {
            let response = await request(app).put("/api/course/updateCourse").send({
                id: 90,
                name: "Hello"
            });

            expect(response.statusCode).toBe(500);
        });
    });

    describe("Get Enrolled Courses with EmployeeId", () => {
       test("Should respond with a 200 status code", async () => {
           let response = await request(app).post("/api/course/getAllCoursesOfEmployee").send({
               employeeId: 2
           });

           console.log(response);

           expect(response.statusCode).toBe(200);
       });
    });
});