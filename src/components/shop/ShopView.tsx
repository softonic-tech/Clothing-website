import React, { useState, useMemo, useEffect } from 'react';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from './ProductCard';
import { useShop } from '../../context/ShopContext';
import { Category, ProductSize, SortOption } from '../../types';
import { Filter, X, SlidersHorizontal, ArrowUpDown, Search, RotateCcw, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const CATEGORIES: Category[] = ['All', 'Women', 'Men', 'Essentials', 'Outerwear', 'Knitwear', 'Tailoring'];
const SIZES: ProductSize[] = ['XS', 'S', 'M', 'L', 'XL', 'One Size'];
const COLOR_OPTIONS = [
  { name: 'Ivory / White', hex: '#F5F3EC' },
  { name: 'Charcoal / Black', hex: '#22201E' },
  { name: 'Burgundy / Plum', hex: '#6E2D3E' },
  { name: 'Camel / Taupe', hex: '#CABAA6' },
  { name: 'Navy / Blue', hex: '#1A2230' },
  { name: 'Olive / Green', hex: '#3E493F' }
];

export const ShopView: React.FC = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    openProductDetail
  } = useShop();

  const [selectedSizes, setSelectedSizes] = useState<ProductSize[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(550);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const toggleSize = (size: ProductSize) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const toggleColor = (colorName: string) => {
    setSelectedColors((prev) =>
      prev.includes(colorName) ? prev.filter((c) => c !== colorName) : [...prev, colorName]
    );
  };

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedSizes([]);
    setSelectedColors([]);
    setMaxPrice(550);
    setSortBy('featured');
    setOnlyInStock(false);
    setSearchQuery('');
  };

  const hasActiveFilters =
    selectedCategory !== 'All' ||
    selectedSizes.length > 0 ||
    selectedColors.length > 0 ||
    maxPrice < 550 ||
    onlyInStock ||
    Boolean(searchQuery.trim());

  // Filter & Sort logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Category filter
      if (selectedCategory !== 'All') {
        if (p.category !== selectedCategory) {
          return false;
        }
      }

      // Search Query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesCategory = p.category.toLowerCase().includes(q);
        const matchesSubcategory = p.subcategory.toLowerCase().includes(q);
        const matchesDescription = p.description.toLowerCase().includes(q);
        const matchesColor = p.colors.some((c) => c.name.toLowerCase().includes(q));
        if (!matchesName && !matchesCategory && !matchesSubcategory && !matchesDescription && !matchesColor) {
          return false;
        }
      }

      // Sizes filter
      if (selectedSizes.length > 0) {
        const hasMatchingSize = selectedSizes.some((sz) => p.sizes.includes(sz));
        if (!hasMatchingSize) return false;
      }

      // Colors filter
      if (selectedColors.length > 0) {
        const hasMatchingColor = selectedColors.some((filterCol) => {
          const keywords = filterCol.toLowerCase().split(' / ');
          return p.colors.some((c) =>
            keywords.some((kw) => c.name.toLowerCase().includes(kw))
          );
        });
        if (!hasMatchingColor) return false;
      }

      // Price filter
      if (p.price > maxPrice) return false;

      // In Stock filter
      if (onlyInStock && !p.inStock) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      return 0; // default featured
    });
  }, [selectedCategory, searchQuery, selectedSizes, selectedColors, maxPrice, onlyInStock, sortBy]);

  return (
    <div className="min-h-screen bg-[#FBF9F5] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="border-b border-[#E8E2D8] pb-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between">
            <div>
              <nav className="text-[11px] font-mono uppercase tracking-widest text-[#8C847A] mb-2">
                <span>Studio</span> / <span className="text-[#1C1B1A]">Wardrobe Collection</span>
              </nav>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#1C1B1A]">
                {selectedCategory === 'All' ? 'Complete Collection' : `${selectedCategory} Atelier`}
              </h1>
            </div>

            <p className="text-xs sm:text-sm text-[#6E675E] font-mono mt-3 md:mt-0">
              Showing <span className="font-semibold text-[#1C1B1A]">{filteredProducts.length}</span> crafted pieces
            </p>
          </div>

          {/* Category Tabs */}
          <div className="mt-6 flex items-center space-x-2 overflow-x-auto no-scrollbar pb-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs uppercase tracking-wider px-4 py-2 border transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#1C1B1A] text-white border-[#1C1B1A] font-semibold'
                    : 'bg-white text-[#57524B] border-[#E5DFD4] hover:border-[#1C1B1A] hover:text-[#1C1B1A]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Toolbar (Filters trigger & Sorting) */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 border border-[#E8E2D8] mb-8">
          {/* Active Filter Chips / Mobile Toggle */}
          <div className="flex items-center space-x-3 flex-wrap gap-y-2">
            <button
              type="button"
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="lg:hidden flex items-center space-x-2 px-3.5 py-2 bg-[#1C1B1A] text-white text-xs uppercase tracking-wider font-semibold cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters {hasActiveFilters && '•'}</span>
            </button>

            {hasActiveFilters && (
              <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                {searchQuery && (
                  <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 bg-[#F4EFE6] border border-[#DDD4C5] text-[11px] font-mono text-[#1C1B1A]">
                    <span>Search: "{searchQuery}"</span>
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="hover:text-[#6E2D3E] cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {selectedSizes.map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center space-x-1.5 px-2.5 py-1 bg-[#F4EFE6] border border-[#DDD4C5] text-[11px] font-mono text-[#1C1B1A]"
                  >
                    <span>Size: {s}</span>
                    <button
                      type="button"
                      onClick={() => toggleSize(s)}
                      className="hover:text-[#6E2D3E] cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {selectedColors.map((c) => (
                  <span
                    key={c}
                    className="inline-flex items-center space-x-1.5 px-2.5 py-1 bg-[#F4EFE6] border border-[#DDD4C5] text-[11px] font-mono text-[#1C1B1A]"
                  >
                    <span>{c}</span>
                    <button
                      type="button"
                      onClick={() => toggleColor(c)}
                      className="hover:text-[#6E2D3E] cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {maxPrice < 550 && (
                  <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 bg-[#F4EFE6] border border-[#DDD4C5] text-[11px] font-mono text-[#1C1B1A]">
                    <span>Under ${maxPrice}</span>
                    <button
                      type="button"
                      onClick={() => setMaxPrice(550)}
                      className="hover:text-[#6E2D3E] cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-[11px] text-[#6E2D3E] hover:underline font-mono uppercase tracking-wider flex items-center space-x-1 ml-2 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset All</span>
                </button>
              </div>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center space-x-2 ml-auto">
            <span className="text-xs uppercase tracking-wider font-mono text-[#7D766D] hidden sm:inline">
              Sort By:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-[#FBF9F5] border border-[#DCD5C9] text-xs uppercase tracking-wider px-3 py-2 text-[#1C1B1A] focus:outline-none focus:border-[#6E2D3E] cursor-pointer"
            >
              <option value="featured">Featured Curations</option>
              <option value="newest">Newest Arrivals</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Alphabetical (A–Z)</option>
            </select>
          </div>
        </div>

        {/* Layout: Desktop Sticky Sidebar Filters + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Filter Sidebar (3 Cols) */}
          <aside className="hidden lg:block lg:col-span-3 bg-white p-6 border border-[#E8E2D8] space-y-6 sticky top-28">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D8]">
              <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#1C1B1A]">
                Filter Catalog
              </h3>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-[11px] text-[#6E2D3E] hover:underline font-mono uppercase cursor-pointer"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Size Filter */}
            <div>
              <h4 className="text-xs uppercase tracking-wider font-mono text-[#7D766D] mb-3">
                Size
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {SIZES.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => toggleSize(size)}
                    className={`py-2 text-xs font-mono border transition-colors cursor-pointer ${
                      selectedSizes.includes(size)
                        ? 'bg-[#1C1B1A] text-white border-[#1C1B1A]'
                        : 'bg-[#FBF9F5] text-[#3D3934] border-[#E3DCD1] hover:border-[#1C1B1A]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Filter */}
            <div>
              <h4 className="text-xs uppercase tracking-wider font-mono text-[#7D766D] mb-3">
                Color Palette
              </h4>
              <div className="space-y-2">
                {COLOR_OPTIONS.map((col) => (
                  <label
                    key={col.name}
                    className="flex items-center space-x-3 text-xs text-[#3E3A36] cursor-pointer hover:text-[#1C1B1A]"
                  >
                    <input
                      type="checkbox"
                      checked={selectedColors.includes(col.name)}
                      onChange={() => toggleColor(col.name)}
                      className="rounded-none text-[#6E2D3E] focus:ring-0 cursor-pointer"
                    />
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/10 inline-block"
                      style={{ backgroundColor: col.hex }}
                    />
                    <span>{col.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range Slider */}
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-[#7D766D] uppercase">Max Price:</span>
                <span className="font-semibold text-[#1C1B1A]">${maxPrice}</span>
              </div>
              <input
                type="range"
                min={50}
                max={550}
                step={10}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#6E2D3E] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-[#8C847A] mt-1">
                <span>$50</span>
                <span>$550</span>
              </div>
            </div>

            {/* In Stock Only */}
            <div className="pt-2 border-t border-[#E8E2D8]">
              <label className="flex items-center space-x-2.5 text-xs text-[#3E3A36] cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                  className="rounded-none text-[#6E2D3E] focus:ring-0 cursor-pointer"
                />
                <span>In Stock & Ready to Ship</span>
              </label>
            </div>
          </aside>

          {/* Mobile Filter Drawer / Dropdown */}
          <AnimatePresence>
            {isMobileFilterOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:hidden col-span-1 bg-white p-6 border border-[#E8E2D8] mb-6 space-y-6 overflow-hidden"
              >
                <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D8]">
                  <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#1C1B1A]">
                    Filter Garments
                  </h3>
                  <button
                    type="button"
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="p-1 text-[#6E675E]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Sizes */}
                <div>
                  <h4 className="text-xs uppercase font-mono text-[#7D766D] mb-2">Sizes</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {SIZES.map((sz) => (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => toggleSize(sz)}
                        className={`py-2 text-xs font-mono border ${
                          selectedSizes.includes(sz)
                            ? 'bg-[#1C1B1A] text-white border-[#1C1B1A]'
                            : 'bg-[#FBF9F5] border-[#E3DCD1]'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mobile Colors */}
                <div>
                  <h4 className="text-xs uppercase font-mono text-[#7D766D] mb-2">Palette</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {COLOR_OPTIONS.map((col) => (
                      <label
                        key={col.name}
                        className="flex items-center space-x-2 text-xs text-[#3E3A36]"
                      >
                        <input
                          type="checkbox"
                          checked={selectedColors.includes(col.name)}
                          onChange={() => toggleColor(col.name)}
                          className="rounded-none text-[#6E2D3E]"
                        />
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/10"
                          style={{ backgroundColor: col.hex }}
                        />
                        <span className="truncate">{col.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Mobile Price Slider */}
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span>Max Price</span>
                    <span className="font-bold">${maxPrice}</span>
                  </div>
                  <input
                    type="range"
                    min={50}
                    max={550}
                    step={10}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-[#6E2D3E]"
                  />
                </div>

                <div className="pt-4 flex space-x-3">
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="flex-1 py-2.5 border border-[#1C1B1A] text-xs font-semibold uppercase tracking-wider"
                  >
                    Reset
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="flex-1 py-2.5 bg-[#1C1B1A] text-white text-xs font-semibold uppercase tracking-wider"
                  >
                    Apply Filters
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Product Grid Area (9 Cols) */}
          <div className="lg:col-span-9">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map((prod, idx) => (
                  <ProductCard key={prod.id} product={prod} priority={idx < 6} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 bg-white border border-[#E8E2D8] p-8 space-y-4">
                <Search className="w-10 h-10 text-[#C2B8A8] mx-auto" />
                <h3 className="font-serif text-2xl text-[#1C1B1A] font-light">
                  No matching garments found
                </h3>
                <p className="text-sm text-[#7D766D] max-w-md mx-auto">
                  We could not find any garments matching your current filter criteria. Try adjusting your size, color, or price range.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="mt-4 inline-flex items-center space-x-2 px-6 py-3 bg-[#1C1B1A] text-white text-xs font-semibold uppercase tracking-wider cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All Filters</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
