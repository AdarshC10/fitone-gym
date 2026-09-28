import React from 'react';
import ProgramsSection from '../components/ProgramsSection';
import CtaSection from '../components/CtaSection';

const ProgramsPage = () => {
  return (
    <div className="pt-24 min-h-screen bg-brand-black">
      <div className="relative py-20 bg-brand-darkCharcoal border-b border-brand-cardBorder overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-3">
          <span className="text-xs font-bold tracking-widest text-brand-red uppercase bg-brand-red/10 px-3.5 py-1.5 rounded-full border border-brand-red/30 inline-block">
            TRAINING CATALOG
          </span>
          <h1 className="font-heading text-4xl sm:text-6xl font-extrabold uppercase text-white tracking-tight">
            WORKOUT <span className="text-brand-red text-glow-red">PROGRAMS</span>
          </h1>
          <p className="text-gray-400 text-sm max-w-xl mx-auto">
            Choose from specialized strength routines, fat loss HIIT, private 1-on-1 coaching, and athletic mobility programs.
          </p>
        </div>
      </div>

      <ProgramsSection />
      <CtaSection />
    </div>
  );
};

export default ProgramsPage;
