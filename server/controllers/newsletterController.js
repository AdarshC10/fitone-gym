const Newsletter = require('../models/Newsletter');

// @desc Subscribe to newsletter
// @route POST /api/newsletter
exports.subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address' });
    }

    const exists = await Newsletter.findOne({ email });
    if (exists) {
      return res.status(400).json({ success: false, message: 'Email is already subscribed' });
    }

    const subscriber = await Newsletter.create({ email });
    res.status(201).json({
      success: true,
      message: 'Thank you for subscribing to FITONE Fitness Club newsletter!',
      data: subscriber
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Subscription failed' });
  }
};

// @desc Get newsletter subscribers (Admin only)
// @route GET /api/newsletter
exports.getSubscribers = async (req, res) => {
  try {
    const subscribers = await Newsletter.find().sort({ subscribedAt: -1 });
    res.json({ success: true, count: subscribers.length, data: subscribers });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch newsletter subscribers' });
  }
};
