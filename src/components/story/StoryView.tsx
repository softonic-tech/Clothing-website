import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { Sparkles, MapPin, Calendar, Clock, ArrowRight, CheckCircle2, Scissors, Feather, Compass } from 'lucide-react';
import { motion } from 'motion/react';

export const StoryView: React.FC = () => {
  const { navigateTo, addToast } = useShop();
  const [appointmentName, setAppointmentName] = useState('');
  const [appointmentEmail, setAppointmentEmail] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('2026-09-15');
  const [appointmentTime, setAppointmentTime] = useState('14:00');
  const [isBooked, setIsBooked] = useState(false);

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!appointmentName || !appointmentEmail) return;

    setIsBooked(true);
    addToast({
      type: 'success',
      title: 'Studio Appointment Confirmed (Demo)',
      message: `Your private fitting at 482 Mercer St, Soho has been reserved for ${appointmentDate} at ${appointmentTime}.`
    });
  };

  return (
    <div className="bg-[#FBF9F5] min-h-screen py-10 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
        {/* Editorial Hero Banner */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-[0.3em] font-mono text-[#8C847A]">
            The PEPLAB Studio Manifesto
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1C1B1A] font-light leading-tight">
            Wear Your Everyday <br className="hidden sm:inline" />
            Extraordinary
          </h1>
          <p className="text-base sm:text-lg text-[#5A544C] font-light leading-relaxed">
            We reject the disposable rhythm of modern fast-fashion. Every PEPLAB silhouette is engineered with architectural geometry, natural drape, and heritage textiles built to outlive seasons.
          </p>
        </div>

        {/* Large Editorial Diptych */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          <div className="relative aspect-[4/5] bg-[#1C1B1A] overflow-hidden border border-[#E8E2D8]">
            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85"
              alt="Atelier Cutting Table in Soho"
              className="w-full h-full object-cover object-center filter saturate-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#D5C4B4]">
                Biella, Piedmont
              </span>
              <p className="font-serif text-xl font-light text-[#FBF9F5] mt-1">
                Super 130s Traceable Virgin Wool, woven on vintage projectile looms.
              </p>
            </div>
          </div>

          <div className="relative aspect-[4/5] bg-[#1C1B1A] overflow-hidden border border-[#E8E2D8]">
            <img
              src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=85"
              alt="Drape and Silhouette Development"
              className="w-full h-full object-cover object-center filter saturate-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#D5C4B4]">
                Okayama, Japan
              </span>
              <p className="font-serif text-xl font-light text-[#FBF9F5] mt-1">
                Custom shuttle-loomed selvedge twill with unbleached organic cotton warp.
              </p>
            </div>
          </div>
        </div>

        {/* The Three Pillars */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] font-mono text-[#8C847A]">
              Three Guiding Standards
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1B1A] font-light">
              Craft Without Compromise
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="p-8 bg-white border border-[#E8E2D8] space-y-4">
              <div className="w-10 h-10 bg-[#FAF6EE] text-[#6E2D3E] flex items-center justify-center border border-[#EAE2D2]">
                <Scissors className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl text-[#1C1B1A] font-medium">
                01. Zero Deadstock Batching
              </h3>
              <p className="text-xs sm:text-sm text-[#6A6359] leading-relaxed">
                We produce strictly in small, capped atelier runs. We order fabric based on precise preorder demand curves, eliminating the industry standard 30% unsold landfill margin.
              </p>
            </div>

            <div className="p-8 bg-white border border-[#E8E2D8] space-y-4">
              <div className="w-10 h-10 bg-[#FAF6EE] text-[#6E2D3E] flex items-center justify-center border border-[#EAE2D2]">
                <Feather className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl text-[#1C1B1A] font-medium">
                02. Pure Natural Fibers
              </h3>
              <p className="text-xs sm:text-sm text-[#6A6359] leading-relaxed">
                No synthetic polyester or nylon blends in our main garments. We prioritize Grade-A Mongolian cashmere, 22-momme Mulberry silk, and GOTS-certified organic cotton.
              </p>
            </div>

            <div className="p-8 bg-white border border-[#E8E2D8] space-y-4">
              <div className="w-10 h-10 bg-[#FAF6EE] text-[#6E2D3E] flex items-center justify-center border border-[#EAE2D2]">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl text-[#1C1B1A] font-medium">
                03. Lifetime Atelier Repairs
              </h3>
              <p className="text-xs sm:text-sm text-[#6A6359] leading-relaxed">
                Every PEPLAB item includes complimentary button reinforcement, hem adjustments, and repair services at our flagship studio to keep your wardrobe in service for decades.
              </p>
            </div>
          </div>
        </div>

        {/* Soho Studio Visit & Appointment Reservation */}
        <div className="bg-[#1C1B1A] text-[#FBF9F5] p-8 sm:p-12 border border-[#3A3631]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center space-x-2 text-xs uppercase font-mono tracking-widest text-[#D5C4B4]">
                <MapPin className="w-3.5 h-3.5 text-[#6E2D3E]" />
                <span>Soho Atelier & Showroom</span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl font-light text-white leading-snug">
                Reserve a Private Fitting Appointment
              </h3>
              <p className="text-xs sm:text-sm text-[#BDB5A8] leading-relaxed">
                Step inside our Mercer Street loft for an uninterrupted fitting session with a dedicated PEPLAB stylist. Enjoy espresso or champagne while exploring unreleased archive textiles and custom alterations.
              </p>
              <div className="pt-2 text-xs font-mono text-[#8C847A] space-y-1">
                <p>📍 482 Mercer Street, Soho, New York, NY 10013</p>
                <p>🕒 Tuesday – Saturday: 10:00 AM – 7:00 PM EST</p>
              </div>
            </div>

            {/* Booking Form (Demo) */}
            <div className="lg:col-span-6 bg-[#262422] p-6 sm:p-8 border border-[#3E3A35]">
              {!isBooked ? (
                <form onSubmit={handleBook} className="space-y-4">
                  <h4 className="font-serif text-xl text-white font-light">
                    Request Studio Time
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-[10px] uppercase font-mono text-[#9C948A] block mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={appointmentName}
                        onChange={(e) => setAppointmentName(e.target.value)}
                        placeholder="e.g. Charlotte Dubois"
                        required
                        className="w-full bg-[#1C1B1A] border border-[#48423B] p-2.5 text-xs text-white placeholder-[#787168] focus:outline-none focus:border-[#D5C4B4]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-mono text-[#9C948A] block mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={appointmentEmail}
                        onChange={(e) => setAppointmentEmail(e.target.value)}
                        placeholder="e.g. charlotte@example.com"
                        required
                        className="w-full bg-[#1C1B1A] border border-[#48423B] p-2.5 text-xs text-white placeholder-[#787168] focus:outline-none focus:border-[#D5C4B4]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] uppercase font-mono text-[#9C948A] block mb-1">
                          Preferred Date
                        </label>
                        <input
                          type="date"
                          value={appointmentDate}
                          onChange={(e) => setAppointmentDate(e.target.value)}
                          className="w-full bg-[#1C1B1A] border border-[#48423B] p-2.5 text-xs text-white focus:outline-none focus:border-[#D5C4B4]"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-mono text-[#9C948A] block mb-1">
                          Time Window
                        </label>
                        <select
                          value={appointmentTime}
                          onChange={(e) => setAppointmentTime(e.target.value)}
                          className="w-full bg-[#1C1B1A] border border-[#48423B] p-2.5 text-xs text-white focus:outline-none focus:border-[#D5C4B4]"
                        >
                          <option value="11:00">11:00 AM EST</option>
                          <option value="14:00">2:00 PM EST</option>
                          <option value="16:00">4:00 PM EST</option>
                          <option value="18:00">6:00 PM EST</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 py-3 bg-[#6E2D3E] hover:bg-[#58212F] text-white text-xs font-semibold uppercase tracking-[0.2em] transition-colors cursor-pointer"
                  >
                    Confirm Private Reservation (Demo)
                  </button>
                  <p className="text-[10px] text-center text-[#787168] font-mono">
                    Demo Mode: Simulated fitting appointment will be registered immediately.
                  </p>
                </form>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <div className="w-12 h-12 bg-[#6E2D3E] text-white rounded-full mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif text-2xl text-white font-light">
                    Fitting Reserved
                  </h4>
                  <p className="text-xs text-[#D1C8BE] leading-relaxed">
                    We look forward to welcoming you to the Soho Atelier on <strong className="text-white">{appointmentDate} at {appointmentTime}</strong>. A demo confirmation has been recorded.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsBooked(false)}
                    className="text-xs font-mono text-[#D5C4B4] underline uppercase cursor-pointer"
                  >
                    Book Another Fitting
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* CTA to Shop */}
        <div className="text-center pt-8">
          <button
            type="button"
            onClick={() => navigateTo('shop')}
            className="inline-flex items-center space-x-3 px-8 py-4 bg-[#1C1B1A] hover:bg-[#6E2D3E] text-white text-xs font-semibold uppercase tracking-[0.2em] transition-colors cursor-pointer"
          >
            <span>Explore The Current Collection</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
