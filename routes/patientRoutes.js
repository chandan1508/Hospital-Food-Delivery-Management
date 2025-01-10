import express from 'express';
import { 
  addPatient, 
  getPatients, 
  getPatientById, 
  updatePatient, 
  deletePatient 
} from '../controllers/patientController.js';
import { verifyJWT } from '../controllers/authController.js';

const router = express.Router();

// Protected Routes
router.post('/', verifyJWT(['hospital_manager']), addPatient); // Add patient
router.get('/', verifyJWT(['hospital_manager', 'pantry_staff', 'delivery_personnel']), getPatients); // Get all patients
router.get('/:id', verifyJWT(['hospital_manager', 'pantry_staff', 'delivery_personnel']), getPatientById); // Get single patient
router.put('/:id', verifyJWT(['hospital_manager']), updatePatient); // Update patient
router.delete('/:id', verifyJWT(['hospital_manager']), deletePatient); // Delete patient

export default router;
