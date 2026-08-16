import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'fr' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const translations: Record<Language, Record<string, string>> = {
  fr: {
    // Navigation
    navHome: 'Accueil',
    navMenu: 'Notre Carte',
    navSpecialties: 'Spécialités',
    navReservation: 'Réserver une Table',
    navDelivery: 'Livraison Allo Baya',
    navVideos: 'Galerie Vidéo',
    navInstagram: 'Instagram Live',
    navLoyalty: 'Club Fidélité',
    navGallery: 'Ambiance & Galerie',
    navReviews: 'Avis Clients',
    navContact: 'Contact & Accès',
    callNow: 'Appeler le 26 589 531',
    reserveTableBtn: 'Réserver une Table',
    orderDeliveryBtn: 'Commander (Allo Baya)',

    // Hero
    heroBadge: 'Resto-Café & Saveurs Marines • La Chebba, Mahdia',
    heroTitlePart1: 'L’Art des Saveurs Marines',
    heroTitlePart2: 'au Bord de l’Eau',
    heroDescription: 'Savourez les poissons frais pêchés au large de La Chebba, nos célèbres pizzas artisanales et notre carte méditerranéenne face aux vagues azurées.',
    heroCtaReserve: 'Réserver une Table',
    heroCtaMenu: 'Découvrir notre Menu',
    heroCtaDelivery: 'Livraison Rapide',
    openStatus: 'Ouvert 7j/7 de 11h00 à 00h00',
    statFresh: 'Pêche locale du jour',
    statPizza: 'Pizzas N°1 à Chebba',
    statTerrace: 'Terrasse Panoramique Plage',
    statReviews: '+920 clients satisfaits',

    // Features / Highlights
    feat1Title: 'Poissons & Fruits de Mer Frais',
    feat1Desc: 'Arrivage direct chaque matin des pêcheurs de La Chebba : Karradh, Daurade, Calamars & Crevettes.',
    feat2Title: 'Pizzas Réputées N°1',
    feat2Desc: 'Pâte artisanale étalée à la main, ingrédients italiens d’exception et cuisson croustillante.',
    feat3Title: 'Terrasse Privilégiée sur la Plage',
    feat3Desc: 'Une vue imprenable sur la mer Méditerranée pour vos déjeuners au soleil et soirées d’été.',
    feat4Title: 'Service Livraison Allo Baya',
    feat4Desc: 'Livraison rapide à domicile et au bureau sur toute La Chebba en appelant le 23 783 745.',

    // Menu Section
    menuTitle: 'Notre Carte & Menu Gourmand',
    menuSubtitle: 'Des produits nobles, frais et cuisinés avec passion par notre brigade méditerranéenne.',
    searchPlaceholder: 'Rechercher un plat, ingrédient (ex: Calamars, Karradh, Pizza)...',
    chefSpecialBadge: 'Spécialité du Chef',
    popularBadge: 'Populaire',
    freshCatchBadge: 'Pêche du Jour',
    addToCart: 'Ajouter à la sélection',
    tndPrice: 'DT',
    noItemsFound: 'Aucun plat trouvé dans cette catégorie.',

    // Reservation Section
    resTitle: 'Réservez Votre Table au Casino Chebba',
    resSubtitle: 'Profitez de la meilleure place en terrasse face à la mer ou en salle climatisée. Confirmation instantanée par WhatsApp ou Téléphone.',
    resName: 'Votre Nom complet',
    resPhone: 'Numéro de Téléphone (ex: 26 589 531)',
    resDate: 'Date de réservation',
    resTime: 'Heure souhaitée',
    resGuests: 'Nombre de personnes',
    resSeating: 'Emplacement préféré',
    resSeatingTerrace: '🌊 Terrasse Vue Mer (Bord de plage)',
    resSeatingIndoor: '❄️ Salle Intérieure Climatisée',
    resSeatingFamily: '👨‍👩‍👧‍👦 Espace Famille Convivial',
    resSeatingSunset: '🌅 Espace Lounge Coucher de Soleil',
    resNotes: 'Demandes particulières (Anniversaire, chaise bébé, etc.)',
    resSubmitWhatsApp: 'Confirmer la Réservation via WhatsApp',
    resDirectCall: 'Ou réservez directement au : 26 589 531',
    resSuccessTitle: 'Demande Prête à être Envoyée !',
    resSuccessDesc: 'Votre message WhatsApp a été préparé avec tous vos critères. Cliquez ci-dessous pour l’envoyer à l’équipe du restaurant.',

    // Delivery Section
    delTitle: 'Envie de déguster chez vous ?',
    delSubtitle: 'Casino Chebba est partenaire officiel d’Allo Baya pour une livraison ultra-rapide et soignée dans toute La Chebba.',
    delStep1Title: 'Choisissez vos plats',
    delStep1Desc: 'Découvrez notre menu varié : Pizzas chaudes, Spaghettis fruits de mer, Burgers & Boissons.',
    delStep2Title: 'Commandez en 1 clic',
    delStep2Desc: 'Appelez directement le service Allo Baya ou envoyez votre panier préparé via WhatsApp.',
    delStep3Title: 'Livraison Rapide',
    delStep3Desc: 'Vos plats arrivent chauds et savoureux directement chez vous ou à la plage !',
    delCallAlloBaya: 'Appeler Allo Baya : 23 783 745',
    delOrderWhatsapp: 'Commander par WhatsApp',

    // Gallery
    galTitle: 'Galerie & Ambiance Casino',
    galSubtitle: 'Plongez dans l’univers chaleureux de Casino Chebba, entre embruns marins et délices culinaires.',
    galAll: 'Tout voir',
    galTerrace: 'Terrasse & Plage',
    galDishes: 'Plats & Poissons',
    galDrinks: 'Boissons & Café',
    galEvening: 'Soirée & Coucher de Soleil',

    // Reviews
    revTitle: 'Ce que disent nos clients',
    revSubtitle: 'La satisfaction de nos hôtes est notre plus belle récompense (+920 avis certifiés).',
    revRecommendation: 'Recommandé par 74% des visiteurs',
    revGoogleNote: '4.6 / 5 sur Google & Facebook',

    // Video Gallery
    vidTitle: 'Immersion Vidéo & Ambiance en Direct',
    vidSubtitle: 'Découvrez nos cuisines en action, la cuisson du poisson frais du jour et les soirées au bord de mer de La Chebba.',
    vidTabAll: 'Toutes les vidéos',
    vidTabTerrace: 'Terrasse & Vue Mer',
    vidTabSeafood: 'Grillades & Poissons',
    vidTabPizza: 'Pizzas Artisanales',
    vidTabAtmosphere: 'Ambiance & Boissons',
    vidWatchFacebook: 'Regarder sur la Page Facebook Officielle',
    vidFullscreen: 'Plein Écran',
    vidClose: 'Fermer la vidéo',
    vidOfficialBadge: 'Vidéos Officielles @KazynwAlshabtCasinoChebba',

    // Instagram Preview
    igTitle: 'En Direct sur Instagram',
    igSubtitle: 'Suivez la préparation quotidienne de nos poissons frais pêchés le matin, nos arrivages marins et la vie du restaurant.',
    igFollowBtn: 'Suivre sur Instagram (@casino_chebba)',
    igBadgeLive: 'Photos du Jour en Cuisine',
    igViewPost: 'Voir les détails',
    igClose: 'Fermer',
    igLikes: 'J’aime',
    igComments: 'Commentaires',

    // Loyalty Club
    loyTitle: 'Club Privilège Casino Chebba',
    loySubtitle: 'Chaque visite, réservation et commande vous récompense. Cumulez des points et débloquez des délices exclusifs.',
    loyCardTitle: 'Votre Compte Fidélité',
    loyBalanceLabel: 'Solde de Points',
    loyTierLabel: 'Statut Membre',
    loyPtsUnit: 'points',
    loyJoinBtn: 'Rejoindre le Club (100 pts offerts)',
    loyLoginBtn: 'Espace Membre',
    loyMyAccount: 'Mon Compte Privilège',
    loyLogout: 'Déconnexion',
    loyRedeemBtn: 'Échanger cette récompense',
    loyRedeemedBadge: 'Récompense Débloquée !',
    loyUseVoucher: 'Utiliser sur WhatsApp',
    loyHowItWorks: 'Comment ça marche ?',
    loyRule1: '1 DT dépensé = 10 points fidélité crédités',
    loyRule2: '50 points offerts pour chaque réservation de table',
    loyRule3: '100 points de bienvenue dès votre inscription',
    loyRule4: 'Échangez vos points contre des pizzas, poissons, desserts et réductions',
    loyTabRewards: 'Catalogue Récompenses',
    loyTabTiers: 'Niveaux & Avantages',
    loyTabHistory: 'Historique des Points',
    loyTabAccount: 'Mon Profil',
    loyEarnOnReservation: 'Gagnez +50 points avec cette réservation !',
    loyEarnOnOrder: 'Gagnez des points fidélité sur cette commande !',
    loyVoucherApplied: 'Code Privilège appliqué',
    loyNamePlaceholder: 'Votre nom et prénom',
    loyPhonePlaceholder: 'Votre numéro de téléphone (ex: 26 589 531)',
    loyWelcomeBonusToast: 'Bienvenue au Club Privilège ! +100 points offerts 🎁',
    loyReservationEarnToast: '+50 points fidélité crédités pour votre réservation ! ⭐',
    loyOrderEarnToast: 'Points fidélité ajoutés avec succès à votre compte ! 🎉',

    // Location / Contact
    locTitle: 'Nous Trouver & Nous Contacter',
    locSubtitle: 'Au bord direct de la plage à La Chebba, facile d’accès avec parking.',
    addressLabel: 'Adresse',
    hoursLabel: 'Horaires d’ouverture',
    phoneLabel: 'Réservations & Informations',
    deliveryLabel: 'Service de Livraison Allo Baya',
    openEveryday: '7 jours / 7 sans interruption',
    getDirections: 'Ouvrir sur Google Maps',

    // Cart / Drawer
    cartTitle: 'Votre Sélection Gourmande',
    cartEmpty: 'Votre sélection est vide. Explorez notre carte et ajoutez vos plats favoris !',
    cartTotal: 'Total estimé :',
    cartTakeawayBtn: 'Commander à emporter (Casino Chebba)',
    cartDeliveryBtn: 'Commander en livraison (Allo Baya)',
    clearCart: 'Vider la sélection',

    // Footer
    footerDesc: 'Resto-Café emblématique au bord de la plage à La Chebba (Mahdia). Fraîcheur marine, pizzas artisanales et convivialité tunisienne.',
    quickLinks: 'Liens Rapides',
    legalNotice: '© 2026 Casino Chebba (كازينو الشابة). Tous droits réservés. Réalisé avec excellence.',
  },
  ar: {
    // Navigation
    navHome: 'الرئيسية',
    navMenu: 'قائمتنا',
    navSpecialties: 'المميزات',
    navReservation: 'حجز طاولة',
    navDelivery: 'توصيل ألو باية',
    navVideos: 'فيديوهات مباشرة',
    navInstagram: 'إنستغرام مباشر',
    navLoyalty: 'نادي الوفاء',
    navGallery: 'الأجواء والصور',
    navReviews: 'آراء الزوار',
    navContact: 'الموقع والاتصال',
    callNow: 'اتصل بنا: 26 589 531',
    reserveTableBtn: 'احجز طاولتك',
    orderDeliveryBtn: 'طلب ديلفري (Allo Baya)',

    // Hero
    heroBadge: 'مطعم ومقهى وفواكه البحر • شاطئ الشابة، المهدية',
    heroTitlePart1: 'فن النكهات البحرية الأصيلة',
    heroTitlePart2: 'على ضفاف بحر الشابة',
    heroDescription: 'تذوقوا أشهى الأسماك الطازجة المصطادة يومياً من سواحل الشابة، أشهى أنواع البيتزا الإيطالية وأطباقنا المتوسطية أمام سحر أمواج البحر.',
    heroCtaReserve: 'احجز طاولتك الآن',
    heroCtaMenu: 'تصفح قائمة الطعام',
    heroCtaDelivery: 'طلب توصيل فوري',
    openStatus: 'مفتوح 7/7 من 11:00 صباحاً إلى 00:00 ليلاً',
    statFresh: 'صيد بحري طازج يومياً',
    statPizza: 'البيتزا الأولى في الشابة',
    statTerrace: 'تراس بانورامي على الشاطئ',
    statReviews: '+920 زبون سعيد وموصي بنا',

    // Features / Highlights
    feat1Title: 'أسماك وفواكه بحر طازجة',
    feat1Desc: 'وصول يومي مباشر من بحارة الشابة: قراد، وراطة، حبار طري وجمبري ملكي.',
    feat2Title: 'البيتزا الأولى في الشابة',
    feat2Desc: 'عجينة يدوية أصيلة مخبوزة بعناية، مكونات إيطالية ومحلية فاخرة.',
    feat3Title: 'تراس استثنائي على الشاطئ',
    feat3Desc: 'إطلالة ساحرة ومباشرة على البحر الأبيض المتوسط لأجمل اللحظات العائلية وغروب الشمس.',
    feat4Title: 'خدمة توصيل سريعة عبر ألو باية',
    feat4Desc: 'توصيل ساخن وسريع لجميع أحياء الشابة بالاتصال مباشرة على 23 783 745.',

    // Menu Section
    menuTitle: 'قائمة الطعام والمأكولات الشهية',
    menuSubtitle: 'مأكولات فاخرة، طازجة ومعدة بكل حب وشغف من أفضل الطهاة التونسيين.',
    searchPlaceholder: 'ابحث عن طبق أو مكوّن (مثال: حبار، قراد، بيتزا، سلطة)...',
    chefSpecialBadge: 'طبق الشيف المميز',
    popularBadge: 'الأكثر طلباً',
    freshCatchBadge: 'صيد اليوم',
    addToCart: 'إضافة للقائمة',
    tndPrice: 'د.ت',
    noItemsFound: 'لم يتم العثور على أطباق في هذا القسم.',

    // Reservation Section
    resTitle: 'احجز طاولتك في كازينو الشابة',
    resSubtitle: 'اختر موقعك المفضل على التراس المقابل للبحر أو في القاعة المكيفة. تأكيد فوري ومباشر عبر واتساب أو الهاتف.',
    resName: 'الاسم واللقب',
    resPhone: 'رقم الهاتف (مثال: 26 589 531)',
    resDate: 'تاريخ الحجز',
    resTime: 'التوقيت المفضل',
    resGuests: 'عدد الضيوف والأشخاص',
    resSeating: 'المكان المرغوب',
    resSeatingTerrace: '🌊 تراس بإطلالة مباشرة على شاطئ البحر',
    resSeatingIndoor: '❄️ قاعة داخلية مكيفة',
    resSeatingFamily: '👨‍👩‍👧‍👦 فضاء عائلي هادئ',
    resSeatingSunset: '🌅 فضاء الغروب الخاص',
    resNotes: 'ملاحظات أو طلبات خاصة (عيد ميلاد، كرسي أطفال...)',
    resSubmitWhatsApp: 'تأكيد الحجز فوراً عبر واتساب',
    resDirectCall: 'أو اتصل مباشرة على الرقم: 26 589 531',
    resSuccessTitle: 'رسالة الحجز جاهزة للإرسال!',
    resSuccessDesc: 'تم تجهيز رسالتك مع كافة التفاصيل، اضغط أدناه لفتح تطبيق واتساب وإرسالها فوراً لإدارة المطعم.',

    // Delivery Section
    delTitle: 'ترغب في الأكل بمنزلك أو بمكان عملك؟',
    delSubtitle: 'كازينو الشابة في شراكة رسمية مع "ألو باية" لضمان وصول طلباتكم ساخنة وبأعلى جودة في كل أنحاء الشابة.',
    delStep1Title: 'اختر أطباقك المفضلة',
    delStep1Desc: 'بيتزا ساخنة، معكرونة فواكه البحر، برغر ومشروبات منعشة.',
    delStep2Title: 'اطلب بضغطة زر',
    delStep2Desc: 'اتصل بخدمة ألو باية مباشرة أو أرسل تفاصيل طلبك على واتساب.',
    delStep3Title: 'توصيل سريع حتى بابك',
    delStep3Desc: 'يصلك طلبك في أسرع وقت ساخناً وطازجاً أينما كنت في الشابة!',
    delCallAlloBaya: 'اتصال بخدمة ألو باية: 23 783 745',
    delOrderWhatsapp: 'الطلب عبر واتساب',

    // Gallery
    galTitle: 'أجواء وصور كازينو الشابة',
    galSubtitle: 'عش معنا تجربة بصرية تنبض بجمال البحر ولذة المذاق المتوسطي الأصيل.',
    galAll: 'الكل',
    galTerrace: 'التراس والشاطئ',
    galDishes: 'الأطباق والأسماك',
    galDrinks: 'المشروبات والمقهى',
    galEvening: 'الأمسيات والغروب',

    // Reviews
    revTitle: 'ماذا يقول زبائننا الكرام؟',
    revSubtitle: 'سعادتكم ورضاكم هي فخرنا الدائم (+920 تقييم موثق من عشاق كازينو الشابة).',
    revRecommendation: 'موصى به بنسبة 74% من الزوار',
    revGoogleNote: '4.6 / 5 على جوجل وفيسبوك',

    // Video Gallery
    vidTitle: 'معرض الفيديو والأجواء المباشرة',
    vidSubtitle: 'شاهد تحضير أشهى المأكولات، شواء الأسماك الطازجة وأجواء سهرات شاطئ الشابة الساحرة.',
    vidTabAll: 'جميع الفيديوهات',
    vidTabTerrace: 'التراس والبحر',
    vidTabSeafood: 'الأسماك والمشويات',
    vidTabPizza: 'البيتزا الإيطالية',
    vidTabAtmosphere: 'الأجواء والمشروبات',
    vidWatchFacebook: 'مشاهدة الفيديو على الصفحة الرسمية بفيسبوك',
    vidFullscreen: 'شاشة كاملة',
    vidClose: 'إغلاق الفيديو',
    vidOfficialBadge: 'فيديوهات رسمية من صفحة @KazynwAlshabtCasinoChebba',

    // Instagram Preview
    igTitle: 'مباشرة على إنستغرام',
    igSubtitle: 'تابع تحضير الأسماك الطازجة يومياً بعد وصولها من بحارة الشابة، أسرار المطبخ وأجواء المطعم المباشرة.',
    igFollowBtn: 'متابعة على إنستغرام (@casino_chebba)',
    igBadgeLive: 'صور حية من مطبخ اليوم',
    igViewPost: 'تفاصيل المنشور',
    igClose: 'إغلاق',
    igLikes: 'إعجاب',
    igComments: 'تعليق',

    // Loyalty Club
    loyTitle: 'نادي الامتياز والوفاء كازينو الشابة',
    loySubtitle: 'كل زيارة، حجز طاولة أو طلبية تمنحك نقاطاً مجانية. استبدل نقاطك بأشهى الأطباق والمشروبات والتخفيضات الفورية.',
    loyCardTitle: 'حساب الولاء الخاص بك',
    loyBalanceLabel: 'رصيد النقاط',
    loyTierLabel: 'مستوى العضوية',
    loyPtsUnit: 'نقطة',
    loyJoinBtn: 'انضم للنادي (100 نقطة هدية فورية)',
    loyLoginBtn: 'دخول الأعضاء',
    loyMyAccount: 'حسابي الخاص',
    loyLogout: 'تسجيل الخروج',
    loyRedeemBtn: 'استبدال هذه المكافأة',
    loyRedeemedBadge: 'تم تفعيل المكافأة بنجاح!',
    loyUseVoucher: 'استخدام القسيمة عبر واتساب',
    loyHowItWorks: 'كيف يعمل برنامج الوفاء؟',
    loyRule1: 'كل 1 دينار مستهلك = 10 نقاط تضاف لحسابك',
    loyRule2: '50 نقطة هدية مع كل حجز طاولة عبر الموقع',
    loyRule3: '100 نقطة مجانية ترحيبية فور التسجيل',
    loyRule4: 'استبدل نقاطك ببيتزا، أطباق سمك، تحلية وقسائم تخفيض مباشرة',
    loyTabRewards: 'دليل المكافآت',
    loyTabTiers: 'المستويات والامتيازات',
    loyTabHistory: 'سجل حركات النقاط',
    loyTabAccount: 'ملفي الشخصي',
    loyEarnOnReservation: 'اكسب +50 نقطة عند تأكيد هذا الحجز!',
    loyEarnOnOrder: 'اكسب نقاط وفاء مجانية على هذا الطلب!',
    loyVoucherApplied: 'تم تطبيق قسيمة الخصم',
    loyNamePlaceholder: 'الاسم واللقب',
    loyPhonePlaceholder: 'رقم هاتفك (مثال: 26 589 531)',
    loyWelcomeBonusToast: 'مرحباً بك في نادي كازينو الشابة! +100 نقطة هدية ترحيبية 🎁',
    loyReservationEarnToast: 'تمت إضافة +50 نقطة لحسابك بفضل حجز الطاولة! ⭐',
    loyOrderEarnToast: 'تمت إضافة نقاط وفاء طلبك بنجاح إلى رصيدك! 🎉',

    // Location / Contact
    locTitle: 'موقعنا وكيفية الوصول',
    locSubtitle: 'مباشرة على شاطئ الشابة، موقع متميز مع توفر أماكن مريحة لركن السيارات.',
    addressLabel: 'العنوان',
    hoursLabel: 'ساعات العمل',
    phoneLabel: 'الحجوزات والاستعلام',
    deliveryLabel: 'خدمة التوصيل السريع (ألو باية)',
    openEveryday: '7 أيام في الأسبوع دون انقطاع',
    getDirections: 'فتح الموقع في Google Maps',

    // Cart / Drawer
    cartTitle: 'طلبياتك وقائمتك المختارة',
    cartEmpty: 'القائمة فارغة حالياً. تصفح قائمتنا واختر ما تشتهيه من أطباق شهية!',
    cartTotal: 'المجموع التقديري:',
    cartTakeawayBtn: 'طلب للاستلام من المطعم (Casino Chebba)',
    cartDeliveryBtn: 'طلب ديلفري للمنزل (Allo Baya)',
    clearCart: 'مسح القائمة',

    // Footer
    footerDesc: 'المطعم والمقهى الأبرز على شاطئ الشابة (المهدية). طزاجة بحرية، بيتزا أصيلة وضيافة تونسية راقية.',
    quickLinks: 'روابط سريعة',
    legalNotice: '© 2026 كازينو الشابة (Casino Chebba). جميع الحقوق محفوظة.',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('casino_chebba_lang') as Language;
    return saved === 'ar' || saved === 'fr' ? saved : 'fr';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('casino_chebba_lang', lang);
  };

  const toggleLanguage = () => {
    const nextLang = language === 'fr' ? 'ar' : 'fr';
    setLanguage(nextLang);
  };

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const t = (key: string): string => {
    return translations[language]?.[key] || translations['fr'][key] || key;
  };

  const isRTL = language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
