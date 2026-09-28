const Trainer = require('../models/Trainer');

// @desc Get all trainers
// @route GET /api/trainers
exports.getTrainers = async (req, res) => {
  try {
    const trainers = await Trainer.find().sort({ createdAt: 1 });
    res.json({ success: true, count: trainers.length, data: trainers });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch trainers' });
  }
};

// @desc Create trainer (Admin only)
// @route POST /api/trainers
exports.createTrainer = async (req, res) => {
  try {
    const trainer = await Trainer.create(req.body);
    res.status(201).json({ success: true, data: trainer });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to create trainer', error: error.message });
  }
};

// @desc Update trainer (Admin only)
// @route PUT /api/trainers/:id
exports.updateTrainer = async (req, res) => {
  try {
    const trainer = await Trainer.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!trainer) return res.status(404).json({ success: false, message: 'Trainer not found' });
    res.json({ success: true, data: trainer });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to update trainer' });
  }
};

// @desc Delete trainer (Admin only)
// @route DELETE /api/trainers/:id
exports.deleteTrainer = async (req, res) => {
  try {
    const trainer = await Trainer.findByIdAndDelete(req.params.id);
    if (!trainer) return res.status(404).json({ success: false, message: 'Trainer not found' });
    res.json({ success: true, message: 'Trainer deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete trainer' });
  }
};
