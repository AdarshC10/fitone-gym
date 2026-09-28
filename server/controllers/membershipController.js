const Membership = require('../models/Membership');

// @desc Get all memberships
// @route GET /api/memberships
exports.getMemberships = async (req, res) => {
  try {
    const memberships = await Membership.find().sort({ price: 1 });
    res.json({ success: true, count: memberships.length, data: memberships });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch membership plans' });
  }
};

// @desc Create membership (Admin only)
// @route POST /api/memberships
exports.createMembership = async (req, res) => {
  try {
    const membership = await Membership.create(req.body);
    res.status(201).json({ success: true, data: membership });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to create membership plan' });
  }
};

// @desc Update membership (Admin only)
// @route PUT /api/memberships/:id
exports.updateMembership = async (req, res) => {
  try {
    const membership = await Membership.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!membership) return res.status(404).json({ success: false, message: 'Membership not found' });
    res.json({ success: true, data: membership });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to update membership plan' });
  }
};

// @desc Delete membership (Admin only)
// @route DELETE /api/memberships/:id
exports.deleteMembership = async (req, res) => {
  try {
    const membership = await Membership.findByIdAndDelete(req.params.id);
    if (!membership) return res.status(404).json({ success: false, message: 'Membership not found' });
    res.json({ success: true, message: 'Membership deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete membership plan' });
  }
};
