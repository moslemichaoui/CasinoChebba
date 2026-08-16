import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useLoyalty } from '../context/LoyaltyContext';
import { LOYALTY_REWARDS, LOYALTY_TIERS, RESTAURANT_INFO } from '../data/restaurantData';
import { 
  X, 
  Award, 
  Gift, 
  Crown, 
  History, 
  User as UserIcon, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  LogOut, 
  Share2, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Percent,
  Copy,
  Check
} from 'lucide-react';

export const LoyaltyModal: React.FC = () => {
  const { t, language, isRTL } = useLanguage();
  const { 
    user, 
    history, 
    activeVouchers, 
    isLoyaltyModalOpen, 
    closeLoyaltyModal, 
    activeTab, 
    openLoyaltyModal,
    currentTier, 
    loginUser, 
    logoutUser, 
    redeemReward 
  } = useLoyalty();

  const [loginName, setLoginName] = useState('');
  const [loginPhone, setLoginPhone] = useState('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  if (!isLoyaltyModalOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginName.trim() || !loginPhone.trim()) return;
    loginUser(loginName, loginPhone);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  // Next tier calculation
  const nextTier = LOYALTY_TIERS.find((t) => t.minPoints > (user?.points || 0));
  const pointsToNext = nextTier ? nextTier.minPoints - (user?.points || 0) : 0;
  const progressPercent = nextTier 
    ? Math.min(100, Math.round(((user?.points || 0) / nextTier.minPoints) * 100))
    : 100;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-[#FDFCFB] rounded-3xl border border-[#D4AF37]/30 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-[#0A2540] text-white flex items-center justify-between border-b border-[#D4AF37]/20">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#997920] p-0.5 shadow-md flex items-center justify-center">
              <div className="w-full h-full bg-[#0A2540] rounded-[14px] flex items-center justify-center text-[#D4AF37]">
                <Crown className="w-6 h-6" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-extrabold tracking-tight font-display text-white">
                  {language === 'ar' ? 'نادي الامتياز كازينو الشابة' : 'Club Privilège Casino Chebba'}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] uppercase font-bold tracking-wider">
                  VIP Club
                </span>
              </div>
              <p className="text-xs text-slate-300">
                {language === 'ar' 
                  ? 'نقاط الولاء، المكافآت الحصرية والامتيازات الملكية' 
                  : 'Programme de fidélité & Récompenses exclusives'}
              </p>
            </div>
          </div>

          <button
            onClick={closeLoyaltyModal}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Balance Banner if logged in */}
        {user ? (
          <div className="px-5 sm:px-6 py-4 bg-gradient-to-r from-[#0A2540] via-[#12385e] to-[#0A2540] text-white border-b border-[#D4AF37]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="w-12 h-12 rounded-2xl bg-white/10 border border-[#D4AF37]/40 flex items-center justify-center text-2xl shrink-0">
                {currentTier.badge}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white font-display">{user.name}</span>
                  <span className="px-2 py-0.5 rounded-md bg-[#D4AF37] text-[#0A2540] text-[10px] font-extrabold uppercase tracking-wider">
                    {language === 'ar' ? currentTier.nameAr : currentTier.nameFr}
                  </span>
                </div>
                <div className="text-xs text-slate-300">
                  {user.phone} • {user.totalOrdersCount + user.totalReservationsCount} {language === 'ar' ? 'زيارة مسجلة' : 'expériences vécues'}
                </div>
              </div>
            </div>

            {/* Points Counter & Next Tier Progress */}
            <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-5 bg-white/5 sm:bg-transparent p-3 sm:p-0 rounded-2xl border sm:border-0 border-white/10">
              <div className="text-left sm:text-right">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#D4AF37] block">
                  {t('loyBalanceLabel')}
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-display flex items-baseline gap-1">
                  <span>{user.points}</span>
                  <span className="text-xs text-[#D4AF37] font-semibold">{t('loyPtsUnit')}</span>
                </div>
              </div>

              {nextTier && (
                <div className="w-28 text-right hidden sm:block">
                  <span className="text-[10px] text-slate-300 block mb-1">
                    +{pointsToNext} pts pour {nextTier.badge}
                  </span>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#D4AF37] to-amber-300 rounded-full transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="p-4 bg-[#F4EBE2] border-b border-[#D4AF37]/30 flex items-center justify-between gap-3 text-xs text-[#0A2540]">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>
                {language === 'ar' 
                  ? 'سجل حسابك الآن واحصل على 100 نقطة هدية ترحيبية فورية!' 
                  : 'Rejoignez le Club Privilège et recevez 100 points de bienvenue immédiatement !'}
              </span>
            </div>
            <button
              onClick={() => openLoyaltyModal('profile')}
              className="px-3 py-1.5 rounded-xl bg-[#0A2540] text-white text-[11px] font-bold uppercase tracking-wider shrink-0 hover:bg-[#153a5e]"
            >
              {language === 'ar' ? 'تسجيل سريع' : 'S’inscrire'}
            </button>
          </div>
        )}

        {/* Modal Navigation Tabs */}
        <div className="flex items-center border-b border-[#0A2540]/10 bg-white px-4 sm:px-6 overflow-x-auto no-scrollbar">
          <button
            onClick={() => openLoyaltyModal('rewards')}
            className={`py-3 px-3 sm:px-4 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'rewards'
                ? 'border-[#0A2540] text-[#0A2540]'
                : 'border-transparent text-[#0A2540]/50 hover:text-[#0A2540]'
            }`}
          >
            <Gift className="w-4 h-4 text-[#D4AF37]" />
            <span>{t('loyTabRewards')}</span>
            {activeVouchers.filter((v) => !v.isUsed).length > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#D4AF37] text-[#0A2540] text-[10px] font-extrabold flex items-center justify-center">
                {activeVouchers.filter((v) => !v.isUsed).length}
              </span>
            )}
          </button>

          <button
            onClick={() => openLoyaltyModal('tiers')}
            className={`py-3 px-3 sm:px-4 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'tiers'
                ? 'border-[#0A2540] text-[#0A2540]'
                : 'border-transparent text-[#0A2540]/50 hover:text-[#0A2540]'
            }`}
          >
            <Crown className="w-4 h-4 text-[#D4AF37]" />
            <span>{t('loyTabTiers')}</span>
          </button>

          <button
            onClick={() => openLoyaltyModal('history')}
            className={`py-3 px-3 sm:px-4 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'history'
                ? 'border-[#0A2540] text-[#0A2540]'
                : 'border-transparent text-[#0A2540]/50 hover:text-[#0A2540]'
            }`}
          >
            <History className="w-4 h-4 text-[#D4AF37]" />
            <span>{t('loyTabHistory')}</span>
          </button>

          <button
            onClick={() => openLoyaltyModal('profile')}
            className={`py-3 px-3 sm:px-4 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'profile'
                ? 'border-[#0A2540] text-[#0A2540]'
                : 'border-transparent text-[#0A2540]/50 hover:text-[#0A2540]'
            }`}
          >
            <UserIcon className="w-4 h-4 text-[#D4AF37]" />
            <span>{user ? t('loyTabAccount') : t('loyLoginBtn')}</span>
          </button>
        </div>

        {/* Modal Body / Tab Content */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: REWARDS CATALOG */}
          {activeTab === 'rewards' && (
            <div className="space-y-6">
              {/* Active Unused Vouchers if any */}
              {activeVouchers.filter((v) => !v.isUsed).length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                    <h4 className="text-xs uppercase font-bold tracking-wider text-[#0A2540]">
                      {language === 'ar' ? 'قسائمك الجاهزة للاستخدام' : 'Vos Bons de Récompense Actifs'}
                    </h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeVouchers.filter((v) => !v.isUsed).map((voucher) => (
                      <div
                        key={voucher.id}
                        className="p-4 rounded-2xl bg-gradient-to-br from-[#0A2540] to-[#143d66] text-white border border-[#D4AF37]/30 shadow-luxury flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="px-2 py-0.5 rounded-full bg-[#D4AF37] text-[#0A2540] text-[10px] font-bold uppercase">
                              {voucher.category}
                            </span>
                            <span className="text-[10px] text-slate-300">
                              {voucher.dateCreated}
                            </span>
                          </div>
                          <h5 className="text-sm font-bold font-display text-white mb-1">
                            {language === 'ar' ? voucher.titleAr : voucher.titleFr}
                          </h5>
                          <p className="text-xs text-slate-300 mb-3">
                            {language === 'ar' ? voucher.descAr : voucher.descFr}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                          <div className="px-2.5 py-1 rounded-lg bg-white/10 font-mono text-xs font-bold text-[#D4AF37] tracking-wider border border-white/10">
                            {voucher.code}
                          </div>
                          <button
                            onClick={() => handleCopyCode(voucher.code)}
                            className="px-3 py-1.5 rounded-xl bg-[#D4AF37] hover:bg-[#c59b27] text-[#0A2540] text-xs font-bold flex items-center gap-1 transition-all"
                          >
                            {copiedCode === voucher.code ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>Copié !</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copier code</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Rewards List */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xs uppercase font-bold tracking-wider text-[#0A2540]">
                    {language === 'ar' ? 'قائمة المكافآت القابلة للاستبدال' : 'Catalogue des Délices & Réductions'}
                  </h4>
                  <span className="text-xs text-[#0A2540]/60">
                    {user ? `${user.points} points disponibles` : 'Connectez-vous pour débloquer'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {LOYALTY_REWARDS.map((reward) => {
                    const canAfford = user ? user.points >= reward.pointsCost : false;

                    return (
                      <div
                        key={reward.id}
                        className="p-4 rounded-3xl bg-white border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 shadow-luxury flex flex-col justify-between transition-all"
                      >
                        <div className="flex items-start gap-3 mb-3">
                          <img
                            src={reward.image}
                            alt={reward.titleFr}
                            className="w-16 h-16 rounded-2xl object-cover shrink-0 border border-[#0A2540]/5"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1 mb-1">
                              <span className="text-xs font-extrabold text-[#D4AF37] font-display">
                                {reward.pointsCost} {t('loyPtsUnit')}
                              </span>
                              <span className="text-[10px] font-semibold text-[#0A2540]/50">
                                Val. {reward.valueTnd.toFixed(1)} DT
                              </span>
                            </div>
                            <h5 className="text-sm font-bold text-[#0A2540] font-display line-clamp-1">
                              {language === 'ar' ? reward.titleAr : reward.titleFr}
                            </h5>
                            <p className="text-xs text-[#0A2540]/70 line-clamp-2 mt-0.5">
                              {language === 'ar' ? reward.descAr : reward.descFr}
                            </p>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-[#0A2540]/5 flex items-center justify-between gap-2">
                          <span className="text-[11px] text-[#0A2540]/50 font-medium">
                            {user && !canAfford && `Manque ${reward.pointsCost - user.points} pts`}
                            {user && canAfford && 'Prêt à débloquer'}
                            {!user && '100 pts offerts'}
                          </span>

                          <button
                            onClick={() => redeemReward(reward)}
                            disabled={user ? !canAfford : false}
                            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                              !user
                                ? 'bg-[#0A2540] text-white hover:bg-[#153a5e]'
                                : canAfford
                                ? 'bg-[#D4AF37] text-[#0A2540] hover:bg-[#c59b27] shadow-md'
                                : 'bg-[#0A2540]/10 text-[#0A2540]/40 cursor-not-allowed'
                            }`}
                          >
                            <Gift className="w-3.5 h-3.5" />
                            <span>{!user ? 'Se connecter' : 'Débloquer'}</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* How points work card */}
              <div className="p-5 rounded-3xl bg-[#F8F5F2] border border-[#0A2540]/10 space-y-3">
                <h5 className="text-xs uppercase font-bold tracking-wider text-[#0A2540] flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#D4AF37]" />
                  <span>{t('loyHowItWorks')}</span>
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#0A2540]/80">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{t('loyRule1')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{t('loyRule2')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{t('loyRule3')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{t('loyRule4')}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TIERS & PERKS */}
          {activeTab === 'tiers' && (
            <div className="space-y-4">
              <p className="text-xs sm:text-sm text-[#0A2540]/70">
                {language === 'ar'
                  ? 'ارتقِ بمستوى عضويتك مع كل زيارة وافتح امتيازات حصرية وتخفيضات مستمرة على جميع طلباتك.'
                  : 'Progressez au sein des rangs du Club Privilège et profitez de réductions permanentes et d’attentions sur-mesure.'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {LOYALTY_TIERS.map((tier) => {
                  const isCurrent = user?.tierId === tier.id;
                  const isUnlocked = user ? user.points >= tier.minPoints : tier.id === 'bronze';

                  return (
                    <div
                      key={tier.id}
                      className={`p-5 rounded-3xl border transition-all flex flex-col justify-between ${
                        isCurrent
                          ? 'bg-white border-[#D4AF37] ring-2 ring-[#D4AF37]/30 shadow-luxury'
                          : isUnlocked
                          ? 'bg-white border-[#0A2540]/10 shadow-sm'
                          : 'bg-[#F8F5F2] border-[#0A2540]/10 opacity-75'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2.5">
                            <span className="text-2xl">{tier.badge}</span>
                            <div>
                              <h5 className="text-sm font-bold text-[#0A2540] font-display">
                                {language === 'ar' ? tier.nameAr : tier.nameFr}
                              </h5>
                              <span className="text-[11px] font-semibold text-[#D4AF37]">
                                Dès {tier.minPoints} points
                              </span>
                            </div>
                          </div>

                          {isCurrent && (
                            <span className="px-2 py-0.5 rounded-full bg-[#D4AF37] text-[#0A2540] text-[10px] font-extrabold uppercase tracking-wider">
                              {language === 'ar' ? 'مستواك الحالي' : 'Votre Rang'}
                            </span>
                          )}
                        </div>

                        {tier.discountPercent > 0 && (
                          <div className="mb-3 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold flex items-center gap-2 border border-emerald-200">
                            <Percent className="w-3.5 h-3.5 text-emerald-600" />
                            <span>-{tier.discountPercent}% sur toute l’addition</span>
                          </div>
                        )}

                        <ul className="space-y-1.5 text-xs text-[#0A2540]/80">
                          {(language === 'ar' ? tier.perksAr : tier.perksFr).map((perk, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <span className="text-[#D4AF37] font-bold">✓</span>
                              <span>{perk}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: HISTORY */}
          {activeTab === 'history' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs uppercase font-bold tracking-wider text-[#0A2540]">
                  {language === 'ar' ? 'سجل حركات النقاط والمكافآت' : 'Historique des Gains & Échanges'}
                </h4>
                <span className="text-xs text-[#0A2540]/60">
                  {history.length} {language === 'ar' ? 'عمليات' : 'opérations'}
                </span>
              </div>

              {history.length === 0 ? (
                <div className="text-center py-12 space-y-3 bg-[#F8F5F2] rounded-3xl border border-[#0A2540]/10">
                  <History className="w-10 h-10 text-[#0A2540]/20 mx-auto" />
                  <p className="text-xs sm:text-sm text-[#0A2540]/60 max-w-sm mx-auto">
                    {language === 'ar'
                      ? 'لا توجد حركات سابقة بعد. احجز طاولة أو اطلب وجبة لكسب أولى نقاطك!'
                      : 'Aucune transaction enregistrée. Effectuez une réservation ou une commande pour cumuler vos premiers points !'}
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {history.map((tx) => (
                    <div
                      key={tx.id}
                      className="p-3.5 rounded-2xl bg-white border border-[#0A2540]/10 shadow-sm flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm ${
                          tx.points > 0 
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                          {tx.points > 0 ? '+' : ''}{tx.points}
                        </div>
                        <div>
                          <h6 className="text-xs sm:text-sm font-bold text-[#0A2540]">
                            {language === 'ar' ? tx.descAr : tx.descFr}
                          </h6>
                          <div className="text-[10px] text-[#0A2540]/50 flex items-center gap-2">
                            <span>{tx.date}</span>
                            {tx.code && <span className="font-mono text-[#D4AF37]">#{tx.code}</span>}
                          </div>
                        </div>
                      </div>

                      <span className={`text-xs font-extrabold ${
                        tx.points > 0 ? 'text-emerald-600' : 'text-amber-600'
                      }`}>
                        {tx.points > 0 ? `+${tx.points}` : tx.points} pts
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: PROFILE / LOGIN */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              {user ? (
                <div className="space-y-5">
                  <div className="p-5 rounded-3xl bg-white border border-[#D4AF37]/30 shadow-luxury space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-[#0A2540] text-white flex items-center justify-center text-3xl">
                        {currentTier.badge}
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-[#0A2540] font-display">{user.name}</h4>
                        <p className="text-xs text-[#0A2540]/60">{user.phone}</p>
                        <span className="inline-block mt-1 px-2.5 py-0.5 rounded-md bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] font-bold uppercase">
                          {language === 'ar' ? currentTier.nameAr : currentTier.nameFr}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-[#0A2540]/10 text-center">
                      <div className="p-3 rounded-2xl bg-[#F8F5F2]">
                        <span className="text-[10px] uppercase text-[#0A2540]/60 font-semibold block">Points Totaux</span>
                        <span className="text-lg font-bold text-[#0A2540]">{user.points}</span>
                      </div>
                      <div className="p-3 rounded-2xl bg-[#F8F5F2]">
                        <span className="text-[10px] uppercase text-[#0A2540]/60 font-semibold block">Réservations</span>
                        <span className="text-lg font-bold text-[#0A2540]">{user.totalReservationsCount}</span>
                      </div>
                      <div className="p-3 rounded-2xl bg-[#F8F5F2] col-span-2 sm:col-span-1">
                        <span className="text-[10px] uppercase text-[#0A2540]/60 font-semibold block">Commandes</span>
                        <span className="text-lg font-bold text-[#0A2540]">{user.totalOrdersCount}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={logoutUser}
                      className="px-4 py-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 text-xs font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>{t('loyLogout')}</span>
                    </button>

                    <a
                      href={`https://wa.me/${RESTAURANT_INFO.phoneClean}?text=${encodeURIComponent(`Bonjour Casino Chebba, je suis membre Club ${user.name} (${user.phone}). Mon solde est de ${user.points} points.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-[#D4AF37] text-[#0A2540] text-xs font-bold flex items-center gap-1.5 shadow-md"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Assistance Membre WhatsApp</span>
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleLoginSubmit} className="max-w-md mx-auto space-y-4 py-4">
                  <div className="text-center space-y-1 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/20 text-[#D4AF37] mx-auto flex items-center justify-center mb-2">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <h4 className="text-base font-bold text-[#0A2540] font-display">
                      {language === 'ar' ? 'انضم فوراً لنادي كازينو الشابة' : 'Rejoignez le Club Privilège'}
                    </h4>
                    <p className="text-xs text-[#0A2540]/60">
                      {language === 'ar'
                        ? 'أدخل اسمك ورقم هاتفك للحصول على 100 نقطة هدية ترحيبية فورية!'
                        : 'Entrez vos coordonnées pour recevoir 100 points offerts dès maintenant !'}
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-bold tracking-wider text-[#0A2540]/70 mb-1">
                      {t('resName')} <span className="text-[#D4AF37]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={loginName}
                      onChange={(e) => setLoginName(e.target.value)}
                      placeholder={t('loyNamePlaceholder')}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white text-[#0A2540] placeholder-[#0A2540]/40 border border-[#0A2540]/15 text-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-bold tracking-wider text-[#0A2540]/70 mb-1">
                      {t('resPhone')} <span className="text-[#D4AF37]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={loginPhone}
                      onChange={(e) => setLoginPhone(e.target.value)}
                      placeholder={t('loyPhonePlaceholder')}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white text-[#0A2540] placeholder-[#0A2540]/40 border border-[#0A2540]/15 text-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#0A2540] hover:bg-[#153a5e] text-white text-xs font-bold uppercase tracking-wider shadow-luxury transition-all flex items-center justify-center gap-2"
                  >
                    <Crown className="w-4 h-4 text-[#D4AF37]" />
                    <span>{t('loyJoinBtn')}</span>
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
