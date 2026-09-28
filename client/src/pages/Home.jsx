import React from 'react';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import ProgramsSection from '../components/ProgramsSection';
import GallerySection from '../components/GallerySection';
import TestimonialSection from '../components/TestimonialSection';
import PricingSection from '../components/PricingSection';
import CtaSection from '../components/CtaSection';
import ContactSection from '../components/ContactSection';

const Home = () => {
  return (
    <main className="overflow-hidden">
      <Hero />
      <AboutSection />
      <ProgramsSection />
      <GallerySection />
      <TestimonialSection />
      <PricingSection />
      <CtaSection />
      <ContactSection />
    </main>
  );
};

export default Home;
