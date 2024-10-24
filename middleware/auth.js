// middleware/auth.

const jwt = require('jsonwebtoken');

// Wrap the middleware to work with Next.js API routes
const auth = (handler) => {
    return async (req, res) => {
        const header = req.headers['authorization'];

        if (!header || !header.startsWith('Bearer ')) {
            return res.status(403).json({ message: 'Forbidden: No token provided or invalid format' });
        }

        const token = header.split(' ')[1];
        console.log(token)

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Forbidden: Invalid token' });
            }

            // Attach the decoded user to the request object
            req.user = user;

            // Call the next handler, now authenticated
            return handler(req, res);
        });
    };
};

module.exports = auth;
