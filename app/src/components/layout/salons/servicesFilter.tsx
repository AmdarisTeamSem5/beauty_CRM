"use client";
import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronUp, ChevronDown } from "lucide-react";
import { useFilters } from "@/hooks/useFilters";


type ServiceType = {
  id: number;
  name: string;
};

export const ServicesFilter = ({
  filters,
}: {
  filters: ReturnType<typeof useFilters>;
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [services, setServices] = useState<ServiceType[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("http://localhost:5191/api/Misc/ServiceTypes");
        if (!res.ok) throw new Error("Failed to fetch services");
        let data: ServiceType[] = await res.json();

        data = data
          .map((s) => ({
            ...s,
            name: s.name.replace(/([a-z])([A-Z])/g, "$1 $2"),
          }))
          .sort((a, b) => a.name.localeCompare(b.name));

        setServices(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const toggleService = (service: string) => {
    if (filters.services.includes(service)) {
      filters.setServices(filters.services.filter((s) => s !== service));
    } else {
      filters.setServices([...filters.services, service]);
    }
  };

  const visibleServices = showAll ? services : services.slice(0, 10);

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
          {loading ? (
            <p className="text-sm text-gray-500">Loading...</p>
          ) : (
            <>
              {visibleServices.map((service) => (
                <label
                  key={service.id}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Checkbox
                    checked={filters.services.includes(service.name)}
                    onCheckedChange={() => toggleService(service.name)}
                  />
                  <span className="flex-1 text-sm">{service.name}</span>
                </label>
              ))}

              {services.length > 10 && (
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="text-sm hover:underline hover:cursor-pointer mt-2"
                >
                  {showAll ? (
                    <div className="flex flex-row gap-1">
                      <ChevronUp className="pr-1" />
                      Show less
                    </div>
                  ) : (
                    <div className="flex flex-row gap-1">
                      <ChevronDown className="pr-1" />
                      Show more
                    </div>
                  )}
                </button>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};
