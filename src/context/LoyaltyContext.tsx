import React, { createContext, useContext, useState, useEffect } from 'react';
import { LoyaltyReward, LOYALTY_REWARDS, LOYALTY_TIERS, LoyaltyTier } from '../data/restaurantData';

export interface LoyaltyUser {
  name: string;
  phone: string;
  email?: string;
  points: number;
  tierId: 'bronze' | 'silver' | 'gold' | 'vip';
  joinedDate: string;
  totalOrdersCount: number;
  totalReservationsCount: number;
}

export interface LoyaltyTransaction {
  id: string;
  type: 'earn_reservation' | 'earn_order' | 'welcome_bonus' | 'redeem';
  points: number; // positive for gain, negative for spend
  descFr: string;
  descAr: string;
  date: string;
  code?: string;
}

export interface ActiveVoucher {
  id: string;
  rewardId: string;
  code: string;
  titleFr: string;
  titleAr: string;
  descFr: string;
  descAr: string;
  pointsCost: number;
  valueTnd: number;
  category: 'drinks' | 'dessert' | 'food' | 'discount';
  dateCreated: string;
  isUsed: boolean;
}

interface LoyaltyContextType {
  user: LoyaltyUser | null;
  history: LoyaltyTransaction[];
  activeVouchers: ActiveVoucher[];
  isLoyaltyModalOpen: boolean;
  activeTab: 'rewards' | 'tiers' | 'history' | 'profile';
  currentTier: LoyaltyTier;
  toastMessage: string | null;
  openLoyaltyModal: (tab?: 'rewards' | 'tiers' | 'history' | 'profile') => void;
  closeLoyaltyModal: () => void;
  loginUser: (name: string, phone: string, email?: string) => void;
  logoutUser: () => void;
  earnPoints: (amount: number, descFr: string, descAr: string, type?: LoyaltyTransaction['type']) => void;
  redeemReward: (reward: LoyaltyReward) => { success: boolean; voucher?: ActiveVoucher; message?: string };
  markVoucherUsed: (voucherId: string) => void;
  showToast: (message: string) => void;
}

const LoyaltyContext = createContext<LoyaltyContextType | undefined>(undefined);

const USER_STORAGE_KEY = 'casino_chebba_loyalty_user_v1';
const HISTORY_STORAGE_KEY = 'casino_chebba_loyalty_history_v1';
const VOUCHERS_STORAGE_KEY = 'casino_chebba_loyalty_vouchers_v1';

export const LoyaltyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<LoyaltyUser | null>(() => {
    try {
      const saved = localStorage.getItem(USER_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [history, setHistory] = useState<LoyaltyTransaction[]>(() => {
    try {
      const saved = localStorage.getItem(HISTORY_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeVouchers, setActiveVouchers] = useState<ActiveVoucher[]>(() => {
    try {
      const saved = localStorage.getItem(VOUCHERS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isLoyaltyModalOpen, setIsLoyaltyModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'rewards' | 'tiers' | 'history' | 'profile'>('rewards');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to local storage
  useEffect(() => {
    if (user) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem(VOUCHERS_STORAGE_KEY, JSON.stringify(activeVouchers));
  }, [activeVouchers]);

  // Toast helper
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 4000);
  };

  // Tier calculation helper
  const calculateTierId = (pts: number): 'bronze' | 'silver' | 'gold' | 'vip' => {
    if (pts >= 1500) return 'vip';
    if (pts >= 800) return 'gold';
    if (pts >= 300) return 'silver';
    return 'bronze';
  };

  const currentTier = LOYALTY_TIERS.find((t) => t.id === (user?.tierId || 'bronze')) || LOYALTY_TIERS[0];

  const openLoyaltyModal = (tab?: 'rewards' | 'tiers' | 'history' | 'profile') => {
    if (tab) setActiveTab(tab);
    setIsLoyaltyModalOpen(true);
  };

  const closeLoyaltyModal = () => {
    setIsLoyaltyModalOpen(false);
  };

  const loginUser = (name: string, phone: string, email?: string) => {
    const isNew = !user;
    const initialPoints = isNew ? 100 : (user?.points ?? 100);
    const newTier = calculateTierId(initialPoints);

    const newUser: LoyaltyUser = {
      name: name.trim(),
      phone: phone.trim(),
      email: email?.trim(),
      points: initialPoints,
      tierId: newTier,
      joinedDate: user?.joinedDate || new Date().toISOString().split('T')[0],
      totalOrdersCount: user?.totalOrdersCount || 0,
      totalReservationsCount: user?.totalReservationsCount || 0,
    };

    setUser(newUser);

    if (isNew) {
      const welcomeTx: LoyaltyTransaction = {
        id: `tx-welcome-${Date.now()}`,
        type: 'welcome_bonus',
        points: 100,
        descFr: 'Cadeau de bienvenue Club Privilège',
        descAr: 'هدية ترحيبية بالانضمام لنادي كازينو الشابة',
        date: new Date().toLocaleDateString('fr-FR'),
      };
      setHistory((prev) => [welcomeTx, ...prev]);
      showToast('Bienvenue au Club Privilège ! +100 points offerts 🎁');
    } else {
      showToast(`Ravi de vous revoir, ${newUser.name} ! ⭐`);
    }
  };

  const logoutUser = () => {
    setUser(null);
    showToast('Vous avez été déconnecté du Club.');
  };

  const earnPoints = (amount: number, descFr: string, descAr: string, type: LoyaltyTransaction['type'] = 'earn_order') => {
    if (!user) {
      // Auto register temporary profile or silently queue
      return;
    }

    const updatedPoints = user.points + amount;
    const updatedTier = calculateTierId(updatedPoints);

    setUser({
      ...user,
      points: updatedPoints,
      tierId: updatedTier,
      totalReservationsCount: type === 'earn_reservation' ? user.totalReservationsCount + 1 : user.totalReservationsCount,
      totalOrdersCount: type === 'earn_order' ? user.totalOrdersCount + 1 : user.totalOrdersCount,
    });

    const newTx: LoyaltyTransaction = {
      id: `tx-${Date.now()}`,
      type,
      points: amount,
      descFr,
      descAr,
      date: new Date().toLocaleDateString('fr-FR'),
    };

    setHistory((prev) => [newTx, ...prev]);
    showToast(`+${amount} points crédités à votre compte Casino Chebba ! ✨`);
  };

  const redeemReward = (reward: LoyaltyReward): { success: boolean; voucher?: ActiveVoucher; message?: string } => {
    if (!user) {
      openLoyaltyModal('profile');
      return { success: false, message: 'Veuillez vous connecter pour débloquer cette récompense.' };
    }

    if (user.points < reward.pointsCost) {
      return { success: false, message: `Points insuffisants. Il vous manque ${reward.pointsCost - user.points} points.` };
    }

    const updatedPoints = user.points - reward.pointsCost;
    const updatedTier = calculateTierId(updatedPoints);

    const voucherCode = `${reward.codePrefix}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

    const newVoucher: ActiveVoucher = {
      id: `vouch-${Date.now()}`,
      rewardId: reward.id,
      code: voucherCode,
      titleFr: reward.titleFr,
      titleAr: reward.titleAr,
      descFr: reward.descFr,
      descAr: reward.descAr,
      pointsCost: reward.pointsCost,
      valueTnd: reward.valueTnd,
      category: reward.category,
      dateCreated: new Date().toLocaleDateString('fr-FR'),
      isUsed: false,
    };

    setUser({
      ...user,
      points: updatedPoints,
      tierId: updatedTier,
    });

    setActiveVouchers((prev) => [newVoucher, ...prev]);

    const redeemTx: LoyaltyTransaction = {
      id: `tx-redeem-${Date.now()}`,
      type: 'redeem',
      points: -reward.pointsCost,
      descFr: `Échange: ${reward.titleFr}`,
      descAr: `استبدال: ${reward.titleAr}`,
      date: new Date().toLocaleDateString('fr-FR'),
      code: voucherCode,
    };

    setHistory((prev) => [redeemTx, ...prev]);
    showToast(`Félicitations ! Récompense débloquée : ${reward.titleFr} 🎉`);

    return { success: true, voucher: newVoucher };
  };

  const markVoucherUsed = (voucherId: string) => {
    setActiveVouchers((prev) =>
      prev.map((v) => (v.id === voucherId ? { ...v, isUsed: true } : v))
    );
  };

  return (
    <LoyaltyContext.Provider
      value={{
        user,
        history,
        activeVouchers,
        isLoyaltyModalOpen,
        activeTab,
        currentTier,
        toastMessage,
        openLoyaltyModal,
        closeLoyaltyModal,
        loginUser,
        logoutUser,
        earnPoints,
        redeemReward,
        markVoucherUsed,
        showToast,
      }}
    >
      {children}
    </LoyaltyContext.Provider>
  );
};

export const useLoyalty = () => {
  const context = useContext(LoyaltyContext);
  if (!context) {
    throw new Error('useLoyalty must be used within a LoyaltyProvider');
  }
  return context;
};
