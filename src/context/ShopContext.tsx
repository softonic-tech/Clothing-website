import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { Product, CartItem, ProductSize, ProductColor, Category, ActivePage, ToastMessage } from '../types';
import { PRODUCTS } from '../data/products';
import { STORE_CONFIG } from '../data/config';

interface PromoDiscount {
  code: string;
  discountPercent: number;
  description: string;
}

interface ShopContextType {
  cart: CartItem[];
  wishlist: string[];
  activePage: ActivePage;
  selectedCategory: Category;
  selectedProduct: Product | null;
  quickViewProduct: Product | null;
  isBagOpen: boolean;
  isWishlistOpen: boolean;
  isSearchOpen: boolean;
  isMobileMenuOpen: boolean;
  isSizeGuideOpen: boolean;
  isCheckoutOpen: boolean;
  isAccountModalOpen: boolean;
  appliedPromo: PromoDiscount | null;
  toasts: ToastMessage[];
  searchQuery: string;

  // Cart calculations
  subtotal: number;
  discountAmount: number;
  shippingCost: number;
  grandTotal: number;
  freeShippingProgress: number; // 0 to 100 percentage
  amountUntilFreeShipping: number;
  totalCartItemsCount: number;

  // State mutators
  setActivePage: (page: ActivePage) => void;
  setSelectedCategory: (category: Category) => void;
  setSelectedProduct: (product: Product | null) => void;
  setQuickViewProduct: (product: Product | null) => void;
  setIsBagOpen: (open: boolean) => void;
  setIsWishlistOpen: (open: boolean) => void;
  setIsSearchOpen: (open: boolean) => void;
  setIsMobileMenuOpen: (open: boolean) => void;
  setIsSizeGuideOpen: (open: boolean) => void;
  setIsCheckoutOpen: (open: boolean) => void;
  setIsAccountModalOpen: (open: boolean) => void;
  setSearchQuery: (query: string) => void;

  // Actions
  addToCart: (product: Product, size: ProductSize, color: ProductColor, quantity?: number, openBag?: boolean) => boolean;
  updateCartQuantity: (itemId: string, newQty: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  navigateTo: (page: ActivePage, category?: Category, product?: Product) => void;
  openProductDetail: (product: Product) => void;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'peplab_cart_v1';
const WISHLIST_STORAGE_KEY = 'peplab_wishlist_v1';

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Persistence for Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persistence for Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : ['pep-001', 'pep-007'];
    } catch {
      return ['pep-001', 'pep-007'];
    }
  });

  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Modals & Drawers
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<PromoDiscount | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync cart to local storage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  // Sync wishlist to local storage
  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  // Handle browser popstate / hash if relevant
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'shop') setActivePage('shop');
      else if (hash === 'women') { setSelectedCategory('Women'); setActivePage('shop'); }
      else if (hash === 'men') { setSelectedCategory('Men'); setActivePage('shop'); }
      else if (hash === 'essentials') { setSelectedCategory('Essentials'); setActivePage('shop'); }
      else if (hash === 'outerwear') { setSelectedCategory('Outerwear'); setActivePage('shop'); }
      else if (hash === 'lookbook') setActivePage('lookbook');
      else if (hash === 'story') setActivePage('story');
      else if (hash === 'wishlist') setActivePage('wishlist');
      else if (hash.startsWith('product/')) {
        const id = hash.replace('product/', '');
        const p = PRODUCTS.find(item => item.id === id || item.slug === id);
        if (p) {
          setSelectedProduct(p);
          setActivePage('product-detail');
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Toast dispatcher
  const addToast = useCallback((toast: Omit<ToastMessage, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4200);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Cart Calculations
  const subtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cart]);

  const discountAmount = useMemo(() => {
    if (!appliedPromo) return 0;
    return Math.round((subtotal * appliedPromo.discountPercent) / 100);
  }, [subtotal, appliedPromo]);

  const shippingCost = useMemo(() => {
    if (subtotal === 0) return 0;
    return subtotal >= STORE_CONFIG.freeShippingThreshold ? 0 : 15;
  }, [subtotal]);

  const grandTotal = useMemo(() => {
    return Math.max(0, subtotal - discountAmount + shippingCost);
  }, [subtotal, discountAmount, shippingCost]);

  const freeShippingProgress = useMemo(() => {
    if (subtotal >= STORE_CONFIG.freeShippingThreshold) return 100;
    return Math.min(100, Math.round((subtotal / STORE_CONFIG.freeShippingThreshold) * 100));
  }, [subtotal]);

  const amountUntilFreeShipping = useMemo(() => {
    return Math.max(0, STORE_CONFIG.freeShippingThreshold - subtotal);
  }, [subtotal]);

  const totalCartItemsCount = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  // Cart Operations
  const addToCart = useCallback((
    product: Product,
    size: ProductSize,
    color: ProductColor,
    quantity = 1,
    openBag = true
  ): boolean => {
    if (!size) {
      addToast({
        type: 'info',
        title: 'Please Select a Size',
        message: 'A tailored size selection is required before adding to your bag.'
      });
      return false;
    }

    const itemId = `${product.id}-${size}-${color.name.toLowerCase().replace(/\s+/g, '-')}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        return [
          ...prev,
          {
            id: itemId,
            productId: product.id,
            name: product.name,
            price: product.price,
            size,
            color,
            image: product.images[0],
            quantity,
            maxStock: product.stockCount || 20
          }
        ];
      }
    });

    addToast({
      type: 'bag',
      title: 'Added to Shopping Bag',
      message: `${product.name} (${size} · ${color.name})`,
      image: product.images[0]
    });

    if (openBag) {
      setIsBagOpen(true);
    }

    return true;
  }, [addToast]);

  const updateCartQuantity = useCallback((itemId: string, newQty: number) => {
    if (newQty <= 0) {
      setCart((prev) => prev.filter((item) => item.id !== itemId));
    } else {
      setCart((prev) =>
        prev.map((item) => (item.id === itemId ? { ...item, quantity: Math.min(newQty, item.maxStock || 50) } : item))
      );
    }
  }, []);

  const removeFromCart = useCallback((itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    setAppliedPromo(null);
  }, []);

  // Wishlist Operations
  const toggleWishlist = useCallback((productId: string) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        addToast({
          type: 'info',
          title: 'Removed from Wishlist',
          message: product ? product.name : undefined
        });
        return prev.filter((id) => id !== productId);
      } else {
        addToast({
          type: 'success',
          title: 'Saved to Wishlist',
          message: product ? product.name : undefined,
          image: product?.images[0]
        });
        return [...prev, productId];
      }
    });
  }, [addToast]);

  const isInWishlist = useCallback((productId: string) => {
    return wishlist.includes(productId);
  }, [wishlist]);

  // Promo Code Operations
  const applyPromoCode = useCallback((code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const found = STORE_CONFIG.promoCodes[cleanCode];

    if (!found) {
      return { success: false, message: 'Invalid or expired promotional code. Try EXTRAORDINARY10' };
    }

    if (found.minSubtotal && subtotal < found.minSubtotal) {
      return {
        success: false,
        message: `This promo requires a minimum order of $${found.minSubtotal}.`
      };
    }

    setAppliedPromo({
      code: cleanCode,
      discountPercent: found.discountPercent,
      description: found.description
    });

    addToast({
      type: 'success',
      title: 'Promotion Applied',
      message: `${found.discountPercent}% off applied: ${found.description}`
    });

    return { success: true, message: `${found.discountPercent}% discount applied!` };
  }, [subtotal, addToast]);

  const removePromoCode = useCallback(() => {
    setAppliedPromo(null);
  }, []);

  // Navigation Helper
  const navigateTo = useCallback((page: ActivePage, category?: Category, product?: Product) => {
    if (category) setSelectedCategory(category);
    if (product) setSelectedProduct(product);
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update URL hash smoothly
    if (page === 'home') window.location.hash = '';
    else if (page === 'shop' && category && category !== 'All') window.location.hash = category.toLowerCase();
    else if (page === 'shop') window.location.hash = 'shop';
    else if (page === 'lookbook') window.location.hash = 'lookbook';
    else if (page === 'story') window.location.hash = 'story';
    else if (page === 'wishlist') window.location.hash = 'wishlist';
    else if (page === 'product-detail' && product) window.location.hash = `product/${product.slug}`;
  }, []);

  const openProductDetail = useCallback((product: Product) => {
    setSelectedProduct(product);
    setActivePage('product-detail');
    window.location.hash = `product/${product.slug}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const openQuickView = useCallback((product: Product) => {
    setQuickViewProduct(product);
  }, []);

  const closeQuickView = useCallback(() => {
    setQuickViewProduct(null);
  }, []);

  return (
    <ShopContext.Provider
      value={{
        cart,
        wishlist,
        activePage,
        selectedCategory,
        selectedProduct,
        quickViewProduct,
        isBagOpen,
        isWishlistOpen,
        isSearchOpen,
        isMobileMenuOpen,
        isSizeGuideOpen,
        isCheckoutOpen,
        isAccountModalOpen,
        appliedPromo,
        toasts,
        searchQuery,

        subtotal,
        discountAmount,
        shippingCost,
        grandTotal,
        freeShippingProgress,
        amountUntilFreeShipping,
        totalCartItemsCount,

        setActivePage,
        setSelectedCategory,
        setSelectedProduct,
        setQuickViewProduct,
        setIsBagOpen,
        setIsWishlistOpen,
        setIsSearchOpen,
        setIsMobileMenuOpen,
        setIsSizeGuideOpen,
        setIsCheckoutOpen,
        setIsAccountModalOpen,
        setSearchQuery,

        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        toggleWishlist,
        isInWishlist,
        applyPromoCode,
        removePromoCode,
        navigateTo,
        openProductDetail,
        openQuickView,
        closeQuickView,
        addToast,
        removeToast
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
