"use client";
import { useState } from "react";

export function useFilters() {
  const [services, setServices] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<string | null>(null);

  const clear = () => {
    setServices([]);
    setPriceRange(null);
  };

  return {
    services,
    setServices,
    priceRange,
    setPriceRange,
    clear,
  };
}
