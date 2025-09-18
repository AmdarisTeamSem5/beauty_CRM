"use client";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ChevronUp, ChevronDown, DollarSign } from "lucide-react";
import { useFilters } from "@/hooks/useFilters";

const priceRanges = [
  { label: "$ (Under $50)", value: "under-50", count: 23 },
  { label: "$$ ($50-100)", value: "50-100", count: 41 },
  { label: "$$$ ($100-200)", value: "100-200", count: 32 },
  { label: "$$$$ ($200+)", value: "200+", count: 15 },
];

export const PriceRangeFilter = ({ filters }: { filters: ReturnType<typeof useFilters> }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="space-y-3">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold">Price Range</h3>
        </div>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 text-gray-500" />
        ) : (
          <ChevronDown className="h-4 w-4 text-gray-500" />
        )}
      </div>

      {isOpen && (
        <div className="pt-2">
          <RadioGroup
            value={filters.priceRange ?? ""}
            onValueChange={(value) => filters.setPriceRange(value)}
            className="space-y-2"
          >
            {priceRanges.map((range) => (
              <label key={range.value} className="flex items-center gap-2 cursor-pointer">
                <RadioGroupItem value={range.value} />
                <span className="flex-1 text-sm">{range.label}</span>
                <span className="text-gray-500 text-sm">{range.count}</span>
              </label>
            ))}
          </RadioGroup>
        </div>
      )}
    </div>
  );
};