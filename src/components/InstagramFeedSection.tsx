import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { INSTAGRAM_POSTS, InstagramPost, RESTAURANT_INFO } from '../data/restaurantData';
import { 
  Instagram, 
  Heart, 
  MessageCircle, 
  Send, 
  Bookmark, 
  ExternalLink, 
  MapPin, 
  Clock, 
  Sparkles,
  Flame,
  CheckCircle2,
  X,
  Share2
} from 'lucide-react';

export const InstagramFeedSection: React.FC = () => {
  const { t, language, isRTL } = useLanguage();
  const [selectedPost, setSelectedPost] = useState<InstagramPost | null>(null);
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [copiedPostId, setCopiedPostId] = useState<string | null>(null);

  const handleToggleLike = (postId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedPosts(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleSharePost = (post: InstagramPost, e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${window.location.origin}#instagram`);
      setCopiedPostId(post.id);
      setTimeout(() => setCopiedPostId(null), 2000);
    }
  };

  return (
    <section id="instagram" className="py-20 bg-[#FDFCFB] relative z-10 border-b border-[#0A2540]/5 overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-[#D4AF37]/5 via-pink-500/5 to-purple-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Instagram Branding */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 pb-6 border-b border-[#0A2540]/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-purple-600/10 via-pink-500/10 to-amber-500/10 border border-pink-500/20 text-[#0A2540] text-xs font-bold mb-3">
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
              <Instagram className="w-3.5 h-3.5 text-pink-600" />
              <span>{t('igBadgeLive')}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0A2540] tracking-tight font-display">
              {t('igTitle')}
            </h2>
            <div className="h-1 w-16 bg-[#D4AF37] my-3 rounded-full" />
            <p className="text-sm sm:text-base text-[#0A2540]/70 max-w-2xl">
              {t('igSubtitle')}
            </p>
          </div>

          {/* Official Account Pill & Follow Button */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2.5 p-2 pr-4 bg-white rounded-2xl border border-[#0A2540]/10 shadow-sm">
              <div className="p-0.5 rounded-full bg-gradient-to-tr from-amber-400 via-red-500 to-purple-600">
                <div className="w-9 h-9 rounded-full bg-white p-0.5 flex items-center justify-center overflow-hidden">
                  <div className="w-full h-full rounded-full bg-[#0A2540] text-[#D4AF37] flex items-center justify-center text-xs font-black">
                    CC
                  </div>
                </div>
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1 text-xs font-bold text-[#0A2540]">
                  <span>casino_chebba</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 fill-sky-500 text-white" />
                </div>
                <div className="text-[10px] text-[#0A2540]/60">La Chebba • 4.2k abonnés</div>
              </div>
            </div>

            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white text-xs font-bold tracking-wide uppercase flex items-center gap-2 shadow-md hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Instagram className="w-4 h-4" />
              <span>{t('igFollowBtn')}</span>
              <ExternalLink className="w-3 h-3 opacity-80" />
            </a>
          </div>
        </div>

        {/* Instagram Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {INSTAGRAM_POSTS.map((post) => {
            const isLiked = !!likedPosts[post.id];
            const currentLikes = post.likes + (isLiked ? 1 : 0);

            return (
              <article
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className="group bg-white rounded-3xl overflow-hidden border border-[#0A2540]/10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
              >
                {/* Post Header */}
                <div className="p-4 flex items-center justify-between border-b border-[#0A2540]/5">
                  <div className="flex items-center gap-2.5">
                    <div className="p-[1.5px] rounded-full bg-gradient-to-tr from-amber-400 via-pink-500 to-purple-600">
                      <div className="w-7 h-7 rounded-full bg-[#0A2540] text-[#D4AF37] flex items-center justify-center text-[10px] font-bold">
                        CC
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-1 text-xs font-bold text-[#0A2540]">
                        <span>casino_chebba</span>
                        <span className="text-[10px] text-[#0A2540]/40">•</span>
                        <span className="text-[11px] font-normal text-[#0A2540]/60">
                          {language === 'ar' ? post.timeAr : post.timeFr}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-[#0A2540]/60">
                        <MapPin className="w-2.5 h-2.5 text-[#D4AF37]" />
                        <span className="truncate max-w-[170px]">{post.location}</span>
                      </div>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    <span>Direct</span>
                  </span>
                </div>

                {/* Post Image with Hover Overlay */}
                <div className="relative aspect-square bg-slate-100 overflow-hidden">
                  <img
                    src={post.image}
                    alt={language === 'ar' ? post.captionAr : post.captionFr}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />

                  {/* Gradient Overlay for Text Legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white text-xs font-semibold flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20">
                      <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                      {language === 'ar' ? 'انقر لتكبير الصورة وقراءة الوصف' : 'Cliquer pour agrandir & détails'}
                    </span>
                  </div>

                  {/* Story Badge */}
                  {post.isStory && (
                    <div className="absolute top-3 left-3 bg-[#0A2540]/80 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                      <Flame className="w-3 h-3 text-amber-400" />
                      <span>{language === 'ar' ? 'شواء مباشر' : 'Pêche du jour'}</span>
                    </div>
                  )}
                </div>

                {/* Post Actions & Caption */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  {/* Action Bar */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={(e) => handleToggleLike(post.id, e)}
                          className="p-1 text-slate-700 hover:text-red-500 transition-colors"
                          aria-label="Aimer"
                        >
                          <Heart
                            className={`w-5 h-5 transition-transform ${
                              isLiked ? 'text-red-500 fill-red-500 scale-125' : 'hover:scale-110'
                            }`}
                          />
                        </button>
                        <button
                          onClick={() => setSelectedPost(post)}
                          className="p-1 text-slate-700 hover:text-[#0A2540] transition-colors"
                          aria-label="Commenter"
                        >
                          <MessageCircle className="w-5 h-5 hover:scale-110 transition-transform" />
                        </button>
                        <button
                          onClick={(e) => handleSharePost(post, e)}
                          className="p-1 text-slate-700 hover:text-[#D4AF37] transition-colors relative"
                          aria-label="Partager"
                          title="Copier le lien"
                        >
                          <Share2 className="w-5 h-5 hover:scale-110 transition-transform" />
                          {copiedPostId === post.id && (
                            <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#0A2540] text-white text-[9px] px-1.5 py-0.5 rounded shadow whitespace-nowrap">
                              Copié !
                            </span>
                          )}
                        </button>
                      </div>

                      <div className="text-[11px] font-bold text-[#0A2540]">
                        {currentLikes.toLocaleString()} {t('igLikes')}
                      </div>
                    </div>

                    {/* Caption Preview */}
                    <p className="text-xs text-[#0A2540]/80 leading-relaxed line-clamp-3 mb-2">
                      <span className="font-bold text-[#0A2540] mr-1">casino_chebba</span>
                      {language === 'ar' ? post.captionAr : post.captionFr}
                    </p>
                  </div>

                  {/* Hashtags */}
                  <div className="pt-2 border-t border-[#0A2540]/5 flex flex-wrap gap-1">
                    {post.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] text-sky-700 font-medium hover:underline"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom Call to Action Bar */}
        <div className="mt-12 p-6 rounded-3xl bg-gradient-to-r from-[#0A2540] to-[#123960] text-white border border-[#D4AF37]/30 shadow-luxury flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 via-pink-500 to-purple-600 p-0.5 shrink-0 hidden sm:block">
              <div className="w-full h-full rounded-2xl bg-[#0A2540] flex items-center justify-center">
                <Instagram className="w-7 h-7 text-[#D4AF37]" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold font-display text-white mb-1">
                {language === 'ar' ? 'شاركنا لحظاتك على إنستغرام عبر #CasinoChebba' : 'Taguez vos délices de la mer avec #CasinoChebba'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                {language === 'ar' ? 'انشر صور أطباقك على شاطئ الشابة لنعيد نشرها في القصص اليومية!' : 'Mentionnez @casino_chebba pour être mis à l’honneur dans nos stories quotidiennes.'}
              </p>
            </div>
          </div>

          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-xl bg-[#D4AF37] hover:bg-[#c5a028] text-[#0A2540] text-xs font-bold uppercase tracking-wider shadow-md transition-all shrink-0 hover:scale-105 active:scale-95"
          >
            {language === 'ar' ? 'فتح تطبيق إنستغرام' : 'Rejoindre la communauté'}
          </a>
        </div>
      </div>

      {/* Lightbox / Post Detail Modal */}
      {selectedPost && (
        <div
          className="fixed inset-0 z-50 bg-[#0A2540]/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setSelectedPost(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#D4AF37]/30 grid grid-cols-1 md:grid-cols-12 max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Image Column */}
            <div className="md:col-span-7 bg-black flex items-center justify-center max-h-[50vh] md:max-h-[85vh] overflow-hidden">
              <img
                src={selectedPost.image}
                alt={language === 'ar' ? selectedPost.captionAr : selectedPost.captionFr}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right Details & Interaction Column */}
            <div className="md:col-span-5 p-6 flex flex-col justify-between bg-white text-[#0A2540] overflow-y-auto">
              <div>
                {/* Account Header */}
                <div className="flex items-center gap-3 pb-4 border-b border-[#0A2540]/10 mb-4">
                  <div className="p-[1.5px] rounded-full bg-gradient-to-tr from-amber-400 via-pink-500 to-purple-600">
                    <div className="w-9 h-9 rounded-full bg-[#0A2540] text-[#D4AF37] flex items-center justify-center text-xs font-bold">
                      CC
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 text-sm font-bold text-[#0A2540]">
                      <span>casino_chebba</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 fill-sky-500 text-white" />
                    </div>
                    <p className="text-[11px] text-[#0A2540]/60 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#D4AF37]" />
                      <span>{selectedPost.location}</span>
                    </p>
                  </div>
                </div>

                {/* Full Caption */}
                <div className="space-y-3 mb-6">
                  <p className="text-xs sm:text-sm text-[#0A2540]/90 leading-relaxed">
                    {language === 'ar' ? selectedPost.captionAr : selectedPost.captionFr}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {selectedPost.tags.map((tg, i) => (
                      <span key={i} className="text-xs text-sky-700 font-medium">
                        {tg}
                      </span>
                    ))}
                  </div>

                  <div className="text-[11px] text-[#0A2540]/50 pt-2 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{language === 'ar' ? selectedPost.timeAr : selectedPost.timeFr}</span>
                  </div>
                </div>
              </div>

              {/* Interaction Footer */}
              <div className="pt-4 border-t border-[#0A2540]/10">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={(e) => handleToggleLike(selectedPost.id, e)}
                      className="p-1 text-slate-700 hover:text-red-500"
                    >
                      <Heart
                        className={`w-6 h-6 ${
                          likedPosts[selectedPost.id] ? 'text-red-500 fill-red-500' : ''
                        }`}
                      />
                    </button>
                    <button
                      onClick={(e) => handleSharePost(selectedPost, e)}
                      className="p-1 text-slate-700 hover:text-[#0A2540]"
                    >
                      <Share2 className="w-6 h-6" />
                    </button>
                  </div>
                  <div className="text-xs font-bold text-[#0A2540]">
                    {(selectedPost.likes + (likedPosts[selectedPost.id] ? 1 : 0)).toLocaleString()} {t('igLikes')}
                  </div>
                </div>

                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white text-xs font-bold text-center flex items-center justify-center gap-2 shadow-sm"
                >
                  <Instagram className="w-4 h-4" />
                  <span>{language === 'ar' ? 'فتح على إنستغرام' : 'Ouvrir sur Instagram'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
