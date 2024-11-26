const nodemailer = require("nodemailer");
require("dotenv").config();


console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS);


const transporter = nodemailer.createTransport({
    service: "gmail", //
    auth: {
        user: process.env.EMAIL_USER, //
        pass: process.env.EMAIL_PASS, //
    },
});

const sendMail = async (to, subject, text) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
    };

    console.log("[DEBUG] Sending email with options:", mailOptions);

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("[DEBUG] Email sent successfully:", info.response);
        return true;
    } catch (error) {
        console.error("[DEBUG] Error sending email:", error);
        return false;
    }
};


module.exports = { sendMail };
