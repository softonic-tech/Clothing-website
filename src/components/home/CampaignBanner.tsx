import React from 'react';
import { useShop } from '../../context/ShopContext';
import { STORE_CONFIG } from '../../data/config';
import { ArrowRight, Compass, Shield, Wind, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export const CampaignBanner: React.FC = () => {
  const { navigateTo } = useShop();

  return (
    <section className="relative bg-[#1A1A1A] text-[#F5F2ED] overflow-hidden py-24 sm:py-32 lg:py-36 border-t border-[rgba(26,26,26,0.15)]">
      {/* Editorial High-Resolution Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2200&q=88"
          alt="PEPLAB Made to Move Campaign"
          className="w-full h-full object-cover object-[50%_35%] opacity-40 scale-105 filter saturate-90"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A] via-[#1A1A1A]/80 to-transparent sm:w-2/3" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-[#1A1A1A]/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl">
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center space-x-2 text-[10px] uppercase tracking-[0.25em] text-[#D5C4B4] mb-4 font-semibold"
          >
            <span className="w-6 h-px bg-[#630D16]" />
            <span>Campaign Manifesto</span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="serif text-4xl sm:text-5xl lg:text-6xl font-light text-[#F5F2ED] leading-tight"
          >
            {STORE_CONFIG.campaignHeadline}
          </motion.h2>

          {/* Body Copy */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-sm sm:text-base text-[#D4CDC2] font-light leading-relaxed"
          >
            Clothing should never restrict your momentum. By cutting on the natural bias and deploying high-twist Italian wools, PEPLAB garments deliver sharp sartorial geometry that effortlessly flexes with every stride.
          </motion.p>

          {/* Pillars */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 grid grid-cols-2 gap-4 text-xs font-mono text-[#BFB6A8] pt-6 border-t border-white/15"
          >
            <div className="flex items-center space-x-2.5">
              <Wind className="w-4 h-4 text-[#D5C4B4]" />
              <span>Weightless 16-Gauge Knits</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <Shield className="w-4 h-4 text-[#D5C4B4]" />
              <span>Unlined Silk Seams</span>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <button
              type="button"
              onClick={() => navigateTo('shop', 'Tailoring')}
              className="px-7 py-3.5 bg-[#630D16] hover:bg-[#4D0910] text-[#F5F2ED] text-[11px] font-bold tracking-[0.2em] uppercase transition-colors flex items-center space-x-2 cursor-pointer shadow-lg"
            >
              <span>Explore Modern Tailoring</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => navigateTo('story')}
              className="px-7 py-3.5 bg-white/10 hover:bg-white/20 text-[#F5F2ED] border border-white/30 text-[11px] font-bold tracking-[0.2em] uppercase transition-colors cursor-pointer"
            >
              <span>Read The Studio Story</span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
