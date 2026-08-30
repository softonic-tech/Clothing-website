import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useShop } from '../../context/ShopContext';
import { X, Ruler, Sparkles, CheckCircle2 } from 'lucide-react';

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useShop();
  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');
  const [activeTab, setActiveTab] = useState<'women' | 'men'>('women');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSizeGuideOpen) {
        setIsSizeGuideOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSizeGuideOpen, setIsSizeGuideOpen]);

  if (!isSizeGuideOpen) return null;

  const womenMeasurements = [
    { size: 'XS (US 0-2)', bust: unit === 'inches' ? '31 - 33' : '78 - 84', waist: unit === 'inches' ? '24 - 25' : '61 - 64', hips: unit === 'inches' ? '34 - 35' : '86 - 89' },
    { size: 'S (US 4-6)', bust: unit === 'inches' ? '33 - 35' : '84 - 89', waist: unit === 'inches' ? '26 - 27' : '66 - 69', hips: unit === 'inches' ? '36 - 37' : '91 - 94' },
    { size: 'M (US 8-10)', bust: unit === 'inches' ? '35 - 37' : '89 - 94', waist: unit === 'inches' ? '28 - 30' : '71 - 76', hips: unit === 'inches' ? '38 - 40' : '96 - 102' },
    { size: 'L (US 12)', bust: unit === 'inches' ? '38 - 40' : '96 - 102', waist: unit === 'inches' ? '31 - 33' : '78 - 84', hips: unit === 'inches' ? '41 - 43' : '104 - 109' },
    { size: 'XL (US 14)', bust: unit === 'inches' ? '41 - 43' : '104 - 109', waist: unit === 'inches' ? '34 - 36' : '86 - 91', hips: unit === 'inches' ? '44 - 46' : '111 - 117' }
  ];

  const menMeasurements = [
    { size: 'S (Chest 36-38)', chest: unit === 'inches' ? '36 - 38' : '91 - 96', waist: unit === 'inches' ? '30 - 31' : '76 - 79', neck: unit === 'inches' ? '14.5 - 15' : '37 - 38' },
    { size: 'M (Chest 39-41)', chest: unit === 'inches' ? '39 - 41' : '99 - 104', waist: unit === 'inches' ? '32 - 34' : '81 - 86', neck: unit === 'inches' ? '15.5 - 16' : '39 - 41' },
    { size: 'L (Chest 42-44)', chest: unit === 'inches' ? '42 - 44' : '106 - 112', waist: unit === 'inches' ? '35 - 37' : '89 - 94', neck: unit === 'inches' ? '16.5 - 17' : '42 - 43' },
    { size: 'XL (Chest 45-47)', chest: unit === 'inches' ? '45 - 47' : '114 - 119', waist: unit === 'inches' ? '38 - 40' : '96 - 101', neck: unit === 'inches' ? '17.5 - 18' : '44 - 46' }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => setIsSizeGuideOpen(false)}
          className="fixed inset-0 bg-[#1C1B1A]/70 backdrop-blur-xs"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25 }}
          className="relative bg-[#FBF9F5] border border-[#E8E2D8] max-w-2xl w-full p-6 sm:p-8 shadow-2xl z-10 my-auto"
        >
          {/* Header */}
          <div className="flex items-start justify-between pb-4 border-b border-[#E8E2D8]">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 bg-[#1C1B1A] text-white">
                <Ruler className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif text-2xl text-[#1C1B1A] font-light">
                  Garment Size & Proportions
                </h3>
                <p className="text-xs text-[#7D766D] font-mono">
                  Tailored to international luxury sizing standards
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsSizeGuideOpen(false)}
              className="p-1.5 text-[#6E675E] hover:text-[#1C1B1A] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Controls: Gender Tab + Unit Toggle */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => setActiveTab('women')}
                className={`px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                  activeTab === 'women'
                    ? 'bg-[#1C1B1A] text-white'
                    : 'bg-[#F2ECE3] text-[#5C554C] hover:text-[#1C1B1A]'
                }`}
              >
                Women's Sizing
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('men')}
                className={`px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                  activeTab === 'men'
                    ? 'bg-[#1C1B1A] text-white'
                    : 'bg-[#F2ECE3] text-[#5C554C] hover:text-[#1C1B1A]'
                }`}
              >
                Men's Sizing
              </button>
            </div>

            <div className="flex items-center space-x-1 border border-[#D5CDBD] p-0.5 bg-white text-xs font-mono">
              <button
                type="button"
                onClick={() => setUnit('inches')}
                className={`px-2.5 py-1 transition-colors cursor-pointer ${
                  unit === 'inches' ? 'bg-[#6E2D3E] text-white' : 'text-[#7D766D]'
                }`}
              >
                INCHES
              </button>
              <button
                type="button"
                onClick={() => setUnit('cm')}
                className={`px-2.5 py-1 transition-colors cursor-pointer ${
                  unit === 'cm' ? 'bg-[#6E2D3E] text-white' : 'text-[#7D766D]'
                }`}
              >
                CM
              </button>
            </div>
          </div>

          {/* Sizing Table */}
          <div className="mt-6 overflow-x-auto border border-[#E8E2D8] bg-white">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-[#F6F2EB] border-b border-[#E8E2D8] text-[#1C1B1A] uppercase tracking-wider">
                <tr>
                  <th className="p-3">Garment Size</th>
                  {activeTab === 'women' ? (
                    <>
                      <th className="p-3">Bust ({unit})</th>
                      <th className="p-3">Waist ({unit})</th>
                      <th className="p-3">Hips ({unit})</th>
                    </>
                  ) : (
                    <>
                      <th className="p-3">Chest ({unit})</th>
                      <th className="p-3">Waist ({unit})</th>
                      <th className="p-3">Collar ({unit})</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F2ECE2] text-[#4A453E]">
                {activeTab === 'women'
                  ? womenMeasurements.map((row) => (
                      <tr key={row.size} className="hover:bg-[#FAF8F5]">
                        <td className="p-3 font-semibold text-[#1C1B1A]">{row.size}</td>
                        <td className="p-3">{row.bust}</td>
                        <td className="p-3">{row.waist}</td>
                        <td className="p-3">{row.hips}</td>
                      </tr>
                    ))
                  : menMeasurements.map((row) => (
                      <tr key={row.size} className="hover:bg-[#FAF8F5]">
                        <td className="p-3 font-semibold text-[#1C1B1A]">{row.size}</td>
                        <td className="p-3">{row.chest}</td>
                        <td className="p-3">{row.waist}</td>
                        <td className="p-3">{row.neck}</td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>

          {/* Measuring Advice */}
          <div className="mt-6 p-4 bg-[#F4EFE6] border border-[#E3DCD1] text-xs text-[#6B645B] space-y-1.5 leading-relaxed">
            <p className="font-semibold uppercase tracking-wider text-[#1C1B1A] font-mono">
              Atelier Fit Advice:
            </p>
            <p>
              • If your measurements fall between two sizes, we recommend sizing up for outerwear and tailored wool trousers, and selecting your true size for bias-cut silk and knitwear.
            </p>
            <p>
              • Need custom tailoring? Complimentary sleeve and hem adjustments are available at our Soho Flagship Studio.
            </p>
          </div>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setIsSizeGuideOpen(false)}
              className="px-6 py-2.5 bg-[#1C1B1A] text-white text-xs font-semibold uppercase tracking-wider cursor-pointer"
            >
              Close Size Guide
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
