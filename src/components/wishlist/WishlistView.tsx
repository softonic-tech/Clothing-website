import React from 'react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../shop/ProductCard';
import { Heart, ArrowRight, ShoppingBag, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';

export const WishlistView: React.FC = () => {
  const { wishlist, navigateTo } = useShop();

  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="min-h-screen bg-[#FBF9F5] py-8 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-[#E8E2D8] pb-6 mb-8 flex flex-col sm:flex-row sm:items-end justify-between">
          <div>
            <nav className="text-[11px] font-mono uppercase tracking-widest text-[#8C847A] mb-2">
              <span>Client Vault</span> / <span className="text-[#1C1B1A]">Curated Wishlist</span>
            </nav>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#1C1B1A]">
              Your Saved Wardrobe
            </h1>
          </div>

          <p className="text-xs sm:text-sm font-mono text-[#6E675E] mt-3 sm:mt-0">
            <span className="font-semibold text-[#1C1B1A]">{wishlistedProducts.length}</span> saved {wishlistedProducts.length === 1 ? 'garment' : 'garments'}
          </p>
        </div>

        {wishlistedProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {wishlistedProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24 bg-white border border-[#E8E2D8] p-8 max-w-2xl mx-auto space-y-4"
          >
            <div className="w-16 h-16 bg-[#F5EFE6] rounded-full mx-auto flex items-center justify-center text-[#6E2D3E]">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#1C1B1A] font-light">
              Your wishlist is currently empty
            </h3>
            <p className="text-xs sm:text-sm text-[#7D766D] leading-relaxed max-w-md mx-auto">
              Save your favorite tailored silhouettes, Italian cashmere knitwear, and runway coats while browsing. They will remain saved here across your visits.
            </p>
            <button
              type="button"
              onClick={() => navigateTo('shop')}
              className="mt-4 inline-flex items-center space-x-2 px-8 py-3.5 bg-[#1C1B1A] hover:bg-[#6E2D3E] text-white text-xs font-semibold uppercase tracking-[0.2em] transition-colors cursor-pointer"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
