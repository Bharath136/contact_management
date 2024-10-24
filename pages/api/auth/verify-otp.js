// pages/api/auth/verify-otp.js

import User from "../../../models/User";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, otp } = req.body;

        try {
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Check if OTP matches and hasn't expired
            if (user.otp === otp && new Date() < user.otpExpiration) {
                // OTP is valid, you can mark user as verified or proceed with the next steps
                user.otp = null; // Clear OTP
                user.otpExpiration = null; // Clear OTP expiration
                await user.save();
                return res.status(200).json({ message: 'OTP verified successfully' });
            } else {
                return res.status(400).json({ message: 'Invalid or expired OTP' });
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
            return res.status(500).json({ message: 'Error verifying OTP' });
        }
    } else {
        return res.status(405).json({ message: 'Method not allowed' });
    }
}
