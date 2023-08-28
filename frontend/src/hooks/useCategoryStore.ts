import { create } from "zustand";

interface CategoryState {
  category: { 
    name: string; 
    id: string | undefined 
  };
  clear: () => void;
  setCategory: (name: string,  id: string) => void;
  setCategoryToDelete: (category:{
    name:string,
    id:string
  }|null) => void;
  categoryToDelete: { 
    name: string; 
    id: string 
  }|null;
}

export const useCategoryStore = create<CategoryState>((set) => ({
  category: { name: "",  id: undefined },

  categoryToDelete: { name: "", id: "" },

  clear: () => 
    set({category: { name: "",  id: undefined }}),
  
  setCategory: (name: string, id: string) =>
    set({ category: { name, id }}),

  setCategoryToDelete: (category) =>
    set({ categoryToDelete: category}),

}));
