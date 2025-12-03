"use client";

import React, { useEffect, useRef, useMemo } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Salon } from "@/components/layout/salons/salonCard";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface LeafletMapProps {
  salons: Salon[];
  selectedSalon: Salon | null;
  onSalonSelect: (salon: Salon) => void;
}

// ✅ Generează coordonate consistente într-o zonă mai mare (~5-6 km²)
const getSalonCoordinates = (salonId: string): [number, number] => {
  // Centrul Chișinăului
  const centerLat = 47.0105;
  const centerLon = 28.8638;
  
  // Hash din ID pentru poziție consistentă
  const hash = salonId.split('').reduce((acc, char) => {
    return acc + char.charCodeAt(0);
  }, 0);
  
  // Distribuie salonurile într-o zonă de ~5-6 km²
  // 0.05 grade ≈ 5.5 km la această latitudine
  const offsetLat = ((hash % 200) / 200 - 0.5) * 0.05;
  const offsetLon = (((hash * 13) % 200) / 200 - 0.5) * 0.05;
  
  return [centerLat + offsetLat, centerLon + offsetLon];
};

const LeafletMap: React.FC<LeafletMapProps> = ({
  salons,
  selectedSalon,
  onSalonSelect,
}) => {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});
  const mapContainerRef = useRef<HTMLDivElement>(null);

  // ✅ Memorează coordonatele pentru a nu se recalcula la fiecare render
  const salonCoordinates = useMemo(() => {
    return salons.reduce((acc, salon) => {
      acc[salon.id] = getSalonCoordinates(salon.id);
      return acc;
    }, {} as { [key: string]: [number, number] });
  }, [salons]);

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current).setView([47.0105, 28.8638], 12); // Zoom 12

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    mapRef.current = map;

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Update markers when salons change
  useEffect(() => {
    if (!mapRef.current) return;

    Object.values(markersRef.current).forEach((marker) => marker.remove());
    markersRef.current = {};

    salons.forEach((salon) => {
      const coords = salonCoordinates[salon.id];
      const isSelected = selectedSalon?.id === salon.id;

      const customIcon = L.divIcon({
        className: "custom-marker",
        html: `
          <div class="relative">
            <div class="absolute -translate-x-1/2 -translate-y-full">
              <svg width="32" height="42" viewBox="0 0 32 42" fill="none">
                <path d="M16 0C7.16344 0 0 7.16344 0 16C0 24.8366 16 42 16 42C16 42 32 24.8366 32 16C32 7.16344 24.8366 0 16 0Z" 
                  fill="${isSelected ? "#9333ea" : "#7c3aed"}" 
                  stroke="white" 
                  stroke-width="2"/>
              </svg>
              <div class="absolute top-2 left-1/2 -translate-x-1/2 text-white text-xs font-bold">
                ${salon.rating || "★"}
              </div>
            </div>
          </div>
        `,
        iconSize: [32, 42],
        iconAnchor: [16, 42],
        popupAnchor: [0, -42],
      });

      const marker = L.marker(coords, { icon: customIcon })
        .addTo(mapRef.current!)
        .on("click", () => {
          onSalonSelect(salon);
        });

      // Create popup content
      const popupContent = `
        <div class="p-2 min-w-[200px]">
          <h3 class="font-bold text-gray-900 mb-1">${salon.name}</h3>
          ${
            salon.rating
              ? `<div class="flex items-center gap-1 mb-2">
                   <span class="text-yellow-500">⭐</span>
                   <span class="text-sm font-semibold">${salon.rating}</span>
                 </div>`
              : ""
          }
          <p class="text-xs text-gray-600">${salon.address}</p>
        </div>
      `;

      marker.bindPopup(popupContent, {
        maxWidth: 300,
        className: "custom-popup",
      });

      markersRef.current[salon.id] = marker;
    });

    if (salons.length > 0) {
      const bounds = L.latLngBounds(
        salons.map((salon) => salonCoordinates[salon.id])
      );
      mapRef.current.fitBounds(bounds, { padding: [60, 60] }); // Padding mai mare
    }
  }, [salons, onSalonSelect, selectedSalon, salonCoordinates]);

  // Handle selected salon
  useEffect(() => {
    if (!mapRef.current || !selectedSalon) return;

    const coords = salonCoordinates[selectedSalon.id];
    
    // Pan to selected salon with animation
    mapRef.current.flyTo(coords, 15, {
      duration: 1,
    });

    // Open popup for selected marker
    const marker = markersRef.current[selectedSalon.id];
    if (marker) {
      marker.openPopup();
    }
  }, [selectedSalon, salonCoordinates]);

  return (
    <>
      <div ref={mapContainerRef} className="w-full h-full" />
      <style jsx global>{`
        .custom-marker {
          background: transparent;
          border: none;
        }

        .custom-popup .leaflet-popup-content-wrapper {
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }

        .custom-popup .leaflet-popup-content {
          margin: 0;
          padding: 0;
        }

        .custom-popup .leaflet-popup-tip {
          background: white;
        }

        .leaflet-container {
          font-family: inherit;
        }
      `}</style>
    </>
  );
};

export default LeafletMap;