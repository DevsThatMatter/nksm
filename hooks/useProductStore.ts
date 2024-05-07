import { SavedProduct } from "@/app/components/Navbar/SavedItems";
import { create } from "zustand";

interface ProductStore {
  savedProducts: Map<string, SavedProduct>;
  setSavedProducts: (savedProducts: Map<string, SavedProduct>) => void;
  addSavedProduct: (productId: string, product: SavedProduct) => void;
  removeSavedProductFromCache: (productId: string) => void;
}

export const useProductStore = create<ProductStore>()((set) => ({
  savedProducts: new Map<string, SavedProduct>(),
  setSavedProducts: (savedProducts: Map<string, SavedProduct>) =>
    set({ savedProducts }),
  addSavedProduct: (productId: string, product: SavedProduct) =>
    set((state) => ({
      savedProducts: new Map(state.savedProducts).set(productId, product),
    })),
  removeSavedProductFromCache: (productId: string) =>
    set((state) => {
      const newSavedProducts = new Map(state.savedProducts);
      newSavedProducts.delete(productId);
      return { savedProducts: newSavedProducts };
    }),
}));
