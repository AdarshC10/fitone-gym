import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Dumbbell, Flame, UserCheck, ShieldCheck, Instagram, Facebook, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import VideoModal from './VideoModal';

const Hero = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const features = [
    { icon: Dumbbell, title: 'Strength Training', desc: 'Heavy lifts & hypertrophy' },
    { icon: Flame, title: 'Cardio Training', desc: 'Fat burn & endurance' },
    { icon: UserCheck, title: 'Personal Training', desc: '1-on-1 expert coaching' },
    { icon: ShieldCheck, title: 'Advanced Equipment', desc: 'Modern commercial gear' },
  ];

  return (
    <section className="relative min-h-screen pt-28 pb-16 flex items-center overflow-hidden bg-brand-black">
      {/* Background Image Overlay & Subtle Gradients */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=2000&auto=format&fit=crop"
          alt="Gym Background"
          className="w-full h-full object-cover object-center opacity-30 scale-105"
        />
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-red/20 rounded-full blur-[140px] pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Small Heading */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-red/10 border border-brand-red/30">
              <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
              <span className="text-xs font-bold tracking-widest text-brand-red uppercase">
                FITONE FITNESS CLUB
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="font-heading text-5xl sm:text-7xl lg:text-8xl font-extrabold uppercase tracking-tight leading-[0.95]">
              <span className="block text-white">STRONG BODY</span>
              <span className="block text-brand-red text-glow-red mt-1">STRONG MIND</span>
            </h1>

            {/* Description */}
            <p className="text-gray-300 text-base sm:text-lg max-w-xl font-normal leading-relaxed">
              Build strength, improve endurance and become the best version of yourself with elite coaches, cutting-edge equipment, and an unstoppable community.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/pricing"
                className="bg-brand-red hover:bg-brand-brightRed text-white font-heading text-base font-bold tracking-widest px-8 py-4 rounded-xl shadow-red-glow hover:shadow-red-glow-lg transition-all duration-300 uppercase transform hover:-translate-y-1"
              >
                JOIN NOW
              </Link>
              <button
                onClick={() => setIsVideoOpen(true)}
                className="group flex items-center gap-3 bg-brand-darkCharcoal/80 hover:bg-brand-darkCharcoal border border-white/20 hover:border-brand-red px-7 py-4 rounded-xl text-white font-heading text-base font-bold tracking-wider transition-all duration-300 backdrop-blur-md"
              >
                <div className="w-8 h-8 rounded-full bg-brand-red/20 group-hover:bg-brand-red flex items-center justify-center text-brand-red group-hover:text-white transition-colors">
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </div>
                <span>WATCH VIDEO</span>
              </button>
            </div>

            {/* Four Feature Badges Below Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-white/10">
              {features.map((item, idx) => {
                const IconComp = item.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                    className="flex items-center gap-3 bg-brand-cardBg/60 border border-white/5 p-3 rounded-xl backdrop-blur-sm hover:border-brand-red/40 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-lg bg-brand-red/10 border border-brand-red/30 flex items-center justify-center text-brand-red shrink-0">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase leading-tight">{item.title}</h4>
                      <p className="text-[10px] text-gray-400 mt-0.5">{item.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </motion.div>

          {/* RIGHT SIDE ATHLETE IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer Glowing Ring */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-brand-red/30 to-transparent blur-2xl pointer-events-none" />
              
              <div className="relative rounded-3xl overflow-hidden border border-brand-cardBorder bg-brand-darkCharcoal shadow-2xl group">
                <img
                  src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1000&auto=format&fit=crop"
                  alt="Fitone Athlete"
                  className="w-full h-[480px] lg:h-[580px] object-cover object-top transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent" />
                
                {/* Floating Stat Card Badge */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl glass-panel border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-red flex items-center justify-center font-bold text-white shadow-red-glow">
                      #1
                    </div>
                    <div>
                      <p className="text-xs font-extrabold text-white tracking-wide uppercase">PREMIUM CLUB</p>
                      <p className="text-[10px] text-gray-400">Certified Trainers & Modern Gear</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-brand-red bg-brand-red/10 px-3 py-1 rounded-full border border-brand-red/30">
                    2026 TOP GYM
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* FLOATING SOCIAL MEDIA ICONS (RIGHT EDGE) */}
      <div className="hidden xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-30 flex-col gap-4">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          className="w-10 h-10 rounded-full bg-brand-darkCharcoal/90 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:bg-brand-red hover:border-brand-red transition-all shadow-lg hover:scale-110"
          title="Instagram"
        >
          <Instagram className="w-5 h-5" />
        </a>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noreferrer"
          className="w-10 h-10 rounded-full bg-brand-darkCharcoal/90 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:bg-brand-red hover:border-brand-red transition-all shadow-lg hover:scale-110"
          title="Facebook"
        >
          <Facebook className="w-5 h-5" />
        </a>
        <a
          href="https://wa.me/919636296119"
          target="_blank"
          rel="noreferrer"
          className="w-10 h-10 rounded-full bg-brand-darkCharcoal/90 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:bg-brand-red hover:border-brand-red transition-all shadow-lg hover:scale-110"
          title="WhatsApp"
        >
          <MessageCircle className="w-5 h-5" />
        </a>
      </div>

      {/* Trailer Video Modal */}
      <VideoModal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />
    </section>
  );
};

export default Hero;
