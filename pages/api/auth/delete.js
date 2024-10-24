// pages/api/auth/delete.js

import User from '../../../models/User';

export default async function handler(req, res) {
    if (req.method === 'DELETE') {
        const { id } = req.query; // Extract user ID from query parameters

        // Validate the ID
        if (!id) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        try {
            // Soft delete the user (mark as deleted)
            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // If you want to implement soft delete, you can set an 'isDeleted' flag
            await user.update({ isDeleted: true }); // Assuming you have an 'isDeleted' field
            // Alternatively, if you want to delete permanently, use:
            // await user.destroy();

            return res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            console.error('Error deleting user:', error);
            return res.status(500).json({ message: 'Error deleting user' });
        }
    } else {
        return res.status(405).json({ message: 'Method not allowed' });
    }
}
