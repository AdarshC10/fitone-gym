const express = require('express');
const router = express.Router();
const { getTrainers, createTrainer, updateTrainer, deleteTrainer } = require('../controllers/trainerController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/', getTrainers);
router.post('/', protect, adminOnly, createTrainer);
router.put('/:id', protect, adminOnly, updateTrainer);
router.delete('/:id', protect, adminOnly, deleteTrainer);

module.exports = router;
