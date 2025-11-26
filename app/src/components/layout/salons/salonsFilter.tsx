"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { ServicesFilter } from "./servicesFilter";
import { PriceRangeFilter } from "./priceRangeFilter";
import { RatingFilter } from "./ratingFilter";
import { DistanceFilter } from "./distanceFilter";
import { OtherFilter } from "./otherFilter";
import { useFilters } from "@/hooks/useFilters";
import { fetchSalons } from "@/lib/api";

const SalonsFilters = () => {
  const filters = useFilters();
  const [open, setOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const clearFilters = () => {
    filters.clear();
    fetchSalons(filters).then(console.log);
  };

  const applyFilters = async () => {
    const data = await fetchSalons(filters);
    console.log("Filtered salons:", data.salons);
  };

  return (
    <>
      {/* Mobile filter toggle */}
      <div className="lg:hidden mb-4 w-full">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => setOpen(!open)}
        >
          {open ? "Hide Filters" : "Show Filters"}
        </Button>
      </div>

      {/* Filter card */}
      <Card
        className={`w-full ${
          open ? "block" : "hidden"
        } lg:block`}
      >
        <CardHeader 
          className="pb-4 cursor-pointer hover:bg-gray-50 transition-colors lg:cursor-default lg:hover:bg-transparent"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg font-semibold">Filters</CardTitle>
              <div className="lg:hidden">
                {isCollapsed ? (
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                ) : (
                  <ChevronUp className="h-4 w-4 text-gray-500" />
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  applyFilters();
                }}
                variant="ghost"
                size="sm"
                className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
              >
                Apply
              </Button>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  clearFilters();
                }}
                variant="ghost"
                size="sm"
                className="text-gray-600 hover:text-gray-700 hover:bg-gray-50"
              >
                Clear
              </Button>
            </div>
          </div>
        </CardHeader>
        
        {!isCollapsed && (
          <CardContent className="space-y-6">
            <ServicesFilter filters={filters} />
            <PriceRangeFilter filters={filters} />
            <RatingFilter filters={filters} />
            <DistanceFilter filters={filters} />
            <OtherFilter filters={filters} />
          </CardContent>
        )}
      </Card>
    </>
  );
};

export default SalonsFilters;