import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useShop } from '../../context/ShopContext';
import { STORE_CONFIG } from '../../data/config';
import { X, CheckCircle2, ShieldAlert, Truck, CreditCard, Lock, Package, ArrowRight, ArrowLeft, Sparkles, Building2 } from 'lucide-react';

export const CheckoutDemoModal: React.FC = () => {
  const {
    cart,
    isCheckoutOpen,
    setIsCheckoutOpen,
    subtotal,
    discountAmount,
    shippingCost,
    grandTotal,
    appliedPromo,
    clearCart,
    navigateTo,
    addToast
  } = useShop();

  const [step, setStep] = useState<'shipping' | 'delivery' | 'payment' | 'confirmed'>('shipping');
  const [formData, setFormData] = useState({
    firstName: 'Eleanor',
    lastName: 'Vance',
    email: 'eleanor.vance@example.com',
    address: '450 West Broadway, Apt 4B',
    city: 'New York',
    state: 'NY',
    zip: '10012',
    country: 'United States',
    shippingMethod: 'standard',
    notes: 'Please leave in concierge reception.'
  });

  const [orderNumber, setOrderNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Generate order number when confirmed
  useEffect(() => {
    if (isCheckoutOpen && !orderNumber) {
      const randNum = Math.floor(100000 + Math.random() * 900000);
      setOrderNumber(`PEP-2026-${randNum}`);
    }
  }, [isCheckoutOpen, orderNumber]);

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCheckoutOpen && step !== 'confirmed') {
        setIsCheckoutOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCheckoutOpen, setIsCheckoutOpen, step]);

  if (!isCheckoutOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep('confirmed');
      clearCart();
      addToast({
        type: 'success',
        title: 'Order Confirmed (Demo)',
        message: `Simulated order ${orderNumber} placed successfully!`
      });
    }, 1200);
  };

  const handleFinish = () => {
    setIsCheckoutOpen(false);
    setStep('shipping');
    navigateTo('home');
  };

  const deliveryAddon = formData.shippingMethod === 'express' ? 25 : 0;
  const finalTotal = grandTotal + deliveryAddon;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#1C1B1A]/75 backdrop-blur-xs"
          onClick={() => {
            if (step !== 'confirmed') setIsCheckoutOpen(false);
          }}
        />

        {/* Modal Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative bg-[#FBF9F5] border border-[#E8E2D8] max-w-4xl w-full shadow-2xl z-10 my-auto overflow-hidden flex flex-col max-h-[92vh]"
        >
          {/* Top Demo Notice Banner */}
          <div className="bg-[#6E2D3E] text-[#FBF9F5] px-4 py-2.5 text-xs font-mono flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShieldAlert className="w-4 h-4 text-[#E8C5CE] flex-shrink-0" />
              <span>
                <strong>DEMO STORE CHECKOUT:</strong> No real payment will be collected or processed.
              </span>
            </div>
            {step !== 'confirmed' && (
              <button
                type="button"
                onClick={() => setIsCheckoutOpen(false)}
                className="text-white hover:text-[#E8C5CE] p-1 cursor-pointer"
                aria-label="Close checkout"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Modal Body */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8">
            {step !== 'confirmed' ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Form Area (7 Cols) */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Step Progress Indicators */}
                  <div className="flex items-center space-x-2 text-xs font-mono pb-4 border-b border-[#E8E2D8]">
                    <span className={step === 'shipping' ? 'font-bold text-[#6E2D3E]' : 'text-[#8C847A]'}>
                      1. Address
                    </span>
                    <span className="text-[#CCC4B8]">→</span>
                    <span className={step === 'delivery' ? 'font-bold text-[#6E2D3E]' : 'text-[#8C847A]'}>
                      2. Delivery
                    </span>
                    <span className="text-[#CCC4B8]">→</span>
                    <span className={step === 'payment' ? 'font-bold text-[#6E2D3E]' : 'text-[#8C847A]'}>
                      3. Simulated Payment
                    </span>
                  </div>

                  {/* Step 1: Shipping Address */}
                  {step === 'shipping' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                      <h3 className="font-serif text-2xl text-[#1C1B1A] font-light">
                        Client Delivery Address
                      </h3>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] uppercase font-mono text-[#7D766D] block mb-1">
                            First Name
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="w-full bg-white border border-[#D5CDBD] p-2.5 text-xs text-[#1C1B1A] focus:outline-none focus:border-[#6E2D3E]"
                            required
                          />
                        </div>
                        <div>
                          <label className="text-[11px] uppercase font-mono text-[#7D766D] block mb-1">
                            Last Name
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="w-full bg-white border border-[#D5CDBD] p-2.5 text-xs text-[#1C1B1A] focus:outline-none focus:border-[#6E2D3E]"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] uppercase font-mono text-[#7D766D] block mb-1">
                          Email Receipt
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full bg-white border border-[#D5CDBD] p-2.5 text-xs text-[#1C1B1A] focus:outline-none focus:border-[#6E2D3E]"
                          required
                        />
                      </div>

                      <div>
                        <label className="text-[11px] uppercase font-mono text-[#7D766D] block mb-1">
                          Street Address & Suite
                        </label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="w-full bg-white border border-[#D5CDBD] p-2.5 text-xs text-[#1C1B1A] focus:outline-none focus:border-[#6E2D3E]"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="text-[11px] uppercase font-mono text-[#7D766D] block mb-1">
                            City
                          </label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            className="w-full bg-white border border-[#D5CDBD] p-2.5 text-xs text-[#1C1B1A]"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] uppercase font-mono text-[#7D766D] block mb-1">
                            State / Prov
                          </label>
                          <input
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            className="w-full bg-white border border-[#D5CDBD] p-2.5 text-xs text-[#1C1B1A]"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] uppercase font-mono text-[#7D766D] block mb-1">
                            Postal Code
                          </label>
                          <input
                            type="text"
                            name="zip"
                            value={formData.zip}
                            onChange={handleInputChange}
                            className="w-full bg-white border border-[#D5CDBD] p-2.5 text-xs text-[#1C1B1A]"
                          />
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setStep('delivery')}
                        className="w-full mt-4 py-3.5 bg-[#1C1B1A] hover:bg-[#6E2D3E] text-white text-xs font-semibold uppercase tracking-[0.2em] transition-colors flex items-center justify-center space-x-2 cursor-pointer"
                      >
                        <span>Continue to Delivery Method</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </motion.div>
                  )}

                  {/* Step 2: Delivery Method */}
                  {step === 'delivery' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                      <h3 className="font-serif text-2xl text-[#1C1B1A] font-light">
                        Select Delivery & Packaging
                      </h3>

                      <div className="space-y-3">
                        <label
                          className={`p-4 border block cursor-pointer transition-colors ${
                            formData.shippingMethod === 'standard'
                              ? 'border-[#1C1B1A] bg-white ring-1 ring-[#1C1B1A]'
                              : 'border-[#E0D7C9] bg-[#FAF8F5]'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <input
                                type="radio"
                                name="shippingMethod"
                                value="standard"
                                checked={formData.shippingMethod === 'standard'}
                                onChange={handleInputChange}
                                className="accent-[#6E2D3E]"
                              />
                              <div>
                                <p className="text-xs font-semibold text-[#1C1B1A] uppercase tracking-wider">
                                  Standard Atelier Delivery (3–5 Business Days)
                                </p>
                                <p className="text-xs text-[#7A736A] mt-0.5">
                                  Recycled linen garment box with cedar scent sachet.
                                </p>
                              </div>
                            </div>
                            <span className="text-xs font-mono font-semibold text-[#1C1B1A]">
                              {shippingCost === 0 ? 'FREE' : `$${shippingCost}`}
                            </span>
                          </div>
                        </label>

                        <label
                          className={`p-4 border block cursor-pointer transition-colors ${
                            formData.shippingMethod === 'express'
                              ? 'border-[#1C1B1A] bg-white ring-1 ring-[#1C1B1A]'
                              : 'border-[#E0D7C9] bg-[#FAF8F5]'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <input
                                type="radio"
                                name="shippingMethod"
                                value="express"
                                checked={formData.shippingMethod === 'express'}
                                onChange={handleInputChange}
                                className="accent-[#6E2D3E]"
                              />
                              <div>
                                <p className="text-xs font-semibold text-[#1C1B1A] uppercase tracking-wider">
                                  Priority Express Atelier (1–2 Business Days)
                                </p>
                                <p className="text-xs text-[#7A736A] mt-0.5">
                                  Dedicated dispatch courier with signature upon delivery.
                                </p>
                              </div>
                            </div>
                            <span className="text-xs font-mono font-semibold text-[#1C1B1A]">
                              +$25.00
                            </span>
                          </div>
                        </label>

                        <label
                          className={`p-4 border block cursor-pointer transition-colors ${
                            formData.shippingMethod === 'pickup'
                              ? 'border-[#1C1B1A] bg-white ring-1 ring-[#1C1B1A]'
                              : 'border-[#E0D7C9] bg-[#FAF8F5]'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <input
                                type="radio"
                                name="shippingMethod"
                                value="pickup"
                                checked={formData.shippingMethod === 'pickup'}
                                onChange={handleInputChange}
                                className="accent-[#6E2D3E]"
                              />
                              <div>
                                <p className="text-xs font-semibold text-[#1C1B1A] uppercase tracking-wider">
                                  White-Glove Studio Pickup (Soho Flagship)
                                </p>
                                <p className="text-xs text-[#7A736A] mt-0.5">
                                  482 Mercer St, New York · Complimentary fitting on arrival.
                                </p>
                              </div>
                            </div>
                            <span className="text-xs font-mono font-semibold text-[#6E2D3E]">
                              FREE
                            </span>
                          </div>
                        </label>
                      </div>

                      <div className="flex space-x-3 pt-2">
                        <button
                          type="button"
                          onClick={() => setStep('shipping')}
                          className="px-5 py-3 border border-[#1C1B1A] text-xs font-semibold uppercase tracking-wider cursor-pointer"
                        >
                          Back
                        </button>
                        <button
                          type="button"
                          onClick={() => setStep('payment')}
                          className="flex-1 py-3 bg-[#1C1B1A] hover:bg-[#6E2D3E] text-white text-xs font-semibold uppercase tracking-[0.2em] transition-colors flex items-center justify-center space-x-2 cursor-pointer"
                        >
                          <span>Proceed to Demo Payment</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Simulated Payment */}
                  {step === 'payment' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                      <h3 className="font-serif text-2xl text-[#1C1B1A] font-light">
                        Simulated Payment
                      </h3>

                      <div className="p-4 bg-[#F5EFE6] border border-[#E3DCD1] text-xs text-[#6B645B] space-y-1">
                        <p className="font-semibold text-[#1C1B1A] font-mono">
                          Simulated Sandbox Card (Pre-filled):
                        </p>
                        <p>This is a frontend demonstration. No real card charge will be made.</p>
                      </div>

                      <div className="p-4 bg-white border border-[#D5CDBD] space-y-3">
                        <div>
                          <label className="text-[11px] uppercase font-mono text-[#7D766D] block mb-1">
                            Cardholder Name
                          </label>
                          <input
                            type="text"
                            disabled
                            value={`${formData.firstName} ${formData.lastName}`}
                            className="w-full bg-[#FAF8F5] border border-[#E0D7C9] p-2 text-xs text-[#1C1B1A]"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] uppercase font-mono text-[#7D766D] block mb-1">
                            Simulated Card Number
                          </label>
                          <input
                            type="text"
                            disabled
                            value="•••• •••• •••• 4242 (Demo Test Card)"
                            className="w-full bg-[#FAF8F5] border border-[#E0D7C9] p-2 text-xs text-[#1C1B1A] font-mono"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-[11px] uppercase font-mono text-[#7D766D] block mb-1">
                              Expiry
                            </label>
                            <input
                              type="text"
                              disabled
                              value="12 / 28"
                              className="w-full bg-[#FAF8F5] border border-[#E0D7C9] p-2 text-xs text-[#1C1B1A] font-mono"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] uppercase font-mono text-[#7D766D] block mb-1">
                              CVV Security
                            </label>
                            <input
                              type="text"
                              disabled
                              value="888"
                              className="w-full bg-[#FAF8F5] border border-[#E0D7C9] p-2 text-xs text-[#1C1B1A] font-mono"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-3 pt-2">
                        <button
                          type="button"
                          onClick={() => setStep('delivery')}
                          className="px-5 py-3 border border-[#1C1B1A] text-xs font-semibold uppercase tracking-wider cursor-pointer"
                        >
                          Back
                        </button>
                        <button
                          type="button"
                          onClick={handlePlaceOrder}
                          disabled={isProcessing}
                          className="flex-1 py-4 bg-[#6E2D3E] hover:bg-[#562130] text-white text-xs font-semibold uppercase tracking-[0.2em] transition-colors flex items-center justify-center space-x-2 cursor-pointer shadow-lg disabled:opacity-50"
                        >
                          <Lock className="w-3.5 h-3.5" />
                          <span>{isProcessing ? 'Authorizing Demo Order...' : `Place Demo Order ($${finalTotal})`}</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Right Order Summary (5 Cols) */}
                <div className="lg:col-span-5 bg-white p-5 sm:p-6 border border-[#E8E2D8] space-y-4">
                  <h4 className="font-serif text-lg text-[#1C1B1A] font-light pb-3 border-b border-[#E8E2D8]">
                    Order Summary ({cart.length} {cart.length === 1 ? 'item' : 'items'})
                  </h4>

                  <div className="max-h-48 overflow-y-auto space-y-3 pr-1">
                    {cart.map((item) => (
                      <div key={item.id} className="flex space-x-3 items-center text-xs">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-14 object-cover bg-[#F5F2EB] flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-serif text-sm text-[#1C1B1A] truncate">{item.name}</p>
                          <p className="text-[11px] font-mono text-[#8C847A]">
                            {item.size} · {item.color.name} × {item.quantity}
                          </p>
                        </div>
                        <span className="font-mono font-semibold text-[#1C1B1A]">
                          ${item.price * item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Totals */}
                  <div className="pt-3 border-t border-[#E8E2D8] space-y-1.5 text-xs font-mono text-[#6E675E]">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${subtotal}</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-[#6E2D3E]">
                        <span>Promo Code ({appliedPromo?.code})</span>
                        <span>-${discountAmount}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>
                        {shippingCost === 0 && deliveryAddon === 0
                          ? 'Complimentary'
                          : `$${shippingCost + deliveryAddon}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-base font-serif font-semibold text-[#1C1B1A] pt-2 border-t border-[#E8E2D8]">
                      <span>Grand Total</span>
                      <span className="font-mono">${finalTotal}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Order Confirmation Screen */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6 sm:py-8 max-w-xl mx-auto space-y-6"
              >
                <div className="w-16 h-16 bg-[#6E2D3E] text-white rounded-full mx-auto flex items-center justify-center shadow-lg">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <span className="text-xs uppercase font-mono tracking-[0.25em] text-[#8C847A] block mb-1">
                    Simulated Order Complete
                  </span>
                  <h3 className="font-serif text-3xl sm:text-4xl text-[#1C1B1A] font-light">
                    Thank You, {formData.firstName}
                  </h3>
                  <p className="text-xs font-mono text-[#6E2D3E] mt-2 bg-[#F7EDF0] inline-block px-3 py-1 border border-[#E8C5CE]">
                    Order Number: <strong>{orderNumber}</strong>
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-[#6E675E] leading-relaxed">
                  A simulated confirmation dispatch has been sent to <strong>{formData.email}</strong>. In production, our master tailors prepare each garment with unlined silk seam checks before carbon-neutral dispatch.
                </p>

                {/* Simulated Order Timeline */}
                <div className="bg-white p-5 border border-[#E8E2D8] text-left space-y-3">
                  <h4 className="text-xs uppercase font-mono tracking-wider font-semibold text-[#1C1B1A]">
                    Simulated Dispatch Timeline
                  </h4>
                  <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-mono">
                    <div className="space-y-1">
                      <div className="w-6 h-6 rounded-full bg-[#6E2D3E] text-white mx-auto flex items-center justify-center font-bold">
                        ✓
                      </div>
                      <p className="font-semibold text-[#1C1B1A]">Order Placed</p>
                      <p className="text-[#8C847A]">Just Now</p>
                    </div>
                    <div className="space-y-1">
                      <div className="w-6 h-6 rounded-full bg-[#E5DFD4] text-[#6E675E] mx-auto flex items-center justify-center">
                        2
                      </div>
                      <p className="text-[#6E675E]">Atelier Prep</p>
                      <p className="text-[#8C847A]">Tomorrow</p>
                    </div>
                    <div className="space-y-1">
                      <div className="w-6 h-6 rounded-full bg-[#E5DFD4] text-[#6E675E] mx-auto flex items-center justify-center">
                        3
                      </div>
                      <p className="text-[#6E675E]">Courier Transit</p>
                      <p className="text-[#8C847A]">In 2 Days</p>
                    </div>
                    <div className="space-y-1">
                      <div className="w-6 h-6 rounded-full bg-[#E5DFD4] text-[#6E675E] mx-auto flex items-center justify-center">
                        4
                      </div>
                      <p className="text-[#6E675E]">Delivered</p>
                      <p className="text-[#8C847A]">Estimated Oct 4</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    type="button"
                    onClick={handleFinish}
                    className="px-8 py-3.5 bg-[#1C1B1A] hover:bg-[#6E2D3E] text-white text-xs font-semibold tracking-[0.2em] uppercase transition-colors cursor-pointer"
                  >
                    Return to Storefront
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCheckoutOpen(false);
                      navigateTo('shop');
                    }}
                    className="px-8 py-3.5 bg-white hover:bg-[#FAF8F5] border border-[#1C1B1A] text-[#1C1B1A] text-xs font-semibold tracking-[0.2em] uppercase transition-colors cursor-pointer"
                  >
                    Explore More Pieces
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
