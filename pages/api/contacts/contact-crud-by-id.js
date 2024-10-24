// // pages/api/contacts/get-contact.js

import Contact from '../../../models/Contact';
import auth from '../../../middleware/auth';

export default async function handler(req, res) {
    // Apply the auth middleware to ensure authenticated requests
    await auth(req, res);

    const { id } = req.query;
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const contact = await Contact.findByPk(id);
                if (!contact) {
                    return res.status(404).json({ message: 'Contact not found' });
                }
                return res.status(200).json(contact);
            } catch (error) {
                console.error('Error fetching contact:', error);
                return res.status(500).json({ message: 'Error fetching contact' });
            }

        case 'PUT':
            const { name, email, phone, address, timezone } = req.body;

            try {
                const contact = await Contact.findByPk(id);
                if (!contact) {
                    return res.status(404).json({ message: 'Contact not found' });
                }

                await contact.update({ name, email, phone, address, timezone });
                return res.status(200).json(contact);  // Return updated contact
            } catch (error) {
                console.error('Error updating contact:', error);
                return res.status(500).json({ message: 'Error updating contact' });
            }

        case 'DELETE':
            try {
                const contact = await Contact.findByPk(id);
                if (!contact) {
                    return res.status(404).json({ message: 'Contact not found' });
                }

                await contact.destroy();
                return res.status(204).end();  // No content
            } catch (error) {
                console.error('Error deleting contact:', error);
                return res.status(500).json({ message: 'Error deleting contact' });
            }

        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            return res.status(405).end(`Method ${method} Not Allowed`);
    }
}
