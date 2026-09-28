import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell, Instagram, Facebook, MessageCircle, Phone, MapPin, Mail, Send } from 'lucide-react';
import API from '../services/api';
import { useToast } from '../context/ToastContext';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { showToast } = useToast();

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setSubmitting(true);
    try {
      const res = await API.post('/newsletter', { email });
      if (res.data.success) {
        showToast('Thank you for subscribing to FITONE newsletter!', 'success');
        setEmail('');
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Subscription failed. Try again.';
      showToast(errorMsg, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer className="bg-brand-black border-t border-brand-cardBorder relative overflow-hidden">
      {/* Background Red Accent Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-red/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* COLUMN 1: LOGO & ABOUT */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-brand-red flex items-center justify-center shadow-red-glow">
                <Dumbbell className="w-5 h-5 text-white transform -rotate-45" />
              </div>
              <div>
                <div className="flex items-center tracking-wider">
                  <span className="font-heading text-xl font-extrabold text-white">FIT</span>
                  <span className="font-heading text-xl font-extrabold text-brand-red">ONE</span>
                </div>
                <p className="text-[8px] font-bold text-gray-400 tracking-[0.2em] uppercase">FITNESS CLUB</p>
              </div>
            </Link>
            <p className="text-gray-400 text-xs leading-relaxed mb-6">
              Your fitness journey starts here. Stay strong, stay consistent and transform your body with our modern equipment and certified trainers.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-brand-cardBg border border-brand-cardBorder flex items-center justify-center text-gray-400 hover:text-brand-red hover:border-brand-red transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-brand-cardBg border border-brand-cardBorder flex items-center justify-center text-gray-400 hover:text-brand-red hover:border-brand-red transition-all"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/919636296119"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-brand-cardBg border border-brand-cardBorder flex items-center justify-center text-gray-400 hover:text-brand-red hover:border-brand-red transition-all"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* COLUMN 2: QUICK LINKS */}
          <div>
            <h4 className="font-heading text-sm font-bold tracking-widest text-white uppercase mb-5 relative inline-block">
              QUICK LINKS
              <span className="absolute -bottom-1.5 left-0 w-8 h-[2px] bg-brand-red" />
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              {['Home', 'About Us', 'Programs', 'Trainers', 'Gallery', 'Pricing', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '')}`}
                    className="hover:text-brand-red transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-brand-red text-xs">›</span> {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: OUR PROGRAMS */}
          <div>
            <h4 className="font-heading text-sm font-bold tracking-widest text-white uppercase mb-5 relative inline-block">
              OUR PROGRAMS
              <span className="absolute -bottom-1.5 left-0 w-8 h-[2px] bg-brand-red" />
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              {['Strength Training', 'Cardio Training', 'Personal Training', 'Functional Training'].map((prog) => (
                <li key={prog}>
                  <Link to="/programs" className="hover:text-brand-red transition-colors flex items-center gap-1.5">
                    <span className="text-brand-red text-xs">›</span> {prog}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 4: CONTACT US */}
          <div>
            <h4 className="font-heading text-sm font-bold tracking-widest text-white uppercase mb-5 relative inline-block">
              CONTACT US
              <span className="absolute -bottom-1.5 left-0 w-8 h-[2px] bg-brand-red" />
            </h4>
            <ul className="space-y-3.5 text-xs text-gray-400">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
                <span>+91 9636296119</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
                <span>MANGODE</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
                <span className="break-all">fitonefitnessclub@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* COLUMN 5: NEWSLETTER */}
          <div>
            <h4 className="font-heading text-sm font-bold tracking-widest text-white uppercase mb-5 relative inline-block">
              NEWSLETTER
              <span className="absolute -bottom-1.5 left-0 w-8 h-[2px] bg-brand-red" />
            </h4>
            <p className="text-gray-400 text-xs leading-relaxed mb-4">
              Subscribe to get updates and special offers from Fitone Fitness Club.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-brand-cardBg border border-brand-cardBorder rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-brand-red transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-brand-red hover:bg-brand-brightRed text-white text-xs font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all shadow-red-glow uppercase"
              >
                {submitting ? 'SUBSCRIBING...' : (
                  <>
                    SUBSCRIBE <Send className="w-3 h-3" />
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT */}
        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-500 gap-4">
          <p>© 2026 Fitone Fitness Club. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-gray-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-gray-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-gray-400 cursor-pointer">Rules & Guidelines</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
