import React, { useState, useEffect } from 'react';
import { Product, ProductSize, ProductColor } from '../../types';
import { PRODUCTS } from '../../data/products';
import { useShop } from '../../context/ShopContext';
import { ProductCard } from './ProductCard';
import { Heart, ShoppingBag, Ruler, Check, Truck, RefreshCw, ChevronDown, ChevronUp, Sparkles, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

interface ProductDetailViewProps {
  product: Product;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({ product }) => {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    navigateTo,
    setIsSizeGuideOpen
  } = useShop();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  // Accordion states
  const [openAccordions, setOpenAccordions] = useState<{ [key: string]: boolean }>({
    details: true,
    fabric: false,
    fit: false,
    shipping: false
  });

  const toggleAccordion = (key: string) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const wishlisted = isInWishlist(product.id);

  // Reset states when product changes
  useEffect(() => {
    setActiveImageIndex(0);
    setSelectedColor(product.colors[0]);
    setSelectedSize(null);
    setQuantity(1);
    setSizeError(false);
  }, [product]);

  const handleSizeSelect = (sz: ProductSize) => {
    setSelectedSize(sz);
    setSizeError(false);
  };

  const handleColorSelect = (color: ProductColor, idx: number) => {
    setSelectedColor(color);
    if (color.imageIndex !== undefined && product.images[color.imageIndex]) {
      setActiveImageIndex(color.imageIndex);
    } else {
      setActiveImageIndex(idx % product.images.length);
    }
  };

  const handleAddToBag = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }

    setIsAdding(true);
    addToCart(product, selectedSize, selectedColor, quantity, true);
    setTimeout(() => {
      setIsAdding(false);
    }, 500);
  };

  // Related products
  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.category === 'Essentials')
  ).slice(0, 4);

  return (
    <div className="bg-[#FBF9F5] py-8 sm:py-14 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#E8E2D8] text-xs font-mono uppercase tracking-wider text-[#8C847A]">
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => navigateTo('shop')}
              className="hover:text-[#1C1B1A] flex items-center space-x-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Collection</span>
            </button>
            <span>/</span>
            <button
              type="button"
              onClick={() => navigateTo('shop', product.category)}
              className="hover:text-[#1C1B1A] cursor-pointer"
            >
              {product.category}
            </button>
            <span>/</span>
            <span className="text-[#1C1B1A] font-medium truncate max-w-[160px] sm:max-w-xs">
              {product.name}
            </span>
          </div>

          <span className="hidden sm:inline text-[#7A736A]">
            Product Reference: {product.id.toUpperCase()}
          </span>
        </div>

        {/* Main Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Multi-Image Gallery (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnail Rail */}
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto no-scrollbar md:w-24 flex-shrink-0">
              {product.images.map((imgUrl, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 md:w-full aspect-[3/4] bg-[#F4EFE6] overflow-hidden border transition-all cursor-pointer flex-shrink-0 ${
                    activeImageIndex === idx
                      ? 'border-[#1C1B1A] ring-1 ring-[#1C1B1A]'
                      : 'border-[#E8E2D8] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt={`${product.name} view ${idx + 1}`}
                    className="w-full h-full object-cover object-center"
                  />
                </button>
              ))}
            </div>

            {/* Large Primary Display */}
            <div className="flex-1 relative aspect-[3/4] bg-[#F4EFE6] border border-[#E8E2D8] overflow-hidden group">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />

              {product.tag && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="text-[11px] font-mono tracking-wider uppercase px-2.5 py-1 bg-[#1C1B1A] text-white font-medium">
                    {product.tag}
                  </span>
                </div>
              )}

              {/* Quick Wishlist on Image */}
              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#1C1B1A] flex items-center justify-center shadow-md transition-transform active:scale-95 cursor-pointer"
                aria-label="Toggle wishlist"
              >
                <Heart
                  className={`w-4 h-4 ${
                    wishlisted ? 'fill-[#6E2D3E] text-[#6E2D3E]' : 'text-[#2E2B27]'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Right Column: Garment Details, Selectors, and Purchase CTA (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#8C847A] mb-1.5">
                <span>{product.subcategory}</span>
                <span>•</span>
                <span>Autumn/Winter Atelier</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl text-[#1C1B1A] font-light leading-tight">
                {product.name}
              </h1>

              {/* Price */}
              <div className="mt-3 flex items-baseline space-x-3">
                <span className="text-2xl font-serif text-[#1C1B1A] font-medium">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-[#8C847A] line-through font-mono">
                    ${product.originalPrice}
                  </span>
                )}
                <span className="text-xs text-[#6E2D3E] font-mono font-medium">
                  Tax & Duties Included
                </span>
              </div>

              {product.editorialQuote && (
                <p className="mt-3 text-sm italic font-serif text-[#6E675E] bg-[#F5EFE6] p-3 border-l-2 border-[#6E2D3E]">
                  {product.editorialQuote}
                </p>
              )}
            </div>

            {/* Color Swatch Selector */}
            <div className="pt-2 border-t border-[#E8E2D8]">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs font-mono uppercase tracking-wider text-[#7D766D]">
                  Selected Color: <strong className="text-[#1C1B1A]">{selectedColor.name}</strong>
                </span>
              </div>

              <div className="flex items-center space-x-3">
                {product.colors.map((color, idx) => (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() => handleColorSelect(color, idx)}
                    className={`flex items-center space-x-2 px-3 py-1.5 border transition-all cursor-pointer ${
                      selectedColor.name === color.name
                        ? 'border-[#1C1B1A] bg-white ring-1 ring-[#1C1B1A]'
                        : 'border-[#E0D7C9] bg-[#FBF9F5] hover:border-[#1C1B1A]'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/20"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="text-xs font-medium text-[#1C1B1A]">{color.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector with Mandatory Validation */}
            <div className="pt-2 border-t border-[#E8E2D8]">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs font-mono uppercase tracking-wider text-[#7D766D]">
                  Select Size: <strong className="text-[#1C1B1A]">{selectedSize || 'Required'}</strong>
                </span>

                <button
                  type="button"
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-xs text-[#6E2D3E] hover:underline font-mono uppercase flex items-center space-x-1 cursor-pointer"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Size & Fit Guide</span>
                </button>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => handleSizeSelect(sz)}
                    className={`py-3 text-xs font-mono font-medium border transition-all cursor-pointer ${
                      selectedSize === sz
                        ? 'bg-[#1C1B1A] text-white border-[#1C1B1A] shadow-xs'
                        : 'bg-white text-[#2C2926] border-[#E0D7C9] hover:border-[#1C1B1A]'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>

              {sizeError && (
                <p className="mt-2 text-xs text-[#B83232] font-mono animate-fade-in flex items-center space-x-1">
                  <span>* Please select a garment size before adding to your bag.</span>
                </p>
              )}
            </div>

            {/* Quantity and Primary Action */}
            <div className="pt-4 space-y-3">
              <div className="flex items-center space-x-3">
                {/* Quantity Stepper */}
                <div className="flex items-center border border-[#D5CDBD] bg-white h-12">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3.5 text-[#5C554C] hover:text-[#1C1B1A] text-sm font-mono cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-mono font-semibold text-[#1C1B1A]">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3.5 text-[#5C554C] hover:text-[#1C1B1A] text-sm font-mono cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Primary Add to Bag Button */}
                <button
                  type="button"
                  onClick={handleAddToBag}
                  disabled={isAdding}
                  className="flex-1 h-12 bg-[#1C1B1A] hover:bg-[#6E2D3E] text-white text-xs font-semibold tracking-[0.2em] uppercase transition-colors duration-200 shadow-md flex items-center justify-center space-x-2.5 cursor-pointer disabled:opacity-50"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{isAdding ? 'Adding...' : `Add to Bag • $${product.price * quantity}`}</span>
                </button>
              </div>

              {/* Wishlist and Concierge Secondary Bar */}
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={() => toggleWishlist(product.id)}
                  className={`w-full py-3 px-4 border text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center space-x-2 cursor-pointer ${
                    wishlisted
                      ? 'border-[#6E2D3E] bg-[#F7EDF0] text-[#6E2D3E]'
                      : 'border-[#D5CDBD] bg-white text-[#2C2926] hover:border-[#1C1B1A]'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${wishlisted ? 'fill-[#6E2D3E]' : ''}`} />
                  <span>{wishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
                </button>
              </div>
            </div>

            {/* Quick Guarantees */}
            <div className="py-4 border-y border-[#E8E2D8] grid grid-cols-2 gap-3 text-xs font-mono text-[#6E675E]">
              <div className="flex items-center space-x-2">
                <Truck className="w-4 h-4 text-[#6E2D3E]" />
                <span>Complimentary Delivery &gt; $150</span>
              </div>
              <div className="flex items-center space-x-2">
                <RefreshCw className="w-4 h-4 text-[#6E2D3E]" />
                <span>30-Day Studio Returns</span>
              </div>
            </div>

            {/* Collapsible Accordions */}
            <div className="space-y-2 pt-2">
              {/* 1. Description & Details */}
              <div className="border border-[#E8E2D8] bg-white">
                <button
                  type="button"
                  onClick={() => toggleAccordion('details')}
                  className="w-full p-4 flex items-center justify-between text-left text-xs uppercase tracking-[0.2em] font-semibold text-[#1C1B1A] cursor-pointer"
                >
                  <span>Sartorial Details & Cut</span>
                  {openAccordions.details ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordions.details && (
                  <div className="p-4 pt-0 text-xs text-[#5C564E] space-y-2 border-t border-[#F4EFE6]">
                    <p className="leading-relaxed">{product.description}</p>
                    <ul className="list-disc pl-4 space-y-1 pt-2 font-mono">
                      {product.details.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* 2. Fabric & Care */}
              <div className="border border-[#E8E2D8] bg-white">
                <button
                  type="button"
                  onClick={() => toggleAccordion('fabric')}
                  className="w-full p-4 flex items-center justify-between text-left text-xs uppercase tracking-[0.2em] font-semibold text-[#1C1B1A] cursor-pointer"
                >
                  <span>Materials & Fiber Care</span>
                  {openAccordions.fabric ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordions.fabric && (
                  <div className="p-4 pt-0 text-xs text-[#5C564E] space-y-2 border-t border-[#F4EFE6]">
                    <ul className="list-disc pl-4 space-y-1 font-mono">
                      {product.fabricAndCare.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* 3. Fit & Model Info */}
              <div className="border border-[#E8E2D8] bg-white">
                <button
                  type="button"
                  onClick={() => toggleAccordion('fit')}
                  className="w-full p-4 flex items-center justify-between text-left text-xs uppercase tracking-[0.2em] font-semibold text-[#1C1B1A] cursor-pointer"
                >
                  <span>Fit Advice & Model Measurements</span>
                  {openAccordions.fit ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordions.fit && (
                  <div className="p-4 pt-0 text-xs text-[#5C564E] space-y-2 border-t border-[#F4EFE6]">
                    <p className="leading-relaxed">{product.fitInfo}</p>
                    {product.modelInfo && (
                      <p className="font-mono text-[#7D766D] bg-[#F7F4EC] p-2.5 border border-[#E8E2D8]">
                        Model: {product.modelInfo}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Carousel / Grid */}
        <div className="mt-20 sm:mt-28 pt-12 border-t border-[#E8E2D8]">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] font-mono text-[#8C847A] block mb-1">
                Complete the Capsule
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#1C1B1A] font-light">
                Companions in Design
              </h3>
            </div>
            <button
              type="button"
              onClick={() => navigateTo('shop', product.category)}
              className="text-xs uppercase tracking-wider text-[#6E2D3E] hover:underline font-mono cursor-pointer"
            >
              View More {product.category} →
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((relProd) => (
              <ProductCard key={relProd.id} product={relProd} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
