// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  // Check if Authorization header is present
  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  // Extract token from header
  console.log(authHeader);
  
  const token = authHeader.split(' ')[1]; // Expected format: 'Bearer <token>'
  console.log(token);
  
  // Check if token is present
  if (!token) {
    return res.status(401).json({ message: 'Token missing' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded payload to request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

export default authMiddleware;
