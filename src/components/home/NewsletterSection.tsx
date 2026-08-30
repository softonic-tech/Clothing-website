import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { Mail, CheckCircle2, ArrowRight, Sparkles, Copy } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const NewsletterSection: React.FC = () => {
  const { addToast, applyPromoCode } = useShop();
  const [email, setEmail] = useState('');
  const [preference, setPreference] = useState<'all' | 'women' | 'men'>('all');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }
    if (!emailRegex.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);

    // Simulate luxury API subscription
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
      addToast({
        type: 'success',
        title: 'Welcome to PEPLAB Circle',
        message: 'Your 15% VIP welcome code (WELCOME15) has been unlocked.'
      });
    }, 500);
  };

  const handleApplyWelcomeCode = () => {
    applyPromoCode('WELCOME15');
    addToast({
      type: 'success',
      title: 'Code WELCOME15 Applied',
      message: '15% discount applied to your shopping bag!'
    });
  };

  return (
    <section className="py-20 lg:py-24 bg-[#1A1A1A] text-[#F5F2ED] border-t border-white/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Tag */}
          <div className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-[0.25em] text-[#D5C4B4] mb-3 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-[#630D16]" />
            <span>Private Editorial Dispatch</span>
          </div>

          {/* Heading */}
          <h2 className="serif text-3xl sm:text-4xl lg:text-5xl font-light text-white">
            Join the PEPLAB Circle
          </h2>

          <p className="mt-4 text-sm sm:text-base text-[#BDB5A8] max-w-lg mx-auto font-light leading-relaxed">
            Receive private access to limited capsule releases, bespoke fitting appointments in our Soho studio, and 15% off your first wardrobe order.
          </p>

          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto space-y-4">
                {/* Preference Pills */}
                <div className="flex items-center justify-center space-x-2 text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => setPreference('all')}
                    className={`px-3 py-1 border transition-colors cursor-pointer text-[11px] uppercase tracking-wider ${
                      preference === 'all'
                        ? 'bg-[#630D16] border-[#630D16] text-[#F5F2ED]'
                        : 'border-white/20 text-[#A8A095] hover:text-white'
                    }`}
                  >
                    All Collections
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreference('women')}
                    className={`px-3 py-1 border transition-colors cursor-pointer text-[11px] uppercase tracking-wider ${
                      preference === 'women'
                        ? 'bg-[#630D16] border-[#630D16] text-[#F5F2ED]'
                        : 'border-white/20 text-[#A8A095] hover:text-white'
                    }`}
                  >
                    Women
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreference('men')}
                    className={`px-3 py-1 border transition-colors cursor-pointer text-[11px] uppercase tracking-wider ${
                      preference === 'men'
                        ? 'bg-[#630D16] border-[#630D16] text-[#F5F2ED]'
                        : 'border-white/20 text-[#A8A095] hover:text-white'
                    }`}
                  >
                    Men
                  </button>
                </div>

                {/* Input + Submit */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError('');
                      }}
                      placeholder="Enter your email address..."
                      className="w-full bg-white/10 border border-white/20 focus:border-[#D5C4B4] text-white px-4 py-3 text-xs placeholder-[#7E776E] focus:outline-none transition-colors"
                      aria-label="Email address"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3 bg-[#F5F2ED] hover:bg-white text-[#1A1A1A] text-[11px] font-bold tracking-[0.2em] uppercase transition-colors flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                  >
                    <span>{loading ? 'Subscribing...' : 'Subscribe'}</span>
                    {!loading && <ArrowRight className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {error && (
                  <p className="text-xs text-[#E87979] text-left font-mono">{error}</p>
                )}

                <p className="text-[11px] text-[#7A736A] font-mono">
                  Demo Mode: No spam. You may unsubscribe anytime with a single click.
                </p>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-8 p-6 bg-white/5 border border-white/10 max-w-md mx-auto text-center space-y-4"
              >
                <div className="w-10 h-10 bg-[#630D16] rounded-full mx-auto flex items-center justify-center text-white">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="serif text-2xl text-white font-light">
                  Welcome to PEPLAB
                </h3>
                <p className="text-xs text-[#D1C8BE] leading-relaxed">
                  Thank you for subscribing with <span className="text-white font-medium">{email}</span>. Your exclusive welcome gift is ready:
                </p>
                
                <div className="p-3 bg-[#1A1A1A] border border-white/15 flex items-center justify-between">
                  <div className="text-left font-mono">
                    <span className="text-[10px] text-[#8C847A] uppercase block">15% Off First Order</span>
                    <span className="text-sm text-[#EAD0C3] font-bold tracking-wider">WELCOME15</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleApplyWelcomeCode}
                    className="px-3 py-1.5 bg-[#630D16] hover:bg-[#4D0910] text-[#F5F2ED] text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Apply to Bag
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
