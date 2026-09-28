const express = require('express');
const router = express.Router();
const { getPrograms, createProgram, updateProgram, deleteProgram } = require('../controllers/programController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/', getPrograms);
router.post('/', protect, adminOnly, createProgram);
router.put('/:id', protect, adminOnly, updateProgram);
router.delete('/:id', protect, adminOnly, deleteProgram);

module.exports = router;
