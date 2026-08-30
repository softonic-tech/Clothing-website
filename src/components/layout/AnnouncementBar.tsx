import React, { useState } from 'react';
import { STORE_CONFIG } from '../../data/config';
import { useShop } from '../../context/ShopContext';
import { ChevronLeft, ChevronRight, Edit3, Check, Copy } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const { addToast, applyPromoCode } = useShop();
  const [promos, setPromos] = useState(STORE_CONFIG.promotions);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(promos[0].text);
  const [editCode, setEditCode] = useState(promos[0].code || 'EXTRAORDINARY10');

  const currentPromo = promos[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % promos.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + promos.length) % promos.length);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    setPromos((prev) =>
      prev.map((item, idx) =>
        idx === currentIndex ? { ...item, text: editText, code: editCode || undefined } : item
      )
    );
    setIsEditing(false);
    addToast({
      type: 'success',
      title: 'Announcement Updated',
      message: 'Custom promotional message has been updated across the storefront.'
    });
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    applyPromoCode(code);
    addToast({
      type: 'success',
      title: 'Code Copied & Applied',
      message: `Code "${code}" copied to clipboard and applied to your bag!`
    });
  };

  return (
    <aside 
      aria-label="Promotions and Announcements"
      className="bg-[#630D16] text-[#F5F2ED] text-[11px] py-2 px-3 sm:px-6 relative z-40 border-b border-[#4D0910] transition-colors"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Navigation arrows for promo carousel */}
        <div className="flex items-center space-x-1">
          <button
            type="button"
            onClick={handlePrev}
            className="p-1 text-[#F5F2ED]/70 hover:text-white transition-colors cursor-pointer"
            aria-label="Previous announcement"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <span className="text-[10px] text-[#F5F2ED]/60 font-mono hidden sm:inline-block">
            0{currentIndex + 1}/0{promos.length}
          </span>
          <button
            type="button"
            onClick={handleNext}
            className="p-1 text-[#F5F2ED]/70 hover:text-white transition-colors cursor-pointer"
            aria-label="Next announcement"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Promo Message */}
        <div className="flex-1 text-center px-2 sm:px-4">
          {isEditing ? (
            <form onSubmit={handleSaveEdit} className="flex items-center justify-center space-x-2 max-w-xl mx-auto">
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="bg-[#4D0910] border border-[#F5F2ED]/40 px-2 py-0.5 text-xs text-white rounded-none focus:outline-none focus:border-white flex-1"
                placeholder="Enter promotional message..."
                autoFocus
              />
              <input
                type="text"
                value={editCode}
                onChange={(e) => setEditCode(e.target.value)}
                className="bg-[#4D0910] border border-[#F5F2ED]/40 px-2 py-0.5 text-xs text-white rounded-none focus:outline-none focus:border-white w-28 uppercase"
                placeholder="Code (Optional)"
              />
              <button
                type="submit"
                className="bg-white hover:bg-[#F5F2ED] text-[#630D16] px-2.5 py-0.5 font-bold flex items-center space-x-1 cursor-pointer transition-colors"
              >
                <Check className="w-3 h-3" />
                <span>Save</span>
              </button>
            </form>
          ) : (
            <div className="flex items-center justify-center flex-wrap gap-x-2.5 gap-y-1 text-xs uppercase tracking-[0.25em] font-medium">
              {currentPromo.highlight && (
                <span className="bg-[#4D0910] text-[#F5F2ED] text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 border border-white/20">
                  {currentPromo.highlight}
                </span>
              )}
              <span className="tracking-[0.2em] text-[#F5F2ED] font-medium">
                {currentPromo.text}
              </span>
              {currentPromo.code && (
                <button
                  type="button"
                  onClick={() => handleCopyCode(currentPromo.code!)}
                  className="inline-flex items-center space-x-1 bg-[#4D0910] hover:bg-black/30 text-[#F5F2ED] px-2 py-0.5 font-mono font-semibold tracking-wider text-[10px] border border-white/25 transition-all cursor-pointer group"
                  title="Click to copy & apply"
                >
                  <span>{currentPromo.code}</span>
                  <Copy className="w-2.5 h-2.5 opacity-70 group-hover:opacity-100" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Edit promo action trigger */}
        <div className="flex items-center space-x-2">
          {!isEditing ? (
            <button
              type="button"
              onClick={() => {
                setEditText(currentPromo.text);
                setEditCode(currentPromo.code || '');
                setIsEditing(true);
              }}
              className="text-[#F5F2ED]/70 hover:text-white text-[10px] uppercase tracking-wider flex items-center space-x-1 p-1 transition-colors cursor-pointer"
              title="Edit announcement message"
            >
              <Edit3 className="w-3 h-3" />
              <span className="hidden md:inline">Edit Message</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="text-[#F5F2ED]/80 hover:text-white text-[11px] underline cursor-pointer"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};
