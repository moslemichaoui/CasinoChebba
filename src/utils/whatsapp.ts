import { RESTAURANT_INFO } from '../data/restaurantData';

export interface ReservationData {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  seating: string; // 'terrace' | 'indoor' | 'family' | 'sunset'
  notes?: string;
  voucherCode?: string;
}

export interface CartOrderItem {
  id: string;
  nameFr: string;
  nameAr: string;
  price: number;
  quantity: number;
}

/**
 * Generates WhatsApp URL for Table Reservation
 */
export function generateReservationWhatsAppUrl(
  data: ReservationData,
  lang: 'fr' | 'ar' = 'fr'
): string {
  const seatingLabelsFr: Record<string, string> = {
    terrace: '🌊 Terrasse Vue Mer (Bord de plage)',
    indoor: '❄️ Salle Intérieure Climatisée',
    family: '👨‍👩‍👧‍👦 Espace Famille Convivial',
    sunset: '🌅 Espace Lounge Coucher de Soleil',
  };

  const seatingLabelsAr: Record<string, string> = {
    terrace: '🌊 تراس بإطلالة مباشرة على شاطئ البحر',
    indoor: '❄️ قاعة داخلية مكيفة',
    family: '👨‍👩‍👧‍👦 فضاء عائلي مريح',
    sunset: '🌅 فضاء الغروب الخاص',
  };

  const seatingText =
    lang === 'ar'
      ? seatingLabelsAr[data.seating] || data.seating
      : seatingLabelsFr[data.seating] || data.seating;

  let message = '';

  if (lang === 'ar') {
    message = `السلام عليكم ورحمة الله،\n` +
      `أود تأكيد حجز طاولة في *كازينو الشابة (Casino Chebba)*:\n\n` +
      `👤 *الاسم:* ${data.name}\n` +
      `📞 *رقم الهاتف:* ${data.phone}\n` +
      `📅 *التاريخ:* ${data.date}\n` +
      `⏰ *الوقت:* ${data.time}\n` +
      `👥 *عدد الأشخاص:* ${data.guests} أشخاص\n` +
      `📍 *المكان المفضل:* ${seatingText}\n` +
      (data.voucherCode ? `🎁 *قسيمة نادي الوفاء:* ${data.voucherCode}\n` : '') +
      (data.notes ? `📝 *ملاحظات خاصة:* ${data.notes}\n` : '') +
      `\nشكراً لكم وبانتظار تأكيدكم الكريم.`;
  } else {
    message = `Bonjour Casino Chebba,\n` +
      `Je souhaite réserver une table chez *Casino Chebba* :\n\n` +
      `👤 *Nom :* ${data.name}\n` +
      `📞 *Téléphone :* ${data.phone}\n` +
      `📅 *Date :* ${data.date}\n` +
      `⏰ *Heure :* ${data.time}\n` +
      `👥 *Nombre de personnes :* ${data.guests}\n` +
      `📍 *Emplacement souhaité :* ${seatingText}\n` +
      (data.voucherCode ? `🎁 *Code Privilège Fidélité :* ${data.voucherCode}\n` : '') +
      (data.notes ? `📝 *Remarques :* ${data.notes}\n` : '') +
      `\nMerci de bien vouloir me confirmer la disponibilité.`;
  }

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${RESTAURANT_INFO.phoneClean}?text=${encodedMessage}`;
}

/**
 * Generates WhatsApp URL for Food Takeaway / Delivery Order
 */
export function generateOrderWhatsAppUrl(
  items: CartOrderItem[],
  orderType: 'takeaway' | 'delivery' = 'takeaway',
  customerInfo: { name: string; phone: string; address?: string; notes?: string; voucherCode?: string; discountTnd?: number },
  lang: 'fr' | 'ar' = 'fr'
): string {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = customerInfo.discountTnd || 0;
  const finalTotal = Math.max(0, subtotal - discount);

  let message = '';

  if (lang === 'ar') {
    message = `السلام عليكم،\n` +
      `طلب جديد من قائمة *كازينو الشابة (Casino Chebba)* ${orderType === 'delivery' ? '(توصيل عبر ألو باية)' : '(استلام من المطعم)'}:\n\n` +
      `👤 *الزبون:* ${customerInfo.name}\n` +
      `📞 *الهاتف:* ${customerInfo.phone}\n` +
      (orderType === 'delivery' && customerInfo.address ? `📍 *عنوان التوصيل (الشابة):* ${customerInfo.address}\n` : '') +
      `\n🍽️ *تفاصيل الطلب:*\n`;

    items.forEach((item, index) => {
      message += `${index + 1}. ${item.nameAr} × ${item.quantity} = ${(item.price * item.quantity).toFixed(1)} د.ت\n`;
    });

    message += `\n💰 *المجموع التقديري:* ${subtotal.toFixed(1)} د.ت\n`;
    if (customerInfo.voucherCode) {
      message += `🎁 *قسيمة نادي الوفاء:* ${customerInfo.voucherCode} (-${discount.toFixed(1)} د.ت)\n`;
      message += `💎 *المجموع الصافي:* ${finalTotal.toFixed(1)} دينار تونسي\n`;
    }
    if (customerInfo.notes) message += `📝 *ملاحظات:* ${customerInfo.notes}\n`;
    message += `\nالرجاء تأكيد استلام الطلب وتجهيزه. شكراً!`;
  } else {
    message = `Bonjour,\n` +
      `Nouvelle commande pour *Casino Chebba* ${orderType === 'delivery' ? '(Livraison Allo Baya)' : '(À emporter)'} :\n\n` +
      `👤 *Client :* ${customerInfo.name}\n` +
      `📞 *Téléphone :* ${customerInfo.phone}\n` +
      (orderType === 'delivery' && customerInfo.address ? `📍 *Adresse de livraison (La Chebba) :* ${customerInfo.address}\n` : '') +
      `\n🍽️ *Détails de la commande :*\n`;

    items.forEach((item, index) => {
      message += `${index + 1}. ${item.nameFr} × ${item.quantity} = ${(item.price * item.quantity).toFixed(1)} DT\n`;
    });

    message += `\n💰 *Sous-total :* ${subtotal.toFixed(1)} DT\n`;
    if (customerInfo.voucherCode) {
      message += `🎁 *Code Privilège Appliqué :* ${customerInfo.voucherCode} (-${discount.toFixed(1)} DT)\n`;
      message += `💎 *Total Net :* ${finalTotal.toFixed(1)} TND\n`;
    }
    if (customerInfo.notes) message += `📝 *Instructions :* ${customerInfo.notes}\n`;
    message += `\nMerci de confirmer la commande.`;
  }

  const phoneTarget = orderType === 'delivery' ? RESTAURANT_INFO.deliveryPhoneClean : RESTAURANT_INFO.phoneClean;
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneTarget}?text=${encodedMessage}`;
}
