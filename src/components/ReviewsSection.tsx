import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { REVIEWS_DATA, RESTAURANT_INFO } from '../data/restaurantData';
import { Star, MessageSquare, ThumbsUp, CheckCircle, Quote } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <section id="reviews" className="py-20 bg-[#FDFCFB] relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Rating Banner */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-bold block mb-2">
            {language === 'ar' ? 'ثقة زبائننا ورضاهم' : 'Avis & Témoignages'}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0A2540] tracking-tight font-display mb-3">
            {t('revTitle')}
          </h2>
          <div className="h-1 w-16 bg-[#D4AF37] mx-auto mb-4 rounded-full" />
          <p className="text-base sm:text-lg text-[#0A2540]/70">
            {t('revSubtitle')}
          </p>

          {/* Social Proof Stats Banner */}
          <div className="mt-8 p-6 sm:p-8 rounded-3xl bg-white border border-[#D4AF37]/25 shadow-luxury grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#0A2540] font-display flex items-center justify-center gap-2">
                <span>{RESTAURANT_INFO.rating.score}</span>
                <span className="text-lg text-[#0A2540]/40 font-normal">/ 5</span>
              </div>
              <div className="flex items-center justify-center gap-1 text-[#D4AF37]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#D4AF37]" />
                ))}
              </div>
              <div className="text-xs text-[#0A2540]/60 font-semibold uppercase tracking-wider">
                {language === 'ar' ? 'متوسط تقييمات الزوار' : 'Note moyenne globale'}
              </div>
            </div>

            <div className="space-y-1 sm:border-x border-[#0A2540]/10 px-4">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#0A2540] font-display flex items-center justify-center gap-2">
                <ThumbsUp className="w-6 h-6 text-[#D4AF37]" />
                <span>{RESTAURANT_INFO.rating.recommendationPercent}%</span>
              </div>
              <div className="text-xs text-[#0A2540] font-bold">
                {language === 'ar' ? 'نسبة توصية قياسية' : 'Recommandation vérifiée'}
              </div>
              <div className="text-xs text-[#0A2540]/60 font-medium">
                {t('revRecommendation')}
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#0A2540] font-display">
                +{RESTAURANT_INFO.rating.totalReviews}
              </div>
              <div className="text-xs text-[#D4AF37] font-bold uppercase tracking-wider">
                {language === 'ar' ? 'تقييم زبون حقيقي' : 'Avis vérifiés'}
              </div>
              <div className="text-xs text-[#0A2540]/60 font-medium">
                Google, Facebook & TripAdvisor
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {REVIEWS_DATA.map((rev) => (
            <div
              key={rev.id}
              className="p-6 sm:p-8 rounded-3xl bg-white border border-[#D4AF37]/15 hover:border-[#D4AF37]/40 shadow-luxury shadow-luxury-hover flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={rev.avatar}
                      alt={rev.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-[#D4AF37]/50"
                    />
                    <div>
                      <h4 className="text-base font-bold text-[#0A2540] font-display flex items-center gap-1.5">
                        <span>{rev.name}</span>
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      </h4>
                      <div className="text-xs text-[#0A2540]/50">
                        {rev.location} • {language === 'ar' ? rev.dateAr : rev.dateFr}
                      </div>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-[#F8F5F2] border border-[#0A2540]/5 text-xs font-semibold text-[#0A2540]/70">
                    {rev.source}
                  </span>
                </div>

                {/* Stars */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-sm text-[#0A2540]/80 leading-relaxed italic relative">
                  "{language === 'ar' ? rev.commentAr : rev.commentFr}"
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#0A2540]/5 flex items-center justify-between text-xs text-[#0A2540]/50 font-medium">
                <span>🌊 Casino Chebba</span>
                <span className="text-emerald-700 font-semibold">✓ {language === 'ar' ? 'زيارة موثقة' : 'Visite vérifiée'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
