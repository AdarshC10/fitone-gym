import React from 'react';
import PricingSection from '../components/PricingSection';
import CtaSection from '../components/CtaSection';
import { HelpCircle } from 'lucide-react';

const PricingPage = () => {
  const faqs = [
    {
      q: 'Are there any hidden joining fees or long-term contracts?',
      a: 'No hidden fees at all! All prices shown are transparent monthly rates. You can renew or cancel month-to-month.'
    },
    {
      q: 'What is included in Personal Training sessions?',
      a: 'Personal Training sessions include 1-on-1 direct instruction, customized workout plan creation, diet consultation, and form correction.'
    },
    {
      q: 'Can I pause my membership if I am traveling?',
      a: 'Yes, members on Premium and Ultimate plans can freeze their membership for up to 14 days per year.'
    },
    {
      q: 'What are the gym operating hours?',
      a: 'We are open Monday through Saturday from 5:00 AM to 10:00 PM, and Sunday from 6:00 AM to 1:00 PM.'
    }
  ];

  return (
    <div className="pt-24 min-h-screen bg-brand-black">
      <div className="relative py-20 bg-brand-darkCharcoal border-b border-brand-cardBorder overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-3">
          <span className="text-xs font-bold tracking-widest text-brand-red uppercase bg-brand-red/10 px-3.5 py-1.5 rounded-full border border-brand-red/30 inline-block">
            MEMBERSHIP TIERS
          </span>
          <h1 className="font-heading text-4xl sm:text-6xl font-extrabold uppercase text-white tracking-tight">
            AFFORDABLE <span className="text-brand-red text-glow-red">PRICING</span>
          </h1>
          <p className="text-gray-400 text-sm max-w-xl mx-auto">
            Invest in your health with flexible monthly plans tailored to your budget and training requirements.
          </p>
        </div>
      </div>

      <PricingSection />

      {/* FAQs */}
      <section className="py-20 bg-brand-black border-t border-brand-cardBorder">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-2">
            <span className="text-xs font-bold tracking-widest text-brand-red uppercase">GOT QUESTIONS?</span>
            <h2 className="font-heading text-3xl font-bold uppercase text-white">FREQUENTLY ASKED QUESTIONS</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-brand-cardBg border border-brand-cardBorder p-6 rounded-2xl">
                <h3 className="font-heading text-base font-bold text-white uppercase flex items-center gap-2 mb-2">
                  <HelpCircle className="w-4 h-4 text-brand-red shrink-0" /> {faq.q}
                </h3>
                <p className="text-xs text-gray-300 leading-relaxed pl-6">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </div>
  );
};

export default PricingPage;
