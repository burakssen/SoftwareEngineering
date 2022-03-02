const jobScheduler = require("node-schedule");
const axios = require('axios');

async function getAllAssignments(){
    let url = "http://localhost:5003/api/assignment/getAllAssignments";

    const allAssignment = await axios.post(url,
    {
    }, {withCredentials: true});
    return allAssignment.data.allAssignments;
}

async function getEnrollment(enrollmentId){
    let url = "http://localhost:8080/api/enrollment/get/id";
    const enrollment = await axios.post(url,
    {
        enrollmentId: enrollmentId
    }, {withCredentials: true});

    if(enrollment){
        return enrollment.data.result;
    }
    return null;
}

async function getEmployee(employeeId){
    let url = "http://localhost:8080/api/employees/get"
    const employee = await axios.post(url, {
        id: employeeId
    }, {withCredentials: true});
    return employee.data.employee;
}

async function sendNotification(receiver, subject, message){
    let url = "http://localhost:5005/api/notification/sendNotification";

    await axios.post(url, {
        receiver: receiver,
        subject: subject,
        message: message
    }, {withCredentials: true});
}

async function sendTrainingReminderNotification(userMail){
    let subject = "Deadline Reminder!";
    let message = "You have a training course which should be completed in 30 minutes!";
    await sendNotification(userMail, subject, message);
}

jobScheduler.scheduleJob('liveTrainingReminder', '* * * * *', async () => {
    const allAssignments = await getAllAssignments();

    let now = new Date();
    for (let i=0; i < allAssignments.length; i++) {
        let assignmentDeadline = new Date(allAssignments[i].deadline);
        let diff = assignmentDeadline.getTime() - now.getTime();
        let diffInMinutes = Math.round(diff/1000/60);

        let enrollment = await getEnrollment(allAssignments[i].enrollmentId);
        let employee = await getEmployee(enrollment.employeeId);

        if(diffInMinutes === 30){
            await sendTrainingReminderNotification(employee.email);
        }
    }
})