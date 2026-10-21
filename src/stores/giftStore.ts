import { create } from 'zustand';
import { Product } from '@/types/product';

interface GiftSlot {
  index: number;
  product: Product | null;
}

interface GiftStore {
  slots: GiftSlot[];
  selectedProduct: Product | null;
  selectProduct: (product: Product | null) => void;
  placeInSlot: (index: number) => void;
  removeFromSlot: (index: number) => void;
  reset: () => void;
  getTotalPrice: () => number;
}

const initialSlots: GiftSlot[] = Array.from({ length: 9 }, (_, i) => ({
  index: i,
  product: null,
}));

export const useGiftStore = create<GiftStore>((set, get) => ({
  slots: initialSlots,
  selectedProduct: null,

  selectProduct: (product) => set({ selectedProduct: product }),

  placeInSlot: (index) => {
    const { selectedProduct, slots } = get();
    if (!selectedProduct) return;

    const newSlots = [...slots];
    newSlots[index] = { index, product: selectedProduct };
    set({ slots: newSlots, selectedProduct: null });
  },

  removeFromSlot: (index) => {
    const newSlots = [...get().slots];
    newSlots[index] = { index, product: null };
    set({ slots: newSlots });
  },

  reset: () => set({ slots: initialSlots, selectedProduct: null }),

  getTotalPrice: () => {
    const { slots } = get();
    return slots.reduce((total, slot) => {
      return total + (slot.product?.price || 0);
    }, 0);
  },
}));
