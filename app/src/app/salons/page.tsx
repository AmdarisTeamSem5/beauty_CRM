"use server";

import SalonResults from "@/components/layout/salons/salonResults";
import SalonsFilters from "../../components/layout/salons/salonsFilter";

export default async function SalonsPage() {
  return (
    <div className="flex gap-x-10 my-12">
      <SalonsFilters />
      <SalonResults />
    </div>
  );
}
