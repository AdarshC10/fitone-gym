const Contact = require('../models/Contact');

const isValidEmail = (email) => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
};

// @desc Submit contact form
// @route POST /api/contact
exports.submitContact = async (req, res) => {
  try {
    const { name, email, phone, program, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({ success: false, message: 'Please fill in all required fields' });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ success: false, message: 'Please enter a valid email address' });
    }

    const contact = await Contact.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      program: program || 'General Inquiry',
      message: message.trim()
    });

    res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been sent successfully. We will get back to you shortly.',
      data: contact
    });
  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({ success: false, message: 'Failed to submit message. Please try again later.' });
  }
};

// @desc Get contact submissions (Admin only)
// @route GET /api/contact
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, count: contacts.length, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch contact submissions' });
  }
};
