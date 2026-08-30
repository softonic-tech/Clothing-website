import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useShop } from '../../context/ShopContext';
import { ProductSize, ProductColor } from '../../types';
import { X, ShoppingBag, Heart, ArrowRight, Check, Ruler } from 'lucide-react';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    closeQuickView,
    openProductDetail,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setIsSizeGuideOpen
  } = useShop();

  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);

  useEffect(() => {
    if (quickViewProduct) {
      setSelectedColor(quickViewProduct.colors[0]);
      setSelectedSize(null);
      setActiveImageIndex(0);
      setQuantity(1);
      setSizeError(false);
    }
  }, [quickViewProduct]);

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && quickViewProduct) {
        closeQuickView();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [quickViewProduct, closeQuickView]);

  if (!quickViewProduct) return null;

  const wishlisted = isInWishlist(quickViewProduct.id);

  const handleColorChange = (color: ProductColor, idx: number) => {
    setSelectedColor(color);
    if (color.imageIndex !== undefined && quickViewProduct.images[color.imageIndex]) {
      setActiveImageIndex(color.imageIndex);
    } else {
      setActiveImageIndex(idx % quickViewProduct.images.length);
    }
  };

  const handleAdd = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    addToCart(quickViewProduct, selectedSize, selectedColor || quickViewProduct.colors[0], quantity, true);
    closeQuickView();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={closeQuickView}
          className="fixed inset-0 bg-[#1C1B1A]/70 backdrop-blur-xs"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative bg-[#FBF9F5] border border-[#E8E2D8] max-w-3xl w-full shadow-2xl overflow-hidden z-10 my-auto"
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={closeQuickView}
            className="absolute top-4 right-4 z-20 p-2 bg-white/90 hover:bg-white text-[#1C1B1A] transition-colors cursor-pointer border border-[#E0D7C9]"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image Preview */}
            <div className="relative aspect-[3/4] md:aspect-auto bg-[#F4EFE6] overflow-hidden">
              <img
                src={quickViewProduct.images[activeImageIndex] || quickViewProduct.images[0]}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover object-center"
              />
              {/* Image selector dots */}
              <div className="absolute bottom-3 inset-x-0 flex items-center justify-center space-x-1.5">
                {quickViewProduct.images.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveImageIndex(i)}
                    className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                      activeImageIndex === i ? 'bg-[#1C1B1A] w-5' : 'bg-black/30'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Details & Controls */}
            <div className="p-6 sm:p-8 flex flex-col justify-between space-y-5">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#8C847A] block mb-1">
                  {quickViewProduct.subcategory}
                </span>

                <h3 className="font-serif text-2xl text-[#1C1B1A] font-light leading-snug">
                  {quickViewProduct.name}
                </h3>

                <div className="mt-2 flex items-baseline space-x-2">
                  <span className="text-xl font-mono font-semibold text-[#1C1B1A]">
                    ${quickViewProduct.price}
                  </span>
                  {quickViewProduct.originalPrice && (
                    <span className="text-xs text-[#8C847A] line-through font-mono">
                      ${quickViewProduct.originalPrice}
                    </span>
                  )}
                </div>

                <p className="text-xs text-[#6B645B] mt-3 line-clamp-3 leading-relaxed">
                  {quickViewProduct.description}
                </p>
              </div>

              {/* Color Selector */}
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#7D766D] block mb-1.5">
                  Color: <strong className="text-[#1C1B1A]">{selectedColor?.name}</strong>
                </span>
                <div className="flex items-center space-x-2">
                  {quickViewProduct.colors.map((c, idx) => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => handleColorChange(c, idx)}
                      className={`w-5 h-5 rounded-full border transition-transform cursor-pointer ${
                        selectedColor?.name === c.name
                          ? 'ring-2 ring-offset-1 ring-[#1C1B1A] scale-110'
                          : 'border-black/20 hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#7D766D]">
                    Size: <strong className="text-[#1C1B1A]">{selectedSize || 'Choose size'}</strong>
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      closeQuickView();
                      setIsSizeGuideOpen(true);
                    }}
                    className="text-[11px] font-mono text-[#6E2D3E] hover:underline uppercase flex items-center space-x-1 cursor-pointer"
                  >
                    <Ruler className="w-3 h-3" />
                    <span>Guide</span>
                  </button>
                </div>
                <div className="grid grid-cols-5 gap-1.5">
                  {quickViewProduct.sizes.map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => {
                        setSelectedSize(sz);
                        setSizeError(false);
                      }}
                      className={`py-2 text-xs font-mono border transition-all cursor-pointer ${
                        selectedSize === sz
                          ? 'bg-[#1C1B1A] text-white border-[#1C1B1A]'
                          : 'bg-white text-[#2C2926] border-[#E0D7C9] hover:border-[#1C1B1A]'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
                {sizeError && (
                  <p className="mt-1.5 text-[11px] text-[#B83232] font-mono">
                    * Please choose a size before adding.
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="space-y-2 pt-2 border-t border-[#E8E2D8]">
                <button
                  type="button"
                  onClick={handleAdd}
                  className="w-full py-3.5 bg-[#1C1B1A] hover:bg-[#6E2D3E] text-white text-xs font-semibold tracking-[0.2em] uppercase transition-colors flex items-center justify-center space-x-2 cursor-pointer shadow-md"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag • ${quickViewProduct.price * quantity}</span>
                </button>

                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={() => toggleWishlist(quickViewProduct.id)}
                    className="text-xs font-mono uppercase text-[#4A453E] hover:text-[#6E2D3E] flex items-center space-x-1.5 cursor-pointer"
                  >
                    <Heart className={`w-3.5 h-3.5 ${wishlisted ? 'fill-[#6E2D3E] text-[#6E2D3E]' : ''}`} />
                    <span>{wishlisted ? 'Saved in Wishlist' : 'Save to Wishlist'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      closeQuickView();
                      openProductDetail(quickViewProduct);
                    }}
                    className="text-xs font-mono uppercase text-[#1C1B1A] hover:text-[#6E2D3E] flex items-center space-x-1 cursor-pointer font-medium"
                  >
                    <span>Full Product Details</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
