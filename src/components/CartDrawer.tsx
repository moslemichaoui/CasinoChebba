import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { useLoyalty } from '../context/LoyaltyContext';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { generateOrderWhatsAppUrl } from '../utils/whatsapp';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Send, 
  Bike, 
  Store, 
  Phone, 
  CheckCircle,
  Sparkles,
  Crown,
  Gift,
  Percent
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { t, language, isRTL } = useLanguage();
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    totalPrice, 
    totalCount 
  } = useCart();

  const { user, currentTier, activeVouchers, markVoucherUsed, earnPoints, openLoyaltyModal } = useLoyalty();

  const [orderType, setOrderType] = useState<'takeaway' | 'delivery'>('takeaway');
  const [customerName, setCustomerName] = useState(user?.name || '');
  const [customerPhone, setCustomerPhone] = useState(user?.phone || '');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');
  const [selectedVoucherCode, setSelectedVoucherCode] = useState<string>('');

  // Sync user info if user logs in
  useEffect(() => {
    if (user) {
      if (!customerName) setCustomerName(user.name);
      if (!customerPhone) setCustomerPhone(user.phone);
    }
  }, [user]);

  if (!isCartOpen) return null;

  const availableVouchers = activeVouchers.filter((v) => !v.isUsed);
  const activeSelectedVoucher = activeVouchers.find((v) => v.code === selectedVoucherCode);
  const voucherDiscount = activeSelectedVoucher ? activeSelectedVoucher.valueTnd : 0;

  // Tier percentage discount (e.g. 5%, 10%, 15%)
  const tierDiscountPercent = user ? currentTier.discountPercent : 0;
  const tierDiscountAmount = (totalPrice * tierDiscountPercent) / 100;

  const totalDiscount = voucherDiscount + tierDiscountAmount;
  const finalPrice = Math.max(0, totalPrice - totalDiscount);
  const estimatedPointsEarned = Math.round(finalPrice * 10);

  const handleSendWhatsAppOrder = () => {
    if (cart.length === 0) return;
    if (!customerName.trim() || !customerPhone.trim()) {
      alert(language === 'ar' ? 'الرجاء إدخال الاسم ورقم الهاتف للمتابعة' : 'Veuillez saisir votre nom et numéro de téléphone.');
      return;
    }

    const orderItems = cart.map((ci) => ({
      id: ci.item.id,
      nameFr: ci.item.nameFr,
      nameAr: ci.item.nameAr,
      price: ci.item.price,
      quantity: ci.quantity,
    }));

    const url = generateOrderWhatsAppUrl(
      orderItems,
      orderType,
      {
        name: customerName,
        phone: customerPhone,
        address: customerAddress,
        notes: customerNotes,
        voucherCode: selectedVoucherCode || (tierDiscountPercent > 0 ? `TIER-${currentTier.id.toUpperCase()}-${tierDiscountPercent}%` : undefined),
        discountTnd: totalDiscount,
      },
      language
    );

    // If user is logged in, credit points for order
    if (user && estimatedPointsEarned > 0) {
      earnPoints(
        estimatedPointsEarned,
        `Commande ${orderType === 'delivery' ? 'Livraison' : 'À emporter'} (${finalPrice.toFixed(1)} DT)`,
        `طلبية ${orderType === 'delivery' ? 'توصيل' : 'استلام'} (${finalPrice.toFixed(1)} د.ت)`,
        'earn_order'
      );
    }

    // Mark voucher used
    if (activeSelectedVoucher) {
      markVoucherUsed(activeSelectedVoucher.id);
    }

    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className={`fixed inset-y-0 ${isRTL ? 'left-0' : 'right-0'} max-w-md w-full bg-[#FDFCFB] border-l border-[#0A2540]/10 shadow-2xl flex flex-col z-50`}>
        {/* Drawer Header */}
        <div className="p-5 bg-[#0A2540] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#D4AF37]/20 text-[#D4AF37]">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-display">
                {t('cartTitle')}
              </h3>
              <span className="text-xs text-slate-300">
                {totalCount} {language === 'ar' ? 'أطباق مختارة' : 'plats sélectionnés'}
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Loyalty Points Gain Banner */}
        <div className="px-5 py-2.5 bg-[#F4EBE2] border-b border-[#D4AF37]/30 flex items-center justify-between text-xs text-[#0A2540]">
          <div className="flex items-center gap-1.5 font-semibold">
            <Crown className="w-4 h-4 text-[#D4AF37]" />
            <span>
              {user 
                ? `+${estimatedPointsEarned} ${t('loyPtsUnit')} offerts sur cette commande` 
                : '10 pts offerts / 1 DT avec le Club'}
            </span>
          </div>
          <button
            onClick={() => {
              setIsCartOpen(false);
              openLoyaltyModal(user ? 'rewards' : 'profile');
            }}
            className="text-[11px] font-bold text-[#D4AF37] hover:underline"
          >
            {user ? `${user.points} pts` : t('loyJoinBtn')}
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <ShoppingBag className="w-16 h-16 text-[#0A2540]/20 mx-auto" />
              <p className="text-sm text-[#0A2540]/60 max-w-xs mx-auto">
                {t('cartEmpty')}
              </p>
              <a
                href="#menu"
                onClick={() => setIsCartOpen(false)}
                className="inline-block px-6 py-2.5 rounded-xl bg-[#0A2540] text-white text-xs uppercase font-bold tracking-wider shadow-sm"
              >
                {t('heroCtaMenu')}
              </a>
            </div>
          ) : (
            <>
              {/* Order Mode Toggle */}
              <div className="grid grid-cols-2 gap-2 p-1.5 bg-[#F8F5F2] rounded-2xl border border-[#0A2540]/10">
                <button
                  onClick={() => setOrderType('takeaway')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                    orderType === 'takeaway'
                      ? 'bg-[#0A2540] text-white shadow-sm'
                      : 'text-[#0A2540]/60 hover:text-[#0A2540]'
                  }`}
                >
                  <Store className="w-4 h-4 text-[#D4AF37]" />
                  <span>{language === 'ar' ? 'استلام من المطعم' : 'À emporter'}</span>
                </button>
                <button
                  onClick={() => setOrderType('delivery')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                    orderType === 'delivery'
                      ? 'bg-[#0A2540] text-white shadow-sm'
                      : 'text-[#0A2540]/60 hover:text-[#0A2540]'
                  }`}
                >
                  <Bike className="w-4 h-4 text-[#D4AF37]" />
                  <span>{language === 'ar' ? 'توصيل ألو باية' : 'Livraison'}</span>
                </button>
              </div>

              {/* Items List */}
              <div className="space-y-3">
                {cart.map((ci) => (
                  <div
                    key={ci.item.id}
                    className="p-3.5 rounded-2xl bg-white border border-[#D4AF37]/20 shadow-luxury flex items-center justify-between gap-3"
                  >
                    <img
                      src={ci.item.image}
                      alt={language === 'ar' ? ci.item.nameAr : ci.item.nameFr}
                      className="w-14 h-14 rounded-xl object-cover shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-[#0A2540] truncate font-display">
                        {language === 'ar' ? ci.item.nameAr : ci.item.nameFr}
                      </h4>
                      <div className="text-xs text-[#D4AF37] font-bold">
                        {(ci.item.price * ci.quantity).toFixed(1)} {t('tndPrice')}
                      </div>
                    </div>

                    {/* Quantity Modifiers */}
                    <div className="flex items-center gap-1.5 bg-[#F8F5F2] px-2 py-1 rounded-lg border border-[#0A2540]/5">
                      <button
                        onClick={() => updateQuantity(ci.item.id, ci.quantity - 1)}
                        className="p-1 text-[#0A2540]/60 hover:text-[#0A2540]"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-bold text-[#0A2540] px-1">
                        {ci.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(ci.item.id, ci.quantity + 1)}
                        className="p-1 text-[#0A2540] hover:text-[#D4AF37]"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(ci.item.id)}
                      className="p-1.5 text-[#0A2540]/40 hover:text-rose-500 transition-colors"
                      aria-label="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Loyalty Voucher Selector if any available */}
              {availableVouchers.length > 0 && (
                <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-[#D4AF37]/30 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold text-[#0A2540]">
                    <span className="flex items-center gap-1">
                      <Gift className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{language === 'ar' ? 'قسيمة مكافأة نادي الوفاء' : 'Bon de réduction Club'}</span>
                    </span>
                    {selectedVoucherCode && (
                      <span className="text-emerald-700 font-bold">-{voucherDiscount.toFixed(1)} DT</span>
                    )}
                  </div>
                  <select
                    value={selectedVoucherCode}
                    onChange={(e) => setSelectedVoucherCode(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white text-xs font-semibold text-[#0A2540] border border-[#D4AF37]/30 focus:outline-none"
                  >
                    <option value="">-- {language === 'ar' ? 'بدون قسيمة' : 'Sélectionner un bon'} --</option>
                    {availableVouchers.map((v) => (
                      <option key={v.id} value={v.code}>
                        🎁 {language === 'ar' ? v.titleAr : v.titleFr} (-{v.valueTnd.toFixed(1)} DT)
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Customer Inputs */}
              <div className="pt-3 border-t border-[#0A2540]/10 space-y-3">
                <div>
                  <label className="block text-xs uppercase font-bold tracking-wider text-[#0A2540]/70 mb-1">
                    {t('resName')} <span className="text-[#D4AF37]">*</span>
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder={language === 'ar' ? 'اسمك الكريم' : 'Votre nom'}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white text-[#0A2540] placeholder-[#0A2540]/40 border border-[#0A2540]/10 text-xs focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-bold tracking-wider text-[#0A2540]/70 mb-1">
                    {t('resPhone')} <span className="text-[#D4AF37]">*</span>
                  </label>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="+216 26 589 531"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white text-[#0A2540] placeholder-[#0A2540]/40 border border-[#0A2540]/10 text-xs focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                {orderType === 'delivery' && (
                  <div>
                    <label className="block text-xs uppercase font-bold tracking-wider text-[#0A2540]/70 mb-1">
                      {language === 'ar' ? 'عنوان التوصيل في الشابة' : 'Adresse de livraison (La Chebba)'}
                    </label>
                    <input
                      type="text"
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      placeholder={language === 'ar' ? 'مثال: حي الشاطئ قرب الميناء...' : 'ex: Bord de plage, Rue Habib Bourguiba...'}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white text-[#0A2540] placeholder-[#0A2540]/40 border border-[#0A2540]/10 text-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs uppercase font-bold tracking-wider text-[#0A2540]/70 mb-1">
                    {language === 'ar' ? 'ملاحظات خاصة على الأطباق' : 'Instructions spécifiques'}
                  </label>
                  <input
                    type="text"
                    value={customerNotes}
                    onChange={(e) => setCustomerNotes(e.target.value)}
                    placeholder={language === 'ar' ? 'مثال: بدون حار، صوص زيادة...' : 'ex: Sans piment, bien cuit...'}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white text-[#0A2540] placeholder-[#0A2540]/40 border border-[#0A2540]/10 text-xs focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Drawer Footer Total & WhatsApp Action */}
        {cart.length > 0 && (
          <div className="p-5 bg-white border-t border-[#0A2540]/10 space-y-3 shadow-lg">
            {/* Calculation summary */}
            <div className="space-y-1.5 text-xs text-[#0A2540]/70">
              <div className="flex items-center justify-between">
                <span>{language === 'ar' ? 'المجموع الفرعي :' : 'Sous-total :'}</span>
                <span>{totalPrice.toFixed(1)} {t('tndPrice')}</span>
              </div>

              {tierDiscountPercent > 0 && (
                <div className="flex items-center justify-between text-emerald-700 font-semibold">
                  <span className="flex items-center gap-1">
                    <Percent className="w-3.5 h-3.5" />
                    <span>Remise Rang {currentTier.badge} (-{tierDiscountPercent}%) :</span>
                  </span>
                  <span>-{tierDiscountAmount.toFixed(1)} {t('tndPrice')}</span>
                </div>
              )}

              {voucherDiscount > 0 && (
                <div className="flex items-center justify-between text-emerald-700 font-semibold">
                  <span>Bon de réduction déduit :</span>
                  <span>-{voucherDiscount.toFixed(1)} {t('tndPrice')}</span>
                </div>
              )}

              <div className="pt-2 border-t border-[#0A2540]/10 flex items-center justify-between">
                <span className="text-xs uppercase font-bold tracking-wider text-[#0A2540]">{t('cartTotal')}</span>
                <div className="text-right">
                  <span className="text-xl font-extrabold text-[#0A2540] font-display block">
                    {finalPrice.toFixed(1)} {t('tndPrice')}
                  </span>
                  <span className="text-[10px] text-emerald-700 font-bold">
                    +{estimatedPointsEarned} pts fidélité
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handleSendWhatsAppOrder}
              className="w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-luxury bg-[#0A2540] hover:bg-[#1a3a5a] text-white transition-all hover:scale-[1.01] active:scale-[0.98]"
            >
              <Send className="w-4 h-4 text-[#D4AF37]" />
              <span>
                {orderType === 'delivery'
                  ? t('cartDeliveryBtn')
                  : t('cartTakeawayBtn')}
              </span>
            </button>

            <div className="flex items-center justify-between text-xs text-[#0A2540]/50 pt-1 font-medium">
              <button
                onClick={clearCart}
                className="text-rose-600 hover:underline"
              >
                {t('clearCart')}
              </button>
              <span>{orderType === 'delivery' ? 'Allo Baya: 23 783 745' : 'Casino Chebba: 26 589 531'}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

