import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Clock, IndianRupee, Dumbbell, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProgramModal = ({ program, isOpen, onClose }) => {
  if (!isOpen || !program) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-2xl bg-brand-cardBg border border-brand-cardBorder rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
        >
          {/* Header Banner */}
          <div className="relative h-48 sm:h-64 overflow-hidden shrink-0">
            <img
              src={program.image}
              alt={program.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-cardBg via-black/40 to-transparent" />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-brand-red transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="absolute bottom-4 left-6 right-6">
              <span className="inline-block bg-brand-red text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-1 shadow-red-glow">
                SPECIALIZED PROGRAM
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white tracking-wide uppercase">
                {program.title}
              </h2>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 overflow-y-auto space-y-6 text-gray-300 text-sm">
            <p className="leading-relaxed text-gray-200">{program.details || program.description}</p>

            <div className="grid grid-cols-2 gap-4 bg-brand-darkCharcoal p-4 rounded-xl border border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-brand-red/10 border border-brand-red/30 flex items-center justify-center text-brand-red">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">Duration</p>
                  <p className="font-bold text-white">{program.duration || '12 Weeks'}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-brand-red/10 border border-brand-red/30 flex items-center justify-center text-brand-red">
                  <IndianRupee className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">Program Price</p>
                  <p className="font-bold text-white">₹{program.price?.toLocaleString() || '2,499'}</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-heading text-base font-bold text-white uppercase tracking-wider mb-3">
                KEY PROGRAM HIGHLIGHTS
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {program.features?.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 bg-white/5 p-3 rounded-lg border border-white/5">
                    <CheckCircle2 className="w-4 h-4 text-brand-red shrink-0" />
                    <span className="text-xs text-gray-200 font-medium">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="p-4 bg-brand-darkCharcoal border-t border-white/10 flex items-center justify-between gap-4 shrink-0">
            <button
              onClick={onClose}
              className="px-5 py-2.5 text-xs font-bold text-gray-400 hover:text-white transition-colors"
            >
              CLOSE
            </button>
            <Link
              to="/contact"
              onClick={onClose}
              className="bg-brand-red hover:bg-brand-brightRed text-white text-xs font-bold px-6 py-2.5 rounded-lg shadow-red-glow uppercase transition-all"
            >
              ENROLL IN PROGRAM NOW
            </Link>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProgramModal;
