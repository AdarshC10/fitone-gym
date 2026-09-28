const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['member', 'admin'],
    default: 'member'
  },
  membership: {
    type: String,
    default: 'Premium Plan'
  },
  membershipStatus: {
    type: String,
    enum: ['Active', 'Pending', 'Expired'],
    default: 'Active'
  },
  membershipStart: {
    type: Date,
    default: Date.now
  },
  membershipExpiry: {
    type: Date,
    default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  },
  trainer: {
    type: String,
    default: 'Alex Johnson'
  },
  nextSession: {
    type: String,
    default: 'Tomorrow at 10:00 AM'
  },
  stats: {
    height: { type: Number, default: 178 },
    weight: { type: Number, default: 76 },
    targetWeight: { type: Number, default: 72 },
    bmi: { type: Number, default: 24.0 }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before save
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Match password method
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
