"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ServicesFilter } from "./servicesFilter";
import { PriceRangeFilter } from "./priceRangeFilter";
import { useFilters } from "@/hooks/useFilters";
import { fetchSalons } from "@/lib/api";

const SalonsFilters = () => {
  const filters = useFilters();

  const clearFilters = () => {
    filters.clear();
    fetchSalons(filters).then(console.log); // fetch default salons
  };

  const applyFilters = async () => {
    const data = await fetchSalons(filters);
    console.log("Filtered salons:", data.salons);
  };

  return (
    <Card className="h-full w-100">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">Filters</CardTitle>
          <div className="flex gap-1">
            <Button
              onClick={applyFilters}
              variant="ghost"
              size="sm"
              className="border border-transparent hover:border-gray-300 hover:bg-gray-50"
            >
              Apply
            </Button>
            <Button
              onClick={clearFilters}
              variant="ghost"
              size="sm"
              className="border border-transparent hover:border-gray-300 hover:bg-gray-50"
            >
              Clear
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <ServicesFilter filters={filters} />
        <PriceRangeFilter filters={filters} />
      </CardContent>
    </Card>
  );
};

export default SalonsFilters;
