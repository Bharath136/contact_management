// // pages/api/auth/register.js

import User from "../../../models/User";
import { validateRegistration } from "../../../utils/validate";
import { sendEmail } from "../../../utils/nodemailer"; // Import the sendEmail function
import crypto from 'crypto';
import bcrypt from 'bcryptjs'; // Import bcryptjs for password hashing

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, password } = req.body;

        const { error } = validateRegistration(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        try {
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ message: 'Email already exists' });
            }

            // Hash the password before saving it
            const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

            // Generate OTP
            const otp = crypto.randomInt(100000, 999999).toString();
            const otpExpiration = new Date();
            otpExpiration.setMinutes(otpExpiration.getMinutes() + 10); // OTP valid for 10 minutes

            // Create new user with hashed password and OTP
            const newUser = await User.create({
                name,
                email,
                password: hashedPassword,  // Store the hashed password
                otp,
                otpExpiration
            });

            // Send OTP email
            await sendEmail(email, 'Your OTP Code', `Your OTP is: ${otp}`);

            return res.status(201).json({ message: 'User created successfully. Check your email for the OTP.' });
        } catch (error) {
            console.error('Error creating user:', error);
            return res.status(500).json({ message: 'Error creating user' });
        }
    } else {
        return res.status(405).json({ message: 'Method not allowed' });
    }
}
