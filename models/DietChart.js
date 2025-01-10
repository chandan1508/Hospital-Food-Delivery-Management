import mongoose from 'mongoose';

const dietChartSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  morning: { type: String, required: true },
  evening: { type: String, required: true },
  night: { type: String, required: true },
  specificInstructions: { type: String }, // E.g., "Low sugar, no salt"
}, { timestamps: true });

export default mongoose.model('DietChart', dietChartSchema);
