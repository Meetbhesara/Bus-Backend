const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  try {
    // Get token from Authorization header ("Bearer <token>")
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization header missing or malformed' });
    }

    const token = authHeader.split(' ')[1]; // Get the token part

    if (!token) {
      return res.status(401).json({ message: 'Token missing' });
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        // Handle specific JWT errors
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ message: 'Token expired' });
        } else if (err.name === 'JsonWebTokenError') {
          return res.status(401).json({ message: 'Invalid token' });
        } else {
          return res.status(401).json({ message: 'Could not authenticate token' });
        }
      }

      // Attach decoded token payload (e.g., user info) to request object
      req.user = decoded;
      console.log('User authenticated:', req.user);

      // Continue to next middleware or route handler
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = protect;
