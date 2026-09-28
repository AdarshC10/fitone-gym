import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, Award, Clock, Apple, Dumbbell } from 'lucide-react';

const AboutSection = () => {
  const stats = [
    { value: '245+', label: 'Happy Members' },
    { value: '8+', label: 'Expert Trainers' },
    { value: '100%', label: 'Results Driven' },
  ];

  const features = [
    {
      icon: Dumbbell,
      title: 'Modern Equipment',
      desc: 'Latest & advanced machines for effective workouts.'
    },
    {
      icon: Users,
      title: 'Expert Trainers',
      desc: 'Certified trainers to guide you every step of the way.'
    },
    {
      icon: Apple,
      title: 'Nutrition Guidance',
      desc: 'Personalized diet plans for better results.'
    },
    {
      icon: Clock,
      title: 'Flexible Timings',
      desc: 'Workout at your convenient time with flexible schedules.'
    }
  ];

  return (
    <section id="about" className="py-24 bg-brand-darkCharcoal relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT COLUMN: LARGE GYM INTERIOR IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-3xl overflow-hidden border border-brand-cardBorder shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop"
                alt="Fitone Gym Interior"
                className="w-full h-[450px] sm:h-[550px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-black/20 to-transparent" />

              {/* Floating Stat Badge Overlay */}
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-brand-black/90 border border-brand-cardBorder backdrop-blur-xl">
                <div className="grid grid-cols-3 gap-4 text-center divide-x divide-white/10">
                  {stats.map((stat, idx) => (
                    <div key={idx} className="px-2">
                      <p className="font-heading text-2xl sm:text-3xl font-extrabold text-brand-red tracking-tight">
                        {stat.value}
                      </p>
                      <p className="text-[10px] sm:text-xs font-semibold text-gray-300 uppercase mt-1">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: TEXT CONTENT & FEATURE CARDS */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="space-y-3">
              <span className="text-xs font-bold tracking-widest text-brand-red uppercase bg-brand-red/10 px-3.5 py-1.5 rounded-full border border-brand-red/30 inline-block">
                ABOUT FITONE
              </span>
              <h2 className="font-heading text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white leading-tight">
                MORE THAN A GYM,<br />
                IT'S A <span className="text-brand-red text-glow-red">COMMUNITY.</span>
              </h2>
            </div>

            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              At Fitone Fitness Club, we believe fitness is not just a goal, it's a lifestyle. We provide the perfect environment, expert guidance and motivation you need to transform your body and mind.
            </p>

            {/* Additional Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {features.map((feat, idx) => {
                const Icon = feat.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-brand-cardBg/80 border border-brand-cardBorder hover:border-brand-red/50 transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-brand-red/10 border border-brand-red/30 flex items-center justify-center text-brand-red group-hover:bg-brand-red group-hover:text-white transition-colors mb-3">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-heading text-sm font-bold text-white uppercase tracking-wider mb-1">
                      {feat.title}
                    </h4>
                    <p className="text-xs text-gray-400 leading-normal">{feat.desc}</p>
                  </div>
                );
              })}
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
