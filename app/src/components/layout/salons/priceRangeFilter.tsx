"use client";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useFilters } from "@/hooks/useFilters";

const priceRanges = [
  { label: "$ (Under $50)", value: "under-50", count: 23 },
  { label: "$$ ($50-100)", value: "50-100", count: 41 },
  { label: "$$$ ($100-200)", value: "100-200", count: 32 },
  { label: "$$$$ ($200+)", value: "200+", count: 15 },
];

export const PriceRangeFilter = ({ filters }: { filters: ReturnType<typeof useFilters> }) => {
  return (
    <div>
      <h3 className="text-sm font-semibold mb-2">Price Range</h3>
      <RadioGroup
        value={filters.priceRange ?? ""}
        onValueChange={(value) => filters.setPriceRange(value)}
        className="space-y-2"
      >
        {priceRanges.map((range) => (
          <label key={range.value} className="flex items-center gap-2">
            <RadioGroupItem value={range.value} />
            <span className="flex-1">{range.label}</span>
            <span className="text-gray-500 text-sm">{range.count}</span>
          </label>
        ))}
      </RadioGroup>
    </div>
  );
};
