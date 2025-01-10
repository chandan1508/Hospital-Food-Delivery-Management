import express from 'express';
import { 
  assignTask, 
  updatePreparationStatus, 
  updateDeliveryStatus, 
  getAllTasks 
} from '../controllers/pantryController.js';
import { verifyJWT } from '../controllers/authController.js';

const router = express.Router();

router.post('/assign', verifyJWT(['hospital_manager']), assignTask); // Assign a task to the pantry staff
router.put('/updatePreparationStatus', verifyJWT(['pantry_staff']), updatePreparationStatus); // Update preparation status by pantry staff
router.put('/updateDeliveryStatus', verifyJWT(['delivery_personnel']), updateDeliveryStatus); // Update delivery status by delivery personnel
router.get('/tasks', verifyJWT(['hospital_manager', 'pantry_staff', 'delivery_personnel']), getAllTasks); // Get all pantry tasks

export default router;
