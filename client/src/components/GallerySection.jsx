import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, Tag } from 'lucide-react';
import LightboxModal from './LightboxModal';
import API from '../services/api';

const defaultGallery = [
  {
    _id: 'g1',
    title: 'Modern Power Racks Zone',
    category: 'Equipment',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop'
  },
  {
    _id: 'g2',
    title: 'Spacious Cardio Floor',
    category: 'Interior',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop'
  },
  {
    _id: 'g3',
    title: '1-on-1 Personal Coaching',
    category: 'Training',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1200&auto=format&fit=crop'
  },
  {
    _id: 'g4',
    title: 'Heavy Dumbbell Bay',
    category: 'Equipment',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1200&auto=format&fit=crop'
  },
  {
    _id: 'g5',
    title: 'Functional Turf & Boxing Zone',
    category: 'Interior',
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1200&auto=format&fit=crop'
  },
  {
    _id: 'g6',
    title: 'Expert Coaching Team',
    category: 'Trainers',
    image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=1200&auto=format&fit=crop'
  }
];

const categories = ['ALL', 'Interior', 'Equipment', 'Training', 'Trainers'];

const GallerySection = () => {
  const [items, setItems] = useState(defaultGallery);
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await API.get('/gallery');
        if (res.data.success && res.data.data.length > 0) {
          setItems(res.data.data);
        }
      } catch (err) {
        console.log('Using default gallery fallback');
      }
    };
    fetchGallery();
  }, []);

  const filteredItems = activeCategory === 'ALL'
    ? items
    : items.filter((item) => item.category?.toLowerCase() === activeCategory.toLowerCase());

  return (
    <section id="gallery" className="py-24 bg-brand-darkCharcoal relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold tracking-widest text-brand-red uppercase bg-brand-red/10 px-3.5 py-1.5 rounded-full border border-brand-red/30 inline-block">
            INSIDE FITONE
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
            OUR <span className="text-brand-red text-glow-red">GALLERY</span>
          </h2>
          <p className="text-gray-400 text-sm">
            Take a look at our world-class gym facilities, premium equipment, live workout sessions, and vibrant community.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs font-bold px-5 py-2.5 rounded-full transition-all uppercase tracking-wider ${
                activeCategory === cat
                  ? 'bg-brand-red text-white shadow-red-glow'
                  : 'bg-brand-cardBg text-gray-400 hover:text-white border border-brand-cardBorder'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Responsive Grid: Desktop (4-col), Tablet (2-col), Mobile (1-col) */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                key={item._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                onClick={() => setSelectedImage(item)}
                className="group relative h-64 rounded-2xl overflow-hidden border border-brand-cardBorder bg-brand-black cursor-pointer shadow-lg hover:border-brand-red/60 hover:shadow-red-glow"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5">
                  <div className="flex justify-end">
                    <div className="w-8 h-8 rounded-full bg-brand-red/80 flex items-center justify-center text-white shadow-lg">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-brand-red uppercase tracking-wider bg-brand-red/20 px-2 py-0.5 rounded border border-brand-red/30">
                      {item.category}
                    </span>
                    <h4 className="font-heading text-lg font-bold text-white uppercase tracking-wide mt-1">
                      {item.title}
                    </h4>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        image={selectedImage}
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </section>
  );
};

export default GallerySection;
