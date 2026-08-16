import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useLoyalty } from '../context/LoyaltyContext';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { generateReservationWhatsAppUrl, ReservationData } from '../utils/whatsapp';
import { 
  Calendar, 
  Clock, 
  Users, 
  MapPin, 
  Phone, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  Sparkles,
  ShieldCheck,
  Crown,
  Gift
} from 'lucide-react';

export const ReservationSection: React.FC = () => {
  const { t, language, isRTL } = useLanguage();
  const { user, earnPoints, activeVouchers, markVoucherUsed, openLoyaltyModal } = useLoyalty();

  // Tomorrow's date as default
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDateStr = tomorrow.toISOString().split('T')[0];

  const [formData, setFormData] = useState<ReservationData>({
    name: user?.name || '',
    phone: user?.phone || '',
    date: defaultDateStr,
    time: '20:00',
    guests: 2,
    seating: 'terrace',
    notes: '',
    voucherCode: '',
  });

  // Sync user info if user logs in
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: prev.name || user.name,
        phone: prev.phone || user.phone,
      }));
    }
  }, [user]);

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [lastWhatsAppUrl, setLastWhatsAppUrl] = useState<string>('');

  const timeSlots = [
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      return;
    }

    const whatsappUrl = generateReservationWhatsAppUrl(formData, language);
    setLastWhatsAppUrl(whatsappUrl);
    setIsSubmitted(true);

    // Auto credit 50 points if user is logged in
    if (user) {
      earnPoints(
        50,
        `Réservation table (${formData.guests} pers.) pour le ${formData.date}`,
        `حجز طاولة (${formData.guests} أشخاص) ليوم ${formData.date}`,
        'earn_reservation'
      );
    }

    // Mark voucher used if applied
    if (formData.voucherCode) {
      const matched = activeVouchers.find((v) => v.code === formData.voucherCode);
      if (matched) markVoucherUsed(matched.id);
    }

    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
  };

  const seatingOptions = [
    { id: 'terrace', label: t('resSeatingTerrace'), descFr: 'Au plus près des vagues et de la brise marine', descAr: 'الأقرب لأمواج ونسيم البحر العليل' },
    { id: 'indoor', label: t('resSeatingIndoor'), descFr: 'Confort climatisé et calme', descAr: 'راحة وتكييف وهدوء تام' },
    { id: 'family', label: t('resSeatingFamily'), descFr: 'Grandes tables adaptées aux familles et enfants', descAr: 'طاولات واسعة ومريحة للعائلات والأطفال' },
    { id: 'sunset', label: t('resSeatingSunset'), descFr: 'Vue d’or lors du coucher de soleil', descAr: 'أجواء ذهبية ساحرة وقت الغروب' },
  ];

  const availableVouchers = activeVouchers.filter((v) => !v.isUsed);

  return (
    <section id="reservation" className="py-20 bg-[#F4EBE2]/30 relative z-10 border-y border-[#0A2540]/5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-bold block mb-2">
            {language === 'ar' ? 'حجز فوري ومباشر' : 'Réservation en Ligne'}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0A2540] tracking-tight font-display mb-3">
            {t('resTitle')}
          </h2>
          <div className="h-1 w-16 bg-[#D4AF37] mx-auto mb-4 rounded-full" />
          <p className="text-base sm:text-lg text-[#0A2540]/70">
            {t('resSubtitle')}
          </p>

          {/* Loyalty Reward callout */}
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A2540] text-white text-xs font-bold shadow-md">
            <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{t('loyEarnOnReservation')}</span>
          </div>
        </div>

        {/* Reservation Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#D4AF37]/20 shadow-luxury relative overflow-hidden">
          {isSubmitted ? (
            <div className="text-center py-8 max-w-xl mx-auto space-y-6">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto border border-emerald-200">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#0A2540] mb-2 font-display">
                  {t('resSuccessTitle')}
                </h3>
                <p className="text-[#0A2540]/70 text-sm leading-relaxed">
                  {t('resSuccessDesc')}
                </p>
              </div>

              {/* Booking Summary Box */}
              <div className="p-5 rounded-2xl bg-[#F8F5F2] border border-[#0A2540]/5 text-left text-sm space-y-2.5">
                <div className="flex justify-between border-b border-[#0A2540]/5 pb-2">
                  <span className="text-[#0A2540]/60">{t('resName')} :</span>
                  <span className="text-[#0A2540] font-semibold">{formData.name}</span>
                </div>
                <div className="flex justify-between border-b border-[#0A2540]/5 pb-2">
                  <span className="text-[#0A2540]/60">{t('resPhone')} :</span>
                  <span className="text-[#0A2540] font-semibold">{formData.phone}</span>
                </div>
                <div className="flex justify-between border-b border-[#0A2540]/5 pb-2">
                  <span className="text-[#0A2540]/60">{t('resDate')} & {t('resTime')} :</span>
                  <span className="text-[#0A2540] font-bold">{formData.date} à {formData.time}</span>
                </div>
                <div className="flex justify-between border-b border-[#0A2540]/5 pb-2">
                  <span className="text-[#0A2540]/60">{t('resGuests')} :</span>
                  <span className="text-[#0A2540] font-semibold">{formData.guests} personnes</span>
                </div>
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Points fidélité gagnés :</span>
                  <span>+50 points ⭐</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <a
                  href={lastWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-xl bg-[#0A2540] hover:bg-[#1a3a5a] text-white font-bold text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-[#D4AF37]" />
                  <span>{language === 'ar' ? 'إعادة فتح محادثة الواتساب' : 'Ouvrir WhatsApp'}</span>
                </a>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-5 py-3.5 rounded-xl bg-[#F8F5F2] hover:bg-[#eae0d5] text-[#0A2540] font-bold text-xs uppercase tracking-wider border border-[#0A2540]/5"
                >
                  {language === 'ar' ? 'حجز طاولة أخرى' : 'Nouvelle réservation'}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label className="block text-xs uppercase font-bold tracking-wider text-[#0A2540]/70 mb-2">
                    {t('resName')} <span className="text-[#D4AF37]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={language === 'ar' ? 'مثال: محمد الشابي' : 'ex: Ahmed Ben Amor'}
                    className="w-full px-4 py-3 rounded-xl bg-[#F8F5F2] text-[#0A2540] placeholder-[#0A2540]/40 border border-[#0A2540]/8 focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all text-sm"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs uppercase font-bold tracking-wider text-[#0A2540]/70 mb-2">
                    {t('resPhone')} <span className="text-[#D4AF37]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+216 26 589 531"
                      className="w-full px-4 py-3 rounded-xl bg-[#F8F5F2] text-[#0A2540] placeholder-[#0A2540]/40 border border-[#0A2540]/8 focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all text-sm"
                    />
                  </div>
                </div>

                {/* Date */}
                <div>
                  <label className="block text-xs uppercase font-bold tracking-wider text-[#0A2540]/70 mb-2">
                    {t('resDate')} <span className="text-[#D4AF37]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#F8F5F2] text-[#0A2540] border border-[#0A2540]/8 focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all text-sm"
                    />
                  </div>
                </div>

                {/* Time Slots */}
                <div>
                  <label className="block text-xs uppercase font-bold tracking-wider text-[#0A2540]/70 mb-2">
                    {t('resTime')} <span className="text-[#D4AF37]">*</span>
                  </label>
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#F8F5F2] text-[#0A2540] border border-[#0A2540]/8 focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all text-sm"
                  >
                    {timeSlots.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Number of Guests */}
              <div>
                <label className="block text-xs uppercase font-bold tracking-wider text-[#0A2540]/70 mb-2">
                  {t('resGuests')}
                </label>
                <div className="flex flex-wrap items-center gap-2.5">
                  {[1, 2, 3, 4, 5, 6, 8, 10, 12].map((num) => (
                    <button
                      type="button"
                      key={num}
                      onClick={() => setFormData({ ...formData, guests: num })}
                      className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl text-xs font-bold transition-all flex items-center justify-center ${
                        formData.guests === num
                          ? 'bg-[#0A2540] text-white shadow-luxury scale-105'
                          : 'bg-[#F8F5F2] text-[#0A2540]/70 hover:text-[#0A2540] border border-[#0A2540]/5 hover:border-[#0A2540]/20'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              {/* Seating Preference */}
              <div>
                <label className="block text-xs uppercase font-bold tracking-wider text-[#0A2540]/70 mb-2">
                  {t('resSeating')}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {seatingOptions.map((opt) => (
                    <div
                      key={opt.id}
                      onClick={() => setFormData({ ...formData, seating: opt.id })}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        formData.seating === opt.id
                          ? 'bg-[#0A2540] border-[#0A2540] text-white shadow-luxury'
                          : 'bg-[#F8F5F2] border-[#0A2540]/5 text-[#0A2540]/80 hover:border-[#0A2540]/20'
                      }`}
                    >
                      <div className={`font-bold text-sm mb-1 ${formData.seating === opt.id ? 'text-white' : 'text-[#0A2540]'}`}>
                        {opt.label}
                      </div>
                      <div className={`text-xs ${formData.seating === opt.id ? 'text-slate-300' : 'text-[#0A2540]/60'}`}>
                        {language === 'ar' ? opt.descAr : opt.descFr}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Loyalty Reward Voucher Selector if available */}
              {availableVouchers.length > 0 && (
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-[#D4AF37]/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#0A2540] flex items-center gap-1.5">
                      <Gift className="w-4 h-4 text-[#D4AF37]" />
                      <span>{language === 'ar' ? 'استخدام قسيمة مكافأة مفعلة :' : 'Appliquer une récompense fidélité :'}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => openLoyaltyModal('rewards')}
                      className="text-[11px] font-bold text-[#D4AF37] hover:underline"
                    >
                      {language === 'ar' ? 'دليل المكافآت' : 'Voir le catalogue'}
                    </button>
                  </div>
                  <select
                    value={formData.voucherCode || ''}
                    onChange={(e) => setFormData({ ...formData, voucherCode: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white text-[#0A2540] text-xs font-semibold border border-[#D4AF37]/40 focus:outline-none"
                  >
                    <option value="">-- {language === 'ar' ? 'بدون قسيمة' : 'Aucun bon sélectionné'} --</option>
                    {availableVouchers.map((v) => (
                      <option key={v.id} value={v.code}>
                        🎁 {language === 'ar' ? v.titleAr : v.titleFr} ({v.code})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Special Requests / Notes */}
              <div>
                <label className="block text-xs uppercase font-bold tracking-wider text-[#0A2540]/70 mb-2">
                  {t('resNotes')}
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder={language === 'ar' ? 'أي طلب خاص لتجربة متميزة...' : 'ex: Table près du bord, anniversaire, etc.'}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F8F5F2] text-[#0A2540] placeholder-[#0A2540]/40 border border-[#0A2540]/8 focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all text-sm resize-none"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#0A2540]/10">
                <a
                  href={`tel:${RESTAURANT_INFO.phoneClean}`}
                  className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0A2540]/70 hover:text-[#0A2540] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#D4AF37]" />
                  <span>{t('resDirectCall')}</span>
                </a>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#0A2540] hover:bg-[#1a3a5a] text-white font-bold text-xs uppercase tracking-widest shadow-luxury flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.98]"
                >
                  <MessageSquare className="w-4 h-4 text-[#D4AF37]" />
                  <span>{t('resSubmitWhatsApp')}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

