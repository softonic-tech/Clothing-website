import React, { useState } from 'react';
import { LOOKBOOKS } from '../../data/lookbooks';
import { PRODUCTS } from '../../data/products';
import { useShop } from '../../context/ShopContext';
import { ArrowRight, Plus, ShoppingBag, Eye, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../../types';

export const ShoppableLookbookSection: React.FC = () => {
  const { openProductDetail, openQuickView, addToCart, addToast } = useShop();
  const [selectedLookId, setSelectedLookId] = useState(LOOKBOOKS[0].id);
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(null);

  const currentLook = LOOKBOOKS.find((l) => l.id === selectedLookId) || LOOKBOOKS[0];

  // Linked products
  const lookProducts: Product[] = currentLook.productIds
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p));

  const totalLookPrice = lookProducts.reduce((acc, p) => acc + p.price, 0);

  const handleAddAllToBag = () => {
    // Add each product with first available size
    lookProducts.forEach((p) => {
      addToCart(p, p.sizes[0], p.colors[0], 1, false);
    });
    addToast({
      type: 'bag',
      title: 'Complete Outfit Added',
      message: `${currentLook.title} (${lookProducts.length} pieces) added to your shopping bag.`
    });
  };

  return (
    <section id="lookbook" className="py-20 lg:py-28 bg-[#F5F2ED] border-t border-[rgba(26,26,26,0.15)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[rgba(26,26,26,0.15)]">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#1A1A1A]/60 block mb-2 font-medium">
              Editorial Styling Lab
            </span>
            <h2 className="serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#1A1A1A]">
              Shoppable Lookbook
            </h2>
          </div>

          {/* Look Switcher Tabs */}
          <div className="mt-6 md:mt-0 flex items-center space-x-2 sm:space-x-4 overflow-x-auto no-scrollbar">
            {LOOKBOOKS.map((look) => (
              <button
                key={look.id}
                type="button"
                onClick={() => {
                  setSelectedLookId(look.id);
                  setActiveHotspotId(null);
                }}
                className={`text-[11px] font-semibold uppercase tracking-[0.2em] px-4 py-2.5 transition-all cursor-pointer whitespace-nowrap ${
                  selectedLookId === look.id
                    ? 'bg-[#1A1A1A] text-[#F5F2ED]'
                    : 'bg-white/80 text-[#1A1A1A]/70 hover:text-[#1A1A1A] hover:bg-white border border-[rgba(26,26,26,0.1)]'
                }`}
              >
                {look.title.split(':')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Look Content Grid: Main Photo with interactive pins + Outfit Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Main Visual with Hotspots (7 Cols) */}
          <div className="lg:col-span-7 relative bg-[#1A1A1A] aspect-[4/5] overflow-hidden shadow-md group border border-[rgba(26,26,26,0.15)]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentLook.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full relative"
              >
                <img
                  src={currentLook.image}
                  alt={currentLook.title}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                {/* Hotspot Pins */}
                {currentLook.hotspots?.map((spot) => {
                  const targetProduct = PRODUCTS.find((p) => p.id === spot.productId);
                  if (!targetProduct) return null;
                  const isHovered = activeHotspotId === spot.productId;

                  return (
                    <div
                      key={spot.productId}
                      className="absolute z-20 transform -translate-x-1/2 -translate-y-1/2"
                      style={{ top: `${spot.top}%`, left: `${spot.left}%` }}
                    >
                      {/* Pulse Circle */}
                      <button
                        type="button"
                        onClick={() => openProductDetail(targetProduct)}
                        onMouseEnter={() => setActiveHotspotId(spot.productId)}
                        onMouseLeave={() => setActiveHotspotId(null)}
                        className="relative w-8 h-8 rounded-full bg-[#1A1A1A]/80 hover:bg-[#630D16] text-white flex items-center justify-center backdrop-blur-xs border border-white/60 transition-transform active:scale-95 cursor-pointer"
                        aria-label={`Shop ${spot.title}`}
                      >
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-25" />
                        <Plus className="w-4 h-4 text-white" />
                      </button>

                      {/* Tooltip Card */}
                      <AnimatePresence>
                        {isHovered && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 5 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 5 }}
                            className="absolute left-10 top-1/2 -translate-y-1/2 w-48 bg-[#1A1A1A] text-white p-3 shadow-2xl border border-white/20 z-30 pointer-events-none"
                          >
                            <p className="text-[10px] text-[#D5C4B4] uppercase tracking-wider font-semibold">
                              {targetProduct.category}
                            </p>
                            <p className="text-xs serif text-white font-medium mt-0.5 line-clamp-1">
                              {targetProduct.name}
                            </p>
                            <p className="text-xs font-mono font-semibold text-[#E5D2BE] mt-1">
                              ${targetProduct.price}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-5 left-5 right-5 text-white z-10 flex items-end justify-between">
                  <div>
                    <span className="text-[10px] text-[#D5C4B4] uppercase tracking-widest block font-medium">
                      {currentLook.mood}
                    </span>
                    <h3 className="serif text-xl sm:text-2xl text-white font-light mt-0.5">
                      {currentLook.title}
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-[#B5ABA0] hidden sm:inline">
                    {currentLook.photographerCredit}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Wardrobe Breakdown & Shop All (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-baseline justify-between pb-4 border-b border-[rgba(26,26,26,0.15)]">
                <div>
                  <h4 className="serif text-2xl text-[#1A1A1A] font-light">
                    The Curated Ensemble
                  </h4>
                  <p className="text-xs text-[#1A1A1A]/70 mt-1">
                    {currentLook.subtitle}
                  </p>
                </div>
                <div className="text-right font-mono">
                  <span className="text-xs text-[#1A1A1A]/60 block">Total Look</span>
                  <span className="text-base font-semibold text-[#1A1A1A]">${totalLookPrice}</span>
                </div>
              </div>

              {/* Products List in Look */}
              <div className="mt-4 space-y-3.5">
                {lookProducts.map((prod) => (
                  <div
                    key={prod.id}
                    className="p-3 bg-white border border-[rgba(26,26,26,0.15)] hover:border-[#1A1A1A] transition-colors flex items-center justify-between group"
                  >
                    <div
                      onClick={() => openProductDetail(prod)}
                      className="flex items-center space-x-3.5 flex-1 cursor-pointer"
                    >
                      <img
                        src={prod.images[0]}
                        alt={prod.name}
                        className="w-14 h-18 object-cover bg-[#EBE7DF] flex-shrink-0"
                      />
                      <div className="min-w-0 pr-2">
                        <span className="text-[10px] uppercase text-[#1A1A1A]/50 tracking-wider block font-medium">
                          {prod.subcategory}
                        </span>
                        <h5 className="serif text-sm text-[#1A1A1A] font-medium group-hover:text-[#630D16] transition-colors truncate">
                          {prod.name}
                        </h5>
                        <span className="text-xs font-mono font-semibold text-[#1A1A1A]">
                          ${prod.price}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1.5 flex-shrink-0">
                      <button
                        type="button"
                        onClick={() => openQuickView(prod)}
                        className="p-2 text-[#1A1A1A]/70 hover:text-[#1A1A1A] hover:bg-[rgba(26,26,26,0.05)] transition-colors cursor-pointer"
                        title="Quick View"
                        aria-label={`Quick view ${prod.name}`}
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => openProductDetail(prod)}
                        className="px-3 py-1.5 bg-[#1A1A1A] hover:bg-[#630D16] text-[#F5F2ED] text-[11px] font-bold tracking-wider uppercase transition-colors cursor-pointer"
                      >
                        Select
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Add Whole Outfit Button */}
            <div className="pt-4 border-t border-[rgba(26,26,26,0.15)]">
              <button
                type="button"
                onClick={handleAddAllToBag}
                className="w-full py-4 bg-[#630D16] hover:bg-[#4D0910] text-[#F5F2ED] text-[11px] font-bold tracking-[0.2em] uppercase transition-colors shadow-md flex items-center justify-center space-x-2.5 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add Complete Outfit to Bag (${totalLookPrice})</span>
              </button>
              <p className="text-[11px] text-center text-[#1A1A1A]/60 font-mono mt-2">
                Garments will be added in default studio standard sizes. You can customize sizes in your bag.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
