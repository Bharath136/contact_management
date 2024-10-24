import Contact from '../../../models/Contact';
import auth from '../../../middleware/auth';

export default async function handler(req, res) {
    // Use the auth middleware to protect this route
    await auth(req, res);

    try {
        // Check the method before proceeding
        if (req.method === 'GET') {
            const contacts = await Contact.findAll();
            return res.status(200).json(contacts);
        } else {
            res.setHeader('Allow', ['GET']);
            return res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        // Return error response if authentication fails
        console.error('Authorization error:', error);
        return res.status(403).json({ message: 'Forbidden' });
    }
}
