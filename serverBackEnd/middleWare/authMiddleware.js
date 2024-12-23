import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '').trim();
  if (!token) return res.status(401).json({ error: "Access denied, token missing" });

  try {
    console.log("Extracted Token:", token);
    console.log("JWT Secret:", process.env.Jwt_secret_key);
    const decoded = jwt.verify(token, process.env.Jwt_secret_key);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT Error:", error.message);
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: "Token has expired" });
    }
    res.status(400).json({ error: "Invalid token" });
  }
};

export default authMiddleware;