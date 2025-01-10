import DietChart from '../models/DietChart.js';
import Patient from '../models/Patients.js';

// Create Diet Chart
export const createDietChart = async (req, res) => {
  try {
    const { patientId, morning, evening, night, specificInstructions } = req.body;

    // Ensure the patient exists
    const patient = await Patient.findById(patientId);
    if (!patient) return res.status(404).json({ message: 'Patient not found' });

    const newDietChart = new DietChart({
      patientId,
      morning,
      evening,
      night,
      specificInstructions,
    });

    await newDietChart.save();
    res.status(201).json({ message: 'Diet chart created successfully', dietChart: newDietChart });
  } catch (err) {
    res.status(500).json({ message: 'Error creating diet chart', error: err.message });
  }
};

// Get All Diet Charts
export const getAllDietCharts = async (req, res) => {
  try {
    const dietCharts = await DietChart.find().populate('patientId', 'name floorNumber roomNumber bedNumber');
    res.status(200).json(dietCharts);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching diet charts', error: err.message });
  }
};

// Get Diet Chart by Patient ID
export const getDietChartByPatientId = async (req, res) => {
  try {
    const { patientId } = req.params;
    const dietChart = await DietChart.findOne({ patientId }).populate('patientId', 'name roomNumber bedNumber');
    if (!dietChart) return res.status(404).json({ message: 'Diet chart not found' });

    res.status(200).json(dietChart);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching diet chart', error: err.message });
  }
};

// Update Diet Chart
export const updateDietChart = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedDietChart = await DietChart.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedDietChart) return res.status(404).json({ message: 'Diet chart not found' });

    res.status(200).json({ message: 'Diet chart updated successfully', dietChart: updatedDietChart });
  } catch (err) {
    res.status(500).json({ message: 'Error updating diet chart', error: err.message });
  }
};

// Delete Diet Chart
export const deleteDietChart = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDietChart = await DietChart.findByIdAndDelete(id);
    if (!deletedDietChart) return res.status(404).json({ message: 'Diet chart not found' });

    res.status(200).json({ message: 'Diet chart deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting diet chart', error: err.message });
  }
};
