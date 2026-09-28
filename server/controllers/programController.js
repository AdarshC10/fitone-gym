const Program = require('../models/Program');

// @desc Get all programs
// @route GET /api/programs
exports.getPrograms = async (req, res) => {
  try {
    const programs = await Program.find().sort({ createdAt: 1 });
    res.json({ success: true, count: programs.length, data: programs });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch programs' });
  }
};

// @desc Create program (Admin only)
// @route POST /api/programs
exports.createProgram = async (req, res) => {
  try {
    const program = await Program.create(req.body);
    res.status(201).json({ success: true, data: program });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to create program', error: error.message });
  }
};

// @desc Update program (Admin only)
// @route PUT /api/programs/:id
exports.updateProgram = async (req, res) => {
  try {
    const program = await Program.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!program) return res.status(404).json({ success: false, message: 'Program not found' });
    res.json({ success: true, data: program });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to update program' });
  }
};

// @desc Delete program (Admin only)
// @route DELETE /api/programs/:id
exports.deleteProgram = async (req, res) => {
  try {
    const program = await Program.findByIdAndDelete(req.params.id);
    if (!program) return res.status(404).json({ success: false, message: 'Program not found' });
    res.json({ success: true, message: 'Program deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete program' });
  }
};
