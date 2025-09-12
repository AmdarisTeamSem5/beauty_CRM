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
      // const data = await fetchSalons(filters);
      const data = { salons: dummySalons };
      setSalons(Array.isArray(data?.salons) ? data.salons : []);
      console.log(data)
    } catch (err) {
      console.error("Failed to fetch salons", err);
      setSalons([]); 
    }
  };

  useEffect(() => {
    loadSalons();
  }, [filters]);

  return (
    <>
      {salons.length > 0 ? (
        <div className="grid grid-cols-3 gap-6 w-full">
          {salons.filter(Boolean).map((salon) => (
            <SalonCard key={salon.id} salon={salon} />
          ))}
        </div>
      ) : (
        <div className="col-span-3 text-gray-500">No salons found</div>
      )}
    </>
  );
}
