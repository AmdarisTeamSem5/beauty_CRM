"use client";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronUp, ChevronDown } from "lucide-react";
import { useFilters } from "@/hooks/useFilters";

const services = [
  { label: "Hair Services", count: 89 },
  { label: "Nail Services", count: 67 },
  { label: "Skincare & Facials", count: 45 },
  { label: "Massage Therapy", count: 34 },
  { label: "Lash Extensions", count: 28 },
  { label: "Eyebrow Services", count: 31 },
  { label: "Waxing", count: 23 },
  { label: "Makeup Services", count: 19 },
];

export const ServicesFilter = ({ filters }: { filters: ReturnType<typeof useFilters> }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleService = (service: string) => {
    if (filters.services.includes(service)) {
      filters.setServices(filters.services.filter((s) => s !== service));
    } else {
      filters.setServices([...filters.services, service]);
    }
  };

  return (
    <div className="space-y-3">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-sm font-semibold">Services</h3>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 text-gray-500" />
        ) : (
          <ChevronDown className="h-4 w-4 text-gray-500" />
        )}
      </div>

      {isOpen && (
        <div className="space-y-2 pt-2">
          {services.map((service) => (
            <label key={service.label} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={filters.services.includes(service.label)}
                onCheckedChange={() => toggleService(service.label)}
              />
              <span className="flex-1 text-sm">{service.label}</span>
              <span className="text-gray-500 text-sm">{service.count}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};