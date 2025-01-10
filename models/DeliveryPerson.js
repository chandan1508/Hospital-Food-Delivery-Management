import mongoose from 'mongoose';

const deliveryPersonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contactInfo: { type: String, required: true },
  availability: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model('DeliveryPerson', deliveryPersonSchema);
