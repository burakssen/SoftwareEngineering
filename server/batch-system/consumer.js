const amqp = require("amqplib")
const axios = require("axios");

require('dotenv').config()

connect_rabbitmq()

async function connect_rabbitmq() {
    const connection = await amqp.connect(process.env.AMQP_URL)
    const channel = await connection.createChannel()
    await channel.assertQueue("enrollmentQueue")

    channel.consume("enrollmentQueue", async enrollment => {
        let enrollmentData = enrollment.content.toString()
        enrollmentData = enrollmentData.substring(1, enrollmentData.length - 1);
        const reqData = enrollmentData.split(" ");
        const courseId = parseInt(reqData[0])
        const employeeId = parseInt(reqData[1])
        const managerId = parseInt(reqData[2])
        const deadline = reqData[2]
        console.log(reqData)

        let res = await axios.post("http://localhost:5003/api/assignment/createAssignment", {
            deadline: deadline,
            courseId: courseId,
            employeeId: employeeId,
            managerId: managerId,
        }, {withCredentials: true});

        channel.ack(enrollment)
    })
}