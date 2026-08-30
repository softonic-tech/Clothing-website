import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useShop } from '../../context/ShopContext';
import { STORE_CONFIG } from '../../data/config';
import { X, Search, Heart, ShoppingBag, ArrowRight, Compass, Sparkles, MapPin, Phone } from 'lucide-react';
import { Category } from '../../types';

export const MobileMenu: React.FC = () => {
  const {
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    navigateTo,
    setIsSearchOpen,
    setIsWishlistOpen,
    wishlist,
    totalCartItemsCount,
    setIsBagOpen
  } = useShop();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen, setIsMobileMenuOpen]);

  // Lock scroll when open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleNav = (page: 'home' | 'shop' | 'lookbook' | 'story' | 'wishlist', category?: Category) => {
    setIsMobileMenuOpen(false);
    navigateTo(page, category);
  };

  return (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-[#1C1B1A]/60 backdrop-blur-xs"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Menu Drawer */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed inset-y-0 left-0 w-full max-w-sm bg-[#FBF9F5] shadow-2xl flex flex-col justify-between overflow-y-auto border-r border-[#E8E2D8]"
          >
            {/* Header */}
            <div className="p-6 border-b border-[#E8E2D8] flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-serif text-2xl tracking-[0.2em] uppercase font-light text-[#1C1B1A]">
                  {STORE_CONFIG.brandName}
                </span>
                <span className="text-[9px] tracking-[0.3em] uppercase text-[#7D766D] font-mono">
                  Collection Directory
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-[#1C1B1A] hover:text-[#6E2D3E] transition-colors cursor-pointer"
                aria-label="Close navigation menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Quick Search Bar */}
            <div className="px-6 pt-5 pb-2">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsSearchOpen(true);
                }}
                className="w-full flex items-center justify-between px-4 py-3 bg-[#F4EFE6] border border-[#E3DCD1] text-xs text-[#6E675E] tracking-wider uppercase"
              >
                <span className="flex items-center space-x-2">
                  <Search className="w-4 h-4 text-[#8C847A]" />
                  <span>Search wardrobe...</span>
                </span>
                <span className="text-[10px] text-[#A69E94]">TAP</span>
              </button>
            </div>

            {/* Primary Nav Links */}
            <div className="px-6 py-4 flex-1 space-y-1">
              <p className="text-[10px] uppercase tracking-[0.2em] font-mono text-[#8C847A] mb-3">
                Collections & Edits
              </p>

              <button
                type="button"
                onClick={() => handleNav('shop', 'All')}
                className="w-full text-left py-2.5 flex items-center justify-between group border-b border-[#F0EBE1] cursor-pointer"
              >
                <span className="font-serif text-xl text-[#1C1B1A] group-hover:text-[#6E2D3E] transition-colors">
                  All Garments
                </span>
                <ArrowRight className="w-4 h-4 text-[#C2B7A8] group-hover:text-[#6E2D3E] transition-colors" />
              </button>

              <button
                type="button"
                onClick={() => handleNav('shop', 'Women')}
                className="w-full text-left py-2.5 flex items-center justify-between group border-b border-[#F0EBE1] cursor-pointer"
              >
                <span className="font-serif text-xl text-[#1C1B1A] group-hover:text-[#6E2D3E] transition-colors">
                  Women's Studio
                </span>
                <ArrowRight className="w-4 h-4 text-[#C2B7A8] group-hover:text-[#6E2D3E] transition-colors" />
              </button>

              <button
                type="button"
                onClick={() => handleNav('shop', 'Men')}
                className="w-full text-left py-2.5 flex items-center justify-between group border-b border-[#F0EBE1] cursor-pointer"
              >
                <span className="font-serif text-xl text-[#1C1B1A] group-hover:text-[#6E2D3E] transition-colors">
                  Men's Atelier
                </span>
                <ArrowRight className="w-4 h-4 text-[#C2B7A8] group-hover:text-[#6E2D3E] transition-colors" />
              </button>

              <button
                type="button"
                onClick={() => handleNav('shop', 'Essentials')}
                className="w-full text-left py-2.5 flex items-center justify-between group border-b border-[#F0EBE1] cursor-pointer"
              >
                <span className="font-serif text-xl text-[#1C1B1A] group-hover:text-[#6E2D3E] transition-colors">
                  Everyday Essentials
                </span>
                <ArrowRight className="w-4 h-4 text-[#C2B7A8] group-hover:text-[#6E2D3E] transition-colors" />
              </button>

              <button
                type="button"
                onClick={() => handleNav('lookbook')}
                className="w-full text-left py-2.5 flex items-center justify-between group border-b border-[#F0EBE1] cursor-pointer"
              >
                <span className="font-serif text-xl text-[#1C1B1A] group-hover:text-[#6E2D3E] transition-colors flex items-center space-x-2">
                  <span>Shoppable Lookbook</span>
                  <span className="text-[10px] uppercase font-sans font-medium px-1.5 py-0.5 bg-[#6E2D3E] text-white">
                    Editorial
                  </span>
                </span>
                <ArrowRight className="w-4 h-4 text-[#C2B7A8] group-hover:text-[#6E2D3E] transition-colors" />
              </button>

              <button
                type="button"
                onClick={() => handleNav('story')}
                className="w-full text-left py-2.5 flex items-center justify-between group border-b border-[#F0EBE1] cursor-pointer"
              >
                <span className="font-serif text-xl text-[#1C1B1A] group-hover:text-[#6E2D3E] transition-colors">
                  The PEPLAB Manifesto
                </span>
                <ArrowRight className="w-4 h-4 text-[#C2B7A8] group-hover:text-[#6E2D3E] transition-colors" />
              </button>

              {/* Sub-categories */}
              <div className="pt-4 flex flex-wrap gap-2">
                {(['Outerwear', 'Tailoring', 'Knitwear'] as Category[]).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => handleNav('shop', cat)}
                    className="text-xs uppercase tracking-wider px-3 py-1.5 bg-[#F2EDE3] text-[#4A453E] hover:bg-[#6E2D3E] hover:text-white transition-colors cursor-pointer"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Footer actions & contact */}
            <div className="p-6 bg-[#F4EFE6] border-t border-[#E8E2D8] space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsWishlistOpen(true);
                  }}
                  className="flex items-center justify-center space-x-2 py-2.5 px-3 bg-white border border-[#DDD5C7] text-xs font-medium text-[#1C1B1A] uppercase tracking-wider"
                >
                  <Heart className={`w-3.5 h-3.5 ${wishlist.length > 0 ? 'fill-[#6E2D3E] text-[#6E2D3E]' : ''}`} />
                  <span>Wishlist ({wishlist.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsBagOpen(true);
                  }}
                  className="flex items-center justify-center space-x-2 py-2.5 px-3 bg-[#1C1B1A] text-white text-xs font-medium uppercase tracking-wider"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Bag ({totalCartItemsCount})</span>
                </button>
              </div>

              <div className="text-[11px] text-[#7A736A] space-y-1 pt-1">
                <p className="flex items-center space-x-1.5">
                  <MapPin className="w-3 h-3 text-[#9E9487]" />
                  <span>Soho Flagship, 482 Mercer St, New York</span>
                </p>
                <p className="flex items-center space-x-1.5">
                  <Phone className="w-3 h-3 text-[#9E9487]" />
                  <span>Concierge: {STORE_CONFIG.contact.phone}</span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
