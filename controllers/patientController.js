import Patient from '../models/Patients.js';

// Add Patient
export const addPatient = async (req, res) => {
  try {
    const newPatient = new Patient(req.body);
    await newPatient.save();
    res.status(201).json({ message: 'Patient added successfully', patient: newPatient });
  } catch (err) {
    res.status(500).json({ message: 'Error adding patient', error: err.message });
  }
};

// Get All Patients
export const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving patients', error: err.message });
  }
};

// Get Single Patient by ID
export const getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    res.status(200).json(patient);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving patient', error: err.message });
  }
};

// Update Patient
export const updatePatient = async (req, res) => {
  try {
    const updatedPatient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPatient) return res.status(404).json({ message: 'Patient not found' });
    res.status(200).json({ message: 'Patient updated successfully', patient: updatedPatient });
  } catch (err) {
    res.status(500).json({ message: 'Error updating patient', error: err.message });
  }
};

// Delete Patient
export const deletePatient = async (req, res) => {
  try {
    const deletedPatient = await Patient.findByIdAndDelete(req.params.id);
    if (!deletedPatient) return res.status(404).json({ message: 'Patient not found' });
    res.status(200).json({ message: 'Patient deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting patient', error: err.message });
  }
};
