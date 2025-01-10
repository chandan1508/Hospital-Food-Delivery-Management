import express from 'express';
import { 
  createDietChart, 
  getAllDietCharts, 
  getDietChartByPatientId, 
  updateDietChart, 
  deleteDietChart 
} from '../controllers/dietChartController.js';
import { verifyJWT } from '../controllers/authController.js';

const router = express.Router();

// Protected Routes
router.post('/', verifyJWT(['hospital_manager']), createDietChart); // Create a diet chart
router.get('/', verifyJWT(['hospital_manager', 'pantry_staff']), getAllDietCharts); // Get all diet charts
router.get('/:patientId', verifyJWT(['hospital_manager', 'pantry_staff']), getDietChartByPatientId); // Get diet chart by patient ID
router.put('/:id', verifyJWT(['hospital_manager']), updateDietChart); // Update a diet chart
router.delete('/:id', verifyJWT(['hospital_manager']), deleteDietChart); // Delete a diet chart

export default router;
