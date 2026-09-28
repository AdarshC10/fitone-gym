const express = require('express');
const router = express.Router();
const { getMemberships, createMembership, updateMembership, deleteMembership } = require('../controllers/membershipController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/', getMemberships);
router.post('/', protect, adminOnly, createMembership);
router.put('/:id', protect, adminOnly, updateMembership);
router.delete('/:id', protect, adminOnly, deleteMembership);

module.exports = router;
