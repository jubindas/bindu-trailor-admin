import { createContext, useState, useEffect, useCallback, useMemo } from "react";
import { stitchingData } from "@/data/stitching-order-data";
import type { Stitching } from "@/table-types/stitching-order";

import type { ReactNode } from "react";

interface StitchingContextType {
  allItems: Stitching[];
  completedItems: Stitching[];
  updateItemStatus: (orderId: string, status: string) => void;
  setItems: (items: Stitching[]) => void;
}

export const StitchingContext = createContext<StitchingContextType>({
  allItems: [],
  completedItems: [],
  updateItemStatus: () => { },
  setItems: () => { },
});

export function StitchingProvider({ children }: { children: ReactNode }) {
  const [allItems, setAllItems] = useState<Stitching[]>(() => {
    // Load from localStorage or use initial data
    const saved = localStorage.getItem("stitchingItems");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return stitchingData;
      }
    }
    return stitchingData;
  });

  const completedItems = allItems.filter((item) => item.status === "Completed");

  useEffect(() => {
    // Save to localStorage whenever items change
    localStorage.setItem("stitchingItems", JSON.stringify(allItems));
  }, [allItems]);

  const updateItemStatus = useCallback((orderId: string, status: string) => {
    setAllItems((prev) =>
      prev.map((item) =>
        item.orderId === orderId ? { ...item, status } : item
      )
    );
  }, []);

  const setItems = useCallback((items: Stitching[]) => {
    setAllItems(items);
  }, []);

  const value = useMemo(
    () => ({
      allItems,
      completedItems,
      updateItemStatus,
      setItems,
    }),
    [allItems, completedItems, updateItemStatus, setItems]
  );

  return (
    <StitchingContext.Provider value={value}>
      {children}
    </StitchingContext.Provider>
  );
}
