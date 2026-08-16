import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Bike, 
  Navigation, 
  ExternalLink, 
  Facebook, 
  MessageSquare,
  Instagram,
  Sparkles,
  Heart,
  Layers,
  Compass,
  Copy,
  Check,
  Maximize2,
  Anchor,
  Car
} from 'lucide-react';

export const LocationFooter: React.FC = () => {
  const { t, language, isRTL } = useLanguage();
  const [mapType, setMapType] = useState<'m' | 'k' | 'p'>('m'); // m = standard, k = satellite, p = terrain
  const [zoomLevel, setZoomLevel] = useState<number>(16);
  const [coordsCopied, setCoordsCopied] = useState(false);

  const { lat, lng } = RESTAURANT_INFO.coordinates;
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

  // Google Maps embed URL with dynamic parameters
  const embedMapUrl = `https://maps.google.com/maps?q=${lat},${lng}+(Casino+Chebba+Resto+Cafe)&t=${mapType}&z=${zoomLevel}&ie=UTF8&iwloc=&output=embed`;

  const copyCoordinates = () => {
    navigator.clipboard.writeText(`${lat}, ${lng}`);
    setCoordsCopied(true);
    setTimeout(() => setCoordsCopied(false), 2500);
  };

  return (
    <footer id="location" className="bg-[#0A2540] text-slate-300 relative z-10 border-t border-[#D4AF37]/20">
      {/* Top Location & Map Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-bold block mb-2">
            {language === 'ar' ? 'الموقع وساعات العمل' : 'Localisation & Accès'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display mb-3">
            {t('locTitle')}
          </h2>
          <div className="h-1 w-16 bg-[#D4AF37] mx-auto mb-4 rounded-full" />
          <p className="text-base text-slate-300">
            {t('locSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Contact Details Cards */}
          <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
            {/* Address Box */}
            <div className="p-5 rounded-3xl bg-white/5 border border-white/10 flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-[#D4AF37]/20 text-[#D4AF37] shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-white mb-1 font-display">{t('addressLabel')}</h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-2">
                  {language === 'ar' ? RESTAURANT_INFO.addressAr : RESTAURANT_INFO.addressFr}
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <a
                    href={directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D4AF37] hover:underline"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>{t('getDirections')}</span>
                  </a>
                  <span className="text-slate-500">•</span>
                  <button
                    onClick={copyCoordinates}
                    className="inline-flex items-center gap-1 text-xs text-slate-300 hover:text-[#D4AF37] transition-colors"
                    title="Copier les coordonnées GPS"
                  >
                    {coordsCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-semibold">{language === 'ar' ? 'تم نسخ GPS' : 'GPS Copié !'}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>35.2372° N, 11.1158° E</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Opening Hours Box */}
            <div className="p-5 rounded-3xl bg-white/5 border border-white/10 flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-[#F4EBE2]/15 text-[#D4AF37] shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1 font-display">{t('hoursLabel')}</h4>
                <p className="text-sm font-semibold text-white">
                  {language === 'ar' ? RESTAURANT_INFO.hoursAr : RESTAURANT_INFO.hoursFr}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  {t('openEveryday')} (Service midi, café & dîner face à la mer)
                </p>
              </div>
            </div>

            {/* Phone & Delivery Box */}
            <div className="p-5 rounded-3xl bg-white/5 border border-white/10 flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-[#D4AF37]/20 text-[#D4AF37] shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div className="space-y-2 flex-1">
                <div>
                  <h4 className="text-sm font-bold text-white mb-0.5 font-display">{t('phoneLabel')}</h4>
                  <a
                    href={`tel:${RESTAURANT_INFO.phoneClean}`}
                    className="text-base font-bold text-[#D4AF37] hover:underline block"
                  >
                    {RESTAURANT_INFO.phone}
                  </a>
                </div>
                <div className="pt-2 border-t border-white/10">
                  <span className="text-xs text-slate-300 font-semibold flex items-center gap-1">
                    <Bike className="w-3.5 h-3.5 text-[#D4AF37]" />
                    {t('deliveryLabel')} :
                  </span>
                  <a
                    href={`tel:${RESTAURANT_INFO.deliveryPhoneClean}`}
                    className="text-sm font-bold text-white hover:text-[#D4AF37]"
                  >
                    {RESTAURANT_INFO.deliveryPhone} (Allo Baya)
                  </a>
                </div>
              </div>
            </div>

            {/* Nearby Highlights Box */}
            <div className="p-4 rounded-2xl bg-[#0F355C]/50 border border-white/10 grid grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <Anchor className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>{language === 'ar' ? 'مطل مباشرة على الشاطئ' : 'Accès direct à la plage'}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Car className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>{language === 'ar' ? 'موقف سيارات مجاني متوفر' : 'Parking à proximité'}</span>
              </div>
            </div>
          </div>

          {/* Interactive Google Maps Container */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-[#D4AF37]/30 bg-black/40 shadow-2xl relative min-h-[420px] flex flex-col">
            {/* Map Top Bar Controls */}
            <div className="p-3 px-4 bg-[#07192C] border-b border-white/10 flex flex-wrap items-center justify-between gap-2 z-20">
              {/* Map Title & Live Beacon */}
              <div className="flex items-center gap-2.5">
                <div className="relative flex items-center justify-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping absolute" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 relative" />
                </div>
                <span className="text-xs font-bold text-white">
                  Google Maps : Casino Chebba
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-md bg-white/10 text-[10px] text-slate-300">
                  35.2372° N, 11.1158° E
                </span>
              </div>

              {/* Map View Mode Selectors */}
              <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-white/10">
                <button
                  onClick={() => setMapType('m')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    mapType === 'm'
                      ? 'bg-[#D4AF37] text-[#0A2540] shadow-sm'
                      : 'text-slate-300 hover:text-white'
                  }`}
                  title="Vue Plan Google Maps"
                >
                  {language === 'ar' ? 'خريطة' : 'Plan'}
                </button>
                <button
                  onClick={() => setMapType('k')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    mapType === 'k'
                      ? 'bg-[#D4AF37] text-[#0A2540] shadow-sm'
                      : 'text-slate-300 hover:text-white'
                  }`}
                  title="Vue Satellite de la côte et de la plage"
                >
                  {language === 'ar' ? 'قمر صناعي' : 'Satellite'}
                </button>
                <button
                  onClick={() => setMapType('p')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    mapType === 'p'
                      ? 'bg-[#D4AF37] text-[#0A2540] shadow-sm'
                      : 'text-slate-300 hover:text-white'
                  }`}
                  title="Vue Relief / Terrain"
                >
                  {language === 'ar' ? 'تضاريس' : 'Terrain'}
                </button>
              </div>
            </div>

            {/* Google Maps Interactive Iframe */}
            <div className="relative w-full flex-1 min-h-[320px] bg-slate-900">
              <iframe
                title="Google Maps Casino Chebba Plage"
                src={embedMapUrl}
                className="w-full h-full min-h-[340px] border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Floating Quick Location Card Overlay on Map */}
              <div className="absolute top-4 left-4 max-w-[260px] p-3 rounded-2xl bg-[#0A2540]/90 backdrop-blur-md border border-[#D4AF37]/40 shadow-xl pointer-events-auto hidden sm:block">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                  <span className="text-xs font-black text-white font-display">Casino Chebba</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-tight">
                  {language === 'ar' 
                    ? 'شاطئ الشابة، قبالة مياه البحر الأبيض المتوسط' 
                    : 'Sur le sable, vue panoramique sur la mer'}
                </p>
                <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between text-[10px]">
                  <span className="text-emerald-400 font-bold">● Ouvert 11h–00h</span>
                  <a
                    href={directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#D4AF37] hover:underline font-bold"
                  >
                    Itinéraire ➔
                  </a>
                </div>
              </div>

              {/* Zoom Buttons Controls Overlay */}
              <div className="absolute bottom-4 right-4 flex flex-col gap-1.5 z-10">
                <button
                  onClick={() => setZoomLevel((prev) => Math.min(prev + 1, 19))}
                  className="w-8 h-8 rounded-lg bg-[#0A2540]/90 hover:bg-[#0A2540] text-white border border-white/20 flex items-center justify-center font-bold text-base shadow-lg transition-colors"
                  title="Zoom Avant"
                  aria-label="Zoom Avant"
                >
                  +
                </button>
                <button
                  onClick={() => setZoomLevel((prev) => Math.max(prev - 1, 12))}
                  className="w-8 h-8 rounded-lg bg-[#0A2540]/90 hover:bg-[#0A2540] text-white border border-white/20 flex items-center justify-center font-bold text-base shadow-lg transition-colors"
                  title="Zoom Arrière"
                  aria-label="Zoom Arrière"
                >
                  −
                </button>
              </div>
            </div>

            {/* Map Bottom Action Bar */}
            <div className="p-3.5 sm:p-4 bg-[#0A2540] border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-xs text-slate-300">
                  {language === 'ar' 
                    ? 'الشابة، ولاية المهدية، الساحل التونسي' 
                    : 'La Plage, 5170 La Chebba (Gouvernorat de Mahdia)'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Full Google Maps in new tab */}
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{language === 'ar' ? 'تطبيق الخرائط' : 'Google Maps'}</span>
                </a>

                {/* GPS Directions button */}
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-[#D4AF37] text-[#0A2540] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md hover:bg-[#c59b27] transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>{t('getDirections')}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Brand & Links Bottom Row */}
        <div className="mt-16 pt-10 border-t border-white/10 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#D4AF37] text-[#0A2540] flex items-center justify-center font-bold text-xl shadow-md">
                🌊
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-white font-display">
                  Casino Chebba (كازينو الشابة)
                </h3>
                <p className="text-xs text-[#D4AF37] font-semibold tracking-wider uppercase">Resto-Café • Depuis 1950</p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md leading-relaxed">
              {t('footerDesc')}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={RESTAURANT_INFO.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-[#D4AF37] hover:text-[#0A2540] text-white flex items-center justify-center transition-all"
                aria-label="Facebook Casino Chebba"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-[#D4AF37] hover:text-[#0A2540] text-white flex items-center justify-center transition-all"
                aria-label="Instagram Casino Chebba"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${RESTAURANT_INFO.phoneClean}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-[#D4AF37] hover:text-[#0A2540] text-white flex items-center justify-center transition-all"
                aria-label="WhatsApp Casino Chebba"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-widest text-[#D4AF37] mb-4 font-display">{t('quickLinks')}</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a href="#home" className="hover:text-[#D4AF37] transition-colors">{t('navHome')}</a>
              </li>
              <li>
                <a href="#menu" className="hover:text-[#D4AF37] transition-colors">{t('navMenu')}</a>
              </li>
              <li>
                <a href="#reservation" className="hover:text-[#D4AF37] transition-colors">{t('navReservation')}</a>
              </li>
              <li>
                <a href="#delivery" className="hover:text-[#D4AF37] transition-colors">{t('navDelivery')}</a>
              </li>
              <li>
                <a href="#instagram" className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 text-[#D4AF37]">
                  <Instagram className="w-3.5 h-3.5" />
                  <span>Instagram Live</span>
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#D4AF37] transition-colors">{t('navGallery')}</a>
              </li>
            </ul>
          </div>

          {/* Key Specialties */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-widest text-[#D4AF37] mb-4 font-display">{t('navSpecialties')}</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
              <li>• {language === 'ar' ? 'سمك اليوم الطازج مشوي (قراد / وراطة)' : 'Poisson du Jour (Karradh / Daurade)'}</li>
              <li>• {language === 'ar' ? 'سلطة كازينو الخاصة بالحبار والجمبري' : 'Salade Casino Signature'}</li>
              <li>• {language === 'ar' ? 'بيتزا فواكه البحر الملكية' : 'Pizza Fruits de Mer N°1'}</li>
              <li>• {language === 'ar' ? 'ليموناضة تونسية طازجة باللوز' : 'Citronnade Fraîche aux Amandes'}</li>
            </ul>
          </div>
        </div>

        {/* Legal Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>{t('legalNotice')}</p>
          <div className="flex items-center gap-1.5 text-slate-400">
            <span>La Chebba, Mahdia</span>
            <span>•</span>
            <span>Tunisie 🇹🇳</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
