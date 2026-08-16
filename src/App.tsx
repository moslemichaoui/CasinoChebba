import React from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { CartProvider } from './context/CartContext';
import { LoyaltyProvider, useLoyalty } from './context/LoyaltyContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Highlights } from './components/Highlights';
import { InteractiveMenu } from './components/InteractiveMenu';
import { ReservationSection } from './components/ReservationSection';
import { DeliverySection } from './components/DeliverySection';
import { VideoGallerySection } from './components/VideoGallerySection';
import { LoyaltySection } from './components/LoyaltySection';
import { GallerySection } from './components/GallerySection';
import { InstagramFeedSection } from './components/InstagramFeedSection';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationFooter } from './components/LocationFooter';
import { CartDrawer } from './components/CartDrawer';
import { QuickFloatingBar } from './components/QuickFloatingBar';
import { LoyaltyModal } from './components/LoyaltyModal';
import { ScrollToTopButton } from './components/ScrollToTopButton';
import { Sparkles } from 'lucide-react';

const ToastNotificationBanner: React.FC = () => {
  const { toastMessage } = useLoyalty();

  if (!toastMessage) return null;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 max-w-md w-[90%] sm:w-auto bg-[#0A2540] text-white px-5 py-3 rounded-2xl shadow-2xl border border-[#D4AF37] flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
      <div className="w-8 h-8 rounded-xl bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] shrink-0">
        <Sparkles className="w-4 h-4" />
      </div>
      <span className="text-xs sm:text-sm font-semibold tracking-wide font-display">
        {toastMessage}
      </span>
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <LoyaltyProvider>
        <CartProvider>
          <div className="min-h-screen bg-[#FDFCFB] text-[#0A2540] flex flex-col selection:bg-[#D4AF37] selection:text-[#0A2540]">
            {/* Floating Toast */}
            <ToastNotificationBanner />

            {/* Top Navigation */}
            <Navbar />

            {/* Main Content Sections */}
            <main className="flex-grow pb-16 lg:pb-0">
              <Hero />
              <Highlights />
              <InteractiveMenu />
              <ReservationSection />
              <DeliverySection />
              <VideoGallerySection />
              <LoyaltySection />
              <GallerySection />
              <InstagramFeedSection />
              <ReviewsSection />
            </main>

            {/* Footer & Location Info */}
            <LocationFooter />

            {/* Drawers & Modals & Floating Mobile Bar & Back to Top */}
            <CartDrawer />
            <LoyaltyModal />
            <QuickFloatingBar />
            <ScrollToTopButton />
          </div>
        </CartProvider>
      </LoyaltyProvider>
    </LanguageProvider>
  );
}

