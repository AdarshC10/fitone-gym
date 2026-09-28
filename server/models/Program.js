const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  details: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: 'Dumbbell'
  },
  features: [{
    type: String
  }],
  duration: {
    type: String,
    default: '12 Weeks'
  },
  price: {
    type: Number,
    default: 2499
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Program', programSchema);
