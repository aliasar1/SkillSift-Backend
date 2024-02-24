const nodemailer = require('nodemailer');

module.exports = async (email, subject , text) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',

            port: 587,
            secure: false,
            
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: {
                name: 'SkillSift',
                address: process.env.USER,
            },
            to: email,
            subject: subject,
            text: text,
        };

        await transporter.sendMail(mailOptions);

        console.log('Email sent successfully');
        // console.log('Email User:', process.env.EMAIL_USER);
        // console.log('Email Pass:', process.env.EMAIL_PASS);
    } catch (error) {
        console.log('Email not sent:', error.message);
        // console.log('Email User:', process.env.EMAIL_USER);
        // console.log('Email Pass:', process.env.EMAIL_PASS);
    }
};