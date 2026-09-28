import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Dumbbell, User, LogOut, LayoutDashboard, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAdmin } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT US', path: '/about' },
    { name: 'PROGRAMS', path: '/programs' },
    { name: 'TRAINERS', path: '/trainers' },
    { name: 'GALLERY', path: '/gallery' },
    { name: 'PRICING', path: '/pricing' },
    { name: 'CONTACT', path: '/contact' },
  ];

  const handleNavClick = (path) => {
    setMobileMenuOpen(false);
    if (path.startsWith('/#')) {
      const element = document.querySelector(path.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
        scrolled
          ? 'bg-brand-black/90 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl'
          : 'bg-gradient-to-b from-black/90 via-black/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-lg bg-brand-red flex items-center justify-center shadow-red-glow group-hover:scale-105 transition-transform">
            <Dumbbell className="w-6 h-6 text-white transform -rotate-45" />
          </div>
          <div>
            <div className="flex items-center tracking-wider">
              <span className="font-heading text-2xl font-extrabold text-white tracking-widest">FIT</span>
              <span className="font-heading text-2xl font-extrabold text-brand-red tracking-widest">ONE</span>
            </div>
            <p className="text-[9px] font-bold text-gray-400 tracking-[0.25em] uppercase -mt-1">FITNESS CLUB</p>
          </div>
        </Link>

        {/* DESKTOP NAVIGATION LINKS */}
        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => handleNavClick(link.path)}
                className={`text-xs font-bold tracking-widest transition-colors relative py-1 ${
                  isActive ? 'text-brand-red' : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-red rounded-full"
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* RIGHT ACTION BUTTONS */}
        <div className="hidden lg:flex items-center gap-4">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-3 bg-brand-darkCharcoal border border-brand-cardBorder hover:border-brand-red px-4 py-2 rounded-full transition-all"
              >
                <div className="w-7 h-7 rounded-full bg-brand-red text-white text-xs font-bold flex items-center justify-center uppercase">
                  {user.name.charAt(0)}
                </div>
                <span className="text-xs font-semibold text-white">{user.name.split(' ')[0]}</span>
              </button>

              <AnimatePresence>
                {userDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-3 w-56 bg-brand-cardBg border border-brand-cardBorder rounded-xl shadow-2xl py-2 overflow-hidden z-50 backdrop-blur-xl"
                  >
                    <div className="px-4 py-2 border-b border-white/10">
                      <p className="text-xs font-bold text-white truncate">{user.name}</p>
                      <p className="text-[10px] text-gray-400 truncate">{user.email}</p>
                      <span className="inline-block mt-1 text-[9px] font-bold px-2 py-0.5 rounded bg-brand-red/20 text-brand-red uppercase">
                        {user.role}
                      </span>
                    </div>

                    {isAdmin ? (
                      <Link
                        to="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-gray-300 hover:bg-brand-red hover:text-white transition-colors"
                      >
                        <Shield className="w-4 h-4" /> Admin Dashboard
                      </Link>
                    ) : (
                      <Link
                        to="/dashboard"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-gray-300 hover:bg-brand-red hover:text-white transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4" /> Member Dashboard
                      </Link>
                    )}

                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                        navigate('/');
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-red-400 hover:bg-red-500/10 transition-colors border-t border-white/10"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="text-xs font-bold tracking-wider text-gray-300 hover:text-white px-3 py-2 transition-colors"
              >
                SIGN IN
              </Link>
              <Link
                to="/pricing"
                className="bg-brand-red hover:bg-brand-brightRed text-white text-xs font-extrabold tracking-widest px-6 py-2.5 rounded-full shadow-red-glow hover:shadow-red-glow-lg transition-all duration-300 uppercase transform hover:-translate-y-0.5"
              >
                JOIN NOW
              </Link>
            </div>
          )}
        </div>

        {/* MOBILE HAMBURGER BUTTON */}
        <div className="lg:hidden flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-brand-darkCharcoal text-white hover:text-brand-red focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE NAV DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-brand-black/95 backdrop-blur-2xl border-b border-brand-cardBorder overflow-hidden"
          >
            <div className="px-6 pt-4 pb-8 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className={`text-sm font-bold tracking-widest py-2 border-b border-white/5 ${
                    location.pathname === link.path ? 'text-brand-red' : 'text-gray-300'
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              {user ? (
                <div className="pt-2 flex flex-col gap-3">
                  <Link
                    to={isAdmin ? '/admin' : '/dashboard'}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 bg-brand-darkCharcoal text-white font-bold text-xs py-3 rounded-lg border border-brand-cardBorder"
                  >
                    <User className="w-4 h-4 text-brand-red" /> DASHBOARD ({user.name})
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-xs font-bold text-red-400 py-2"
                  >
                    LOG OUT
                  </button>
                </div>
              ) : (
                <div className="pt-2 flex flex-col gap-3">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-center text-xs font-bold text-white py-3 rounded-lg border border-white/20"
                  >
                    SIGN IN
                  </Link>
                  <Link
                    to="/pricing"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-center bg-brand-red text-white text-xs font-extrabold py-3.5 rounded-lg tracking-widest uppercase shadow-red-glow"
                  >
                    JOIN NOW
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
