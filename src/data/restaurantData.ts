import imgTerraceSea from '../assets/images/casino_chebba_terrace_sea_1786819269051.jpg';
import imgSeafoodPlatter from '../assets/images/casino_chebba_seafood_platter_1786819289870.jpg';
import imgWoodfirePizza from '../assets/images/casino_chebba_woodfire_pizza_1786819305012.jpg';
import imgEveningVibe from '../assets/images/casino_chebba_evening_vibe_1786819317834.jpg';
import imgDrinksCafe from '../assets/images/casino_chebba_drinks_cafe_1786819329629.jpg';
import imgFreshCatchGrill from '../assets/images/fresh_catch_seafood_grill_1786871684407.jpg';
import imgLiveSeafoodPan from '../assets/images/live_seafood_pan_1786871695415.jpg';
import imgDailyCatchDisplay from '../assets/images/daily_catch_display_1786871705812.jpg';

export interface MenuItem {
  id: string;
  category: 'seafood' | 'pizza' | 'pasta' | 'fastfood' | 'breakfast' | 'cafe_drinks' | 'dessert';
  nameFr: string;
  nameAr: string;
  descFr: string;
  descAr: string;
  price: number; // in TND
  image: string;
  isChefSpecial?: boolean;
  isPopular?: boolean;
  isFreshCatch?: boolean;
  tags?: string[];
}

export interface ReviewItem {
  id: string;
  name: string;
  dateFr: string;
  dateAr: string;
  rating: number;
  commentFr: string;
  commentAr: string;
  avatar: string;
  source: 'Google' | 'Facebook' | 'TripAdvisor';
  location: string;
}

export interface GalleryItem {
  id: string;
  titleFr: string;
  titleAr: string;
  category: 'terrace' | 'dishes' | 'drinks' | 'evening';
  image: string;
  facebookUrl?: string;
}

export interface InstagramPost {
  id: string;
  image: string;
  captionFr: string;
  captionAr: string;
  timeFr: string;
  timeAr: string;
  likes: number;
  comments: number;
  location: string;
  tags: string[];
  isStory?: boolean;
}

export const RESTAURANT_INFO = {
  name: 'Casino Chebba',
  nameAr: 'كازينو الشابة',
  type: 'Resto-Café & Fruits de Mer',
  typeAr: 'مطعم ومقهى وفواكه البحر',
  sloganFr: 'Une expérience gastronomique unique au bord de la mer',
  sloganAr: 'تجربة طهي فريدة على ضفاف البحر الأبيض المتوسط',
  subSloganFr: 'Saveurs méditerranéennes, poissons frais du jour et ambiance marine chaleureuse',
  subSloganAr: 'نكهات متوسطية، أسماك طازجة يومياً وأجواء بحرية أصيلة',
  phone: '+216 26 589 531',
  phoneClean: '21626589531',
  deliveryPartner: 'Allo Baya',
  deliveryPhone: '+216 23 783 745',
  deliveryPhoneClean: '21623783745',
  addressFr: 'La Plage, 5170 La Chebba, Gouvernorat de Mahdia, Tunisie',
  addressAr: 'شاطئ الشابة، 5170 الشابة، ولاية المهدية، تونس',
  hoursFr: 'Tous les jours : 11h00 – 00h00',
  hoursAr: 'يومياً : 11:00 صباحاً – 00:00 منتصف الليل',
  facebookUrl: 'https://www.facebook.com/KazynwAlshabtCasinoChebba',
  instagramHandle: '@casino_chebba',
  instagramUrl: 'https://www.instagram.com/explore/locations/casino-chebba',
  coordinates: {
    lat: 35.2372,
    lng: 11.1158,
  },
  rating: {
    score: 4.6,
    recommendationPercent: 74,
    totalReviews: 920,
  }
};

export const MENU_CATEGORIES = [
  { id: 'all', labelFr: 'Tout le Menu', labelAr: 'كامل القائمة', icon: 'Sparkles' },
  { id: 'seafood', labelFr: 'Poissons & Fruits de Mer', labelAr: 'الأسماك وفواكه البحر', icon: 'Fish' },
  { id: 'pizza', labelFr: 'Pizzas (N°1 à Chebba)', labelAr: 'البيتزا (الأولى بالشابة)', icon: 'Pizza' },
  { id: 'pasta', labelFr: 'Pâtes & Spécialités', labelAr: 'المعكرونة والأطباق', icon: 'UtensilsCrossed' },
  { id: 'fastfood', labelFr: 'Burgers & Fast-Food', labelAr: 'البرغر والوجبات السريعة', icon: 'Sandwich' },
  { id: 'breakfast', labelFr: 'Petit-Déjeuner & Brunch', labelAr: 'فطور الصباح والبرانش', icon: 'Croissant' },
  { id: 'cafe_drinks', labelFr: 'Café & Boissons Fraîches', labelAr: 'المقهى والمشروبات الطازجة', icon: 'Coffee' },
  { id: 'dessert', labelFr: 'Desserts & Gourmandises', labelAr: 'الحلويات والتحلية', icon: 'IceCream' },
];

export const MENU_ITEMS: MenuItem[] = [
  // --- SEAFOOD ---
  {
    id: 'sea-1',
    category: 'seafood',
    nameFr: 'Salade Casino Signature',
    nameAr: 'سلطة كازينو الخاصة',
    descFr: 'Calamars tendres braisés, moules fraîches locales, crevettes sautées, mesclun croquant et vinaigrette citronnée à l’huile d’olive vierge.',
    descAr: 'حبار طري مشوي، بلح بحر طازج محلي، قريدس مطهو، خضار مقرمشة مع صلصة ليمون وزيت زيتون بكر.',
    price: 26.0,
    image: imgSeafoodPlatter,
    isChefSpecial: true,
    isPopular: true,
    tags: ['Signature', 'Fruits de Mer', 'Frais']
  },
  {
    id: 'sea-2',
    category: 'seafood',
    nameFr: 'Poisson du Jour Grillé (Karradh / Daurade)',
    nameAr: 'سمك اليوم الطازج مشوي (قراد / وراطة)',
    descFr: 'Pêche locale du jour cuite au feu de bois avec herbes aromatiques, servie avec salade méchouia tunisienne, frites dorées et sauces maison.',
    descAr: 'صيد اليوم من بحر الشابة مشوي على الفحم مع أعشاب عطرية، يقدم مع سلطة مشوية تونسية، بطاطا مقلية وصلصات منزلية.',
    price: 34.0,
    image: imgSeafoodPlatter,
    isChefSpecial: true,
    isFreshCatch: true,
    isPopular: true,
    tags: ['Pêche du Jour', 'Grillade', 'Traditionnel']
  },
  {
    id: 'sea-3',
    category: 'seafood',
    nameFr: 'Spaghetti aux Fruits de Mer Casino',
    nameAr: 'سباغيتي فواكه البحر الفاخرة',
    descFr: 'Pâtes al dente nappées d’une sauce tomate mijotée aux fruits de mer généreux : crevettes royales, calamars et moules de la côte.',
    descAr: 'معكرونة سباغيتي بصلصة الطماطم الغنية بفواكه البحر المتنوعة: جمبري ملكي، حبار وبلح البحر من السواحل التونسية.',
    price: 29.0,
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
    isChefSpecial: true,
    isPopular: true,
    tags: ['Signature', 'Pâtes', 'Généreux']
  },
  {
    id: 'sea-4',
    category: 'seafood',
    nameFr: 'Calamars Dorés & Croustillants',
    nameAr: 'حبار مقرمش ذهبي متبل',
    descFr: 'Rondelles de calamars frais panés façon méditerranéenne, sauce tartare maison et quartier de citron frais.',
    descAr: 'حلقات حبار طازجة مقرمشة بالتتبيلة المتوسطية الخاصة مع صلصة التارتار وشريحة ليمون.',
    price: 24.0,
    image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80',
    isPopular: true,
    tags: ['Croustillant', 'Mer']
  },
  {
    id: 'sea-5',
    category: 'seafood',
    nameFr: 'Crevettes Sautées à l’Ail & Piment Doux',
    nameAr: 'جمبري مشوح بالثوم والفلفل وزيت الزيتون',
    descFr: 'Crevettes marinées poêlées à l’huile d’olive extra vierge, ail émincé, coriandre fraîche et touche de harissa douce.',
    descAr: 'جمبري طازج مقلي بزيت الزيتون البكر مع الثوم، الكزبرة الخضراء ولمسة هريسة حلوة خفيفة.',
    price: 32.0,
    image: 'https://images.unsplash.com/photo-1559742811-822873691df8?auto=format&fit=crop&w=800&q=80',
    tags: ['Fruits de Mer', 'Piquant doux']
  },
  {
    id: 'sea-6',
    category: 'seafood',
    nameFr: 'Gargoulette de Poisson à la Chebbienne',
    nameAr: 'قلة السمك على الطريقة الشابية',
    descFr: 'Plat traditionnel mijoté dans sa gargoulette en terre cuite avec poisson noble, légumes fondants et épices du pays.',
    descAr: 'طبق تقليدي مطهو على نار هادئة في الفخار مع سمك طازج، خضروات وتوابل تونسية أصيلة.',
    price: 38.0,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    isChefSpecial: true,
    tags: ['Spécialité Locale', 'Sur commande']
  },
  {
    id: 'sea-7',
    category: 'seafood',
    nameFr: 'Ojja Tunisienne aux Fruits de Mer & Œufs',
    nameAr: 'عجة تونسية بفواكه البحر والجمبري والبيض',
    descFr: 'Sauce tomate pimentée aux poivrons confits, ail, carvi, garnie de crevettes, calamars et œufs pochés à point.',
    descAr: 'صلصة طماطم متبلة مع فلفل حلو، ثوم، كروية، غنية بالجمبري والحبار والبيض.',
    price: 25.0,
    image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=800&q=80',
    isPopular: true,
    tags: ['Traditionnel', 'Épicé']
  },
  {
    id: 'sea-8',
    category: 'seafood',
    nameFr: 'Riz aux Fruits de Mer à la Chebbienne',
    nameAr: 'أرز بفواكه البحر على الطريقة الشابية',
    descFr: 'Riz safrané parfumé aux herbes méditerranéennes, calamars, crevettes décortiquées et moules de la côte.',
    descAr: 'أرز متبل بالزعفران والأعشاب المتوسطية، حبار، جمبري وبلح البحر من السواحل.',
    price: 28.0,
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
    tags: ['Généreux', 'Mer']
  },

  // --- PIZZAS (N°1 À CHEBBA) ---
  {
    id: 'piz-1',
    category: 'pizza',
    nameFr: 'Pizza Fruits de Mer Royale',
    nameAr: 'بيتزا فواكه البحر الملكية',
    descFr: 'Sauce tomate San Marzano maison, mozzarella fondante, calamars marinés, crevettes, moules, origan sauvage et olives noires.',
    descAr: 'صلصة طماطم منزلية، جبن موزاريلا إيطالي، حبار، جمبري، بلح البحر، زعتر بري وزيتون أسود.',
    price: 23.0,
    image: imgWoodfirePizza,
    isChefSpecial: true,
    isPopular: true,
    tags: ['Best-seller', 'Pizza N°1']
  },
  {
    id: 'piz-2',
    category: 'pizza',
    nameFr: 'Pizza Casino Spéciale',
    nameAr: 'بيتزا كازينو الخاصة',
    descFr: 'Crème fraîche légère, mozzarella, émincé de poulet fumé, champignons frais, gorgonzola et filet d’huile au piment doux.',
    descAr: 'كريمة خفيفة، موزاريلا، دجاج مدخن، فطر طازج، جبن غورغونزولا وزيت الفلفل العطري.',
    price: 21.0,
    image: imgWoodfirePizza,
    isPopular: true,
    tags: ['Gourmande']
  },
  {
    id: 'piz-3',
    category: 'pizza',
    nameFr: 'Pizza Neptune (Thon & Câpres)',
    nameAr: 'بيتزا نبتون (تونة وكبّار)',
    descFr: 'Sauce tomate savoureuse, mozzarella, thon tunisien de premier choix, câpres, olives noires et œuf poché.',
    descAr: 'صلصة طماطم، موزاريلا، تونة تونسية فاخرة، كبار، زيتون وبيضة مسلوقة حسب الطلب.',
    price: 18.0,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80',
    isPopular: true,
    tags: ['Classique Tunisien']
  },
  {
    id: 'piz-4',
    category: 'pizza',
    nameFr: 'Pizza 4 Fromages d’Italie',
    nameAr: 'بيتزا الأجبان الأربعة',
    descFr: 'Sauce tomate ou base blanche, Mozzarella fior di latte, Gorgonzola crémeux, Emmental doux et copeaux de Parmesan.',
    descAr: 'موزاريلا طازجة، غورغونزولا، جبن إيمنتال وجبن بارميزان إيطالي.',
    price: 19.5,
    image: 'https://images.unsplash.com/photo-1573821663912-569905455b1c?auto=format&fit=crop&w=800&q=80',
    tags: ['Fromage', 'Végétarien']
  },
  {
    id: 'piz-5',
    category: 'pizza',
    nameFr: 'Pizza Reine (Regina)',
    nameAr: 'بيتزا ريجينا الفاخرة',
    descFr: 'Sauce tomate parfumée, mozzarella fondante, jambon de dinde fumé de qualité, champignons frais émincés et origan.',
    descAr: 'صلصة طماطم، موزاريلا، ديك رومي مدخن، فطر طازج وزعتر بري.',
    price: 17.5,
    image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=800&q=80',
    tags: ['Classique']
  },
  {
    id: 'piz-6',
    category: 'pizza',
    nameFr: 'Pizza Calzone Soufflée Farcie',
    nameAr: 'بيتزا كالتزوني مغلقة محشوة',
    descFr: 'Chausson de pâte croustillante farci de mozzarella filante, jambon de dinde, sauce tomate, ricotta et jaune d’œuf coulant.',
    descAr: 'عجينة بيتزا مقرمشة ومحشوة بالموزاريلا، ديك رومي، صلصة طماطم، ريكوتا وصفار بيض.',
    price: 19.0,
    image: 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&w=800&q=80',
    tags: ['Calzone', 'Gourmand']
  },
  {
    id: 'piz-7',
    category: 'pizza',
    nameFr: 'Pizza Pepperoni & Piment Doux',
    nameAr: 'بيتزا بيبيروني حارة خفيفة',
    descFr: 'Sauce tomate San Marzano, mozzarella abondante, fines tranches de pepperoni bœuf croustillant et origan.',
    descAr: 'صلصة طماطم، جبن موزاريلا وفير، شرائح بيبيروني لحم بقري مقرمشة وزعتر.',
    price: 18.5,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80',
    isPopular: true,
    tags: ['Pepperoni', 'Classique']
  },
  {
    id: 'piz-8',
    category: 'pizza',
    nameFr: 'Pizza Margherita Classica Fior di Latte',
    nameAr: 'بيتزا مارغريتا كلاسيكية بالريحان',
    descFr: 'Pur coulis de tomate San Marzano, mozzarella fraîche fondante, basilic du jardin et filet d’huile d’olive vierge.',
    descAr: 'صلصة طماطم طازجة، جبن موزاريلا، ريحان طازج وزيت زيتون بكر.',
    price: 14.0,
    image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=800&q=80',
    tags: ['Végétarien', 'Classique']
  },

  // --- PASTAS ---
  {
    id: 'pas-1',
    category: 'pasta',
    nameFr: 'Tagliatelles Saumon & Crevettes',
    nameAr: 'تالياتيلي السلمون والجمبري',
    descFr: 'Tagliatelles fraîches artisanales, morceaux de saumon fondant, crevettes roses, crème veloutée à l’aneth et zestes de citron.',
    descAr: 'معكرونة تالياتيلي طازجة مع قطع السلمون الوردي، الجمبري، كريمة الشبت ولمسة ليمون منعشة.',
    price: 27.0,
    image: 'https://images.unsplash.com/photo-1621996346565-e3d5d628169b?auto=format&fit=crop&w=800&q=80',
    isPopular: true,
    tags: ['Pâtes Fraîches', 'Saumon']
  },
  {
    id: 'pas-2',
    category: 'pasta',
    nameFr: 'Penne Poulet & Champignons Alfredo',
    nameAr: 'بيني بالدجاج والفطر صلصة ألفريدو',
    descFr: 'Penne italiennes enrobées d’une onctueuse sauce crème au parmesan, filets de poulet grillé et champignons de Paris.',
    descAr: 'بيني مع صلصة ألفريدو الغنية بالجبن، شرائح دجاج مشوية وفطر طازج.',
    price: 21.0,
    image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=800&q=80',
    tags: ['Crème', 'Poulet']
  },
  {
    id: 'pas-3',
    category: 'pasta',
    nameFr: 'Spaghetti Bolognaise Maison au Pur Bœuf',
    nameAr: 'سباغيتي بولونيز بلحم البقر المفروم والصلصة',
    descFr: 'Viande de bœuf mijotée lentement aux herbes de Provence, concassé de tomates fraîches et copeaux de parmesan.',
    descAr: 'لحم بقري مفروم مطبوخ على نار هادئة مع الطماطم الطازجة والأعشاب وجبن البارميزان.',
    price: 18.5,
    image: 'https://images.unsplash.com/photo-1621996346565-e3d5d628169b?auto=format&fit=crop&w=800&q=80',
    tags: ['Classique', 'Viande']
  },

  // --- FAST FOOD & BURGERS ---
  {
    id: 'ff-1',
    category: 'fastfood',
    nameFr: 'Chebba Smash Burger Gourmet',
    nameAr: 'برغر كازينو الشابة غورميه',
    descFr: 'Double steak de bœuf pur haché minute, cheddar affiné fondu, oignons caramélisés, sauce secrète Casino, pain brioché artisanal + frites.',
    descAr: 'شريحتان من لحم البقر الطازج، جبن شيدر ذائب، بصل مكرمل، صلصة كازينو السرية، خبز بريوش فاخر مع بطاطا مقلية.',
    price: 18.5,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    isPopular: true,
    tags: ['Gourmet', 'Frites incluses']
  },
  {
    id: 'ff-2',
    category: 'fastfood',
    nameFr: 'Crispy Chicken Burger',
    nameAr: 'برغر الدجاج المقرمش الحار',
    descFr: 'Filet de poulet croustillant mariné aux épices, salade iceberg, tomates fraîches, sauce ranch piquante, servi avec frites.',
    descAr: 'صدر دجاج مقرمش متبل، خس، طماطم وصلصة الرانش المتبلة، مع بطاطا مقلية.',
    price: 16.5,
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=800&q=80',
    tags: ['Crispy', 'Poulet']
  },
  {
    id: 'ff-3',
    category: 'fastfood',
    nameFr: 'Makloub Tunisien Spécial Casino',
    nameAr: 'مقلوب تونسي فاخر بالدجاج المتبل',
    descFr: 'Pâte à pain fraîche cuite à la commande, garnie d’émincé de poulet épicé, salade méchouia, frites, mozzarella et sauces au choix.',
    descAr: 'عجينة طازجة مخبوزة على الطلب محشوة بدجاج متبل، سلطة مشوية، بطاطا مقلية، جبن وصلصات حسب الرغبة.',
    price: 12.0,
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80',
    isPopular: true,
    tags: ['Spécialité Tunisienne', 'Best-seller']
  },
  {
    id: 'ff-4',
    category: 'fastfood',
    nameFr: 'Baguette Farcie au Poulet & Fromage Fondant',
    nameAr: 'باقات فارسي محشوة بالدجاج والجبن الساخن',
    descFr: 'Pain croustillant artisanal garni de poulet mariné, salade méchouia, mozzarella filante, frites et sauce gruyère.',
    descAr: 'خبز باقات مقرمش محشو بالدجاج المتبل، سلطة مشوية، جبن موزاريلا ذائب، بطاطا وصلصة خاصة.',
    price: 11.5,
    image: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=800&q=80',
    isPopular: true,
    tags: ['Baguette Farcie', 'Chaud']
  },
  {
    id: 'ff-5',
    category: 'fastfood',
    nameFr: 'Tacos Double Poulet & Sauce Fromagère',
    nameAr: 'تاكوس دبل بالدجاج المتبل وصلصة الجبن',
    descFr: 'Galette toastée généreuse garnie d’escalope marinée, frites, sauce fromagère maison onctueuse et cheddar.',
    descAr: 'خبز تاكوس محمص ومحشو بشرائح الدجاج، بطاطا مقلية وصلصة الجبن المنزلية والشيدر.',
    price: 15.5,
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80',
    tags: ['Tacos', 'Généreux']
  },
  {
    id: 'ff-6',
    category: 'fastfood',
    nameFr: 'Tacos Mexicain Viande Hachée Épicée',
    nameAr: 'تاكوس مكسيكي بلحم البقر المفروم المتبل',
    descFr: 'Viande hachée pur bœuf assaisonnée au cumin et paprika doux, frites, sauce samouraï et double mozzarella.',
    descAr: 'لحم بقري مفروم متبل بالكمون والبابريكا، بطاطا مقلية، صلصة ساموراي وموزاريلا مزدوجة.',
    price: 16.0,
    image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=800&q=80',
    tags: ['Tacos', 'Viande']
  },
  {
    id: 'ff-7',
    category: 'fastfood',
    nameFr: 'Sandwich Libanais Escalope & Cheddar',
    nameAr: 'سندويتش لبناني إسكالوب وجبن شيدر',
    descFr: 'Pain libanais fin roulé, escalope de poulet grillée, méchouia, frites, cornichons et sauce blanche à l’ail.',
    descAr: 'خبز لبناني رقيق ملفوف مع إسكالوب دجاج مشوي، مشوية، بطاطا وصلصة الثومية.',
    price: 10.5,
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&q=80',
    tags: ['Libanais', 'Léger']
  },
  {
    id: 'ff-8',
    category: 'fastfood',
    nameFr: 'Cornet Croustillant Poulet & Frites',
    nameAr: 'كورني مقرمش بالدجاج والبطاطا والصلصات',
    descFr: 'Pâte à cornet dorée farcie de tenders de poulet croustillants, salade fraîche, frites et duo de sauces.',
    descAr: 'عجينة كورني مقرمشة محشوة بقطع دجاج كرسبي، بطاطا وصلصات لذيذة.',
    price: 12.5,
    image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=800&q=80',
    tags: ['Cornet', 'Croustillant']
  },

  // --- BREAKFAST ---
  {
    id: 'bf-1',
    category: 'breakfast',
    nameFr: 'Formule Petit-Déjeuner Casino Vue Mer',
    nameAr: 'فطور الصباح الملكي إطلالة على البحر',
    descFr: 'Café ou thé au choix, jus d’orange pressé frais, viennoiserie chaude, toasts, beurre, confiture locale, miel, œufs au plat et fromage frais.',
    descAr: 'قهوة أو شاي حسب الاختيار، عصير برتقال طبيعي طازج، كرواسون ساخن، توست، زبدة، مربى، عسل، بيض وجبن طازج.',
    price: 14.5,
    image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=800&q=80',
    isChefSpecial: true,
    isPopular: true,
    tags: ['Matin', 'Vue Plage']
  },
  {
    id: 'bf-2',
    category: 'breakfast',
    nameFr: 'Pancakes Maison au Miel & Fruits Frais',
    nameAr: 'بان كيك منزلي بالعسل والفواكه الطازجة',
    descFr: 'Pile de pancakes moelleux faits maison, nappés de miel pur de fleurs, fruits de saison coupés et éclats de noisettes.',
    descAr: 'طبقات بان كيك هشة محضرة في المكان مع عسل طبيعي وفواكه الموسم الطازجة ومكسرات.',
    price: 11.0,
    image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=800&q=80',
    tags: ['Sucré', 'Brunch']
  },

  // --- CAFE & DRINKS ---
  {
    id: 'dr-1',
    category: 'cafe_drinks',
    nameFr: 'Citronnade Tunisienne Fraîche aux Amandes',
    nameAr: 'ليموناضة تونسية طازجة باللوز المرحي',
    descFr: 'Citrons frais pressés à la menthe, sucre de canne léger et poudre d’amandes torréfiées de Chebba.',
    descAr: 'عصير ليمون طازج بالنعناع مع لوز مرحي محمص من خيرات الشابة.',
    price: 7.5,
    image: imgDrinksCafe,
    isChefSpecial: true,
    isPopular: true,
    tags: ['Fraîcheur', 'Traditionnel']
  },
  {
    id: 'dr-2',
    category: 'cafe_drinks',
    nameFr: 'Mojito Virgin Plage (Menthe & Citron Vert)',
    nameAr: 'موهيتو الشاطئ المنعش بالنعناع والليمون',
    descFr: 'Feuilles de menthe fraîche pilées, quartier de citron vert, glace pilée et eau gazeuse rafraîchissante.',
    descAr: 'نعناع أخضر طازج، ليمون حامض، ثلج مجروش ومياه غازية منعشة.',
    price: 8.5,
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
    isPopular: true,
    tags: ['Mocktail', 'Plage']
  },
  {
    id: 'dr-3',
    category: 'cafe_drinks',
    nameFr: 'Thé à la Menthe & Pignons Grillés',
    nameAr: 'شاي تونسي بالنعناع والبندق المحمص',
    descFr: 'Thé vert infusé à la menthe fraîche selon la tradition tunisienne, servi bien chaud avec généreuse poignée de pignons dorés.',
    descAr: 'شاي أخضر أصيل بالنعناع الطازج يقدم ساخناً مع حبات البندق المحمصة.',
    price: 6.5,
    image: imgDrinksCafe,
    tags: ['Traditionnel', 'Chaud']
  },
  {
    id: 'dr-4',
    category: 'cafe_drinks',
    nameFr: 'Café Espresso Italien / Capucin',
    nameAr: 'قهوة إسبريسو إيطالية / كابوتشينو',
    descFr: 'Sélection de grains arabica de haute qualité, crème onctueuse et saveur intense.',
    descAr: 'حبوب أرابيكا فاخرة برغوة غنية ونكهة إيطالية أصيلة.',
    price: 3.5,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    tags: ['Café']
  },

  // --- DESSERTS ---
  {
    id: 'des-1',
    category: 'dessert',
    nameFr: 'Fondant au Chocolat Coulant & Glace Vanille',
    nameAr: 'فوندان الشوكولاتة الذائبة مع آيس كريم فانيليا',
    descFr: 'Gâteau moelleux au chocolat noir cœur coulant, servi avec une boule de glace artisanale à la vanille de Madagascar.',
    descAr: 'كيك الشوكولاتة الداكنة الساخنة مع قلب ذائب وآيس كريم فانيليا.',
    price: 11.5,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    isPopular: true,
    tags: ['Gourmand', 'Chocolat']
  },
  {
    id: 'des-2',
    category: 'dessert',
    nameFr: 'Coupe Glacée Casino Royale',
    nameAr: 'كوب آيس كريم كازينو رويال',
    descFr: '3 boules de glaces artisanales (Pistache, Chocolat, Fraise), chantilly maison, amandes grillées et coulis de fruits rouges.',
    descAr: 'ثلاث كرات آيس كريم (فستق، شوكولاتة، فراولة) مع كريمة شانتيه ومكسرات وصلصة فواكه.',
    price: 10.0,
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80',
    tags: ['Glace', 'Rafraîchissant']
  }
];

export const REVIEWS_DATA: ReviewItem[] = [
  {
    id: 'rev-1',
    name: 'Karim Ben Mansour',
    dateFr: 'Il y a 2 semaines',
    dateAr: 'منذ أسبوعين',
    rating: 5,
    commentFr: 'Meilleur restaurant à La Chebba sans hésitation ! La Salade Casino est un délice avec les calamars très tendres, et la vue sur la mer au coucher du soleil est magique. Équipe très accueillante.',
    commentAr: 'أفضل مطعم في الشابة بدون منازع! سلطة كازينو روعة والحبار طري جداً، وإطلالة البحر وقت الغروب خيالية. خدمة ممتازة واستقبال راقي.',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    source: 'Google',
    location: 'Mahdia, Tunisie'
  },
  {
    id: 'rev-2',
    name: 'Sarra Trabelsi',
    dateFr: 'Il y a 1 mois',
    dateAr: 'منذ شهر',
    rating: 5,
    commentFr: 'Les pizzas sont incroyables, pâte fine et croustillante, fruits de mer très frais. On a commandé via Allo Baya et la livraison était ultra rapide et bien chaude !',
    commentAr: 'البيتزا ممتازة جداً وعجينتها خفيفة ومقرمشة وفواكه البحر طازجة. طلبنا توصيل عبر ألو باية ووصل الطلب سريعاً وساخناً!',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    source: 'Facebook',
    location: 'Sfax, Tunisie'
  },
  {
    id: 'rev-3',
    name: 'Mohamed Ali Chaabane',
    dateFr: 'Il y a 3 semaines',
    dateAr: 'منذ 3 أسابيع',
    rating: 5,
    commentFr: 'Le poisson du jour (Karradh) grillé était d’une fraîcheur exceptionnelle. La terrasse au bord de l’eau est l’endroit parfait pour un dîner en famille.',
    commentAr: 'سمك اليوم (القراد) مشوي طازج ولذيذ جداً. الجلسة في التراس على شاطئ البحر مريحة وهادئة للعائلات.',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80',
    source: 'Google',
    location: 'Tunis, Tunisie'
  },
  {
    id: 'rev-4',
    name: 'Emna Jerbi',
    dateFr: 'Il y a 2 mois',
    dateAr: 'منذ شهرين',
    rating: 5,
    commentFr: 'Citronnade aux amandes délicieuse et café au top le matin face aux vagues. Un rituel chaque été à Chebba !',
    commentAr: 'الليموناضة باللوز رائعة وفطور الصباح أمام أمواج البحر متعة خاصة. عنوان لا غنى عنه كل صيف في الشابة.',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
    source: 'TripAdvisor',
    location: 'Sousse, Tunisie'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    titleFr: 'Terrasse Vue Mer & Plage de La Chebba',
    titleAr: 'تراس بإطلالة مباشرة على شاطئ الشابة',
    category: 'terrace',
    image: imgTerraceSea,
    facebookUrl: 'https://www.facebook.com/KazynwAlshabtCasinoChebba'
  },
  {
    id: 'gal-2',
    titleFr: 'Plateau de Poissons & Salade Casino',
    titleAr: 'طبق سمك طازج وسلطة كازينو الغنية',
    category: 'dishes',
    image: imgSeafoodPlatter,
    facebookUrl: 'https://www.facebook.com/KazynwAlshabtCasinoChebba'
  },
  {
    id: 'gal-3',
    titleFr: 'Pizza Fruits de Mer Cuite au Feu de Bois',
    titleAr: 'بيتزا فواكه البحر في الفرن الحطبي',
    category: 'dishes',
    image: imgWoodfirePizza,
    facebookUrl: 'https://www.facebook.com/KazynwAlshabtCasinoChebba'
  },
  {
    id: 'gal-4',
    titleFr: 'Ambiance Soirée & Coucher de Soleil Doré',
    titleAr: 'أجواء مسائية ساحرة عند غروب الشمس',
    category: 'evening',
    image: imgEveningVibe,
    facebookUrl: 'https://www.facebook.com/KazynwAlshabtCasinoChebba'
  },
  {
    id: 'gal-5',
    titleFr: 'Grillade de Poisson Frais du Jour (Karradh & Daurade)',
    titleAr: 'سمك مشوي طازج من صيد بحر الشابة مع السلطة المشوية',
    category: 'dishes',
    image: imgSeafoodPlatter,
    facebookUrl: 'https://www.facebook.com/KazynwAlshabtCasinoChebba'
  },
  {
    id: 'gal-6',
    titleFr: 'Citronnade aux Amandes & Thé aux Pignons',
    titleAr: 'ليموناضة طبيعية باللوز وشاي تونسي بالبندق',
    category: 'drinks',
    image: imgDrinksCafe,
    facebookUrl: 'https://www.facebook.com/KazynwAlshabtCasinoChebba'
  }
];

// --- VIDEO GALLERY TYPES & DATA ---
export interface VideoItem {
  id: string;
  titleFr: string;
  titleAr: string;
  descFr: string;
  descAr: string;
  category: 'all' | 'terrace' | 'seafood' | 'pizza' | 'atmosphere';
  videoUrl: string;
  poster: string;
  duration: string;
  views: string;
  facebookPostUrl: string;
  isReel?: boolean;
}

export const VIDEO_ITEMS: VideoItem[] = [
  {
    id: 'vid-1',
    titleFr: 'La Terrasse Magique au Coucher du Soleil',
    titleAr: 'التراس الساحر وإطلالة الغروب على شاطئ الشابة',
    descFr: 'Vivez la sérénité des vagues de La Chebba depuis notre terrasse panoramique en front de mer.',
    descAr: 'عش سحر البحر وأمواج شاطئ الشابة من التراس البانورامي لكازينو الشابة.',
    category: 'terrace',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-waves-coming-to-the-beach-5016-large.mp4',
    poster: imgTerraceSea,
    duration: '0:32',
    views: '4.8k',
    facebookPostUrl: 'https://www.facebook.com/KazynwAlshabtCasinoChebba',
    isReel: true
  },
  {
    id: 'vid-2',
    titleFr: 'Grillade du Poisson Frais du Jour (Karradh)',
    titleAr: 'شواء سمك اليوم الطازج (القراد والوراطة) على الفحم',
    descFr: 'Pêche locale du jour cuite au feu de bois avec herbes aromatiques par nos maîtres grilladins.',
    descAr: 'صيد بحري طازج من شواطئ الشابة مشوي على الفحم بتتبيلة أعشاب متوسطية خاصة.',
    category: 'seafood',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-chef-cooking-in-the-kitchen-of-a-restaurant-42777-large.mp4',
    poster: imgSeafoodPlatter,
    duration: '0:45',
    views: '6.2k',
    facebookPostUrl: 'https://www.facebook.com/KazynwAlshabtCasinoChebba',
    isReel: true
  },
  {
    id: 'vid-3',
    titleFr: 'Pizza Fruits de Mer Royale en Direct du Four',
    titleAr: 'بيتزا فواكه البحر الملكية ساخنة من الفرن مباشرة',
    descFr: 'La pizza N°1 à La Chebba : pâte aérienne, mozzarella filante et fruits de mer généreux.',
    descAr: 'البيتزا الأولى في الشابة: عجينة هشة خفيفة، فواكه بحر طازجة وجبن موزاريلا ذائب.',
    category: 'pizza',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-chef-seasoning-a-fresh-pizza-42784-large.mp4',
    poster: imgWoodfirePizza,
    duration: '0:28',
    views: '8.1k',
    facebookPostUrl: 'https://www.facebook.com/KazynwAlshabtCasinoChebba',
    isReel: true
  },
  {
    id: 'vid-4',
    titleFr: 'Ambiance Soirée d’Été & Convivialité',
    titleAr: 'أجواء السهرات الصيفية واللمة العائلية بالبحر',
    descFr: 'Lumières chaleureuses, musique d’ambiance et service attentionné pour des souvenirs inoubliables.',
    descAr: 'أضواء دافئة، موسيقى هادئة وخدمة راقية لأحلى الذكريات مع العائلة والأصدقاء.',
    category: 'atmosphere',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-people-celebrating-at-a-fancy-dinner-party-42867-large.mp4',
    poster: imgEveningVibe,
    duration: '0:38',
    views: '3.9k',
    facebookPostUrl: 'https://www.facebook.com/KazynwAlshabtCasinoChebba',
    isReel: false
  },
  {
    id: 'vid-5',
    titleFr: 'Spaghetti Fruits de Mer & Calamars Dorés',
    titleAr: 'سباغيتي فواكه البحر وحبار مقرمش فاخر',
    descFr: 'Générosité et authenticité : sauce onctueuse mijotée aux trésors de la Méditerranée.',
    descAr: 'كرم النكهات البحرية: صلصة شهية مطبوخة بخيرات البحر الأبيض المتوسط.',
    category: 'seafood',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-pasta-cooking-in-a-pan-43407-large.mp4',
    poster: imgSeafoodPlatter,
    duration: '0:35',
    views: '5.5k',
    facebookPostUrl: 'https://www.facebook.com/KazynwAlshabtCasinoChebba',
    isReel: true
  },
  {
    id: 'vid-6',
    titleFr: 'Préparation de la Citronnade Fraîche aux Amandes',
    titleAr: 'تحضير الليموناضة الطبيعية الطازجة باللوز المرحي',
    descFr: 'Le secret de fraîcheur de Casino Chebba : citrons pressés minute et amandes locales torréfiées.',
    descAr: 'سر الانتعاش في كازينو الشابة: ليمون طبيعي مع اللوز التونسي المحمص.',
    category: 'atmosphere',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-cocktail-being-prepared-with-citrus-slices-42878-large.mp4',
    poster: imgDrinksCafe,
    duration: '0:25',
    views: '7.3k',
    facebookPostUrl: 'https://www.facebook.com/KazynwAlshabtCasinoChebba',
    isReel: true
  }
];

// --- LOYALTY CLUB TYPES & DATA ---
export interface LoyaltyTier {
  id: 'bronze' | 'silver' | 'gold' | 'vip';
  nameFr: string;
  nameAr: string;
  minPoints: number;
  color: string;
  badge: string;
  discountPercent: number;
  perksFr: string[];
  perksAr: string[];
}

export interface LoyaltyReward {
  id: string;
  titleFr: string;
  titleAr: string;
  descFr: string;
  descAr: string;
  pointsCost: number;
  valueTnd: number;
  image: string;
  category: 'drinks' | 'dessert' | 'discount' | 'food';
  codePrefix: string;
}

export const LOYALTY_TIERS: LoyaltyTier[] = [
  {
    id: 'bronze',
    nameFr: 'Club Bronze Marin',
    nameAr: 'نادي البرونز البحري',
    minPoints: 0,
    color: '#CD7F32',
    badge: '🥉',
    discountPercent: 0,
    perksFr: [
      'Accumulation de 10 pts par DT dépensé',
      '50 pts offerts par réservation en ligne',
      'Accès au catalogue de récompenses'
    ],
    perksAr: [
      'كسب 10 نقاط لكل دينار مستهلك',
      '50 نقطة هدية عند كل حجز طاولة عبر الموقع',
      'الوصول لدليل المكافآت الحصري'
    ]
  },
  {
    id: 'silver',
    nameFr: 'Club Argent Méditerranée',
    nameAr: 'نادي الفضة المتوسطي',
    minPoints: 300,
    color: '#A0AEC0',
    badge: '🥈',
    discountPercent: 5,
    perksFr: [
      '5% de réduction permanente sur l’addition',
      'Thé ou Café offert à chaque visite',
      'Table prioritaire en terrasse le weekend'
    ],
    perksAr: [
      'تخفيض دائم 5% على الفاتورة',
      'شاي أو قهوة مجانية في كل زيارة',
      'أولوية اختيار طاولة على التراس'
    ]
  },
  {
    id: 'gold',
    nameFr: 'Club Or Royal Chebba',
    nameAr: 'نادي الذهب الملكي',
    minPoints: 800,
    color: '#D4AF37',
    badge: '🥇',
    discountPercent: 10,
    perksFr: [
      '10% de réduction permanente',
      'Dessert Signature offert pour votre anniversaire',
      'Emplacement VIP réservé face au coucher de soleil'
    ],
    perksAr: [
      'تخفيض دائم 10% على كامل القائمة',
      'تحلية خاصة مجانية في عيد ميلادك',
      'طاولة VIP محجوزة أمام منظر الغروب'
    ]
  },
  {
    id: 'vip',
    nameFr: 'Club VIP Ambassadeur',
    nameAr: 'نادي كبار الشخصيات VIP',
    minPoints: 1500,
    color: '#6366F1',
    badge: '👑',
    discountPercent: 15,
    perksFr: [
      '15% de réduction exclusive',
      'Dégustation privée des nouveautés du Chef',
      'Livraison Allo Baya prioritaire offerte'
    ],
    perksAr: [
      'تخفيض حصري 15% على جميع الطلبات',
      'تذوق مجاني حصري لأطباق الشيف الجديدة',
      'أولوية التوصيل السريع مجاناً مع ألو باية'
    ]
  }
];

export const LOYALTY_REWARDS: LoyaltyReward[] = [
  {
    id: 'rew-1',
    titleFr: 'Café Espresso ou Thé à la Menthe & Pignons',
    titleAr: 'قهوة إسبريسو أو شاي بالنعناع والبندق',
    descFr: 'Boisson chaude offerte au choix lors de votre repas ou moment café.',
    descAr: 'مشروب ساخن مجاني من اختيارك عند زيارة كازينو الشابة.',
    pointsCost: 150,
    valueTnd: 6.5,
    image: imgDrinksCafe,
    category: 'drinks',
    codePrefix: 'TEA-PIN'
  },
  {
    id: 'rew-2',
    titleFr: 'Citronnade Tunisienne Fraîche aux Amandes',
    titleAr: 'ليموناضة تونسية طازجة باللوز المرحي',
    descFr: 'Notre boisson star rafraîchissante préparée aux citrons frais et amandes.',
    descAr: 'مشروبنا الشهير والمنعش بالليمون الطبيعي ولوز الشابة المحمص.',
    pointsCost: 200,
    valueTnd: 7.5,
    image: imgDrinksCafe,
    category: 'drinks',
    codePrefix: 'CITRON'
  },
  {
    id: 'rew-3',
    titleFr: 'Fondant au Chocolat Coulant ou Coupe Glacée',
    titleAr: 'فوندان الشوكولاتة الذائبة أو كوب آيس كريم',
    descFr: 'Un dessert gourmand fait maison pour clore votre repas en beauté.',
    descAr: 'تحلية فاخرة من اختيارك للاستمتاع بأحلى اللحظات أمام البحر.',
    pointsCost: 300,
    valueTnd: 11.5,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80',
    category: 'dessert',
    codePrefix: 'SWEET'
  },
  {
    id: 'rew-4',
    titleFr: 'Bon de Réduction 10 DT sur l’addition',
    titleAr: 'قسيمة تخفيض بقيمة 10 دنانير',
    descFr: 'Déductible immédiatement sur votre commande au restaurant ou en livraison.',
    descAr: 'خصم مباشر 10 دنانير على فاتورة طعامك بالمطعم أو التوصيل.',
    pointsCost: 400,
    valueTnd: 10.0,
    image: 'https://images.unsplash.com/photo-1556742049-0a67e55722c0?auto=format&fit=crop&w=600&q=80',
    category: 'discount',
    codePrefix: 'SAVE10'
  },
  {
    id: 'rew-5',
    titleFr: 'Pizza Neptune ou Regina Offerte',
    titleAr: 'بيتزا نبتون أو ريجينا مجانية من اختيارك',
    descFr: 'Savourez une délicieuse pizza artisanale croustillante de votre choix.',
    descAr: 'تذوق بيتزا مجانية طازجة ومقرمشة من أشهر أصنافنا.',
    pointsCost: 550,
    valueTnd: 18.0,
    image: imgWoodfirePizza,
    category: 'food',
    codePrefix: 'FREEPIZ'
  },
  {
    id: 'rew-6',
    titleFr: 'Salade Casino Signature aux Fruits de Mer',
    titleAr: 'سلطة كازينو الخاصة بفواكه البحر مجاناً',
    descFr: 'Notre célèbre salade marine généreuse aux calamars et crevettes.',
    descAr: 'سلطتنا الملكية الأشهر في الشابة بالحبار والجمبري الطازج.',
    pointsCost: 750,
    valueTnd: 26.0,
    image: imgSeafoodPlatter,
    category: 'food',
    codePrefix: 'SALAD-CAS'
  },
  {
    id: 'rew-7',
    titleFr: 'Bon Gourmand 30 DT ou Menu Poisson Royal',
    titleAr: 'قسيمة ملكية 30 د.ت أو طبق سمك اليوم الفاخر',
    descFr: 'L’expérience ultime : réduction de 30 DT ou poisson noble grillé du jour.',
    descAr: 'التجربة الأفخم: خصم 30 دينار أو وجبة سمك مشوي فاخر مع كافة الملحقات.',
    pointsCost: 1000,
    valueTnd: 34.0,
    image: imgSeafoodPlatter,
    category: 'discount',
    codePrefix: 'ROYAL30'
  }
];

export const INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: 'ig-1',
    image: imgFreshCatchGrill,
    captionFr: '🔥 Arrivage direct du port de La Chebba ce matin ! Daurade royale et Karradh grillés au feu de bois avec citron vert et huile d’olive vierge. Rien ne vaut la fraîcheur absolue face aux vagues.',
    captionAr: '🔥 صيد الصباح مباشرة من ميناء الشابة! وراطة وقراد مشوي على الفحم مع الليمون وزيت الزيتون البكر. طزاجة لا تقاوم أمام أمواج البحر.',
    timeFr: 'Il y a 2h',
    timeAr: 'منذ ساعتين',
    likes: 348,
    comments: 29,
    location: 'Casino Chebba • Plage de La Chebba',
    tags: ['#CasinoChebba', '#PêcheDuJour', '#PoissonsFrais', '#Chebba', '#GastronomieTunisienne'],
    isStory: true
  },
  {
    id: 'ig-2',
    image: imgLiveSeafoodPan,
    captionFr: '🍝 En direct des cuisines du Casino : notre fameuse poêle de pâtes aux fruits de mer fumante (Calamars dorés, crevettes géantes et moules fraîches locales). Une explosion de saveurs méditerranéennes !',
    captionAr: '🍝 مباشرة من مطبخ كازينو الشابة: مقلاة معكرونة فواكه البحر الساخنة والشهية (حبار طري، جمبري ملكي وبلح بحر طازج). نكهة ساحلية تونسية أصيلة!',
    timeFr: 'Il y a 5h',
    timeAr: 'منذ 5 ساعات',
    likes: 412,
    comments: 44,
    location: 'Casino Chebba • Cuisine & Terrasse',
    tags: ['#PastaSeafood', '#FruitsDeMer', '#ChebbaFood', '#MarmiteDuChef', '#CasinoResto'],
    isStory: false
  },
  {
    id: 'ig-3',
    image: imgDailyCatchDisplay,
    captionFr: '🌊 Sélection matinale de nos pêcheurs chebbiens sur lit de glace pilée. Choisissez vous-même votre poisson pour une cuisson sur mesure au barbecue ou au four.',
    captionAr: '🌊 تشكيلة الصيد الصباحي من بحارة الشابة على الثلج المجروش. اختر سمكتك المفضلة بنفسك ليتم شواؤها خصيصاً لك على الفحم أو في الفرن.',
    timeFr: 'Aujourd’hui 10:30',
    timeAr: 'اليوم 10:30',
    likes: 526,
    comments: 38,
    location: 'Casino Chebba • Front de Mer',
    tags: ['#PêcheLocale', '#Karradh', '#DauradeRoyale', '#LaChebba', '#FreshCatch'],
    isStory: true
  },
  {
    id: 'ig-4',
    image: imgSeafoodPlatter,
    captionFr: '👑 La Salade Signature Casino : généreuse, colorée et ultra fraîche. Le must absolu à déguster sous la brise marine estivale.',
    captionAr: '👑 سلطة كازينو الملكية الخاصة: كرم وجودة وطزاجة بحرية استثنائية. الطبق المفضل لرواد المطعم تحت نسيم البحر.',
    timeFr: 'Hier',
    timeAr: 'أمس',
    likes: 389,
    comments: 19,
    location: 'Casino Chebba • Terrasse Panoramique',
    tags: ['#SaladeCasino', '#SeafoodSalad', '#ChebbaBeach', '#FoodieTunisia'],
    isStory: false
  },
  {
    id: 'ig-5',
    image: imgTerraceSea,
    captionFr: '☀️ Votre table vous attend les pieds dans l’eau ! Venez savourer un café, un brunch ou un déjeuner complet les yeux plongés dans le grand bleu.',
    captionAr: '☀️ طاولتك بانتظارك بإطلالة ساحرة على مياه البحر! استمتع بفطور الصباح، القهوة أو غداء سمك فاخر في قلب الطبيعة.',
    timeFr: 'Il y a 2 jours',
    timeAr: 'منذ يومين',
    likes: 671,
    comments: 52,
    location: 'Plage de La Chebba, Mahdia',
    tags: ['#VueSurMer', '#TerrasseChebba', '#PlageTunisie', '#CasinoVibes'],
    isStory: false
  },
  {
    id: 'ig-6',
    image: imgEveningVibe,
    captionFr: '🌙 Les soirées féeriques à Casino Chebba : lumières douces, poissons grillés au crépuscule et cocktails rafraîchissants.',
    captionAr: '🌙 أمسيات كازينو الشابة الساحرة: إضاءة هادئة، أسماك مشوية عند الغروب ومشروبات منعشة مع العائلة والأصدقاء.',
    timeFr: 'Il y a 3 jours',
    timeAr: 'منذ 3 أيام',
    likes: 495,
    comments: 31,
    location: 'Casino Chebba Resto-Café',
    tags: ['#SunsetDinner', '#SoiréeMer', '#ChebbaNight', '#CasinoFamily'],
    isStory: false
  }
];

