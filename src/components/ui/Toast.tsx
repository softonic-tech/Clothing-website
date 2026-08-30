import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useShop } from '../../context/ShopContext';
import { CheckCircle2, ShoppingBag, X, Info } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast, setIsBagOpen } = useShop();

  return (
    <div 
      className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3 pointer-events-none max-w-sm w-full px-4 sm:px-0"
      aria-live="polite"
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="pointer-events-auto bg-[#1C1B1A] text-[#FBF9F5] rounded-none border border-[#3E3A36] p-4 shadow-2xl flex items-start space-x-3.5"
          >
            {toast.image ? (
              <img
                src={toast.image}
                alt=""
                className="w-12 h-14 object-cover border border-[#3E3A36] flex-shrink-0"
              />
            ) : toast.type === 'bag' ? (
              <div className="w-8 h-8 rounded-full bg-[#6E2D3E] flex items-center justify-center flex-shrink-0 text-white">
                <ShoppingBag className="w-4 h-4" />
              </div>
            ) : toast.type === 'success' ? (
              <div className="w-8 h-8 rounded-full bg-[#6E2D3E] flex items-center justify-center flex-shrink-0 text-white">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-[#33302C] flex items-center justify-center flex-shrink-0 text-white">
                <Info className="w-4 h-4" />
              </div>
            )}

            <div className="flex-1 min-w-0 pr-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#D5C4B4]">
                {toast.title}
              </p>
              {toast.message && (
                <p className="text-sm text-[#EAE6DF] mt-0.5 line-clamp-2 leading-snug">
                  {toast.message}
                </p>
              )}
              {toast.type === 'bag' && (
                <button
                  type="button"
                  onClick={() => setIsBagOpen(true)}
                  className="mt-2 text-xs text-[#EAD7B8] hover:text-white underline underline-offset-4 font-medium transition-colors cursor-pointer"
                >
                  View Shopping Bag →
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="text-[#9C948A] hover:text-white transition-colors p-1 cursor-pointer"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
