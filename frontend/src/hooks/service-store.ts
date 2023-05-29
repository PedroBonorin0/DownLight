import { create } from "zustand";

interface ServiceState {
  service: { name: string; price: string; id: string | undefined };
  clear: () => void;
  setService: (name: string, price: string, id: string) => void;
}

export const useServiceStore = create<ServiceState>((set) => ({
  service: { name: "", price: "", id: undefined },
  clear: () => set({ service: { name: "", price: "", id: undefined } }),
  setService: (name: string, price: string, id: string) =>
    set({ service: { name, price, id } }),
}));
