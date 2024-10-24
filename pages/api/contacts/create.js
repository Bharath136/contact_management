import Contact from '../../../models/Contact';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { name, email, phone, address, timezone } = req.body;

            // Validate input fields
            if (!name || !email || !phone || !address || !timezone) {
                return res.status(400).json({ message: 'All fields are required' });
            }

            const contact = await Contact.create({ name, email, phone, address, timezone });
            return res.status(201).json(contact); // Ensure a response is sent
        } catch (error) {
            console.error('Error creating contact:', error);
            return res.status(500).json({ message: 'Error creating contact' }); // Ensure a response is sent
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`); // Ensure a response is sent
    }
}
