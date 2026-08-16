import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label={language === 'ar' ? 'العودة إلى الأعلى' : 'Retour en haut de page'}
      title={language === 'ar' ? 'العودة إلى الأعلى' : 'Retour en haut'}
      className="fixed bottom-20 lg:bottom-8 right-4 lg:right-8 z-40 p-3 rounded-full bg-[#0A2540]/90 hover:bg-[#0A2540] text-[#D4AF37] hover:text-white border border-[#D4AF37]/40 shadow-xl backdrop-blur-sm transition-all duration-300 transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] group animate-in fade-in zoom-in-95 duration-200"
    >
      <ChevronUp className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
    </button>
  );
};
