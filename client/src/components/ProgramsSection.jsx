import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, Flame, UserCheck, Activity, ArrowRight } from 'lucide-react';
import ProgramModal from './ProgramModal';
import API from '../services/api';

const defaultPrograms = [
  {
    _id: 'p1',
    title: 'STRENGTH TRAINING',
    description: 'Build muscle, increase strength and improve overall fitness with heavy compound lifts and hypertrophy protocols.',
    details: 'Our Strength Training program combines progressive overload, hypertrophy techniques, and dedicated coaching to help you build solid muscle mass and raw power safely.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop',
    icon: Dumbbell,
    features: ['Heavy Compound Lifting', 'Custom Workout Logbook', '1-on-1 Form Checks', 'Progressive Overload Tracking'],
    duration: '12 Weeks',
    price: 2499
  },
  {
    _id: 'p2',
    title: 'CARDIO TRAINING',
    description: 'Improve endurance, burn fat and keep your heart healthy with high intensity interval training and aerobic conditioning.',
    details: 'Engage in high-energy cardiovascular routines engineered to maximize caloric burn, enhance lung capacity, and boost metabolic rate.',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop',
    icon: Flame,
    features: ['HIIT & Metabolic Conditioning', 'Heart Rate Zone Monitoring', 'Fat-Burn Calorie Trackers', 'Endurance Assessments'],
    duration: '8 Weeks',
    price: 1999
  },
  {
    _id: 'p3',
    title: 'PERSONAL TRAINING',
    description: '1-on-1 training sessions tailored specifically to your individual fitness goals, body type and timeline.',
    details: 'Receive dedicated private attention from our master coaches. Includes customized exercise selection, body composition tracking, and daily accountability.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1200&auto=format&fit=crop',
    icon: UserCheck,
    features: ['Dedicated Private Coach', 'Customized Routine & Diet', 'Bi-weekly Body Scans', 'Priority Machine Access'],
    duration: 'Ongoing',
    price: 3999
  },
  {
    _id: 'p4',
    title: 'FUNCTIONAL TRAINING',
    description: 'Improve mobility, core stability, balance and real-life functional athletic strength for overall physical performance.',
    details: 'Designed for athletic movement, flexibility, joint strength, and injury prevention using kettlebells, TRX bands, and plyometrics.',
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1200&auto=format&fit=crop',
    icon: Activity,
    features: ['Kettlebell & TRX Workouts', 'Agility & Speed Drills', 'Posture & Mobility Fixes', 'Joint Injury Prevention'],
    duration: '10 Weeks',
    price: 2199
  }
];

const ProgramsSection = () => {
  const [programs, setPrograms] = useState(defaultPrograms);
  const [selectedProgram, setSelectedProgram] = useState(null);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await API.get('/programs');
        if (res.data.success && res.data.data.length > 0) {
          setPrograms(res.data.data);
        }
      } catch (err) {
        console.log('Using default programs fallback');
      }
    };
    fetchPrograms();
  }, []);

  const getIconComponent = (iconName) => {
    if (iconName === 'Flame') return Flame;
    if (iconName === 'UserCheck') return UserCheck;
    if (iconName === 'Activity') return Activity;
    return Dumbbell;
  };

  return (
    <section id="programs" className="py-24 bg-brand-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold tracking-widest text-brand-red uppercase bg-brand-red/10 px-3.5 py-1.5 rounded-full border border-brand-red/30 inline-block">
            TAILORED FITNESS GOALS
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
            OUR <span className="text-brand-red text-glow-red">PROGRAMS</span>
          </h2>
          <p className="text-gray-400 text-sm">
            Whether you want to build mass, shed fat, or level up your athletic mobility, we have a specialized program designed for your success.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.slice(0, 4).map((prog, idx) => {
            const IconComp = typeof prog.icon === 'string' ? getIconComponent(prog.icon) : (prog.icon || Dumbbell);
            return (
              <motion.div
                key={prog._id || idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative h-[420px] rounded-2xl overflow-hidden border border-brand-cardBorder bg-brand-cardBg flex flex-col justify-between p-6 transition-all duration-500 hover:-translate-y-2 hover:border-brand-red/60 hover:shadow-red-glow"
              >
                {/* Background Image & Overlay */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={prog.image}
                    alt={prog.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-40 group-hover:opacity-50"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/70 to-transparent" />
                </div>

                {/* Card Header (Icon) */}
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-brand-red/20 border border-brand-red/40 flex items-center justify-center text-brand-red group-hover:bg-brand-red group-hover:text-white transition-colors shadow-lg">
                    <IconComp className="w-6 h-6" />
                  </div>
                </div>

                {/* Card Content & Action */}
                <div className="relative z-10 space-y-3">
                  <h3 className="font-heading text-xl font-extrabold uppercase text-white tracking-wide group-hover:text-brand-red transition-colors">
                    {prog.title}
                  </h3>
                  <p className="text-gray-300 text-xs leading-relaxed line-clamp-3">
                    {prog.description}
                  </p>
                  
                  <button
                    onClick={() => setSelectedProgram(prog)}
                    className="pt-2 text-xs font-extrabold tracking-widest text-brand-red hover:text-white flex items-center gap-2 group-hover:translate-x-1 transition-all uppercase"
                  >
                    LEARN MORE <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Detail Modal */}
      <ProgramModal
        program={selectedProgram}
        isOpen={!!selectedProgram}
        onClose={() => setSelectedProgram(null)}
      />
    </section>
  );
};

export default ProgramsSection;
