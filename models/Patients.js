import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  diseases: [{ type: String }],
  allergies: [{ type: String }],
  roomNumber: { type: String, required: true },
  bedNumber: { type: String, required: true },
  floorNumber: { type: String, required: true },
  contactInfo: { type: String, required: true },
  emergencyContact: { type: String, required: true },
  otherDetails: { type: String },
}, { timestamps: true });

export default mongoose.model('Patient', patientSchema);
