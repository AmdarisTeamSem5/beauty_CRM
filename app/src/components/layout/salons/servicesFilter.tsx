"use client";
import { Checkbox } from "@/components/ui/checkbox";
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
  const toggleService = (service: string) => {
    if (filters.services.includes(service)) {
      filters.setServices(filters.services.filter((s) => s !== service));
    } else {
      filters.setServices([...filters.services, service]);
    }
  };

  return (
    <div>
      <h3 className="text-sm font-semibold mb-2">Services</h3>
      <div className="space-y-2">
        {services.map((service) => (
          <label key={service.label} className="flex items-center gap-2">
            <Checkbox
              checked={filters.services.includes(service.label)}
              onCheckedChange={() => toggleService(service.label)}
            />
            <span className="flex-1">{service.label}</span>
            <span className="text-gray-500 text-sm">{service.count}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
