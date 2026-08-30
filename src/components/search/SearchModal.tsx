import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS } from '../../data/products';
import { Product } from '../../types';
import { Search, X, ArrowRight, Sparkles, TrendingUp } from 'lucide-react';

const TRENDING_SEARCHES = ['Cashmere Mockneck', 'Wool Trench Coat', 'Wide-Leg Trouser', 'Silk Slip Dress', 'Selvedge Chino'];

export const SearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    openProductDetail,
    navigateTo,
    setSearchQuery: setGlobalSearchQuery
  } = useShop();

  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when modal opens
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  // Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  // Filter products live
  const searchResults: Product[] = query.trim()
    ? PRODUCTS.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.subcategory.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.colors.some((c) => c.name.toLowerCase().includes(q))
        );
      })
    : [];

  const handleSelectProduct = (product: Product) => {
    setIsSearchOpen(false);
    openProductDetail(product);
  };

  const handleSearchAll = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setGlobalSearchQuery(query.trim());
    setIsSearchOpen(false);
    navigateTo('shop');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => setIsSearchOpen(false)}
          className="fixed inset-0 bg-[#1C1B1A]/75 backdrop-blur-xs"
        />

        {/* Search Panel Container */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative bg-[#FBF9F5] border-b border-[#E8E2D8] shadow-2xl z-10 w-full"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Search Input Bar */}
            <form onSubmit={handleSearchAll} className="relative flex items-center border-b-2 border-[#1C1B1A] pb-3">
              <Search className="w-6 h-6 text-[#8C847A] mr-3 flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by garment name, category, fiber (e.g. Cashmere, Silk, Trench)..."
                className="w-full bg-transparent text-lg sm:text-xl font-serif text-[#1C1B1A] placeholder-[#9C948A] focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="p-1 text-[#8C847A] hover:text-[#1C1B1A] cursor-pointer mr-2"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="p-1 text-[#6E675E] hover:text-[#1C1B1A] transition-colors cursor-pointer"
                aria-label="Close search"
              >
                <X className="w-6 h-6" />
              </button>
            </form>

            {/* Trending Suggestions when no query */}
            {!query.trim() && (
              <div className="mt-6 space-y-4">
                <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-[#8C847A]">
                  <TrendingUp className="w-3.5 h-3.5 text-[#6E2D3E]" />
                  <span>Trending Sartorial Inquiries</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {TRENDING_SEARCHES.map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => setQuery(term)}
                      className="px-3.5 py-1.5 bg-[#F2EDE3] hover:bg-[#1C1B1A] text-[#3E3A35] hover:text-white text-xs font-mono uppercase transition-colors cursor-pointer border border-[#E3DCD1]"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Live Search Results */}
            {query.trim() && (
              <div className="mt-6">
                <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D8] text-xs font-mono text-[#8C847A]">
                  <span>{searchResults.length} Garments Found</span>
                  {searchResults.length > 0 && (
                    <button
                      type="button"
                      onClick={handleSearchAll}
                      className="text-[#6E2D3E] hover:underline uppercase font-medium flex items-center space-x-1 cursor-pointer"
                    >
                      <span>View in catalog</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {searchResults.length > 0 ? (
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-[55vh] overflow-y-auto pr-1">
                    {searchResults.map((prod) => (
                      <div
                        key={prod.id}
                        onClick={() => handleSelectProduct(prod)}
                        className="p-3 bg-white border border-[#E8E2D8] hover:border-[#6E2D3E] transition-colors flex items-center space-x-3 cursor-pointer group"
                      >
                        <img
                          src={prod.images[0]}
                          alt={prod.name}
                          className="w-14 h-18 object-cover bg-[#F5F2EB] flex-shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <span className="text-[10px] uppercase font-mono text-[#8C847A] block">
                            {prod.category}
                          </span>
                          <h4 className="font-serif text-sm text-[#1C1B1A] group-hover:text-[#6E2D3E] transition-colors truncate">
                            {prod.name}
                          </h4>
                          <span className="text-xs font-mono font-semibold text-[#1C1B1A]">
                            ${prod.price}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center text-xs font-mono text-[#7D766D] space-y-2">
                    <p>No matching garments found for "{query}".</p>
                    <p>Try searching for "Wool", "Cashmere", "Trench", or "Silk".</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
