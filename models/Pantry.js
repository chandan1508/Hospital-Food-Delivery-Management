import mongoose from 'mongoose';

const pantrySchema = new mongoose.Schema(
  {
    dietChartId: { type: mongoose.Schema.Types.ObjectId, ref: 'DietChart', required: true },
    preparationStatus: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
    deliveryStatus: { type: String, enum: ['Not Delivered', 'In Transit', 'Delivered'], default: 'Not Delivered' },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model('Pantry', pantrySchema);

