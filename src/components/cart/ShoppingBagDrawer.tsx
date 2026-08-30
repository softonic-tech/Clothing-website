import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useShop } from '../../context/ShopContext';
import { STORE_CONFIG } from '../../data/config';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, ShieldCheck, Truck, Sparkles } from 'lucide-react';

export const ShoppingBagDrawer: React.FC = () => {
  const {
    cart,
    isBagOpen,
    setIsBagOpen,
    updateCartQuantity,
    removeFromCart,
    subtotal,
    discountAmount,
    shippingCost,
    grandTotal,
    freeShippingProgress,
    amountUntilFreeShipping,
    totalCartItemsCount,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    setIsCheckoutOpen,
    navigateTo
  } = useShop();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isBagOpen) {
        setIsBagOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isBagOpen, setIsBagOpen]);

  // Lock scroll when open
  useEffect(() => {
    if (isBagOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isBagOpen]);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    if (!promoInput.trim()) return;

    const res = applyPromoCode(promoInput);
    if (!res.success) {
      setPromoError(res.message);
    } else {
      setPromoInput('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsBagOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <AnimatePresence>
      {isBagOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-[#1C1B1A]/60 backdrop-blur-xs"
            onClick={() => setIsBagOpen(false)}
          />

          {/* Slide-out Drawer */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="w-screen max-w-md bg-[#F5F2ED] shadow-2xl border-l border-[rgba(26,26,26,0.15)] flex flex-col justify-between"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-[rgba(26,26,26,0.15)] bg-[#F5F2ED]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <ShoppingBag className="w-5 h-5 text-[#630D16]" />
                    <h2 className="serif text-2xl text-[#1A1A1A] font-medium">
                      Shopping Bag
                    </h2>
                    <span className="text-xs font-mono bg-[#1A1A1A] text-[#F5F2ED] px-2 py-0.5 font-bold">
                      {totalCartItemsCount}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsBagOpen(false)}
                    className="p-1.5 text-[#1A1A1A]/70 hover:text-[#1A1A1A] transition-colors cursor-pointer"
                    aria-label="Close shopping bag"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Free Shipping Progress Indicator */}
                <div className="mt-4 pt-3 border-t border-[rgba(26,26,26,0.15)]">
                  <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                    {amountUntilFreeShipping > 0 ? (
                      <span className="text-[#1A1A1A]/70">
                        Add <strong className="text-[#1A1A1A]">${amountUntilFreeShipping}</strong> for complimentary delivery
                      </span>
                    ) : (
                      <span className="text-[#630D16] font-semibold flex items-center space-x-1">
                        <Truck className="w-3.5 h-3.5" />
                        <span>Complimentary Global Delivery Unlocked</span>
                      </span>
                    )}
                    <span className="text-[#1A1A1A]/60">{freeShippingProgress}%</span>
                  </div>
                  <div className="w-full bg-[#E5DFD4] h-1.5 overflow-hidden">
                    <div
                      className="bg-[#630D16] h-full transition-all duration-500 ease-out"
                      style={{ width: `${freeShippingProgress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Items List (Scrollable) */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length > 0 ? (
                  cart.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="p-4 bg-white border border-[rgba(26,26,26,0.15)] flex space-x-4 relative group"
                    >
                      {/* Thumbnail */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-24 object-cover bg-[#EBE7DF] flex-shrink-0"
                      />

                      {/* Info & Stepper */}
                      <div className="flex-1 flex flex-col justify-between min-w-0 pr-6">
                        <div>
                          <h4 className="serif text-base text-[#1A1A1A] font-medium leading-snug line-clamp-1">
                            {item.name}
                          </h4>
                          <div className="text-xs font-mono text-[#1A1A1A]/70 mt-1 space-x-2">
                            <span>Size: <strong className="text-[#1A1A1A]">{item.size}</strong></span>
                            <span>•</span>
                            <span>Color: <strong className="text-[#1A1A1A]">{item.color.name}</strong></span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          {/* Quantity Controls */}
                          <div className="flex items-center border border-[rgba(26,26,26,0.2)] bg-[#FAF8F5] text-xs font-mono">
                            <button
                              type="button"
                              onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                              className="px-2.5 py-1 text-[#1A1A1A]/70 hover:text-[#1A1A1A] cursor-pointer"
                              aria-label="Decrease quantity"
                            >
                              -
                            </button>
                            <span className="px-2 text-xs font-semibold text-[#1A1A1A]">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                              className="px-2.5 py-1 text-[#1A1A1A]/70 hover:text-[#1A1A1A] cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>

                          {/* Line total */}
                          <span className="text-sm font-mono font-semibold text-[#1A1A1A]">
                            ${item.price * item.quantity}
                          </span>
                        </div>
                      </div>

                      {/* Remove Item Button */}
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="absolute top-3 right-3 text-[#A89F93] hover:text-[#630D16] transition-colors p-1 cursor-pointer"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-20 px-4 space-y-4">
                    <div className="w-16 h-16 bg-[#EBE7DF] rounded-full mx-auto flex items-center justify-center text-[#1A1A1A]/60">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <h3 className="serif text-2xl text-[#1A1A1A] font-normal">
                      Your bag is empty
                    </h3>
                    <p className="text-xs text-[#1A1A1A]/70 max-w-xs mx-auto leading-relaxed">
                      Explore our collection and add tailored pieces to your wardrobe.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setIsBagOpen(false);
                        navigateTo('shop');
                      }}
                      className="mt-4 px-6 py-3 bg-[#630D16] hover:bg-[#4D0910] text-[#F5F2ED] text-[11px] font-bold uppercase tracking-[0.2em] cursor-pointer"
                    >
                      Explore Wardrobe
                    </button>
                  </div>
                )}
              </div>

              {/* Drawer Footer & Checkout Action */}
              {cart.length > 0 && (
                <div className="p-6 bg-[#F5F2ED] border-t border-[rgba(26,26,26,0.15)] space-y-4">
                  {/* Promo code form */}
                  {!appliedPromo ? (
                    <form onSubmit={handleApplyPromo} className="space-y-1">
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={promoInput}
                          onChange={(e) => setPromoInput(e.target.value)}
                          placeholder="Promo code (e.g. EXTRAORDINARY10)"
                          className="flex-1 bg-white border border-[rgba(26,26,26,0.2)] px-3 py-2 text-xs uppercase font-mono focus:outline-none focus:border-[#630D16]"
                        />
                        <button
                          type="submit"
                          className="px-4 py-2 bg-[#1A1A1A] hover:bg-[#630D16] text-[#F5F2ED] text-[11px] font-bold uppercase tracking-wider cursor-pointer transition-colors"
                        >
                          Apply
                        </button>
                      </div>
                      {promoError && (
                        <p className="text-[11px] text-[#630D16] font-mono">{promoError}</p>
                      )}
                    </form>
                  ) : (
                    <div className="p-2.5 bg-[#630D16]/10 border border-[#630D16]/30 flex items-center justify-between text-xs font-mono text-[#630D16]">
                      <div className="flex items-center space-x-1.5">
                        <Tag className="w-3.5 h-3.5" />
                        <span>Code <strong>{appliedPromo.code}</strong> ({appliedPromo.discountPercent}% off)</span>
                      </div>
                      <button
                        type="button"
                        onClick={removePromoCode}
                        className="text-[11px] text-[#630D16] hover:underline uppercase cursor-pointer font-bold"
                      >
                        Remove
                      </button>
                    </div>
                  )}

                  {/* Pricing Breakdown */}
                  <div className="space-y-1.5 text-xs font-mono border-t border-[rgba(26,26,26,0.15)] pt-3 text-[#1A1A1A]/80">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-semibold text-[#1A1A1A]">${subtotal}</span>
                    </div>

                    {discountAmount > 0 && (
                      <div className="flex justify-between text-[#630D16]">
                        <span>Promotional Savings</span>
                        <span>-${discountAmount}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>Estimated Shipping</span>
                      <span>{shippingCost === 0 ? 'Complimentary' : `$${shippingCost}`}</span>
                    </div>

                    <div className="flex justify-between text-sm serif font-semibold text-[#1A1A1A] pt-2 border-t border-[rgba(26,26,26,0.15)]">
                      <span>Estimated Total</span>
                      <span className="font-mono text-base">${grandTotal}</span>
                    </div>
                  </div>

                  {/* Checkout CTA */}
                  <button
                    type="button"
                    onClick={handleProceedToCheckout}
                    className="w-full py-4 bg-[#630D16] hover:bg-[#4D0910] text-[#F5F2ED] text-[11px] font-bold tracking-[0.2em] uppercase transition-colors flex items-center justify-center space-x-2 cursor-pointer shadow-md"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center justify-center space-x-2 text-[11px] font-mono text-[#1A1A1A]/60">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#630D16]" />
                    <span>Demo Checkout • No Real Payment Required</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
