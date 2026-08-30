import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useShop } from '../../context/ShopContext';
import { X, User, Package, Heart, Sparkles, ShieldCheck, MapPin, Check } from 'lucide-react';

export const AccountDemoModal: React.FC = () => {
  const { isAccountOpen, setIsAccountOpen, wishlist, navigateTo } = useShop();
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'perks'>('profile');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isAccountOpen) {
        setIsAccountOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAccountOpen, setIsAccountOpen]);

  if (!isAccountOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => setIsAccountOpen(false)}
          className="fixed inset-0 bg-[#1C1B1A]/70 backdrop-blur-xs"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative bg-[#FBF9F5] border border-[#E8E2D8] max-w-2xl w-full shadow-2xl z-10 my-auto overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 bg-[#FAF7F2] border-b border-[#E8E2D8] flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-[#1C1B1A] text-white flex items-center justify-center font-serif text-lg">
                EV
              </div>
              <div>
                <h3 className="font-serif text-2xl text-[#1C1B1A] font-light">
                  Eleanor Vance
                </h3>
                <span className="text-xs font-mono text-[#6E2D3E] font-medium">
                  PEPLAB Tier 01 Member • Soho Studio Client
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsAccountOpen(false)}
              className="p-1.5 text-[#6E675E] hover:text-[#1C1B1A] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-[#E8E2D8] bg-white text-xs font-mono">
            <button
              type="button"
              onClick={() => setActiveTab('profile')}
              className={`flex-1 py-3 text-center uppercase tracking-wider transition-colors cursor-pointer ${
                activeTab === 'profile'
                  ? 'border-b-2 border-[#6E2D3E] text-[#1C1B1A] font-semibold'
                  : 'text-[#8C847A] hover:text-[#1C1B1A]'
              }`}
            >
              Profile & Measurements
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('orders')}
              className={`flex-1 py-3 text-center uppercase tracking-wider transition-colors cursor-pointer ${
                activeTab === 'orders'
                  ? 'border-b-2 border-[#6E2D3E] text-[#1C1B1A] font-semibold'
                  : 'text-[#8C847A] hover:text-[#1C1B1A]'
              }`}
            >
              Order Archive (2)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('perks')}
              className={`flex-1 py-3 text-center uppercase tracking-wider transition-colors cursor-pointer ${
                activeTab === 'perks'
                  ? 'border-b-2 border-[#6E2D3E] text-[#1C1B1A] font-semibold'
                  : 'text-[#8C847A] hover:text-[#1C1B1A]'
              }`}
            >
              VIP Studio Privileges
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 max-h-[60vh] overflow-y-auto space-y-6">
            {activeTab === 'profile' && (
              <div className="space-y-4 text-xs font-mono">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-white border border-[#E8E2D8]">
                    <span className="text-[#8C847A] uppercase block text-[10px]">Email</span>
                    <span className="text-sm text-[#1C1B1A] font-semibold">eleanor.vance@example.com</span>
                  </div>
                  <div className="p-3 bg-white border border-[#E8E2D8]">
                    <span className="text-[#8C847A] uppercase block text-[10px]">Preferred Size</span>
                    <span className="text-sm text-[#1C1B1A] font-semibold">Small (US 4)</span>
                  </div>
                </div>

                <div className="p-4 bg-white border border-[#E8E2D8] space-y-2">
                  <span className="text-[#8C847A] uppercase block text-[10px]">Saved Atelier Delivery Address</span>
                  <p className="text-[#1C1B1A] font-medium">450 West Broadway, Apt 4B</p>
                  <p className="text-[#6E675E]">Soho, New York, NY 10012, United States</p>
                </div>

                <div className="p-4 bg-[#FAF7F2] border border-[#E8E2D8] space-y-1">
                  <p className="font-semibold text-[#1C1B1A] uppercase tracking-wider">Demo Account System</p>
                  <p className="text-[#7D766D]">
                    This user profile is simulated for design demonstration. Real credentials and authentication will integrate with your custom backend.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="space-y-3">
                <div className="p-4 bg-white border border-[#E8E2D8] space-y-2">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="font-bold text-[#1C1B1A]">#PEP-2026-94821</span>
                    <span className="text-[#6E2D3E] font-semibold uppercase">Delivered</span>
                  </div>
                  <p className="text-xs text-[#524E48]">
                    1× Double-Breasted Wool Overcoat (Camel / S)
                  </p>
                  <div className="flex justify-between text-xs font-mono text-[#8C847A] pt-2 border-t border-[#F2EDE3]">
                    <span>Ordered: Aug 12, 2026</span>
                    <span className="font-bold text-[#1C1B1A]">$495.00</span>
                  </div>
                </div>

                <div className="p-4 bg-white border border-[#E8E2D8] space-y-2">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="font-bold text-[#1C1B1A]">#PEP-2026-81042</span>
                    <span className="text-[#6E2D3E] font-semibold uppercase">Delivered</span>
                  </div>
                  <p className="text-xs text-[#524E48]">
                    1× Pure Cashmere Mockneck Knit (Ecru / S), 1× Pleated Silk-Wool Trouser (Charcoal / S)
                  </p>
                  <div className="flex justify-between text-xs font-mono text-[#8C847A] pt-2 border-t border-[#F2EDE3]">
                    <span>Ordered: Jul 03, 2026</span>
                    <span className="font-bold text-[#1C1B1A]">$565.00</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'perks' && (
              <div className="space-y-3">
                <div className="p-4 bg-white border border-[#E8E2D8] flex items-start space-x-3">
                  <Sparkles className="w-5 h-5 text-[#6E2D3E] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1C1B1A]">
                      48-Hour Early Access
                    </h4>
                    <p className="text-xs text-[#7D766D] mt-0.5">
                      Private preorder priority before public capsule drops.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-white border border-[#E8E2D8] flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-[#6E2D3E] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1C1B1A]">
                      Complimentary In-Studio Alterations
                    </h4>
                    <p className="text-xs text-[#7D766D] mt-0.5">
                      Bespoke sleeve, cuff, and hem fitting at the Soho Flagship.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-[#FAF7F2] border-t border-[#E8E2D8] flex justify-end">
            <button
              type="button"
              onClick={() => setIsAccountOpen(false)}
              className="px-6 py-2 bg-[#1C1B1A] text-white text-xs font-semibold uppercase tracking-wider cursor-pointer"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
