import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { useLoyalty } from '../context/LoyaltyContext';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { Phone, CalendarCheck, Bike, ShoppingBag, Utensils, Crown } from 'lucide-react';

export const QuickFloatingBar: React.FC = () => {
  const { t, language } = useLanguage();
  const { totalCount, setIsCartOpen } = useCart();
  const { user, openLoyaltyModal } = useLoyalty();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white/95 backdrop-blur-md border-t border-[#0A2540]/10 px-2.5 py-2 shadow-2xl">
      <div className="flex items-center justify-around gap-1.5 max-w-md mx-auto">
        {/* Direct Call */}
        <a
          href={`tel:${RESTAURANT_INFO.phoneClean}`}
          className="flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-[#F8F5F2] hover:bg-[#eae0d5] text-[#0A2540] border border-[#0A2540]/5 active:scale-95 transition-all"
        >
          <Phone className="w-4 h-4 text-[#D4AF37] mb-0.5" />
          <span className="text-[9px] font-bold tracking-tight">{language === 'ar' ? 'اتصال' : 'Appeler'}</span>
        </a>

        {/* Reserve */}
        <a
          href="#reservation"
          className="flex-[1.2] flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-[#0A2540] text-white font-bold active:scale-95 transition-all shadow-md"
        >
          <CalendarCheck className="w-4 h-4 text-[#D4AF37] mb-0.5" />
          <span className="text-[9px] uppercase font-bold tracking-wider">{language === 'ar' ? 'حجز طاولة' : 'Réserver'}</span>
        </a>

        {/* Loyalty Club */}
        <button
          onClick={() => openLoyaltyModal(user ? 'rewards' : 'profile')}
          className="flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-[#F4EBE2] hover:bg-[#ead9c7] text-[#0A2540] border border-[#D4AF37]/30 active:scale-95 transition-all relative"
        >
          <Crown className="w-4 h-4 text-[#D4AF37] mb-0.5" />
          <span className="text-[9px] font-bold">
            {user ? `${user.points} pts` : (language === 'ar' ? 'الوفاء' : 'Club')}
          </span>
        </button>

        {/* Delivery Allo Baya */}
        <a
          href={`tel:${RESTAURANT_INFO.deliveryPhoneClean}`}
          className="flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-[#F8F5F2] hover:bg-[#eae0d5] text-[#0A2540] border border-[#0A2540]/5 active:scale-95 transition-all"
        >
          <Bike className="w-4 h-4 mb-0.5 text-orange-600" />
          <span className="text-[9px] font-bold">{language === 'ar' ? 'توصيل' : 'Livraison'}</span>
        </a>

        {/* Cart Drawer */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-[#F8F5F2] hover:bg-[#eae0d5] text-[#0A2540] border border-[#0A2540]/5 active:scale-95 transition-all"
          aria-label="Mon Panier"
        >
          <ShoppingBag className="w-4 h-4 text-[#D4AF37] mb-0.5" />
          <span className="text-[9px] font-bold">{language === 'ar' ? 'السلة' : 'Panier'}</span>
          {totalCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#0A2540] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {totalCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};
