"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const SalonsFilters = () => {
  const clearFilters = () => {
    console.log("Clearing filters");
  };

  const applyFilters = () => {
    console.log("Applying filters");
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
              Clear Filters
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Here goes the content*/}
      </CardContent>
    </Card>
  );
};

export default SalonsFilters;
