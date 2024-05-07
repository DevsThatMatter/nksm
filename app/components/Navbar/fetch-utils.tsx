"use client";

import { useProductStore } from "@/hooks/useProductStore";
import { useEffect } from "react";
import { SavedProduct } from "./SavedItems";

const FetchedProducts = ({
  savedProducts,
}: {
  savedProducts: Map<string, SavedProduct>;
}) => {
  const { setSavedProducts } = useProductStore();
  useEffect(() => {
    setSavedProducts(savedProducts);
  }, [savedProducts, setSavedProducts]);
  return null;
};

export default FetchedProducts;
