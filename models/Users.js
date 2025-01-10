import mongoose from 'mongoose';
import bcrypt from 'bcrypt';  // Uncomment if bcrypt is used for password hashing

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['hospital_manager', 'pantry_staff', 'delivery_personnel', 'not_assigned'], required: true },
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);  // Uncomment if bcrypt is used
  this.password = await bcrypt.hash(this.password, salt);  // Uncomment if bcrypt is used
  next();
});

// Compare passwords
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);  // Uncomment if bcrypt is used
};

export default mongoose.model('User', userSchema);
