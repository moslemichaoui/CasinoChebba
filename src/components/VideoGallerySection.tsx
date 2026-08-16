import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { VIDEO_ITEMS, VideoItem, RESTAURANT_INFO } from '../data/restaurantData';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink, 
  Sparkles, 
  Film, 
  RotateCcw,
  Share2,
  Tv
} from 'lucide-react';

export const VideoGallerySection: React.FC = () => {
  const { t, language, isRTL } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'terrace' | 'seafood' | 'pizza' | 'atmosphere'>('all');
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<string>('0:00');

  const modalVideoRef = useRef<HTMLVideoElement | null>(null);

  const categories = [
    { id: 'all', label: t('vidTabAll') },
    { id: 'terrace', label: t('vidTabTerrace') },
    { id: 'seafood', label: t('vidTabSeafood') },
    { id: 'pizza', label: t('vidTabPizza') },
    { id: 'atmosphere', label: t('vidTabAtmosphere') },
  ];

  const filteredVideos = selectedCategory === 'all'
    ? VIDEO_ITEMS
    : VIDEO_ITEMS.filter((v) => v.category === selectedCategory);

  // Sync video modal state
  useEffect(() => {
    if (activeVideo && modalVideoRef.current) {
      modalVideoRef.current.currentTime = 0;
      modalVideoRef.current.play().catch(() => {
        // Autoplay may be restricted with sound; start muted if needed
        if (modalVideoRef.current) {
          modalVideoRef.current.muted = true;
          setIsMuted(true);
          modalVideoRef.current.play().catch(() => {});
        }
      });
      setIsPlaying(true);
    }
  }, [activeVideo]);

  const handleTimeUpdate = () => {
    if (modalVideoRef.current) {
      const current = modalVideoRef.current.currentTime;
      const duration = modalVideoRef.current.duration || 1;
      setProgress((current / duration) * 100);

      const mins = Math.floor(current / 60);
      const secs = Math.floor(current % 60);
      setCurrentTime(`${mins}:${secs < 10 ? '0' : ''}${secs}`);
    }
  };

  const togglePlay = () => {
    if (!modalVideoRef.current) return;
    if (modalVideoRef.current.paused) {
      modalVideoRef.current.play();
      setIsPlaying(true);
    } else {
      modalVideoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!modalVideoRef.current) return;
    modalVideoRef.current.muted = !modalVideoRef.current.muted;
    setIsMuted(modalVideoRef.current.muted);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!modalVideoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    modalVideoRef.current.currentTime = pos * modalVideoRef.current.duration;
  };

  const nextVideo = () => {
    if (!activeVideo) return;
    const currentIndex = filteredVideos.findIndex((v) => v.id === activeVideo.id);
    const nextIndex = (currentIndex + 1) % filteredVideos.length;
    setActiveVideo(filteredVideos[nextIndex]);
  };

  const prevVideo = () => {
    if (!activeVideo) return;
    const currentIndex = filteredVideos.findIndex((v) => v.id === activeVideo.id);
    const prevIndex = (currentIndex - 1 + filteredVideos.length) % filteredVideos.length;
    setActiveVideo(filteredVideos[prevIndex]);
  };

  // Keyboard navigation for video modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeVideo) return;
      if (e.key === 'Escape') setActiveVideo(null);
      if (e.key === ' ') {
        e.preventDefault();
        togglePlay();
      }
      if (e.key === 'ArrowRight') nextVideo();
      if (e.key === 'ArrowLeft') prevVideo();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeVideo, filteredVideos]);

  return (
    <section id="videos" className="py-20 bg-[#F4EBE2]/40 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0A2540]/10 text-[#0A2540] text-xs font-bold uppercase tracking-wider mb-3">
            <Film className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{t('vidOfficialBadge')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0A2540] tracking-tight font-display mb-3">
            {t('vidTitle')}
          </h2>
          <div className="h-1 w-16 bg-[#D4AF37] mx-auto mb-4 rounded-full" />
          <p className="text-base sm:text-lg text-[#0A2540]/70">
            {t('vidSubtitle')}
          </p>
        </div>

        {/* Facebook Page Official Callout Banner */}
        <div className="mb-10 max-w-4xl mx-auto p-4 sm:p-5 rounded-2xl bg-white border border-[#D4AF37]/30 shadow-luxury flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1877F2] text-white flex items-center justify-center font-bold text-xl shadow-md shrink-0">
              f
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#0A2540]">
                {language === 'ar' ? 'الصفحة الرسمية لكازينو الشابة على فيسبوك' : 'Page Facebook Officielle @KazynwAlshabtCasinoChebba'}
              </h4>
              <p className="text-xs text-[#0A2540]/60">
                {language === 'ar' ? 'فيديوهات يومية مباشرة، صيد البحر وأجواء حصرية' : 'Vidéos quotidiennes en direct, arrivages de poissons et stories'}
              </p>
            </div>
          </div>

          <a
            href={RESTAURANT_INFO.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-[#1877F2] hover:bg-[#166fe5] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm transition-all hover:scale-[1.02] shrink-0"
          >
            <span>{language === 'ar' ? 'زيارة صفحة فيسبوك' : 'Suivre sur Facebook'}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#0A2540] text-white shadow-luxury ring-2 ring-[#D4AF37]/40'
                  : 'bg-white text-[#0A2540]/70 hover:text-[#0A2540] border border-[#0A2540]/10 hover:bg-[#F8F5F2]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              onClick={() => setActiveVideo(video)}
              className="group relative rounded-3xl overflow-hidden bg-[#0A2540] border border-[#D4AF37]/20 shadow-luxury hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              {/* Media Container */}
              <div className="relative aspect-video sm:aspect-[4/3] w-full overflow-hidden bg-black">
                <img
                  src={video.poster}
                  alt={video.titleFr}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-90"
                />

                {/* Video Play Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540] via-transparent to-black/30 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-[#D4AF37] text-[#0A2540] flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover:scale-110">
                    <Play className="w-6 h-6 fill-current translate-x-0.5" />
                  </div>
                </div>

                {/* Duration & Views Top Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold">
                    ⏱ {video.duration}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-[#1877F2]/90 backdrop-blur-md text-white text-[10px] font-bold flex items-center gap-1">
                    <span>f</span>
                    <span>{video.views} vues</span>
                  </span>
                </div>

                {/* Reel Badge if applicable */}
                {video.isReel && (
                  <div className="absolute bottom-3 left-3">
                    <span className="px-2 py-0.5 rounded-md bg-[#D4AF37] text-[#0A2540] text-[9px] font-extrabold uppercase tracking-wider">
                      Reel HD
                    </span>
                  </div>
                )}
              </div>

              {/* Video Info Bottom Card */}
              <div className="p-4 bg-[#0A2540] text-white flex flex-col justify-between">
                <div>
                  <h4 className="text-sm sm:text-base font-bold font-display text-white group-hover:text-[#D4AF37] transition-colors line-clamp-1 mb-1">
                    {language === 'ar' ? video.titleAr : video.titleFr}
                  </h4>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {language === 'ar' ? video.descAr : video.descFr}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between text-xs text-[#D4AF37]">
                  <span className="font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>{language === 'ar' ? 'تشغيل الفيديو' : 'Lire la vidéo'}</span>
                    <span>→</span>
                  </span>
                  <Maximize2 className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FULLSCREEN VIDEO PLAYER MODAL */}
      {activeVideo && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setActiveVideo(null)}
        >
          <div 
            className="relative w-full max-w-4xl bg-[#0A2540] rounded-3xl border border-[#D4AF37]/30 shadow-2xl overflow-hidden flex flex-col max-h-[95vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Bar */}
            <div className="p-4 bg-[#061423] text-white flex items-center justify-between border-b border-white/10 z-10">
              <div className="flex items-center gap-2 min-w-0">
                <span className="px-2 py-0.5 rounded-md bg-[#D4AF37] text-[#0A2540] text-[10px] font-extrabold uppercase shrink-0">
                  {activeVideo.duration}
                </span>
                <h3 className="text-sm sm:text-base font-bold font-display text-white truncate">
                  {language === 'ar' ? activeVideo.titleAr : activeVideo.titleFr}
                </h3>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={activeVideo.facebookPostUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-[#1877F2] hover:bg-[#166fe5] text-white text-[11px] font-bold"
                >
                  <span>f</span>
                  <span>Facebook</span>
                </a>

                <button
                  onClick={() => setActiveVideo(null)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none"
                  aria-label={t('vidClose')}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Video Viewport */}
            <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
              <video
                ref={modalVideoRef}
                src={activeVideo.videoUrl}
                poster={activeVideo.poster}
                className="w-full h-full object-contain cursor-pointer"
                onClick={togglePlay}
                onTimeUpdate={handleTimeUpdate}
                playsInline
                loop
              />

              {/* Big Center Play/Pause indicator on pause */}
              {!isPlaying && (
                <button
                  onClick={togglePlay}
                  className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-[#D4AF37] text-[#0A2540] flex items-center justify-center shadow-2xl transition-transform hover:scale-110"
                  aria-label="Lire la vidéo"
                >
                  <Play className="w-8 h-8 fill-current translate-x-0.5" />
                </button>
              )}

              {/* Prev / Next Nav Buttons */}
              <button
                onClick={prevVideo}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-[#D4AF37] text-white hover:text-[#0A2540] transition-colors backdrop-blur-sm"
                aria-label="Vidéo précédente"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={nextVideo}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-[#D4AF37] text-white hover:text-[#0A2540] transition-colors backdrop-blur-sm"
                aria-label="Vidéo suivante"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Video Custom Controls & Timeline */}
            <div className="p-4 bg-[#061423] text-white space-y-3 border-t border-white/10">
              {/* Progress Bar */}
              <div 
                className="w-full h-2 bg-white/20 hover:h-3 rounded-full overflow-hidden cursor-pointer transition-all"
                onClick={handleSeek}
              >
                <div 
                  className="h-full bg-gradient-to-r from-[#D4AF37] to-amber-400 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Controls Toolbar */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={togglePlay}
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                  </button>

                  <button
                    onClick={toggleMute}
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                    aria-label={isMuted ? 'Activer le son' : 'Couper le son'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                  </button>

                  <span className="text-xs text-slate-300 font-mono">
                    {currentTime} / {activeVideo.duration}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={activeVideo.facebookPostUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-[#1877F2] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
                  >
                    <span>{t('vidWatchFacebook')}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-300 pt-1">
                {language === 'ar' ? activeVideo.descAr : activeVideo.descFr}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
