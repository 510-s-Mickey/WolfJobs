/**
 * Email service module for sending emails using Gmail and Nodemailer.
 * Requires the following environment variables to be set:
 * - `EMAIL_USER`: The email address to send emails from.
 * - `EMAIL_PASS`: The password or app-specific password for the email address.
 *
 * @module email_service
 */

const nodemailer = require("nodemailer");
require("dotenv").config();


console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS);

/**
 * Nodemailer transporter for sending emails via Gmail.
 * The transporter is configured with Gmail service and authentication credentials.
 */
const transporter = nodemailer.createTransport({
    service: "gmail", //
    auth: {
        user: process.env.EMAIL_USER, //
        pass: process.env.EMAIL_PASS, //
    },
});

/**
 * Sends an email using the configured transporter.
 *
 * @async
 * @function sendMail
 * @param {string} to - The recipient's email address.
 * @param {string} subject - The subject of the email.
 * @param {string} text - The plain text body of the email.
 * @returns {Promise<boolean>} Resolves to `true` if the email is sent successfully, otherwise `false`.
 *
 * @example
 * const { sendMail } = require('./email_service');
 * sendMail('recipient@example.com', 'Hello', 'This is a test email.')
 *     .then(success => console.log('Email sent:', success))
 *     .catch(err => console.error('Failed to send email:', err));
 */
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

// Export the sendMail function for external usage
module.exports = { sendMail };
