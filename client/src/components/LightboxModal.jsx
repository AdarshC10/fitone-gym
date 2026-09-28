import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Tag } from 'lucide-react';

const LightboxModal = ({ image, isOpen, onClose }) => {
  if (!isOpen || !image) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative max-w-5xl w-full max-h-[90vh] bg-brand-black border border-brand-cardBorder rounded-2xl overflow-hidden shadow-2xl flex flex-col"
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-brand-cardBg">
            <div className="flex items-center gap-3">
              <span className="bg-brand-red text-white text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wider flex items-center gap-1">
                <Tag className="w-3 h-3" /> {image.category || 'FITONE'}
              </span>
              <h3 className="font-heading text-lg font-bold text-white tracking-wide uppercase truncate max-w-md">
                {image.title}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden p-2">
            <img
              src={image.image}
              alt={image.title}
              className="max-h-[75vh] w-auto object-contain rounded-lg"
            />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default LightboxModal;
