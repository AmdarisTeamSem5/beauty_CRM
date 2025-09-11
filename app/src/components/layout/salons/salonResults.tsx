"use client";

import { useEffect, useState } from "react";
import { fetchSalons } from "@/lib/api";
import { useFilters } from "@/hooks/useFilters";
import SalonCard, { Salon } from "@/components/layout/salons/salonCard";

export default function SalonResults() {
  const filters = useFilters();
  const [salons, setSalons] = useState<Salon[]>([]);

  const loadSalons = async () => {
    try {
      const data = await fetchSalons(filters);
      // Ensure we always set an array
      setSalons(Array.isArray(data?.salons) ? data.salons : []);
    } catch (err) {
      console.error("Failed to fetch salons", err);
      setSalons([]); // fallback to empty array
    }
  };

  useEffect(() => {
    loadSalons();
  }, [filters]);

  return (
    <>
      {salons.length > 0 ? (
        salons
          .filter(Boolean) // remove undefined/null items
          .map((salon) => (
            <SalonCard key={salon.id} salon={salon} />
          ))
      ) : (
        <div className="col-span-3 text-gray-500">No salons found</div>
      )}
    </>
  );
}
