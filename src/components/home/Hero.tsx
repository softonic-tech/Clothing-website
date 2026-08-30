import React from 'react';
import { motion } from 'motion/react';
import { useShop } from '../../context/ShopContext';
import { STORE_CONFIG } from '../../data/config';
import { ArrowRight, Sparkles, Compass } from 'lucide-react';

export const Hero: React.FC = () => {
  const { navigateTo } = useShop();

  return (
    <section 
      aria-label="New Season Campaign Hero"
      className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center bg-[#181615] overflow-hidden"
    >
      {/* Background Editorial Image with subtle zoom and warm scrim overlay */}
      <div className="absolute inset-0 z-0">
        <motion.img
          initial={{ scale: 1.08, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=2000&q=88"
          alt="PEPLAB Autumn/Winter Editorial Campaign"
          className="w-full h-full object-cover object-[50%_25%]"
          loading="eager"
        />
        {/* Editorial Gradients & Scrims for pristine contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#141211]/90 via-[#141211]/60 to-transparent sm:w-3/4" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141211]/85 via-transparent to-black/30" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 w-full">
        <div className="max-w-2xl text-white">
          {/* Collection Sub-tag */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center space-x-3 mb-4 sm:mb-6"
          >
            <span className="text-xs uppercase tracking-[0.25em] text-[#E5D7C8] font-medium">
              Collection 04 / Editorial
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#F5F2ED] leading-[0.95]"
          >
            Wear Your <br className="hidden sm:inline" />
            Everyday <br className="hidden sm:inline" />
            Extraordinary
          </motion.h1>

          {/* Supporting Copy */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-6 text-sm sm:text-base text-[#DCD5CB] font-light max-w-lg leading-relaxed"
          >
            Architectural tailoring cut from Italian virgin wool, Mongolian cashmere, and liquid silk. Engineered for geometric harmony in every movement.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5"
          >
            <button
              type="button"
              onClick={() => navigateTo('shop', 'All')}
              className="px-8 py-4 bg-[#630D16] hover:bg-[#4D0910] text-[#F5F2ED] text-[11px] font-bold tracking-[0.2em] uppercase transition-all duration-200 shadow-md flex items-center justify-center space-x-3 cursor-pointer group"
            >
              <span>Shop New Arrivals</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              type="button"
              onClick={() => navigateTo('lookbook')}
              className="px-8 py-4 bg-transparent hover:bg-white text-white hover:text-[#1A1A1A] border border-white text-[11px] font-bold tracking-[0.2em] uppercase backdrop-blur-xs transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>The Lookbook</span>
            </button>
          </motion.div>

          {/* Micro Features / Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="mt-12 sm:mt-16 pt-8 border-t border-white/15 grid grid-cols-3 gap-4 text-xs font-mono text-[#BFB6A8]"
          >
            <div>
              <p className="text-white font-medium">100% Traceable</p>
              <p className="text-[11px] text-[#9E9588] mt-0.5">Organic Certified</p>
            </div>
            <div>
              <p className="text-white font-medium">Limited Batches</p>
              <p className="text-[11px] text-[#9E9588] mt-0.5">Zero Excess Waste</p>
            </div>
            <div>
              <p className="text-white font-medium">Free Global Delivery</p>
              <p className="text-[11px] text-[#9E9588] mt-0.5">Orders Over $150</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
