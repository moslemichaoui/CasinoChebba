import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { 
  Bike, 
  Phone, 
  Clock, 
  Utensils, 
  MapPin, 
  CheckCircle, 
  ShoppingBag,
  Sparkles,
  Pizza,
  Sandwich,
  Fish
} from 'lucide-react';

export const DeliverySection: React.FC = () => {
  const { t, language, isRTL } = useLanguage();
  const { setIsCartOpen } = useCart();

  const steps = [
    {
      num: '01',
      title: t('delStep1Title'),
      desc: t('delStep1Desc'),
      icon: Utensils,
    },
    {
      num: '02',
      title: t('delStep2Title'),
      desc: t('delStep2Desc'),
      icon: Phone,
    },
    {
      num: '03',
      title: t('delStep3Title'),
      desc: t('delStep3Desc'),
      icon: Bike,
    },
  ];

  return (
    <section id="delivery" className="py-20 bg-[#FDFCFB] relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0A2540] rounded-3xl border border-[#D4AF37]/25 p-8 sm:p-12 shadow-luxury relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-bold block">
                  {language === 'ar' ? 'خدمة التوصيل السريع • الشابة' : 'Service de Livraison • La Chebba'}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-slate-200 text-[11px] font-semibold flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#D4AF37]" />
                  {language === 'ar' ? '11:00 صباحاً – 00:00 ليلاً' : '11h00 – 00h00'}
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display leading-tight">
                {t('delTitle')}
              </h2>

              <p className="text-base text-slate-200 leading-relaxed">
                {t('delSubtitle')}
              </p>

              {/* Steps Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {steps.map((st, i) => {
                  const Icon = st.icon;
                  return (
                    <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10 relative">
                      <div className="text-2xl font-extrabold text-[#D4AF37] font-display mb-2">
                        {st.num}
                      </div>
                      <h4 className="text-sm font-bold text-white mb-1">{st.title}</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">{st.desc}</p>
                    </div>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {/* Direct Call Allo Baya */}
                <a
                  href={`tel:${RESTAURANT_INFO.deliveryPhoneClean}`}
                  className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#F4EBE2] hover:bg-[#eae0d5] text-[#0A2540] font-bold text-xs uppercase tracking-wider shadow-luxury transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Bike className="w-4 h-4 text-orange-600" />
                  <span>{t('delCallAlloBaya')} (23 783 745)</span>
                </a>

                {/* Open Tray to Prepare Order */}
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs uppercase tracking-wider border border-white/15 transition-all"
                >
                  <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
                  <span>{t('cartTitle')}</span>
                </button>
              </div>
            </div>

            {/* Right Card / Badge Column with 3 Pillars & QR Preview */}
            <div className="lg:col-span-5">
              <div className="relative p-6 sm:p-7 rounded-3xl bg-white text-[#0A2540] border border-[#D4AF37]/30 shadow-luxury overflow-hidden">
                <div className="flex items-center justify-between border-b border-[#0A2540]/10 pb-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#F4EBE2] border border-[#D4AF37]/30 flex items-center justify-center text-2xl shadow-sm">
                      🛵
                    </div>
                    <div>
                      <div className="text-base font-bold text-[#0A2540] font-display">
                        Allo Baya (ألو باية)
                      </div>
                      <div className="text-xs text-orange-600 font-bold">
                        {language === 'ar' ? 'شريك التوصيل الرسمي لـ كازينو الشابة' : 'Partenaire Officiel Casino Chebba'}
                      </div>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#0A2540] text-[#D4AF37] text-xs font-bold shadow-sm">
                    11h – 00h
                  </span>
                </div>

                {/* 3 Pillars Fast Preview */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="p-2.5 rounded-xl bg-[#F8F5F2] border border-[#0A2540]/5 text-center">
                    <Sandwich className="w-4 h-4 text-orange-600 mx-auto mb-1" />
                    <div className="text-[11px] font-bold text-[#0A2540]">FAST FOOD</div>
                    <div className="text-[9px] text-[#0A2540]/60">Makloub • Tacos</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#F8F5F2] border border-[#0A2540]/5 text-center">
                    <Pizza className="w-4 h-4 text-red-600 mx-auto mb-1" />
                    <div className="text-[11px] font-bold text-[#0A2540]">PIZZA N°1</div>
                    <div className="text-[9px] text-[#0A2540]/60">Au feu de bois</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#F8F5F2] border border-[#0A2540]/5 text-center">
                    <Fish className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                    <div className="text-[11px] font-bold text-[#0A2540]">CUISINE</div>
                    <div className="text-[9px] text-[#0A2540]/60">Poissons frais</div>
                  </div>
                </div>

                <div className="space-y-2.5 text-xs sm:text-sm text-[#0A2540]/75">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span>{language === 'ar' ? 'توصيل ساخن لجميع مناطق شاطئ ومدينة الشابة' : 'Livraison rapide à domicile et sur la plage'}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span>{language === 'ar' ? 'احترام كامل لمعايير النظافة والتغليف الحراري' : 'Emballage soigné maintenant la chaleur'}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span>{language === 'ar' ? 'دفع نقدي عند الاستلام بكل سهولة' : 'Paiement à la livraison'}</span>
                  </div>
                </div>

                {/* Direct Order Number Box */}
                <div className="mt-5 pt-4 border-t border-[#0A2540]/10 flex items-center justify-between gap-3">
                  <div className="text-left">
                    <div className="text-[11px] text-[#0A2540]/60">{language === 'ar' ? 'خط الطلب المباشر' : 'Ligne directe de commande'}</div>
                    <a
                      href={`tel:${RESTAURANT_INFO.deliveryPhoneClean}`}
                      className="text-lg sm:text-xl font-black text-[#0A2540] hover:text-[#D4AF37] font-display tracking-wider block"
                    >
                      23 783 745
                    </a>
                  </div>

                  <a
                    href={`tel:${RESTAURANT_INFO.deliveryPhoneClean}`}
                    className="p-2.5 px-4 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
                  >
                    <Bike className="w-4 h-4" />
                    <span>{language === 'ar' ? 'طلب فوري' : 'Commander'}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

