// // utils/nodemailer.js

// import nodemailer from 'nodemailer';

// export const sendVerificationEmail = async (email, token) => {
//     const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: process.env.SMTP_USER,
//             pass: process.env.SMTP_PASS,
//         },
//     });

//     const url = `http://localhost:${process.env.PORT}/auth/verify/${token}`;
//     await transporter.sendMail({
//         to: email,
//         subject: 'Email Verification',
//         html: `<h1>Verify your email</h1><p>Please click <a href="${url}">here</a> to verify your email.</p>`,
//     });
// };


// utils/nodemailer.js

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendEmail = async (to, subject, text) => {
    await transporter.sendMail({
        from: process.env.EMAIL_FROM, // Sender address
        to, // List of recipients
        subject,
        text,
    });
};
