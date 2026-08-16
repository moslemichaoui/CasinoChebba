import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { Fish, Pizza, SunMedium, Bike, ArrowRight, Phone } from 'lucide-react';

export const Highlights: React.FC = () => {
  const { t, language, isRTL } = useLanguage();

  const features = [
    {
      icon: Fish,
      title: t('feat1Title'),
      desc: t('feat1Desc'),
      badge: language === 'ar' ? 'صيد بحري يومي' : 'Direct Pêcheurs',
      color: 'from-blue-500/20 to-cyan-500/10',
      border: 'border-cyan-500/30',
      iconColor: 'text-cyan-400',
    },
    {
      icon: Pizza,
      title: t('feat2Title'),
      desc: t('feat2Desc'),
      badge: language === 'ar' ? 'الرقم 1 بالشابة' : 'N°1 à Chebba',
      color: 'from-amber-500/20 to-orange-500/10',
      border: 'border-amber-500/30',
      iconColor: 'text-amber-400',
    },
    {
      icon: SunMedium,
      title: t('feat3Title'),
      desc: t('feat3Desc'),
      badge: language === 'ar' ? 'إطلالة بانورامية' : 'Front de Mer',
      color: 'from-yellow-500/20 to-amber-500/10',
      border: 'border-yellow-500/30',
      iconColor: 'text-yellow-400',
    },
    {
      icon: Bike,
      title: t('feat4Title'),
      desc: t('feat4Desc'),
      badge: language === 'ar' ? 'شراكة ألو باية' : 'Partenaire Officiel',
      color: 'from-emerald-500/20 to-teal-500/10',
      border: 'border-emerald-500/30',
      iconColor: 'text-emerald-400',
      cta: {
        text: '23 783 745',
        href: `tel:${RESTAURANT_INFO.deliveryPhoneClean}`,
      }
    },
  ];

  return (
    <section className="py-16 bg-[#F8F5F2] relative z-10 border-b border-[#0A2540]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="relative p-6 rounded-3xl bg-white border border-[#0A2540]/8 shadow-luxury shadow-luxury-hover flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-2xl bg-[#F4EBE2] border border-[#D4AF37]/30 text-[#0A2540] shadow-sm">
                      <Icon className="w-5 h-5 text-[#0A2540]" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#F8F5F2] text-[#0A2540]/80 border border-[#0A2540]/5">
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#0A2540] mb-2 font-display">
                    {feat.title}
                  </h3>

                  <p className="text-sm text-[#0A2540]/70 leading-relaxed mb-4">
                    {feat.desc}
                  </p>
                </div>

                {feat.cta && (
                  <a
                    href={feat.cta.href}
                    className="inline-flex items-center gap-2 text-xs font-bold text-orange-600 hover:text-orange-700 pt-3 border-t border-[#0A2540]/5"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{language === 'ar' ? 'اتصل للتوصيل' : 'Commander'} : {feat.cta.text}</span>
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
