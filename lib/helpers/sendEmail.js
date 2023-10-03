const nodemailer = require('nodemailer');

class EmailSender {
    constructor(emailConfig) {
        this.transporter = nodemailer.createTransport(emailConfig);
    }

    /**
     * Send an email notification.
     * @param {string} to - The recipient's email address.
     * @param {string} subject - The subject of the email.
     * @param {string} text - The plain text content of the email.
     * @param {string} html - The HTML content of the email (optional).
     * @returns {Promise<void>} A promise that resolves when the email is sent.
     * @throws {EmailError} If an error occurs while sending the email.
     */
    async sendEmail(to, subject, text, html = null) {
        try {
            const mailOptions = {
                from: emailConfig.from, // Use the 'from' address from the configuration
                to,
                subject,
                text,
                html,
            };

            // Send the email
            await this.transporter.sendMail(mailOptions);
        } catch (error) {
            throw new EmailError(`Error sending email: ${error.message}`);
        }
    }
}

// Custom error type for email sending errors
class EmailError extends Error {
    constructor(message) {
        super(message);
        this.name = 'EmailError';
    }
}

module.exports = EmailSender;