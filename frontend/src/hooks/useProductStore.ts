import { create } from "zustand";

interface ProductState {
  product: { name: string; price: string; amount: number; id: string | undefined };
  clear: () => void;
  setProduct: (name: string, price: string, amount: number, id: string) => void;
}

export const useProductStore = create<ProductState>((set) => ({
  product: { name: "", price: "", amount: 0, id: undefined },
  clear: () => set({ product: { name: "", price: "", amount: 0, id: undefined } }),
  setProduct: (name: string, price: string, amount: number, id: string) =>
    set({ product: { name, price, amount, id } }),
}));
