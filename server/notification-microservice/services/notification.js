const asyncHandler = require("../middleware/async");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const {SUCCESS} = require("../common/constants/statusCodes");
dotenv.config();

exports.sendNotificationService = asyncHandler(async (req, res) => {

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "trainingplatform.group36@gmail.com",
            pass: "Safak36!"
        }
    });

    // send mail with defined transport object
    const mailOptions = {
        from: 'Training Platform',
        to: req.body.receiver,
        subject: req.body.subject,
        text: req.body.message
    };

    await transporter.sendMail(mailOptions, function(error, info){
        if(error){
            res.status(SUCCESS).json({ err : error});
        }else{
            console.log("Mail is sent");
            res.status(SUCCESS).json({ newNotification : info});
        }
    });
});