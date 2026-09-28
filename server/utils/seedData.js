const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const User = require('../models/User');
const Trainer = require('../models/Trainer');
const Program = require('../models/Program');
const Membership = require('../models/Membership');
const Testimonial = require('../models/Testimonial');
const Gallery = require('../models/Gallery');
const Contact = require('../models/Contact');
const Newsletter = require('../models/Newsletter');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const seedDB = async () => {
  try {
    const connStr = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/fitone-gym';
    console.log('Connecting to database for seeding...');
    await mongoose.connect(connStr);

    console.log('Clearing old data...');
    await Promise.all([
      User.deleteMany({}),
      Trainer.deleteMany({}),
      Program.deleteMany({}),
      Membership.deleteMany({}),
      Testimonial.deleteMany({}),
      Gallery.deleteMany({}),
      Contact.deleteMany({}),
      Newsletter.deleteMany({})
    ]);

    console.log('Seeding Users...');
    await User.create([
      {
        name: 'Fitone Admin',
        email: 'admin@fitone.com',
        phone: '+91 9636296119',
        password: 'Admin@12345',
        role: 'admin',
        membership: 'Ultimate Plan',
        membershipStatus: 'Active'
      },
      {
        name: 'Rohit Sharma',
        email: 'rohit@fitone.com',
        phone: '+91 9876543210',
        password: 'Member@12345',
        role: 'member',
        membership: 'Premium Plan',
        membershipStatus: 'Active',
        trainer: 'Alex Johnson',
        stats: { height: 178, weight: 76, targetWeight: 72, bmi: 24.0 }
      }
    ]);

    console.log('Seeding Programs...');
    await Program.create([
      {
        title: 'STRENGTH TRAINING',
        description: 'Build muscle, increase strength and improve overall fitness with heavy compound lifts and hypertrophy protocols.',
        details: 'Our Strength Training program combines progressive overload, hypertrophy techniques, and dedicated coaching to help you build solid muscle mass and raw power safely.',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop',
        icon: 'Dumbbell',
        features: ['Heavy Compound Lifting', 'Custom Workout Logbook', '1-on-1 Form Checks', 'Progressive Overload Tracking'],
        duration: '12 Weeks',
        price: 2499
      },
      {
        title: 'CARDIO TRAINING',
        description: 'Improve endurance, burn fat and keep your heart healthy with high intensity interval training and aerobic conditioning.',
        details: 'Engage in high-energy cardiovascular routines engineered to maximize caloric burn, enhance lung capacity, and boost metabolic rate.',
        image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop',
        icon: 'HeartPulse',
        features: ['HIIT & Metabolic Conditioning', 'Heart Rate Zone Monitoring', 'Fat-Burn Calorie Trackers', 'Endurance Assessments'],
        duration: '8 Weeks',
        price: 1999
      },
      {
        title: 'PERSONAL TRAINING',
        description: '1-on-1 training sessions tailored specifically to your individual fitness goals, body type and timeline.',
        details: 'Receive dedicated private attention from our master coaches. Includes customized exercise selection, body composition tracking, and daily accountability.',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1200&auto=format&fit=crop',
        icon: 'UserCheck',
        features: ['Dedicated Private Coach', 'Customized Routine & Diet', 'Bi-weekly Body Scans', 'Priority Machine Access'],
        duration: 'Ongoing',
        price: 3999
      },
      {
        title: 'FUNCTIONAL TRAINING',
        description: 'Improve mobility, core stability, balance and real-life functional athletic strength for overall physical performance.',
        details: 'Designed for athletic movement, flexibility, joint strength, and injury prevention using kettlebells, TRX bands, and plyometrics.',
        image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1200&auto=format&fit=crop',
        icon: 'Activity',
        features: ['Kettlebell & TRX Workouts', 'Agility & Speed Drills', 'Posture & Mobility Fixes', 'Joint Injury Prevention'],
        duration: '10 Weeks',
        price: 2199
      }
    ]);

    console.log('Seeding Trainers...');
    await Trainer.create([
      {
        name: 'Alex Johnson',
        position: 'Head Strength Coach',
        specialization: 'Strength & Conditioning',
        experience: '8+ Years Experience',
        bio: 'Certified CSCS coach specializing in powerlifting, hypertrophy, and biomechanical athletic performance.',
        image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=800&auto=format&fit=crop',
        certifications: ['CSCS Certified', 'NSCA Master Trainer', 'ISSA Nutrition Specialist'],
        socialLinks: { instagram: 'https://instagram.com', facebook: 'https://facebook.com', whatsapp: 'https://wa.me/919636296119' }
      },
      {
        name: 'Sarah Jenkins',
        position: 'Cardio & HIIT Master',
        specialization: 'Fat Loss & Endurance',
        experience: '6+ Years Experience',
        bio: 'Passionate fitness enthusiast focused on body recomposition, high-intensity cardio, and endurance training.',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop',
        certifications: ['ACE Certified Personal Trainer', 'Precision Nutrition Level 1'],
        socialLinks: { instagram: 'https://instagram.com', facebook: 'https://facebook.com', whatsapp: 'https://wa.me/919636296119' }
      },
      {
        name: 'Marcus Vance',
        position: 'Bodybuilding Specialist',
        specialization: 'Hypertrophy & Physique',
        experience: '10+ Years Experience',
        bio: 'Former competitive bodybuilder helping athletes transform their physique with science-based resistance routines.',
        image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=800&auto=format&fit=crop',
        certifications: ['IFBB Pro Specialist', 'NASM CPT Certified'],
        socialLinks: { instagram: 'https://instagram.com', facebook: 'https://facebook.com', whatsapp: 'https://wa.me/919636296119' }
      },
      {
        name: 'Elena Rostova',
        position: 'Mobility & Rehab Coach',
        specialization: 'Functional Movement & Rehab',
        experience: '7+ Years Experience',
        bio: 'Specialist in functional mobility, corrective exercise, postural alignment, and athletic longevity.',
        image: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=800&auto=format&fit=crop',
        certifications: ['FMS Certified Practitioner', 'Yoga Alliance RYT 500'],
        socialLinks: { instagram: 'https://instagram.com', facebook: 'https://facebook.com', whatsapp: 'https://wa.me/919636296119' }
      }
    ]);

    console.log('Seeding Memberships...');
    await Membership.create([
      {
        name: 'BASIC PLAN',
        price: 1499,
        duration: 'month',
        popular: false,
        features: [
          'Gym Access',
          'Free Wi-Fi',
          'Locker Facility',
          'Basic Cardio Access',
          'Standard Equipment Access'
        ]
      },
      {
        name: 'PREMIUM PLAN',
        price: 2499,
        duration: 'month',
        popular: true,
        badge: 'MOST POPULAR',
        features: [
          'Gym Access',
          'Personal Training (2 Sessions)',
          'Diet Plan',
          'Locker Facility',
          'Free Sauna & Steam Bath',
          'Group Classes Included'
        ]
      },
      {
        name: 'ULTIMATE PLAN',
        price: 3999,
        duration: 'month',
        popular: false,
        features: [
          'Gym Access',
          'Personal Training (4 Sessions)',
          'Diet Plan',
          'Body Composition Analysis',
          'Locker Facility',
          'Unlimited Sauna & Spa',
          'All Group Classes & Boxing'
        ]
      }
    ]);

    console.log('Seeding Testimonials...');
    await Testimonial.create([
      {
        name: 'Rohit Sharma',
        role: 'Member since 2024',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
        message: 'Fitone has completely changed my lifestyle. The trainers are amazing and the environment keeps me motivated every single day!',
        rating: 5
      },
      {
        name: 'Priya Mehta',
        role: 'Member since 2025',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
        message: 'The best gym in town! Great equipment, friendly staff and personalized training that actually works.',
        rating: 5
      },
      {
        name: 'Arjun Verma',
        role: 'Member since 2023',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop',
        message: "I've achieved results I never thought possible. Fitone is not just a gym, it's family.",
        rating: 5
      }
    ]);

    console.log('Seeding Gallery...');
    await Gallery.create([
      {
        title: 'Modern Power Racks Zone',
        category: 'Equipment',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop'
      },
      {
        title: 'Spacious Cardio Floor',
        category: 'Interior',
        image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop'
      },
      {
        title: '1-on-1 Personal Coaching',
        category: 'Training',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1200&auto=format&fit=crop'
      },
      {
        title: 'Heavy Dumbbell Bay',
        category: 'Equipment',
        image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1200&auto=format&fit=crop'
      },
      {
        title: 'Functional Turf & Boxing Zone',
        category: 'Interior',
        image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1200&auto=format&fit=crop'
      },
      {
        title: 'Expert Coaching Team',
        category: 'Trainers',
        image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=1200&auto=format&fit=crop'
      }
    ]);

    console.log('Seeding Contacts & Newsletter...');
    await Contact.create({
      name: 'Vikas Patel',
      email: 'vikas@gmail.com',
      phone: '+91 9988776655',
      program: 'Personal Training',
      message: 'Hi, I would like to schedule a trial session for Personal Training next week.'
    });

    await Newsletter.create({
      email: 'member.updates@fitone.com'
    });

    console.log('Database Seeding Completed Successfully!');
    if (mongoose.connection.readyState === 1) {
      await mongoose.disconnect();
    }
  } catch (err) {
    console.error('Database Seeding Failed:', err);
  }
};

if (require.main === module) {
  seedDB();
}

module.exports = seedDB;
