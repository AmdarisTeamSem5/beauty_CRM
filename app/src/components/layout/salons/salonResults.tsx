"use client";

import { useEffect, useState } from "react";
import { fetchSalons } from "@/lib/api";
import { useFilters } from "@/hooks/useFilters";
import SalonCard, { Salon } from "@/components/layout/salons/salonCard";

const dummySalons: Salon[] = require("@/data/dummySalons.json");

export default function SalonResults() {
  const filters = useFilters();
  const [salons, setSalons] = useState<Salon[]>([]);

  const loadSalons = async () => {
    try {
      const data = await fetchSalons(filters);
      setSalons(Array.isArray(data?.salons) ? data.salons : []);
    } catch (err) {
      console.error("Failed to fetch salons", err);
      // Fallback to dummy data on error
      setSalons(dummySalons);
    }
  };

  useEffect(() => {
    loadSalons();
  }, [filters]);

  return (
    <div className="w-full">
      {salons.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6  mx-auto">
          {salons.filter(Boolean).map((salon) => (
            <SalonCard key={salon.id} salon={salon} />
          ))}
        </div>
      ) : (
        <div className="col-span-3 text-gray-500">No salons found</div>
      )}
    </div>
  );
}
