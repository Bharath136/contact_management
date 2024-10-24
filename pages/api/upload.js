// pages/api/upload.js

import multer from 'multer';
import xlsx from 'xlsx';
import fs from 'fs';
import Contact from '../../models/Contact';

const upload = multer({ dest: 'uploads/' });

export const config = {
    api: {
        bodyParser: false,
    },
};

const uploadHandler = upload.single('file');

export default async function handler(req, res) {
    if (req.method === 'POST') {
        uploadHandler(req, res, async (err) => {
            if (err) {
                console.error('Multer error:', err);
                return res.status(500).json({ message: 'File upload failed', error: err });
            }

            const results = [];
            try {
                // Read the uploaded Excel file
                const workbook = xlsx.readFile(req.file.path);
                const sheetName = workbook.SheetNames[0]; // Get the first sheet
                const sheet = workbook.Sheets[sheetName];
                const data = xlsx.utils.sheet_to_json(sheet); // Convert to JSON

                // Process each row and push to results
                data.forEach((row) => {
                    // Optionally, you can validate the row structure here
                    results.push(row);
                });

                // Bulk create contacts from the results
                await Contact.bulkCreate(results);
                fs.unlinkSync(req.file.path); // Remove temp file

                return res.status(200).json({ message: 'Contacts uploaded successfully', count: results.length });
            } catch (error) {
                console.error('Error processing Excel data:', error);
                return res.status(500).json({ message: 'Error processing Excel data', error });
            }
        });
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
