"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, X } from "lucide-react";
import type { Salon } from "@/components/layout/salons/salonCard";
import dummySalons from "@/data/dummySalons.json";
// Import map dynamically to avoid SSR issues
const LeafletMap = dynamic(
  () => import("@/components/layout/salons/LeafletMap"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    ),
  }
);

export function SalonsMap() {
  const [salons] = useState<Salon[]>(dummySalons);
  const [selectedSalon, setSelectedSalon] = useState<Salon | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSalons = salons.filter((salon) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      salon.name?.toLowerCase().includes(query) ||
      salon.address?.toLowerCase().includes(query) ||
      salon.services?.some((service) => service.toLowerCase().includes(query))
    );
  });

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
            Find Salons <span className="text-purple-600">Near You</span>
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
            Explore our network of beauty salons on the map
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search salons by name, location, or service..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-3"
            />
          </div>
          <p className="text-sm text-gray-500 mt-2 text-center">
            {filteredSalons.length} salon{filteredSalons.length !== 1 ? "s" : ""}{" "}
            found
          </p>
        </div>

        {/* Map Container */}
        <div className="relative">
          <Card className="overflow-hidden border-0 shadow-xl">
            <div className="h-[600px] relative">
              <LeafletMap
                salons={filteredSalons}
                selectedSalon={selectedSalon}
                onSalonSelect={setSelectedSalon}
              />

              {/* Selected Salon Details Overlay */}
              {selectedSalon && (
                <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 z-[1000]">
                  <Card className="bg-white shadow-2xl p-4">
                    <button
                      onClick={() => setSelectedSalon(null)}
                      className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-100"
                    >
                      <X className="h-4 w-4 text-gray-500" />
                    </button>

                    {selectedSalon.image && (
                      <div className="w-full h-32 rounded-lg overflow-hidden mb-3">
                        <img
                          src={selectedSalon.image}
                          alt={selectedSalon.name || "Salon"}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    <h3 className="text-lg font-bold text-gray-900 mb-1 pr-6">
                      {selectedSalon.name}
                    </h3>

                    {selectedSalon.rating && (
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-yellow-500">⭐</span>
                        <span className="text-sm font-semibold">
                          {selectedSalon.rating}
                        </span>
                        {selectedSalon.priceLevel && (
                          <span className="text-purple-600 font-semibold text-sm">
                            {"$".repeat(selectedSalon.priceLevel)}
                          </span>
                        )}
                      </div>
                    )}

                    <div className="flex items-start gap-2 text-gray-600 mb-3">
                      <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span className="text-xs">{selectedSalon.address}</span>
                    </div>

                    {selectedSalon.services &&
                      selectedSalon.services.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {selectedSalon.services.slice(0, 3).map((service, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full"
                            >
                              {service}
                            </span>
                          ))}
                        </div>
                      )}

                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-sm">
                      Book Now
                    </Button>
                  </Card>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}