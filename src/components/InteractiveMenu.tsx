import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { MENU_CATEGORIES, MENU_ITEMS, MenuItem } from '../data/restaurantData';
import { 
  Search, 
  Sparkles, 
  Fish, 
  Pizza, 
  UtensilsCrossed, 
  Sandwich, 
  Croissant, 
  Coffee, 
  IceCream, 
  Plus, 
  Check, 
  Flame, 
  Award,
  Filter
} from 'lucide-react';

const categoryIcons: Record<string, React.ElementType> = {
  Sparkles,
  Fish,
  Pizza,
  UtensilsCrossed,
  Sandwich,
  Croissant,
  Coffee,
  IceCream,
};

export const InteractiveMenu: React.FC = () => {
  const { t, language, isRTL } = useLanguage();
  const { addToCart, cart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [onlyChefSpecials, setOnlyChefSpecials] = useState<boolean>(false);
  const [onlyFreshCatch, setOnlyFreshCatch] = useState<boolean>(false);
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});

  const handleAddToCart = (item: MenuItem) => {
    addToCart(item);
    setAddedItemIds((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [item.id]: false }));
    }, 1500);
  };

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category match
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Chef special toggle
      if (onlyChefSpecials && !item.isChefSpecial) {
        return false;
      }
      // Fresh catch toggle
      if (onlyFreshCatch && !item.isFreshCatch) {
        return false;
      }
      // Search query match in FR and AR
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        const matchFr = item.nameFr.toLowerCase().includes(query) || item.descFr.toLowerCase().includes(query);
        const matchAr = item.nameAr.toLowerCase().includes(query) || item.descAr.toLowerCase().includes(query);
        const matchTags = item.tags?.some((tag) => tag.toLowerCase().includes(query));
        return matchFr || matchAr || matchTags;
      }
      return true;
    });
  }, [selectedCategory, searchQuery, onlyChefSpecials, onlyFreshCatch]);

  return (
    <section id="menu" className="py-20 bg-[#FDFCFB] relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-bold block mb-2">
            {language === 'ar' ? 'أشهى المأكولات البحرية والإيطالية' : 'Depuis 1950 — Cuisine Méditerranéenne'}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0A2540] tracking-tight font-display mb-3">
            {t('menuTitle')}
          </h2>
          <div className="h-1 w-16 bg-[#D4AF37] mx-auto mb-4 rounded-full" />
          <p className="text-base sm:text-lg text-[#0A2540]/70">
            {t('menuSubtitle')}
          </p>
        </div>

        {/* Search Bar & Fast Filters */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-[#0A2540]/40 ${isRTL ? 'right-4' : 'left-4'}`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className={`w-full py-3.5 rounded-2xl bg-white text-[#0A2540] placeholder-[#0A2540]/40 border border-[#0A2540]/10 focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all text-sm sm:text-base shadow-sm ${
                isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'
              }`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className={`absolute top-1/2 -translate-y-1/2 text-xs bg-[#F4EBE2] hover:bg-[#eae0d5] text-[#0A2540] px-2.5 py-1 rounded-md font-semibold ${
                  isRTL ? 'left-3' : 'right-3'
                }`}
              >
                {language === 'ar' ? 'مسح' : 'Effacer'}
              </button>
            )}
          </div>

          {/* Quick Filter Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
            <button
              onClick={() => setOnlyChefSpecials(!onlyChefSpecials)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border transition-all flex items-center gap-1.5 ${
                onlyChefSpecials
                  ? 'bg-[#0A2540] text-white border-[#0A2540] shadow-sm'
                  : 'bg-white text-[#0A2540]/70 border-[#0A2540]/10 hover:border-[#D4AF37]/50'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{t('chefSpecialBadge')}</span>
            </button>

            <button
              onClick={() => setOnlyFreshCatch(!onlyFreshCatch)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border transition-all flex items-center gap-1.5 ${
                onlyFreshCatch
                  ? 'bg-[#D4AF37] text-[#0A2540] border-[#D4AF37] shadow-sm font-bold'
                  : 'bg-white text-[#0A2540]/70 border-[#0A2540]/10 hover:border-[#D4AF37]/50'
              }`}
            >
              <Fish className="w-3.5 h-3.5" />
              <span>{t('freshCatchBadge')}</span>
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar justify-start lg:justify-center">
          {MENU_CATEGORIES.map((cat) => {
            const Icon = categoryIcons[cat.icon] || Sparkles;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs uppercase font-bold tracking-widest whitespace-nowrap transition-all duration-200 shrink-0 ${
                  isActive
                    ? 'bg-[#0A2540] text-white shadow-luxury scale-[1.02]'
                    : 'bg-white text-[#0A2540]/70 hover:text-[#0A2540] hover:bg-[#F4EBE2]/60 border border-[#0A2540]/10'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#D4AF37]' : 'text-[#0A2540]/60'}`} />
                <span>{language === 'ar' ? cat.labelAr : cat.labelFr}</span>
              </button>
            );
          })}
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-[#F8F5F2] rounded-3xl border border-[#0A2540]/5 max-w-xl mx-auto shadow-sm">
            <Fish className="w-12 h-12 text-[#0A2540]/40 mx-auto mb-3" />
            <p className="text-[#0A2540]/80 font-semibold mb-4">{t('noItemsFound')}</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setOnlyChefSpecials(false);
                setOnlyFreshCatch(false);
              }}
              className="px-5 py-2.5 rounded-xl bg-[#0A2540] text-white text-xs font-bold uppercase tracking-wider shadow-sm hover:bg-[#1a3a5a]"
            >
              {language === 'ar' ? 'إعادة ضبط الفلاتر' : 'Réinitialiser les filtres'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const isAdded = addedItemIds[item.id];
              const isInCart = cart.some((ci) => ci.item.id === item.id);
              const cartItem = cart.find((ci) => ci.item.id === item.id);

              return (
                <div
                  key={item.id}
                  className="group bg-white rounded-3xl overflow-hidden border border-[#D4AF37]/15 hover:border-[#D4AF37]/40 shadow-luxury shadow-luxury-hover flex flex-col justify-between"
                >
                  <div>
                    {/* Item Image with Badges */}
                    <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-[#F4EBE2]">
                      <img
                        src={item.image}
                        alt={language === 'ar' ? item.nameAr : item.nameFr}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
                        <div className="flex flex-wrap gap-1.5">
                          {item.isChefSpecial && (
                            <span className="px-2.5 py-1 rounded-md bg-[#D4AF37] text-[#0A2540] text-[11px] font-bold shadow-md flex items-center gap-1">
                              <Award className="w-3 h-3" />
                              {t('chefSpecialBadge')}
                            </span>
                          )}
                          {item.isFreshCatch && (
                            <span className="px-2.5 py-1 rounded-md bg-[#0A2540] text-white text-[11px] font-bold shadow-md flex items-center gap-1">
                              <Fish className="w-3 h-3 text-[#D4AF37]" />
                              {t('freshCatchBadge')}
                            </span>
                          )}
                          {item.isPopular && !item.isChefSpecial && (
                            <span className="px-2.5 py-1 rounded-md bg-rose-600 text-white text-[11px] font-bold shadow-md flex items-center gap-1">
                              <Flame className="w-3 h-3" />
                              {t('popularBadge')}
                            </span>
                          )}
                        </div>

                        {/* Price Tag Badge */}
                        <div className="px-3 py-1 rounded-lg bg-white/95 border border-[#D4AF37]/30 text-[#0A2540] font-extrabold text-sm sm:text-base backdrop-blur-md shadow-sm">
                          <span className="text-[#D4AF37] mr-0.5">{item.price.toFixed(1)}</span> {t('tndPrice')}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-[#0A2540] mb-1.5 group-hover:text-[#D4AF37] transition-colors font-display">
                        {language === 'ar' ? item.nameAr : item.nameFr}
                      </h3>

                      <p className="text-xs sm:text-sm text-[#0A2540]/65 line-clamp-3 italic leading-relaxed mb-4">
                        {language === 'ar' ? item.descAr : item.descFr}
                      </p>

                      {/* Tags */}
                      {item.tags && item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {item.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="text-[11px] font-semibold px-2.5 py-0.5 rounded-md bg-[#F8F5F2] text-[#0A2540]/60 border border-[#0A2540]/5"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="p-5 pt-0">
                    <button
                      onClick={() => handleAddToCart(item)}
                      className={`w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                        isAdded
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : isInCart
                          ? 'bg-[#F4EBE2] text-[#0A2540] border border-[#D4AF37]/50 hover:bg-[#D4AF37] hover:text-[#0A2540]'
                          : 'bg-[#0A2540] hover:bg-[#16385a] text-white shadow-sm hover:shadow'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>{language === 'ar' ? 'تمت الإضافة بنجاح !' : 'Ajouté à la sélection !'}</span>
                        </>
                      ) : isInCart ? (
                        <>
                          <Plus className="w-4 h-4" />
                          <span>
                            {language === 'ar'
                              ? `في القائمة (${cartItem?.quantity}) • أضف المزيد`
                              : `Dans la sélection (${cartItem?.quantity}) • Ajouter +`}
                          </span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4 text-[#D4AF37]" />
                          <span>{t('addToCart')}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
