import { create } from "zustand";

interface ServiceState {
  service: { name: string; price: string; id: string | undefined };
  clear: () => void;
  setService: (name: string, price: string, id: string) => void;
  isServiceSelected: boolean;
}

export const useServiceStore = create<ServiceState>((set) => ({
  isServiceSelected: false,
  service: { name: "", price: "", id: undefined },
  clear: () =>
    set({
      service: { name: "", price: "", id: undefined },
      isServiceSelected: false,
    }),
  setService: (name: string, price: string, id: string) =>
    set({ service: { name, price, id }, isServiceSelected: true }),
}));
