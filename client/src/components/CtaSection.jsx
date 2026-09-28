import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Flame } from 'lucide-react';

const CtaSection = () => {
  return (
    <section className="py-20 bg-brand-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="relative rounded-3xl bg-gradient-to-r from-brand-cardBg via-brand-darkCharcoal to-brand-black border border-brand-cardBorder overflow-hidden shadow-2xl p-8 sm:p-14">
          {/* Subtle Red Radial Background Glow */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-red/20 rounded-full blur-[140px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red/10 border border-brand-red/30 text-brand-red text-xs font-bold uppercase tracking-wider">
                <Flame className="w-4 h-4 fill-current" /> BECOME UNSTOPPABLE
              </div>

              <h2 className="font-heading text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-white leading-tight">
                START YOUR <br />
                <span className="text-brand-red text-glow-red">FITNESS JOURNEY</span> TODAY!
              </h2>

              <p className="text-gray-300 text-sm sm:text-base max-w-xl">
                Don't wait for tomorrow. Join Fitone Fitness Club today and get full access to world-class facilities, personalized coaching, and a supportive community.
              </p>

              <div className="pt-2">
                <Link
                  to="/pricing"
                  className="inline-flex items-center gap-3 bg-brand-red hover:bg-brand-brightRed text-white font-heading text-base font-extrabold tracking-widest px-9 py-4 rounded-xl shadow-red-glow hover:shadow-red-glow-lg transition-all duration-300 uppercase transform hover:-translate-y-1"
                >
                  JOIN NOW <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>

            {/* Right Muscular Athlete Graphic */}
            <div className="lg:col-span-4 relative flex justify-center lg:justify-end">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative w-64 h-80 sm:w-72 sm:h-96 rounded-2xl overflow-hidden border-2 border-brand-red/40 shadow-red-glow"
              >
                <img
                  src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=800&auto=format&fit=crop"
                  alt="Muscular Athlete Fitone"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent" />
              </motion.div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default CtaSection;
