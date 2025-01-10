import express from 'express';
import { register, login, verifyJWT } from '../controllers/authController.js';

const router = express.Router();

// Public Routes
router.post('/register', register); // Only hospital admin should use this
router.post('/login', login);

// Protected Test Route (Role-based Example)
router.get('/protected', verifyJWT(['hospital_manager']), (req, res) => {
  res.status(200).json({ message: 'Access granted', user: req.user });
});

export default router;
