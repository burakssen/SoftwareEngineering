const app = require('../app');
const request = require('supertest');

describe("Notification",() => {
    describe("send notification", () => {
        test("Send notification attempt in case receiver does not exist", async () => {
            let response = await request(app).post("/api/notification/sendNotification").send({
                subject: "New Training Assignment",
                message: "selam"
            })

            expect(response.statusCode).toBe(400);
        });

        test("Send notification attempt in case everything is okay", async () => {
            let response = await request(app).post("/api/notification/sendNotification").send({
                receiver: "trainingplatform.group36@gmail.com",
                subject: "New Training Assignment",
                message: "selam"
            })

            expect(response.statusCode).toBe(200);
        });
    });
});