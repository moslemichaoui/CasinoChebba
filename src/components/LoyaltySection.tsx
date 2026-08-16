import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useLoyalty } from '../context/LoyaltyContext';
import { LOYALTY_REWARDS, LOYALTY_TIERS } from '../data/restaurantData';
import { 
  Award, 
  Gift, 
  Crown, 
  Sparkles, 
  CheckCircle, 
  ArrowRight, 
  Calculator, 
  Coins,
  Star,
  Zap,
  TrendingUp,
  Percent
} from 'lucide-react';

export const LoyaltySection: React.FC = () => {
  const { t, language } = useLanguage();
  const { user, openLoyaltyModal, currentTier } = useLoyalty();

  const [spendingAmount, setSpendingAmount] = useState<number>(45);

  const calculatedPoints = Math.round(spendingAmount * 10) + 50; // 10 pts per DT + 50 reservation bonus

  return (
    <section id="loyalty" className="py-20 bg-[#FDFCFB] relative z-10 overflow-hidden">
      {/* Background Subtle Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0A2540]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-bold block mb-2">
            {language === 'ar' ? 'برنامج الوفاء والمكافآت الملكية' : 'Programme de Fidélité Exclusif'}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0A2540] tracking-tight font-display mb-3">
            {t('loyTitle')}
          </h2>
          <div className="h-1 w-16 bg-[#D4AF37] mx-auto mb-4 rounded-full" />
          <p className="text-base sm:text-lg text-[#0A2540]/70">
            {t('loySubtitle')}
          </p>
        </div>

        {/* Dynamic User Banner or Welcome CTA */}
        <div className="mb-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0A2540] via-[#103459] to-[#0A2540] text-white border border-[#D4AF37]/30 shadow-luxury flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#997920] p-0.5 shadow-lg flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-[#0A2540] rounded-[14px] flex items-center justify-center text-3xl">
                {user ? currentTier.badge : '🎁'}
              </div>
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 justify-center md:justify-start">
                <h3 className="text-lg sm:text-xl font-bold font-display text-white">
                  {user 
                    ? `${language === 'ar' ? 'أهلاً بك مجدداً،' : 'Bienvenue,'} ${user.name}` 
                    : (language === 'ar' ? 'انضم لنادي كازينو الشابة اليوم' : 'Rejoignez le Club Privilège')}
                </h3>
                {user && (
                  <span className="px-2.5 py-0.5 rounded-full bg-[#D4AF37] text-[#0A2540] text-xs font-bold uppercase tracking-wider">
                    {language === 'ar' ? currentTier.nameAr : currentTier.nameFr}
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                {user 
                  ? `${language === 'ar' ? 'رصيدك الحالي:' : 'Votre solde actuel :'} ${user.points} ${t('loyPtsUnit')} • ${user.totalReservationsCount + user.totalOrdersCount} ${language === 'ar' ? 'زيارة مسجلة' : 'expériences vécues'}`
                  : (language === 'ar' ? 'سجل برقم هاتفك واحصل فوراً على 100 نقطة هدية ترحيبية وتخفيضات مستمرة.' : 'Créez votre compte en 10 secondes et recevez immédiatement 100 points de bienvenue.')}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => openLoyaltyModal('rewards')}
              className="px-5 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#c59b27] text-[#0A2540] text-xs font-bold uppercase tracking-wider shadow-md transition-all hover:scale-[1.02] flex items-center gap-2"
            >
              <Gift className="w-4 h-4" />
              <span>{language === 'ar' ? 'تصفح المكافآت' : 'Voir les Récompenses'}</span>
            </button>
            <button
              onClick={() => openLoyaltyModal('profile')}
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider border border-white/20 transition-all flex items-center gap-2"
            >
              <Crown className="w-4 h-4 text-[#D4AF37]" />
              <span>{user ? t('loyMyAccount') : t('loyLoginBtn')}</span>
            </button>
          </div>
        </div>

        {/* 3 Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-6 rounded-3xl bg-white border border-[#D4AF37]/20 shadow-luxury hover:border-[#D4AF37]/50 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#0A2540] text-[#D4AF37] flex items-center justify-center mb-4">
              <Coins className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-[#0A2540] font-display mb-2">
              {language === 'ar' ? '1. اكسب في كل زيارة' : '1. Cumulez à chaque visite'}
            </h4>
            <p className="text-xs text-[#0A2540]/70 leading-relaxed">
              {language === 'ar' 
                ? 'اكسب 10 نقاط لكل دينار تونسي مستهلك + 50 نقطة هدية مع كل حجز طاولة عبر الموقع الرسمي.' 
                : 'Recevez 10 points pour chaque 1 DT dépensé + 50 points offerts pour chaque réservation en ligne.'}
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#D4AF37]/20 shadow-luxury hover:border-[#D4AF37]/50 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#0A2540] text-[#D4AF37] flex items-center justify-center mb-4">
              <Gift className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-[#0A2540] font-display mb-2">
              {language === 'ar' ? '2. استبدل بأطباق مجانية' : '2. Échangez contre des délices'}
            </h4>
            <p className="text-xs text-[#0A2540]/70 leading-relaxed">
              {language === 'ar'
                ? 'حوّل نقاطك إلى بيتزا ساخنة، قهوة وشاي بالبندق، سلطة كازينو أو قسائم تخفيض فورية.' 
                : 'Convertissez vos points en pizzas artisanales, salade Casino, citronnade fraîche ou remises directes.'}
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#D4AF37]/20 shadow-luxury hover:border-[#D4AF37]/50 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#0A2540] text-[#D4AF37] flex items-center justify-center mb-4">
              <Crown className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-[#0A2540] font-display mb-2">
              {language === 'ar' ? '3. ارتقِ لرتبة كبار الشخصيات' : '3. Devenez Membre VIP'}
            </h4>
            <p className="text-xs text-[#0A2540]/70 leading-relaxed">
              {language === 'ar'
                ? 'استمتع بتخفيضات مستمرة حتى 15%، أولوية حجز أفضل طاولات التراس ومفاجآت في أعياد ميلادك.' 
                : 'Accédez à des réductions jusqu’à -15% à vie, table prioritaire face au coucher de soleil et cadeaux du Chef.'}
            </p>
          </div>
        </div>

        {/* Interactive Points Simulator & Rewards Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Points Calculator Widget */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-[#F8F5F2] border border-[#0A2540]/10 shadow-luxury space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#0A2540] text-[#D4AF37]">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-[#0A2540] font-display">
                  {language === 'ar' ? 'احسب نقاطك المتوقعة' : 'Simulateur de Gains'}
                </h4>
                <p className="text-xs text-[#0A2540]/60">
                  {language === 'ar' ? 'حرك المؤشر حسب قيمة وجبتك' : 'Glissez selon votre addition estimée'}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-[#0A2540] mb-2">
                  <span>{language === 'ar' ? 'قيمة الطلب أو العشاء :' : 'Montant de l’addition :'}</span>
                  <span className="text-base text-[#D4AF37] font-extrabold">{spendingAmount} DT</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="200"
                  step="5"
                  value={spendingAmount}
                  onChange={(e) => setSpendingAmount(Number(e.target.value))}
                  className="w-full h-2 bg-[#0A2540]/10 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                />
                <div className="flex justify-between text-[10px] text-[#0A2540]/40 mt-1">
                  <span>10 DT</span>
                  <span>100 DT</span>
                  <span>200 DT</span>
                </div>
              </div>

              {/* Result Box */}
              <div className="p-5 rounded-2xl bg-white border border-[#D4AF37]/30 shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#0A2540]/70">Points commande (x10) :</span>
                  <span className="text-xs font-bold text-[#0A2540]">+{spendingAmount * 10} pts</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#0A2540]/70">Bonus réservation en ligne :</span>
                  <span className="text-xs font-bold text-emerald-600">+50 pts</span>
                </div>
                <div className="pt-2 border-t border-[#0A2540]/10 flex items-center justify-between">
                  <span className="text-xs uppercase font-bold text-[#0A2540]">Gain total estimé :</span>
                  <div className="text-xl font-extrabold text-[#D4AF37] font-display">
                    +{calculatedPoints} pts
                  </div>
                </div>
              </div>

              <button
                onClick={() => openLoyaltyModal('profile')}
                className="w-full py-3 rounded-xl bg-[#0A2540] hover:bg-[#153a5e] text-white text-xs font-bold uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span>{user ? t('loyMyAccount') : t('loyJoinBtn')}</span>
              </button>
            </div>
          </div>

          {/* Right: Popular Rewards Showcase */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-base font-bold text-[#0A2540] font-display">
                  {language === 'ar' ? 'أشهر مكافآت النادي' : 'Aperçu des Récompenses'}
                </h4>
                <p className="text-xs text-[#0A2540]/60">
                  {language === 'ar' ? 'قابلة للاستبدال فوراً عند وصولك للرصيد' : 'Échangeables dès l’atteinte du palier requis'}
                </p>
              </div>
              <button
                onClick={() => openLoyaltyModal('rewards')}
                className="text-xs font-bold text-[#D4AF37] hover:underline flex items-center gap-1"
              >
                <span>{language === 'ar' ? 'عرض الكل (7)' : 'Voir tout le catalogue'}</span>
                <span>→</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {LOYALTY_REWARDS.slice(0, 4).map((reward) => (
                <div
                  key={reward.id}
                  className="p-4 rounded-3xl bg-white border border-[#D4AF37]/20 shadow-luxury hover:border-[#D4AF37]/40 transition-all flex items-center gap-3"
                >
                  <img
                    src={reward.image}
                    alt={reward.titleFr}
                    className="w-14 h-14 rounded-2xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[11px] font-extrabold text-[#D4AF37] font-display block">
                      {reward.pointsCost} {t('loyPtsUnit')}
                    </span>
                    <h5 className="text-xs font-bold text-[#0A2540] font-display truncate">
                      {language === 'ar' ? reward.titleAr : reward.titleFr}
                    </h5>
                    <span className="text-[10px] text-[#0A2540]/50 block">
                      Valeur {reward.valueTnd.toFixed(1)} DT
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Loyalty Tiers Quick Badges */}
            <div className="p-4 rounded-2xl bg-white border border-[#0A2540]/10 flex flex-wrap items-center justify-around gap-2 text-center">
              {LOYALTY_TIERS.map((tier) => (
                <div key={tier.id} className="flex items-center gap-1.5 px-2 py-1">
                  <span className="text-lg">{tier.badge}</span>
                  <div className="text-left">
                    <span className="text-[11px] font-bold text-[#0A2540] block leading-tight">
                      {language === 'ar' ? tier.nameAr : tier.nameFr}
                    </span>
                    <span className="text-[9px] text-[#0A2540]/50">{tier.minPoints} pts</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
