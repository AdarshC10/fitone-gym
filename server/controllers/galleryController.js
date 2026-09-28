const Gallery = require('../models/Gallery');

// @desc Get gallery items
// @route GET /api/gallery
exports.getGallery = async (req, res) => {
  try {
    const gallery = await Gallery.find().sort({ createdAt: -1 });
    res.json({ success: true, count: gallery.length, data: gallery });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch gallery items' });
  }
};

// @desc Create gallery item (Admin only)
// @route POST /api/gallery
exports.createGalleryItem = async (req, res) => {
  try {
    const item = await Gallery.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to add gallery item' });
  }
};

// @desc Delete gallery item (Admin only)
// @route DELETE /api/gallery/:id
exports.deleteGalleryItem = async (req, res) => {
  try {
    const item = await Gallery.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Gallery item not found' });
    res.json({ success: true, message: 'Gallery item deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete gallery item' });
  }
};
