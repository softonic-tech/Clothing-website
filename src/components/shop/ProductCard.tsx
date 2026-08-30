import React, { useState } from 'react';
import { Product, ProductSize, ProductColor } from '../../types';
import { useShop } from '../../context/ShopContext';
import { Heart, ShoppingBag, Eye, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, priority = false }) => {
  const {
    openProductDetail,
    openQuickView,
    addToCart,
    toggleWishlist,
    isInWishlist
  } = useShop();

  const [isHovered, setIsHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showQuickSizes, setShowQuickSizes] = useState(false);
  const [addingSize, setAddingSize] = useState<ProductSize | null>(null);

  const wishlisted = isInWishlist(product.id);

  const primaryImage = product.images[selectedImageIndex] || product.images[0];
  const secondaryImage = product.images[1] || product.images[0];

  const handleQuickAdd = (size: ProductSize, e: React.MouseEvent) => {
    e.stopPropagation();
    setAddingSize(size);
    addToCart(product, size, selectedColor, 1, true);
    setTimeout(() => {
      setAddingSize(null);
      setShowQuickSizes(false);
    }, 400);
  };

  const handleColorClick = (color: ProductColor, idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedColor(color);
    if (color.imageIndex !== undefined && product.images[color.imageIndex]) {
      setSelectedImageIndex(color.imageIndex);
    } else {
      setSelectedImageIndex(idx % product.images.length);
    }
  };

  return (
    <div
      className="group relative flex flex-col bg-[#FFFFFF] border border-[rgba(26,26,26,0.15)] hover:border-[#1A1A1A] transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowQuickSizes(false);
      }}
    >
      {/* Image Container with Aspect Ratio */}
      <div
        onClick={() => openProductDetail(product)}
        className="relative w-full aspect-[3/4] bg-[#EBE7DF] overflow-hidden cursor-pointer"
      >
        {/* Primary Image */}
        <img
          src={primaryImage}
          alt={product.name}
          loading={priority ? 'eager' : 'lazy'}
          className={`w-full h-full object-cover object-center transition-all duration-700 ease-out ${
            isHovered && secondaryImage !== primaryImage
              ? 'opacity-0 scale-105'
              : 'opacity-100 group-hover:scale-105'
          }`}
        />

        {/* Secondary Image for Hover Swap */}
        {secondaryImage && secondaryImage !== primaryImage && (
          <img
            src={secondaryImage}
            alt={`${product.name} alternate view`}
            loading="lazy"
            className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out ${
              isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
            }`}
          />
        )}

        {/* Top Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 pointer-events-none">
          {product.tag && (
            <span className="text-[10px] tracking-widest uppercase px-2 py-0.5 bg-[#1A1A1A] text-[#F5F2ED] font-semibold">
              {product.tag}
            </span>
          )}
          {product.originalPrice && (
            <span className="text-[10px] tracking-widest uppercase px-2 py-0.5 bg-[#630D16] text-[#F5F2ED] font-semibold">
              Save ${product.originalPrice - product.price}
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-[#F5F2ED]/90 hover:bg-[#F5F2ED] text-[#1A1A1A] flex items-center justify-center shadow-xs transition-transform active:scale-90 cursor-pointer"
          aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              wishlisted ? 'fill-[#630D16] text-[#630D16]' : 'text-[#1A1A1A]'
            }`}
          />
        </button>

        {/* Quick View Button on Image */}
        <div className="absolute bottom-3 left-3 right-3 z-10 hidden sm:flex space-x-2">
          {!showQuickSizes ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (product.sizes.length === 1 && product.sizes[0] === 'One Size') {
                  addToCart(product, 'One Size', selectedColor, 1, true);
                } else {
                  setShowQuickSizes(true);
                }
              }}
              className="flex-1 py-2.5 bg-[#1A1A1A]/95 hover:bg-[#630D16] text-[#F5F2ED] text-[11px] font-bold tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 shadow-md flex items-center justify-center space-x-1.5 cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>+ Quick Add</span>
            </button>
          ) : (
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full bg-[#1A1A1A] p-2 text-white shadow-xl animate-fade-in"
            >
              <p className="text-[10px] uppercase tracking-widest text-[#D1C5B8] text-center mb-1.5 font-semibold">
                Select Size:
              </p>
              <div className="flex items-center justify-center gap-1.5 flex-wrap">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={(e) => handleQuickAdd(sz, e)}
                    disabled={addingSize === sz}
                    className="min-w-[32px] h-7 px-1.5 bg-[#2E2B28] hover:bg-[#630D16] text-white text-xs font-mono border border-[#48423B] transition-colors flex items-center justify-center cursor-pointer"
                  >
                    {addingSize === sz ? <Check className="w-3 h-3 text-white" /> : sz}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              openQuickView(product);
            }}
            className="w-9 h-9 bg-[#F5F2ED]/90 hover:bg-[#F5F2ED] text-[#1A1A1A] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 shadow-md cursor-pointer"
            aria-label={`Quick view ${product.name}`}
            title="Quick view"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Subcategory & Color info */}
          <div className="flex items-center justify-between text-[10px] text-[#1A1A1A]/50 uppercase tracking-widest mb-1 font-medium">
            <span>{product.subcategory}</span>
            <span>{product.colors.length} {product.colors.length === 1 ? 'Tone' : 'Tones'}</span>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => openProductDetail(product)}
            className="serif text-base sm:text-lg text-[#1A1A1A] group-hover:text-[#630D16] transition-colors leading-snug line-clamp-1 cursor-pointer font-normal"
          >
            {product.name}
          </h3>

          {/* Price */}
          <div className="mt-1.5 flex items-baseline space-x-2">
            <span className="text-sm sm:text-base font-semibold text-[#1A1A1A] font-mono">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[#1A1A1A]/40 line-through font-mono">
                ${product.originalPrice}
              </span>
            )}
          </div>
        </div>

        {/* Color Swatches & Mobile Quick Add */}
        <div className="mt-3 pt-3 border-t border-[rgba(26,26,26,0.08)] flex items-center justify-between">
          <div className="flex items-center space-x-1.5">
            {product.colors.map((c, idx) => (
              <button
                key={c.name}
                type="button"
                onClick={(e) => handleColorClick(c, idx, e)}
                title={c.name}
                aria-label={`Select color ${c.name}`}
                className={`w-3.5 h-3.5 rounded-full border transition-all cursor-pointer ${
                  selectedColor.name === c.name
                    ? 'ring-1 ring-offset-1 ring-[#1A1A1A] scale-110'
                    : 'border-[#CCC4B8] hover:scale-105'
                }`}
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>

          {/* Mobile Quick Add Button */}
          <button
            type="button"
            onClick={() => openQuickView(product)}
            className="sm:hidden text-[11px] font-bold uppercase tracking-wider text-[#630D16] flex items-center space-x-1 py-1"
          >
            <span>Quick View</span>
          </button>
        </div>
      </div>
    </div>
  );
};
