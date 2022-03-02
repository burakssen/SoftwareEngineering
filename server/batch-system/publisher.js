const amqp = require("amqplib")
const cors = require('cors');

require('dotenv').config()
const bodyParser = require('body-parser');


const express = require('express')
const app = express()
const port = 9000

app.use(bodyParser.json());
app.use(cors({credentials: true, origin: 'http://127.0.0.1:3000'}));

app.listen(port, () => {
    console.log(port);
})

app.post('/', async (req, res) => {
    await sendToRabbitMQ(req.body);
    res.sendStatus(200);
})

async function sendToRabbitMQ(requestData) {
    const connection = await amqp.connect(process.env.AMQP_URL)
    const channel = await connection.createChannel()
    await channel.assertQueue("enrollmentQueue")

    for (let i = 0; i < requestData.employees.length; i++) {
        let message = requestData.courseId + " " + requestData.employees[i] + " " + requestData.managerId + " " + requestData.deadline;
        console.log(message);
        channel.sendToQueue("enrollmentQueue", Buffer.from(JSON.stringify(message)))
    }
}