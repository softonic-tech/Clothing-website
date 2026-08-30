import React from 'react';
import { useShop } from '../../context/ShopContext';
import { Category } from '../../types';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface CollectionCardProps {
  title: string;
  category: Category;
  subtitle: string;
  image: string;
  itemCount: number;
}

const COLLECTIONS: CollectionCardProps[] = [
  {
    title: "Women's Atelier",
    category: "Women",
    subtitle: "Bias-cut silk, sculpted baratheas, and fluid knitwear.",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85",
    itemCount: 8
  },
  {
    title: "Men's Studio",
    category: "Men",
    subtitle: "Double-breasted overcoats, Japanese selvedge, and fine merino.",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85",
    itemCount: 6
  },
  {
    title: "Everyday Essentials",
    category: "Essentials",
    subtitle: "Heavyweight organic tees, cashmere wraps, and calfskin totes.",
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1200&q=85",
    itemCount: 5
  }
];

export const CollectionsGrid: React.FC = () => {
  const { navigateTo } = useShop();

  return (
    <section className="py-20 lg:py-28 bg-[#F5F2ED] border-t border-[rgba(26,26,26,0.15)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[rgba(26,26,26,0.15)]">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#1A1A1A]/60 block mb-2 font-medium">
              Curated Divisions
            </span>
            <h2 className="serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#1A1A1A]">
              Explore the Collections
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-sm text-[#1A1A1A]/70 max-w-md font-light">
            Each collection is thoughtfully designed around distinct proportions and natural fiber structures.
          </p>
        </div>

        {/* 3-Column Visual Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {COLLECTIONS.map((col, idx) => (
            <motion.div
              key={col.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              onClick={() => navigateTo('shop', col.category)}
              className="group relative h-[480px] lg:h-[540px] overflow-hidden bg-[#1A1A1A] cursor-pointer border border-[rgba(26,26,26,0.15)]"
            >
              {/* Image with subtle zoom on hover */}
              <img
                src={col.image}
                alt={col.title}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-95"
                loading="lazy"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#141211]/90 via-[#141211]/30 to-transparent transition-opacity group-hover:from-[#141211]/95" />

              {/* Top Item Count Tag */}
              <div className="absolute top-5 left-5 z-10">
                <span className="text-[10px] tracking-widest text-[#E8DCD1] bg-black/50 backdrop-blur-xs px-2.5 py-1 border border-white/10 uppercase font-semibold">
                  {col.category}
                </span>
              </div>

              {/* Bottom Content */}
              <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 z-10 text-[#F5F2ED] flex flex-col justify-end">
                <h3 className="serif text-2xl sm:text-3xl text-white font-light group-hover:text-[#E8D0C3] transition-colors">
                  {col.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#D1C9BE] mt-2 font-light line-clamp-2 leading-relaxed">
                  {col.subtitle}
                </p>

                <div className="mt-5 flex items-center space-x-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#E8DCD1] group-hover:text-white transition-colors">
                  <span>Explore Wardrobe</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
