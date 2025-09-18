"use server";

import SalonResults from "@/components/layout/salons/salonResults";
import SalonsFilters from "../../components/layout/salons/salonsFilter";
import SalonSearch from "@/components/layout/salons/salonSearch";

export default async function SalonsPage() {
  return (
    <div className="w-full max-w-7xl mx-auto">
      <SalonSearch />
      <div className="w-full flex flex-col lg:flex-row gap-6 lg:gap-x-10 my-12">
        <SalonsFilters />
        <SalonResults />
      </div>
    </div>
  );
}