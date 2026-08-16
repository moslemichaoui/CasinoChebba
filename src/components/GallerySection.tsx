import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { GALLERY_ITEMS, GalleryItem } from '../data/restaurantData';
import { Image as ImageIcon, X, Maximize2, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const { t, language } = useLanguage();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);

  const filterTabs = [
    { id: 'all', label: t('galAll') },
    { id: 'terrace', label: t('galTerrace') },
    { id: 'dishes', label: t('galDishes') },
    { id: 'drinks', label: t('galDrinks') },
    { id: 'evening', label: t('galEvening') },
  ];

  const filteredGallery = selectedFilter === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === selectedFilter);

  return (
    <section id="gallery" className="py-20 bg-[#F8F5F2] relative z-10 border-b border-[#0A2540]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-bold block mb-2">
            {language === 'ar' ? 'معرض الصور الحصري' : 'Atmosphère & Cadre'}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0A2540] tracking-tight font-display mb-3">
            {t('galTitle')}
          </h2>
          <div className="h-1 w-16 bg-[#D4AF37] mx-auto mb-4 rounded-full" />
          <p className="text-base sm:text-lg text-[#0A2540]/70">
            {t('galSubtitle')}
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id)}
              className={`px-5 py-2.5 rounded-full text-xs uppercase font-bold tracking-widest transition-all ${
                selectedFilter === tab.id
                  ? 'bg-[#0A2540] text-white shadow-luxury font-bold'
                  : 'bg-white text-[#0A2540]/70 hover:text-[#0A2540] border border-[#0A2540]/10 hover:border-[#0A2540]/25'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveImage(item)}
              className="group relative h-64 sm:h-72 rounded-3xl overflow-hidden cursor-pointer bg-[#F4EBE2] border border-[#D4AF37]/20 shadow-luxury shadow-luxury-hover"
            >
              <img
                src={item.image}
                alt={language === 'ar' ? item.titleAr : item.titleFr}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540] via-[#0A2540]/25 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

              {/* Overlay Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="p-2.5 rounded-xl bg-white/20 text-white backdrop-blur-md">
                    <Maximize2 className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white font-display mb-1 group-hover:text-[#D4AF37] transition-colors">
                    {language === 'ar' ? item.titleAr : item.titleFr}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-[#FDFCFB]/80 font-medium">
                    <span>🌊 Casino Chebba • La Chebba</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 bg-[#0A2540]/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setActiveImage(null)}
        >
          <button
            onClick={() => setActiveImage(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Fermer"
          >
            <X className="w-6 h-6" />
          </button>

          <div
            className="relative max-w-4xl w-full max-h-[85vh] rounded-3xl overflow-hidden bg-[#0A2540] border border-[#D4AF37]/30 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeImage.image}
              alt={language === 'ar' ? activeImage.titleAr : activeImage.titleFr}
              className="w-full max-h-[70vh] object-cover"
            />
            <div className="p-5 bg-[#0A2540] flex items-center justify-between border-t border-white/10">
              <div>
                <h4 className="text-lg font-bold text-white font-display">
                  {language === 'ar' ? activeImage.titleAr : activeImage.titleFr}
                </h4>
                <p className="text-xs text-slate-300">Casino Chebba • La Chebba, Mahdia</p>
              </div>
              <button
                onClick={() => setActiveImage(null)}
                className="px-4 py-2 rounded-xl bg-[#F8F5F2] hover:bg-white text-[#0A2540] text-xs font-bold uppercase tracking-wider shadow-sm"
              >
                {language === 'ar' ? 'إغلاق' : 'Fermer'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
