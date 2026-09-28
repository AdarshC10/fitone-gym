import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Facebook, MessageCircle, Award, CheckCircle2 } from 'lucide-react';
import API from '../services/api';
import CtaSection from '../components/CtaSection';

const defaultTrainers = [
  {
    _id: 'tr1',
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
    _id: 'tr2',
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
    _id: 'tr3',
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
    _id: 'tr4',
    name: 'Elena Rostova',
    position: 'Mobility & Rehab Coach',
    specialization: 'Functional Movement & Rehab',
    experience: '7+ Years Experience',
    bio: 'Specialist in functional mobility, corrective exercise, postural alignment, and athletic longevity.',
    image: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=800&auto=format&fit=crop',
    certifications: ['FMS Certified Practitioner', 'Yoga Alliance RYT 500'],
    socialLinks: { instagram: 'https://instagram.com', facebook: 'https://facebook.com', whatsapp: 'https://wa.me/919636296119' }
  }
];

const TrainersPage = () => {
  const [trainers, setTrainers] = useState(defaultTrainers);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const res = await API.get('/trainers');
        if (res.data.success && res.data.data.length > 0) {
          setTrainers(res.data.data);
        }
      } catch (err) {
        console.log('Using default trainers');
      }
    };
    fetchTrainers();
  }, []);

  return (
    <div className="pt-24 min-h-screen bg-brand-black">
      {/* Header Banner */}
      <div className="relative py-20 bg-brand-darkCharcoal border-b border-brand-cardBorder overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-3">
          <span className="text-xs font-bold tracking-widest text-brand-red uppercase bg-brand-red/10 px-3.5 py-1.5 rounded-full border border-brand-red/30 inline-block">
            EXPERT COACHING STAFF
          </span>
          <h1 className="font-heading text-4xl sm:text-6xl font-extrabold uppercase text-white tracking-tight">
            MEET OUR <span className="text-brand-red text-glow-red">TRAINERS</span>
          </h1>
          <p className="text-gray-400 text-sm max-w-xl mx-auto">
            Work with certified elite fitness coaches dedicated to pushing your limits and guiding every rep.
          </p>
        </div>
      </div>

      {/* Trainers Grid */}
      <section className="py-20 bg-brand-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trainers.map((trainer, idx) => (
              <motion.div
                key={trainer._id || idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group bg-brand-cardBg border border-brand-cardBorder rounded-2xl overflow-hidden hover:border-brand-red/60 hover:shadow-red-glow transition-all duration-500 flex flex-col justify-between"
              >
                {/* Trainer Image */}
                <div className="relative h-72 overflow-hidden bg-brand-darkCharcoal">
                  <img
                    src={trainer.image}
                    alt={trainer.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-cardBg via-transparent to-transparent" />
                  
                  <span className="absolute top-4 right-4 bg-brand-red text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase shadow-lg">
                    {trainer.experience}
                  </span>
                </div>

                {/* Trainer Info */}
                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-brand-red uppercase tracking-wider">
                      {trainer.specialization}
                    </span>
                    <h3 className="font-heading text-xl font-extrabold text-white uppercase tracking-wide">
                      {trainer.name}
                    </h3>
                    <p className="text-xs font-medium text-gray-400 mt-0.5">{trainer.position}</p>
                    <p className="text-xs text-gray-300 mt-3 leading-relaxed line-clamp-3">{trainer.bio}</p>
                  </div>

                  {/* Certifications */}
                  <div className="pt-3 border-t border-white/10 space-y-1.5">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                      <Award className="w-3 h-3 text-brand-red" /> Certifications
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {trainer.certifications?.map((cert, cIdx) => (
                        <span key={cIdx} className="text-[9px] bg-white/5 text-gray-300 px-2 py-0.5 rounded border border-white/5">
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="pt-3 flex items-center gap-3">
                    <a
                      href={trainer.socialLinks?.instagram || '#'}
                      target="_blank"
                      rel="noreferrer"
                      className="w-8 h-8 rounded-lg bg-brand-darkCharcoal flex items-center justify-center text-gray-400 hover:text-brand-red hover:bg-brand-red/10 transition-colors"
                    >
                      <Instagram className="w-4 h-4" />
                    </a>
                    <a
                      href={trainer.socialLinks?.facebook || '#'}
                      target="_blank"
                      rel="noreferrer"
                      className="w-8 h-8 rounded-lg bg-brand-darkCharcoal flex items-center justify-center text-gray-400 hover:text-brand-red hover:bg-brand-red/10 transition-colors"
                    >
                      <Facebook className="w-4 h-4" />
                    </a>
                    <a
                      href={trainer.socialLinks?.whatsapp || '#'}
                      target="_blank"
                      rel="noreferrer"
                      className="w-8 h-8 rounded-lg bg-brand-darkCharcoal flex items-center justify-center text-gray-400 hover:text-brand-red hover:bg-brand-red/10 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </div>
  );
};

export default TrainersPage;
