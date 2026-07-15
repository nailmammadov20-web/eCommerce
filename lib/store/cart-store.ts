import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  productId: string;
  variantId?: string | null;
  name: string;
  variantName?: string | null;
  price: number;
  slug: string;
  quantity: number;
  maxStock: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, variantId?: string | null) => void;
  updateQuantity: (productId: string, variantId: string | null | undefined, quantity: number) => void;
  clear: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const items = get().items;
        const existing = items.find(
          (i) => i.productId === item.productId && (i.variantId ?? null) === (item.variantId ?? null),
        );
        if (existing) {
          set({
            items: items.map((i) =>
              i === existing ? { ...i, quantity: Math.min(i.quantity + item.quantity, i.maxStock) } : i,
            ),
          });
        } else {
          set({ items: [...items, item] });
        }
      },
      removeItem: (productId, variantId) => {
        set({
          items: get().items.filter(
            (i) => !(i.productId === productId && (i.variantId ?? null) === (variantId ?? null)),
          ),
        });
      },
      updateQuantity: (productId, variantId, quantity) => {
        set({
          items: get()
            .items.map((i) =>
              i.productId === productId && (i.variantId ?? null) === (variantId ?? null)
                ? { ...i, quantity: Math.max(1, Math.min(quantity, i.maxStock)) }
                : i,
            )
            .filter((i) => i.quantity > 0),
        });
      },
      clear: () => set({ items: [] }),
    }),
    { name: "volt-cart" },
  ),
);

export function cartItemCount(items: CartItem[]) {
  return items.reduce((sum, i) => sum + i.quantity, 0);
}

export function cartSubtotal(items: CartItem[]) {
  return items.reduce((sum, i) => sum + i.price * i.quantity, 0);
}
