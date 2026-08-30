import React from 'react';
import { useShop } from '../../context/ShopContext';
import { STORE_CONFIG } from '../../data/config';
import { ArrowUpRight, ShieldCheck, Truck, RefreshCw, Mail, Phone, MapPin, Sparkles } from 'lucide-react';
import { Category } from '../../types';

export const Footer: React.FC = () => {
  const { navigateTo, setIsSizeGuideOpen } = useShop();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1A1A1A] text-[#F5F2ED] pt-16 pb-12 border-t border-[rgba(26,26,26,0.15)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Core Value Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-14 border-b border-white/10">
          <div className="flex items-start space-x-3.5">
            <div className="p-2.5 bg-white/5 border border-white/10 text-[#D5C4B4] flex-shrink-0">
              <Truck className="w-5 h-5 text-[#D5C4B4]" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#F5F2ED]">
                Complimentary Global Delivery
              </h4>
              <p className="text-xs text-[#A8A095] mt-1 leading-relaxed">
                Enjoy carbon-neutral delivery on all orders over $300. Packaged in recycled linen boxes.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3.5">
            <div className="p-2.5 bg-white/5 border border-white/10 text-[#D5C4B4] flex-shrink-0">
              <RefreshCw className="w-5 h-5 text-[#D5C4B4]" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#F5F2ED]">
                30-Day Studio Returns
              </h4>
              <p className="text-xs text-[#A8A095] mt-1 leading-relaxed">
                Complimentary return pick-up and effortless size exchanges for unworn wardrobe pieces.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3.5">
            <div className="p-2.5 bg-white/5 border border-white/10 text-[#D5C4B4] flex-shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#D5C4B4]" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#F5F2ED]">
                Certified Natural Fibers
              </h4>
              <p className="text-xs text-[#A8A095] mt-1 leading-relaxed">
                100% GOTS organic cotton, Mongolian cashmere, and Mulberry silk traceable to origin.
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 py-14 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <button
              type="button"
              onClick={() => navigateTo('home')}
              className="text-left group cursor-pointer"
            >
              <span className="serif text-3xl font-bold tracking-tight text-[#F5F2ED] group-hover:text-[#D5C4B4] transition-colors">
                PEPLAB
              </span>
              <span className="block text-[10px] tracking-[0.3em] uppercase text-[#8E867B] mt-0.5 font-medium">
                Design Studio
              </span>
            </button>

            <p className="text-sm text-[#BDB5A8] max-w-sm leading-relaxed font-light">
              PEPLAB is a design studio exploring the intersection of architectural geometry and wearable textile. Each piece is crafted in small batches using surplus high-end fabrics.
            </p>

            <div className="pt-2 text-xs text-[#8E867B] space-y-1.5 font-mono">
              <p className="flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 text-[#D5C4B4]" />
                <span>London &mdash; Tokyo &mdash; New York</span>
              </p>
              <p className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-[#D5C4B4]" />
                <span>concierge@peplab.studio</span>
              </p>
            </div>
          </div>

          {/* Collections */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#D5C4B4] mb-4">
              Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A8A095]">
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('shop', 'All')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  New Arrivals
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('shop', 'Women')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Women
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('shop', 'Men')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Men
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('shop', 'Essentials')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Objects
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('lookbook')}
                  className="hover:text-white transition-colors cursor-pointer flex items-center space-x-1"
                >
                  <span>The Lookbook</span>
                  <ArrowUpRight className="w-3 h-3 text-[#D5C4B4]" />
                </button>
              </li>
            </ul>
          </div>

          {/* Client Concierge */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#D5C4B4] mb-4">
              Client Care
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A8A095]">
              <li>
                <button
                  type="button"
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Garment Size Guide
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('story')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Fiber & Care Codex
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('story')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Shipping & Returns
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('story')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Stockists
                </button>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#D5C4B4] mb-4">
              Connect
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A8A095]">
              {STORE_CONFIG.socials.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition-colors flex items-center space-x-1.5"
                  >
                    <span>{s.name}</span>
                    <ArrowUpRight className="w-3 h-3 text-[#7D766D]" />
                  </a>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('story')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Sustainability
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-[10px] uppercase tracking-[0.2em] text-[#7A736A] space-y-4 md:space-y-0">
          <div>
            &copy; 2026 PEPLAB Studio. All Rights Reserved.
          </div>

          <div className="flex items-center space-x-8">
            <button
              type="button"
              onClick={() => navigateTo('story')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Sustainability
            </button>
            <button
              type="button"
              onClick={() => navigateTo('story')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Stockists
            </button>
            <button
              type="button"
              onClick={() => navigateTo('story')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Shipping & Returns
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <span>London &mdash; Tokyo</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="text-[#A8A095] hover:text-white transition-colors cursor-pointer"
            >
              ↑ Top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
