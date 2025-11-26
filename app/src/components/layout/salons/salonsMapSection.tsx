"use client";

import React, { useState } from "react";
import { createPortal } from "react-dom";
import dynamic from "next/dynamic";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MapPin, Maximize2, X, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Salon } from "@/components/layout/salons/salonCard";
import dummySalons from "@/data/dummySalons.json";

const LeafletMap = dynamic(
  () => import("@/components/layout/salons/LeafletMapCompact"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-64 flex items-center justify-center bg-gray-100 rounded-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-2"></div>
          <p className="text-sm text-gray-600">Loading map...</p>
        </div>
      </div>
    ),
  }
);

export function SalonsMapSection() {
  const [salons] = useState<Salon[]>(dummySalons);
  const [selectedSalon, setSelectedSalon] = useState<Salon | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Disable body scroll when modal is open
  React.useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  const modalContent = isModalOpen ? (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
      {/* Dark Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        onClick={() => setIsModalOpen(false)}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-6xl h-[85vh] bg-white rounded-xl shadow-2xl overflow-hidden z-[100000]">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-[100001] bg-white border-b px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-purple-600" />
            <h2 className="text-xl font-bold text-gray-900">
              Salon Locations
            </h2>
            <span className="text-sm text-gray-500">
              {salons.length} salons
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsModalOpen(false)}
            className="hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Map */}
        <div className="w-full h-full pt-16">
          <LeafletMap
            salons={salons}
            selectedSalon={selectedSalon}
            onSalonSelect={setSelectedSalon}
          />
          
          {/* Selected Salon Info */}
          {selectedSalon && (
            <div className="absolute bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-96 bg-white rounded-xl shadow-2xl p-6 z-[100002]">
              <button
                onClick={() => setSelectedSalon(null)}
                className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="h-4 w-4 text-gray-500" />
              </button>

              {selectedSalon.image && (
                <div className="w-full h-40 rounded-lg overflow-hidden mb-4">
                  <img
                    src={selectedSalon.image}
                    alt={selectedSalon.name || "Salon"}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <h3 className="text-xl font-bold text-gray-900 mb-2 pr-8">
                {selectedSalon.name}
              </h3>

              {selectedSalon.rating && (
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">⭐</span>
                    <span className="font-semibold">
                      {selectedSalon.rating}
                    </span>
                  </div>
                  {selectedSalon.priceLevel && (
                    <span className="text-purple-600 font-semibold">
                      {"$".repeat(selectedSalon.priceLevel)}
                    </span>
                  )}
                </div>
              )}

              <div className="flex items-start gap-2 text-gray-600 mb-3">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{selectedSalon.address}</span>
              </div>

              {selectedSalon.description && (
                <p className="text-gray-600 text-sm mb-4">
                  {selectedSalon.description}
                </p>
              )}

              {selectedSalon.services && selectedSalon.services.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">
                    Services:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedSalon.services.map((service, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedSalon.phone && (
                <p className="text-sm text-gray-600 mb-4">
                  📞 {selectedSalon.phone}
                </p>
              )}

              <div className="flex gap-2">
                <Button className="flex-1 bg-purple-600 hover:bg-purple-700">
                  Book Now
                </Button>
                <Button variant="outline" className="flex-1">
                  View Details
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      {/* Sidebar Map Card */}
      <Card className="overflow-hidden">
        <CardHeader 
          className="pb-3 cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-base">
              <MapPin className="h-4 w-4 text-purple-600" />
              Salon Locations
            </CardTitle>
            {isOpen ? (
              <ChevronUp className="h-4 w-4 text-gray-500" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-500" />
            )}
          </div>
        </CardHeader>

        {isOpen && (
          <CardContent className="p-0">
            <div className="h-80 relative">
              <LeafletMap
                salons={salons}
                selectedSalon={selectedSalon}
                onSalonSelect={setSelectedSalon}
              />

              {/* Expand Button */}
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsModalOpen(true)}
                className="absolute top-2 right-2 z-[1000] bg-white hover:bg-gray-100 shadow-md"
              >
                <Maximize2 className="h-3 w-3 mr-1" />
                <span className="text-xs">Expand</span>
              </Button>

              {/* Compact info overlay */}
              {selectedSalon && (
                <div className="absolute bottom-2 left-2 right-2 bg-white rounded-lg shadow-lg p-3 z-[1000]">
                  <h4 className="font-semibold text-sm text-gray-900 mb-1">
                    {selectedSalon.name}
                  </h4>
                  <p className="text-xs text-gray-600 mb-1">
                    {selectedSalon.address}
                  </p>
                  {selectedSalon.rating && (
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500 text-sm">⭐</span>
                      <span className="text-xs font-semibold">
                        {selectedSalon.rating}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Modal using Portal */}
      {mounted && modalContent && createPortal(modalContent, document.body)}
    </>
  );
}