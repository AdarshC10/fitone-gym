const mongoose = require('mongoose');

const trainerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  position: {
    type: String,
    required: true,
    default: 'Fitness Trainer'
  },
  specialization: {
    type: String,
    required: true
  },
  experience: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  certifications: [{
    type: String
  }],
  socialLinks: {
    instagram: { type: String, default: '#' },
    facebook: { type: String, default: '#' },
    whatsapp: { type: String, default: '#' }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Trainer', trainerSchema);
