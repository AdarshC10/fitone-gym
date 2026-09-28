import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import API from '../services/api';

const defaultTestimonials = [
  {
    _id: 't1',
    name: 'Rohit Sharma',
    role: 'Member since 2024',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
    message: 'Fitone has completely changed my lifestyle. The trainers are amazing and the environment keeps me motivated every day.',
    rating: 5
  },
  {
    _id: 't2',
    name: 'Priya Mehta',
    role: 'Member since 2025',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
    message: 'The best gym in town! Great equipment, friendly staff and personalized training that actually works.',
    rating: 5
  },
  {
    _id: 't3',
    name: 'Arjun Verma',
    role: 'Member since 2023',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop',
    message: "I've achieved results I never thought possible. Fitone is not just a gym, it's family.",
    rating: 5
  }
];

const TestimonialSection = () => {
  const [testimonials, setTestimonials] = useState(defaultTestimonials);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await API.get('/testimonials');
        if (res.data.success && res.data.data.length > 0) {
          setTestimonials(res.data.data);
        }
      } catch (err) {
        console.log('Using default testimonials');
      }
    };
    fetchTestimonials();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex] || defaultTestimonials[0];

  return (
    <section className="py-24 bg-brand-black relative overflow-hidden">
      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-red/10 blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold tracking-widest text-brand-red uppercase bg-brand-red/10 px-3.5 py-1.5 rounded-full border border-brand-red/30 inline-block">
            MEMBER REVIEWS
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
            WHAT OUR <span className="text-brand-red text-glow-red">MEMBERS SAY</span>
          </h2>
        </div>

        {/* Carousel Card */}
        <div className="relative bg-brand-cardBg border border-brand-cardBorder rounded-3xl p-8 sm:p-12 shadow-2xl backdrop-blur-xl">
          <Quote className="absolute top-6 right-8 w-16 h-16 text-brand-red/10" />

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col md:flex-row items-center gap-8"
            >
              {/* Profile Image */}
              <div className="relative shrink-0">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-brand-red shadow-red-glow">
                  <img
                    src={current.image}
                    alt={current.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Review Text */}
              <div className="space-y-4 text-center md:text-left flex-1">
                {/* Star Rating */}
                <div className="flex items-center justify-center md:justify-start gap-1">
                  {[...Array(current.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-brand-red text-brand-red" />
                  ))}
                </div>

                <p className="text-gray-200 text-base sm:text-lg italic leading-relaxed font-light">
                  "{current.message}"
                </p>

                <div>
                  <h4 className="font-heading text-xl font-bold text-white uppercase tracking-wider">
                    — {current.name}
                  </h4>
                  <p className="text-xs text-brand-red font-semibold">{current.role || 'FITONE Member'}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Controls */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all ${
                    currentIndex === idx ? 'w-8 bg-brand-red' : 'w-2 bg-white/20'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full bg-brand-darkCharcoal border border-brand-cardBorder hover:border-brand-red hover:text-brand-red flex items-center justify-center text-white transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full bg-brand-darkCharcoal border border-brand-cardBorder hover:border-brand-red hover:text-brand-red flex items-center justify-center text-white transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default TestimonialSection;
