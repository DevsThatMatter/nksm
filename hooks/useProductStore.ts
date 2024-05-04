import { SavedProduct } from "@/app/components/Navbar/SavedItems";
import { create } from "zustand";

interface ProductStore {
  savedProducts: Map<string, SavedProduct> | null;
  setSavedProducts: (savedProducts: Map<string, SavedProduct>) => void;
  addSavedProduct: (productId: string, product: SavedProduct) => void;
  removeSavedProductFromCache: (productId: string) => void;
}

export const useProductStore = create<ProductStore>()((set) => ({
  savedProducts: null,
  setSavedProducts: (savedProducts: Map<string, SavedProduct>) =>
    set({ savedProducts }),
  addSavedProduct: (productId: string, product: SavedProduct) =>
    set((state) => {
      const newSavedProducts =
        state.savedProducts === null ? new Map() : new Map(state.savedProducts);
      newSavedProducts.set(productId, product);
      return { savedProducts: newSavedProducts };
    }),
  removeSavedProductFromCache: (productId: string) =>
    set((state) => {
      if (state.savedProducts === null)
        return { savedProducts: state.savedProducts };
      const newSavedProducts = new Map(state.savedProducts);
      newSavedProducts.delete(productId);
      return { savedProducts: newSavedProducts };
    }),
}));
