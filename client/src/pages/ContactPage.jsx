import React from 'react';
import ContactSection from '../components/ContactSection';

const ContactPage = () => {
  return (
    <div className="pt-24 min-h-screen bg-brand-black">
      <div className="relative py-20 bg-brand-darkCharcoal border-b border-brand-cardBorder overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-3">
          <span className="text-xs font-bold tracking-widest text-brand-red uppercase bg-brand-red/10 px-3.5 py-1.5 rounded-full border border-brand-red/30 inline-block">
            REACH OUT
          </span>
          <h1 className="font-heading text-4xl sm:text-6xl font-extrabold uppercase text-white tracking-tight">
            CONTACT <span className="text-brand-red text-glow-red">US</span>
          </h1>
          <p className="text-gray-400 text-sm max-w-xl mx-auto">
            Ready to start? Visit us in Mangode or send us a message below.
          </p>
        </div>
      </div>

      <ContactSection />
    </div>
  );
};

export default ContactPage;
