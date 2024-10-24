import User from "../../../models/User";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            // Fetch all users from the database
            const users = await User.findAll();

            // Return the users in the response
            return res.status(200).json(users);
        } catch (error) {
            console.error('Error fetching users:', error);
            return res.status(500).json({ message: 'Error fetching users' });
        }
    } else {
        return res.status(405).json({ message: 'Method not allowed' });
    }
}
