const express = require('express');
const router = express.Router();
const { getGallery, createGalleryItem, deleteGalleryItem } = require('../controllers/galleryController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/', getGallery);
router.post('/', protect, adminOnly, createGalleryItem);
router.delete('/:id', protect, adminOnly, deleteGalleryItem);

module.exports = router;
