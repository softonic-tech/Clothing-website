import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../shop/ProductCard';
import { useShop } from '../../context/ShopContext';
import { Category } from '../../types';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export const NewArrivals: React.FC = () => {
  const { navigateTo } = useShop();
  const [activeTab, setActiveTab] = useState<'All' | 'Women' | 'Men' | 'Essentials'>('All');

  const filteredProducts = useMemo(() => {
    let list = PRODUCTS.filter((p) => p.isNewArrival);
    if (activeTab !== 'All') {
      list = list.filter((p) => p.category === activeTab || (activeTab === 'Essentials' && p.category === 'Knitwear'));
    }
    // Return top 8 items as specified
    return list.slice(0, 8);
  }, [activeTab]);

  return (
    <section className="py-20 lg:py-28 bg-[#F5F2ED] border-t border-[rgba(26,26,26,0.15)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[rgba(26,26,26,0.15)]">
          <div>
            <div className="flex items-center space-x-2 text-xs uppercase tracking-[0.25em] text-[#1A1A1A]/60 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#630D16]" />
              <span>Collection 04 / New</span>
            </div>
            <h2 className="serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#1A1A1A]">
              New Arrivals
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="mt-6 md:mt-0 flex items-center space-x-2 sm:space-x-3 overflow-x-auto no-scrollbar pb-2 md:pb-0">
            {(['All', 'Women', 'Men', 'Essentials'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`text-[11px] uppercase tracking-[0.2em] font-semibold px-3.5 py-2 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === tab
                    ? 'bg-[#1A1A1A] text-[#F5F2ED]'
                    : 'bg-transparent text-[#1A1A1A]/60 hover:text-[#1A1A1A] hover:bg-[rgba(26,26,26,0.05)]'
                }`}
              >
                {tab === 'All' ? 'All Pieces' : tab}
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Mobile, 4-Column Desktop Grid (8 items) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: (idx % 4) * 0.1 }}
            >
              <ProductCard product={product} priority={idx < 4} />
            </motion.div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-14 text-center">
          <button
            type="button"
            onClick={() => navigateTo('shop', activeTab === 'All' ? undefined : activeTab)}
            className="inline-flex items-center space-x-3 px-8 py-4 bg-transparent hover:bg-[#1A1A1A] text-[#1A1A1A] hover:text-[#F5F2ED] border border-[#1A1A1A] text-[11px] font-bold tracking-[0.2em] uppercase transition-all duration-200 cursor-pointer group"
          >
            <span>View All Pieces ({PRODUCTS.length})</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
