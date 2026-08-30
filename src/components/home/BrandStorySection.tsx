import React from 'react';
import { useShop } from '../../context/ShopContext';
import { ArrowRight, Compass, Sparkles, Feather, Scissors, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export const BrandStorySection: React.FC = () => {
  const { navigateTo } = useShop();

  return (
    <section id="story-section" className="py-20 lg:py-28 bg-[#F5F2ED] border-t border-[rgba(26,26,26,0.15)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Editorial Visual (5 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[3/4] bg-[#1A1A1A] overflow-hidden shadow-md border border-[rgba(26,26,26,0.15)]">
              <img
                src="https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1200&q=85"
                alt="PEPLAB Atelier Patternmaking"
                className="w-full h-full object-cover object-center filter saturate-95"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-[10px] tracking-widest text-[#D5C4B4] uppercase block">
                  Studio Archive 04 / Soho
                </span>
                <p className="serif text-lg text-[#F5F2ED] font-light mt-1">
                  “Pattern drafting begins on the human body in natural motion.”
                </p>
              </div>
            </div>

            {/* Decorative Offset Stamp */}
            <div className="absolute -bottom-6 -right-6 hidden sm:flex flex-col items-center justify-center w-28 h-28 bg-[#630D16] text-[#F5F2ED] p-3 text-center shadow-lg border border-white/20">
              <span className="serif text-2xl font-bold">100%</span>
              <span className="text-[9px] uppercase tracking-wider text-[#F5F2ED]/80 mt-0.5 font-medium">
                Surplus Fibers
              </span>
            </div>
          </motion.div>

          {/* Thoughtful Editorial Copy (7 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-7 space-y-6"
          >
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] mb-4 bg-[#630D16] px-2.5 py-1 text-[#F5F2ED] inline-block font-semibold">
                In Focus
              </span>
              <p className="serif text-2xl sm:text-3xl lg:text-4xl leading-relaxed mb-6 italic text-[#1A1A1A]/90 font-light">
                ‘We believe that the garments we wear daily should possess the same craft and intention as high-art objects.’
              </p>
            </div>

            <p className="text-sm sm:text-base text-[#1A1A1A]/70 leading-relaxed font-normal">
              PEPLAB is a design studio exploring the intersection of architectural geometry and wearable textile. Each piece is crafted in small batches using surplus high-end fabrics from heritage European and Japanese mills.
            </p>

            {/* Craft Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[rgba(26,26,26,0.15)]">
              <div className="flex items-start space-x-3">
                <Scissors className="w-5 h-5 text-[#630D16] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1A1A1A]">
                    Architectural Draping
                  </h4>
                  <p className="text-xs text-[#1A1A1A]/60 mt-1">
                    Bias-cut panels that contour naturally to your anatomy without restrictive stiffness.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Feather className="w-5 h-5 text-[#630D16] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1A1A1A]">
                    Featherweight Warmth
                  </h4>
                  <p className="text-xs text-[#1A1A1A]/60 mt-1">
                    16-gauge micro-ribbing and double-faced construction providing thermal comfort with zero bulk.
                  </p>
                </div>
              </div>
            </div>

            {/* Action */}
            <div className="pt-4 flex items-center space-x-6">
              <button
                type="button"
                onClick={() => navigateTo('story')}
                className="inline-flex items-center space-x-2 text-xs font-bold tracking-[0.2em] uppercase text-[#1A1A1A] hover:text-[#630D16] transition-colors border-b border-[#1A1A1A] hover:border-[#630D16] pb-1 cursor-pointer"
              >
                <span>Read The Manifesto</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <span className="text-xs uppercase tracking-widest text-[#1A1A1A]/50">
                London — Tokyo — New York
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
