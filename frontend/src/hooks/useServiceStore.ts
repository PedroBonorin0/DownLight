import { create } from "zustand";

interface ServiceState {
  service: { name: string; price: string; id: string | undefined };
  clear: () => void;
  setService: (name: string, price: string, id: string) => void;
  setServiceToDelete: (service:{name:string,id:string}|null) => void;
  serviceToDelete: { name: string; id: string }|null;
}

export const useServiceStore = create<ServiceState>((set) => ({
  service: { name: "", price: "", id: undefined },

  serviceToDelete: { name: "", id: "" },

  clear: () => 
    set({service: { name: "", price: "", id: undefined }}),
  
  setService: (name: string, price: string, id: string) =>
    set({ service: { name, price, id }}),

  setServiceToDelete: (service) =>
    set({ serviceToDelete: service}),

}));
