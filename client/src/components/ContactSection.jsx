import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, Mail, Send, Loader2 } from 'lucide-react';
import API from '../services/api';
import { useToast } from '../context/ToastContext';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    program: 'Strength Training',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }

    setLoading(true);
    try {
      const res = await API.post('/contact', formData);
      if (res.data.success) {
        showToast('Your message has been sent successfully!', 'success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          program: 'Strength Training',
          message: ''
        });
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to submit form. Please try again.';
      showToast(errorMsg, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-brand-darkCharcoal relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold tracking-widest text-brand-red uppercase bg-brand-red/10 px-3.5 py-1.5 rounded-full border border-brand-red/30 inline-block">
            GET IN TOUCH
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
            CONTACT <span className="text-brand-red text-glow-red">FITONE</span>
          </h2>
          <p className="text-gray-400 text-sm">
            Have questions about membership, training, or timing? Drop us a line and our coaches will get back to you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: CONTACT INFO */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-8 bg-brand-black p-8 sm:p-10 rounded-3xl border border-brand-cardBorder shadow-2xl"
          >
            <div>
              <h3 className="font-heading text-2xl font-extrabold text-white uppercase tracking-wider mb-2">
                FITONE FITNESS CLUB
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Visit our state-of-the-art facility or get in touch with our team directly.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-red/10 border border-brand-red/30 flex items-center justify-center text-brand-red shrink-0 shadow-lg">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Phone Number</p>
                  <p className="text-base font-bold text-white mt-1">+91 9636296119</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-red/10 border border-brand-red/30 flex items-center justify-center text-brand-red shrink-0 shadow-lg">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Club Location</p>
                  <p className="text-base font-bold text-white mt-1">MANGODE</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-red/10 border border-brand-red/30 flex items-center justify-center text-brand-red shrink-0 shadow-lg">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email Address</p>
                  <p className="text-sm font-bold text-white mt-1 break-all">fitonefitnessclub@gmail.com</p>
                </div>
              </div>
            </div>

            {/* Timings */}
            <div className="pt-6 border-t border-white/10 space-y-2">
              <p className="text-xs font-bold text-brand-red uppercase tracking-wider">WORKING HOURS</p>
              <p className="text-xs text-gray-300">Monday – Saturday: 5:00 AM – 10:00 PM</p>
              <p className="text-xs text-gray-300">Sunday: 6:00 AM – 1:00 PM</p>
            </div>
          </motion.div>

          {/* RIGHT: CONTACT FORM */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 bg-brand-cardBg p-8 sm:p-10 rounded-3xl border border-brand-cardBorder shadow-2xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Rohit Sharma"
                    required
                    className="w-full bg-brand-darkCharcoal border border-brand-cardBorder rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-red transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="rohit@gmail.com"
                    required
                    className="w-full bg-brand-darkCharcoal border border-brand-cardBorder rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-red transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 9636296119"
                    required
                    className="w-full bg-brand-darkCharcoal border border-brand-cardBorder rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-red transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                    Select Program
                  </label>
                  <select
                    name="program"
                    value={formData.program}
                    onChange={handleChange}
                    className="w-full bg-brand-darkCharcoal border border-brand-cardBorder rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-red transition-colors"
                  >
                    <option value="Strength Training">Strength Training</option>
                    <option value="Cardio Training">Cardio Training</option>
                    <option value="Personal Training">Personal Training</option>
                    <option value="Functional Training">Functional Training</option>
                    <option value="General Inquiry">General Membership</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                  Your Message *
                </label>
                <textarea
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your fitness goals or questions..."
                  required
                  className="w-full bg-brand-darkCharcoal border border-brand-cardBorder rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-red transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand-red hover:bg-brand-brightRed text-white font-heading text-sm font-extrabold py-4 rounded-xl shadow-red-glow hover:shadow-red-glow-lg transition-all duration-300 uppercase tracking-widest flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> SENDING MESSAGE...
                  </>
                ) : (
                  <>
                    SEND MESSAGE <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default ContactSection;
