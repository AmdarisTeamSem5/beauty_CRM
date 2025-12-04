"use server";

import SalonResults from "@/components/layout/salons/salonResults";
import SalonsFilters from "../../components/layout/salons/salonsFilter";
import SalonSearch from "@/components/layout/salons/salonSearch";
import { SalonsMapSection } from "@/components/layout/salons/salonsMapSection";

export default async function SalonsPage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SalonSearch />
      <div className="flex flex-col lg:flex-row gap-6 my-6 lg:my-12">
        <aside className="w-full lg:w-80 lg:flex-shrink-0">
          <div className="lg:sticky lg:top-4 space-y-6">
            <SalonsFilters />
              <SalonsMapSection />
          </div>
        </aside>
        <main className="flex-1 lg:min-w-0">
          <SalonResults />
        </main>
      </div>
    </div>
  );
}