import User from '../models/Users.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET;

// Register User
export const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const user = new User({ name, email, password, role });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error registering user', error: err.message });
  }
};

// Login User
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '10d' });

    res.status(200).json({ token, role: user.role, name: user.name, email:email });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
};

// Verify JWT Middleware
export const verifyJWT = (roles) => (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;

    if (roles && !roles.includes(decoded.role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid token' });
  }
};
