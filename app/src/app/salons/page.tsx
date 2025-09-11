"use server";

import SalonsFilters from "../../components/layout/salons/filter";
import SalonCard from "@/components/layout/salons/salonCard";

export default async function SalonsPage() {
  return (
    <div className="flex gap-x-10 my-12">
      <SalonsFilters />
      <div className="grid grid-cols-3 gap-8 w-full">
        <SalonCard />
        <SalonCard />
        <SalonCard />
        <SalonCard />
        <SalonCard />
      </div>
    </div>
  );
}
