const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');

// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const programRoutes = require('./routes/programRoutes');
const trainerRoutes = require('./routes/trainerRoutes');
const membershipRoutes = require('./routes/membershipRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const contactRoutes = require('./routes/contactRoutes');
const newsletterRoutes = require('./routes/newsletterRoutes');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();

// SECURITY HARDENING MIDDLEWARE
// 1. Helmet HTTP headers
app.use(
  helmet({
    contentSecurityPolicy: false,
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true
    }
  })
);

// 2. Data Sanitization against NoSQL query injection
app.use(mongoSanitize());

// 3. API Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500, // Generous limit for smooth testing
  message: { success: false, message: 'Too many requests from this IP, please try again after 15 minutes.' }
});
app.use('/api', limiter);

// Generous Rate Limiting for Auth endpoints (Login & Register)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100, // Allow up to 100 login/register attempts per 15 min
  message: { success: false, message: 'Too many login attempts. Please try again in 15 minutes.' }
});
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);

// 4. Flexible CORS Policy (Reflects origin to ensure zero CORS blocking across dev ports)
app.use(
  cors({
    origin: true,
    credentials: true
  })
);

app.use(express.json({ limit: '10kb' })); // Body limit to prevent payload flooding

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/programs', programRoutes);
app.use('/api/trainers', trainerRoutes);
app.use('/api/memberships', membershipRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/newsletter', newsletterRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'FITONE Fitness Club Production API is active' });
});

// Auto Seed check on DB connect
const seedData = require('./utils/seedData');
const User = require('./models/User');

const startServer = async () => {
  await connectDB();

  try {
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log('Database empty! Initializing seed data...');
      await seedData();
    }
  } catch (err) {
    console.warn('Seed auto-check skipped:', err.message);
  }

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`FITONE FITNESS CLUB API Running on Port: ${PORT}`);
    console.log(`====================================================`);
  });
};

startServer();
