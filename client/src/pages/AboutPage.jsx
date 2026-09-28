import React from 'react';
import { motion } from 'framer-motion';
import AboutSection from '../components/AboutSection';
import CtaSection from '../components/CtaSection';
import { Award, Target, ShieldCheck, HeartPulse } from 'lucide-react';

const AboutPage = () => {
  const values = [
    {
      icon: Target,
      title: 'OUR MISSION',
      desc: 'To empower individuals of all fitness levels to unlock their maximum physical and mental potential through science-backed coaching.'
    },
    {
      icon: Award,
      title: 'EXCELLENCE & INTEGRITY',
      desc: 'We uphold commercial gym standards, providing top-grade equipment, spotless hygiene, and certified expert guidance.'
    },
    {
      icon: ShieldCheck,
      title: 'SAFE & INCLUSIVE',
      desc: 'A welcoming, supportive environment for beginners, seasoned bodybuilders, and elite endurance athletes alike.'
    },
    {
      icon: HeartPulse,
      title: 'HOLISTIC WELLNESS',
      desc: 'Fitness is more than heavy lifts; we integrate nutrition, recovery, and mindset training for long-term health.'
    }
  ];

  return (
    <div className="pt-24 min-h-screen bg-brand-black">
      {/* Subpage Banner */}
      <div className="relative py-20 bg-brand-darkCharcoal border-b border-brand-cardBorder overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-3">
          <span className="text-xs font-bold tracking-widest text-brand-red uppercase bg-brand-red/10 px-3.5 py-1.5 rounded-full border border-brand-red/30 inline-block">
            WHO WE ARE
          </span>
          <h1 className="font-heading text-4xl sm:text-6xl font-extrabold uppercase text-white tracking-tight">
            ABOUT <span className="text-brand-red text-glow-red">FITONE FITNESS CLUB</span>
          </h1>
          <p className="text-gray-400 text-sm max-w-xl mx-auto">
            Discover the passion, values, and world-class environment driving Mangode's premier fitness destination.
          </p>
        </div>
      </div>

      <AboutSection />

      {/* Core Values */}
      <section className="py-20 bg-brand-black border-t border-brand-cardBorder">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold uppercase text-white">
              OUR CORE <span className="text-brand-red">VALUES</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-brand-cardBg border border-brand-cardBorder p-6 rounded-2xl hover:border-brand-red/60 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-red/10 border border-brand-red/30 flex items-center justify-center text-brand-red group-hover:bg-brand-red group-hover:text-white transition-colors mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-white uppercase mb-2">{v.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{v.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <CtaSection />
    </div>
  );
};

export default AboutPage;
