import React, { useState, useEffect } from 'react';
import { useShop } from '../../context/ShopContext';
import { STORE_CONFIG } from '../../data/config';
import { Search, Heart, ShoppingBag, User, Menu, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    activePage,
    selectedCategory,
    navigateTo,
    totalCartItemsCount,
    wishlist,
    setIsBagOpen,
    setIsWishlistOpen,
    setIsSearchOpen,
    setIsMobileMenuOpen,
    setIsAccountModalOpen
  } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      id="main-header"
      className={`sticky top-0 z-30 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F5F2ED]/95 backdrop-blur-md border-b border-[rgba(26,26,26,0.15)] shadow-xs py-3.5'
          : 'bg-[#F5F2ED] border-b border-[rgba(26,26,26,0.12)] py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Mobile Menu Button (Left on mobile) */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 -ml-2 text-[#1A1A1A] hover:text-[#630D16] transition-colors cursor-pointer"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-[#1A1A1A] hover:text-[#630D16] transition-colors cursor-pointer"
              aria-label="Search collection"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>

          {/* Desktop Left Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 text-[11px] uppercase tracking-[0.2em] font-semibold text-[#1A1A1A]">
            <button
              type="button"
              onClick={() => navigateTo('shop', 'Women')}
              className={`hover:opacity-60 transition-opacity relative py-1 cursor-pointer ${
                activePage === 'shop' && selectedCategory === 'Women' ? 'text-[#630D16]' : ''
              }`}
            >
              Women
              {activePage === 'shop' && selectedCategory === 'Women' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#630D16]" />
              )}
            </button>
            <button
              type="button"
              onClick={() => navigateTo('shop', 'Men')}
              className={`hover:opacity-60 transition-opacity relative py-1 cursor-pointer ${
                activePage === 'shop' && selectedCategory === 'Men' ? 'text-[#630D16]' : ''
              }`}
            >
              Men
              {activePage === 'shop' && selectedCategory === 'Men' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#630D16]" />
              )}
            </button>
            <button
              type="button"
              onClick={() => navigateTo('shop', 'Essentials')}
              className={`hover:opacity-60 transition-opacity relative py-1 cursor-pointer ${
                activePage === 'shop' && selectedCategory === 'Essentials' ? 'text-[#630D16]' : ''
              }`}
            >
              Objects
              {activePage === 'shop' && selectedCategory === 'Essentials' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#630D16]" />
              )}
            </button>
            <button
              type="button"
              onClick={() => navigateTo('lookbook')}
              className={`hover:opacity-60 transition-opacity relative py-1 cursor-pointer ${
                activePage === 'lookbook' ? 'text-[#630D16]' : ''
              }`}
            >
              Lookbook
              {activePage === 'lookbook' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#630D16]" />
              )}
            </button>
          </nav>

          {/* Center Brand Identity */}
          <div className="flex-1 lg:flex-initial text-center">
            <button
              type="button"
              onClick={() => navigateTo('home')}
              className="inline-flex flex-col items-center group cursor-pointer"
              aria-label="PEPLAB Home"
            >
              <span className="serif text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1A1A] group-hover:text-[#630D16] transition-colors">
                PEPLAB
              </span>
            </button>
          </div>

          {/* Right Actions (Search, Account, Wishlist, Bag) */}
          <div className="flex items-center space-x-4 sm:space-x-6 text-[11px] uppercase tracking-[0.2em] font-semibold text-[#1A1A1A]">
            {/* Desktop Search */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="hidden lg:flex items-center space-x-1.5 hover:opacity-60 transition-opacity py-1 cursor-pointer"
              aria-label="Search"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search</span>
            </button>

            {/* Story Link Desktop */}
            <button
              type="button"
              onClick={() => navigateTo('story')}
              className="hidden xl:inline-block hover:opacity-60 transition-opacity cursor-pointer"
            >
              Story
            </button>

            {/* Account demo button */}
            <button
              type="button"
              onClick={() => setIsAccountModalOpen(true)}
              className="p-1 hover:opacity-60 transition-opacity cursor-pointer relative"
              aria-label="Account"
            >
              <User className="w-4 h-4" />
            </button>

            {/* Wishlist */}
            <button
              type="button"
              onClick={() => setIsWishlistOpen(true)}
              className="p-1 hover:opacity-60 transition-opacity cursor-pointer relative"
              aria-label={`Wishlist (${wishlist.length} items)`}
            >
              <Heart className={`w-4 h-4 ${wishlist.length > 0 ? 'fill-[#630D16] text-[#630D16]' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#630D16] text-[#F5F2ED] text-[8px] font-mono rounded-full flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Bag */}
            <button
              type="button"
              onClick={() => setIsBagOpen(true)}
              className="flex items-center space-x-2 hover:opacity-60 transition-opacity cursor-pointer"
              aria-label={`Shopping bag with ${totalCartItemsCount} items`}
            >
              <span>Bag</span>
              <span className="w-4 h-4 bg-[#630D16] text-[#F5F2ED] rounded-full flex items-center justify-center text-[9px] font-mono font-bold">
                {totalCartItemsCount}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
