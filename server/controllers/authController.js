const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fitone_secret', {
    expiresIn: '30d'
  });
};

// @desc Register new user
// @route POST /api/auth/register
exports.registerUser = async (req, res) => {
  try {
    const { name, email, phone, password, confirmPassword } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({ success: false, message: 'Please fill in all required fields' });
    }

    const cleanEmail = String(email).toLowerCase().trim();

    if (!cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      return res.status(400).json({ success: false, message: 'Please enter a valid email address' });
    }

    if (String(password).length < 4) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 4 characters'
      });
    }

    if (confirmPassword && password !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'Passwords do not match' });
    }

    const userExists = await User.findOne({ email: cleanEmail });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists with this email' });
    }

    const role = cleanEmail === 'admin@fitone.com' ? 'admin' : 'member';

    const user = await User.create({
      name: String(name).trim(),
      email: cleanEmail,
      phone: String(phone).trim(),
      password,
      role
    });

    res.status(201).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        membership: user.membership,
        token: generateToken(user._id)
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ success: false, message: 'Server error during registration', error: error.message });
  }
};

// @desc Login user
// @route POST /api/auth/login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    const cleanEmail = String(email).toLowerCase().trim();

    const user = await User.findOne({ email: cleanEmail });
    if (user && (await user.matchPassword(password))) {
      res.json({
        success: true,
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          membership: user.membership,
          membershipStatus: user.membershipStatus,
          membershipExpiry: user.membershipExpiry,
          token: generateToken(user._id)
        }
      });
    } else {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error during login', error: error.message });
  }
};

// @desc Get current logged in user profile
// @route GET /api/auth/me
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error fetching user profile' });
  }
};
