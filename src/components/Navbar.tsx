import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { useLoyalty } from '../context/LoyaltyContext';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { 
  Phone, 
  ShoppingBag, 
  Menu as MenuIcon, 
  X, 
  Globe, 
  Compass, 
  CalendarCheck, 
  Bike,
  Sparkles,
  Crown,
  Film
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { language, toggleLanguage, t, isRTL } = useLanguage();
  const { totalCount, setIsCartOpen } = useCart();
  const { user, currentTier, openLoyaltyModal } = useLoyalty();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: t('navHome') },
    { href: '#menu', label: t('navMenu') },
    { href: '#reservation', label: t('navReservation') },
    { href: '#delivery', label: t('navDelivery') },
    { href: '#videos', label: t('navVideos') },
    { href: '#instagram', label: t('navInstagram') },
    { href: '#loyalty', label: t('navLoyalty') },
    { href: '#gallery', label: t('navGallery') },
    { href: '#reviews', label: t('navReviews') },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0A2540]/95 backdrop-blur-md border-b border-[#D4AF37]/20 shadow-luxury py-3 text-white'
          : 'bg-gradient-to-b from-[#0A2540]/95 via-[#0A2540]/70 to-transparent py-4 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#home"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded-lg p-1"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#997920] p-0.5 shadow-md flex items-center justify-center">
              <div className="w-full h-full bg-[#0A2540] rounded-[10px] flex items-center justify-center">
                <span className="text-xl">🌊</span>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-[#D4AF37] transition-colors font-display flex items-center gap-1.5">
                <span>CASINO</span>
                <span className="text-[#D4AF37] uppercase font-light text-base sm:text-lg tracking-widest">Chebba</span>
              </div>
              <span className="text-xs text-[#D4AF37]/90 font-medium tracking-wide">
                كازينو الشابة • Resto-Café
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-2.5 py-1.5 text-xs uppercase tracking-widest font-semibold text-slate-100 hover:text-[#D4AF37] transition-colors rounded-lg hover:bg-white/5 whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Loyalty Club Access Button */}
            <button
              onClick={() => openLoyaltyModal(user ? 'rewards' : 'profile')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                user
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#b89528] text-[#0A2540] shadow-md hover:scale-105'
                  : 'bg-white/10 hover:bg-white/15 text-[#D4AF37] border border-[#D4AF37]/40 hover:border-[#D4AF37]'
              }`}
              title={user ? `${user.points} points fidélité` : 'Rejoindre le Club Fidélité'}
            >
              <Crown className="w-3.5 h-3.5" />
              {user ? (
                <span className="flex items-center gap-1">
                  <span className="font-extrabold">{user.points}</span>
                  <span className="text-[10px] uppercase">{t('loyPtsUnit')}</span>
                </span>
              ) : (
                <span className="hidden sm:inline">{language === 'ar' ? 'نادي الوفاء' : 'Club Fidélité'}</span>
              )}
            </button>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/10 hover:bg-white/15 text-[11px] font-bold text-white border border-white/20 transition-all hover:border-[#D4AF37]/50"
              title={language === 'fr' ? 'Passer en Arabe' : 'Changer en Français'}
              aria-label="Changer de langue"
            >
              <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{language === 'fr' ? 'العربية' : 'Français'}</span>
            </button>

            {/* Quick Cart / Tray */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/15 transition-all hover:border-[#D4AF37]/50 flex items-center justify-center"
              aria-label="Voir la commande"
            >
              <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
              {totalCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#D4AF37] text-[#0A2540] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  {totalCount}
                </span>
              )}
            </button>

            {/* Direct Reserve Button */}
            <a
              href="#reservation"
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#c59b27] text-[#0A2540] text-xs uppercase tracking-wider font-bold shadow-luxury transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>{t('reserveTableBtn')}</span>
            </a>

            {/* Mobile Menu Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-white/10 text-white hover:text-[#D4AF37] transition-colors focus:outline-none"
              aria-label="Ouvrir le menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#0A2540]/98 border-b border-[#D4AF37]/20 px-4 pt-3 pb-6 space-y-3 mt-2 shadow-2xl backdrop-blur-xl animate-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-sm font-medium text-slate-100 hover:text-[#D4AF37] hover:bg-white/5 transition-colors flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-xs text-[#D4AF37]">→</span>
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                openLoyaltyModal();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#b89528] text-[#0A2540] text-sm font-bold shadow-md"
            >
              <Crown className="w-4 h-4" />
              <span>
                {user 
                  ? `${t('loyMyAccount')} (${user.points} pts)` 
                  : (language === 'ar' ? 'نادي الوفاء (100 نقطة هدية)' : 'Club Fidélité (100 pts offerts)')}
              </span>
            </button>

            <a
              href={`tel:${RESTAURANT_INFO.phoneClean}`}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-sm font-semibold border border-white/15"
            >
              <Phone className="w-4 h-4 text-[#D4AF37]" />
              <span>{RESTAURANT_INFO.phone}</span>
            </a>

            <a
              href="#reservation"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0A2540] text-white text-sm font-bold border border-[#D4AF37]/50 shadow-md"
            >
              <CalendarCheck className="w-4 h-4 text-[#D4AF37]" />
              <span>{t('reserveTableBtn')}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

