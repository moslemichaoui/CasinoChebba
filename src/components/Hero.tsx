import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { RESTAURANT_INFO } from '../data/restaurantData';
import imgTerraceSea from '../assets/images/casino_chebba_terrace_sea_1786819269051.jpg';
import { 
  CalendarCheck, 
  Utensils, 
  Phone, 
  MapPin, 
  Clock, 
  Star, 
  Fish, 
  Pizza, 
  Sparkles, 
  Bike 
} from 'lucide-react';

export const Hero: React.FC = () => {
  const { t, language, isRTL } = useLanguage();

  return (
    <section id="home" className="relative min-h-[90vh] lg:min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background Image with Layered Gradient Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src={imgTerraceSea}
          alt="Terrasse Casino Chebba bord de mer"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 transform duration-[10000ms]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540] via-[#0A2540]/85 to-[#0A2540]/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#D4AF37]/15 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Live Status Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A2540]/90 border border-[#D4AF37]/40 text-[#D4AF37] text-xs sm:text-sm font-semibold mb-6 backdrop-blur-md shadow-luxury">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping inline-block" />
          <span>{t('openStatus')}</span>
          <span className="text-white/40">•</span>
          <span className="flex items-center gap-1 text-[#FDFCFB]/90">
            <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
            {language === 'ar' ? 'شاطئ الشابة' : 'La Plage, La Chebba'}
          </span>
        </div>

        {/* Main Brand Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight font-display mb-4 leading-tight">
          <span className="block">{t('heroTitlePart1')}</span>
          <span className="block bg-gradient-to-r from-[#F0D279] via-[#D4AF37] to-[#C29B27] bg-clip-text text-transparent italic">
            {t('heroTitlePart2')}
          </span>
        </h1>

        {/* Subtitle / Description */}
        <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-[#FDFCFB]/85 mb-8 font-normal leading-relaxed">
          {t('heroDescription')}
        </p>

        {/* Call to Actions (CTAs) */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-12">
          {/* Primary: Reserve Table */}
          <a
            href="#reservation"
            className="flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-xl bg-[#D4AF37] hover:bg-[#c59b27] text-[#0A2540] font-bold text-sm uppercase tracking-wider shadow-luxury transition-all hover:scale-[1.03] active:scale-[0.98]"
          >
            <CalendarCheck className="w-5 h-5" />
            <span>{t('heroCtaReserve')}</span>
          </a>

          {/* Secondary: Discover Menu */}
          <a
            href="#menu"
            className="flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-xl bg-[#0A2540] hover:bg-[#123659] text-white font-bold text-sm uppercase tracking-wider border border-[#D4AF37]/50 shadow-luxury transition-all hover:border-[#D4AF37]"
          >
            <Utensils className="w-5 h-5 text-[#D4AF37]" />
            <span>{t('heroCtaMenu')}</span>
          </a>

          {/* Tertiary: Delivery Allo Baya */}
          <a
            href="#delivery"
            className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#F4EBE2] hover:bg-[#eae0d5] text-[#0A2540] font-bold text-xs uppercase tracking-wider border border-[#D4AF37]/30 shadow-luxury transition-all"
          >
            <Bike className="w-4 h-4 text-orange-600" />
            <span>{t('heroCtaDelivery')} (23 783 745)</span>
          </a>
        </div>

        {/* Highlight Stats / Badges Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto pt-4 border-t border-white/15">
          <div className="glass-panel-dark p-3.5 rounded-2xl flex items-center gap-3 text-left shadow-luxury">
            <div className="p-2.5 rounded-xl bg-[#D4AF37]/20 text-[#D4AF37] shrink-0">
              <Fish className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-300 font-medium">{language === 'ar' ? 'طزاجة مضمونة' : 'Fraîcheur marine'}</div>
              <div className="text-sm font-bold text-white leading-snug">{t('statFresh')}</div>
            </div>
          </div>

          <div className="glass-panel-dark p-3.5 rounded-2xl flex items-center gap-3 text-left shadow-luxury">
            <div className="p-2.5 rounded-xl bg-[#D4AF37]/20 text-[#D4AF37] shrink-0">
              <Pizza className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-300 font-medium">{language === 'ar' ? 'جودة إيطالية' : 'Réputation'}</div>
              <div className="text-sm font-bold text-white leading-snug">{t('statPizza')}</div>
            </div>
          </div>

          <div className="glass-panel-dark p-3.5 rounded-2xl flex items-center gap-3 text-left shadow-luxury">
            <div className="p-2.5 rounded-xl bg-[#D4AF37]/20 text-[#D4AF37] shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-300 font-medium">{language === 'ar' ? 'إطلالة شاطئية' : 'Cadre unique'}</div>
              <div className="text-sm font-bold text-white leading-snug">{t('statTerrace')}</div>
            </div>
          </div>

          <div className="glass-panel-dark p-3.5 rounded-2xl flex items-center gap-3 text-left shadow-luxury">
            <div className="p-2.5 rounded-xl bg-amber-400/20 text-amber-300 shrink-0">
              <Star className="w-5 h-5 fill-amber-400" />
            </div>
            <div>
              <div className="text-xs text-slate-300 font-medium">{language === 'ar' ? 'تقييم 4.6 / 5' : 'Note 4.6 / 5'}</div>
              <div className="text-sm font-bold text-white leading-snug">{t('statReviews')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
