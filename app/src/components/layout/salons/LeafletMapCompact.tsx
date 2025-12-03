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

const LeafletMapCompact: React.FC<LeafletMapProps> = ({
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

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current, {
      scrollWheelZoom: false,
      dragging: true,
      touchZoom: true,
      doubleClickZoom: true,
      boxZoom: false,
      keyboard: false,
    }).setView([47.0105, 28.8638], 12); // Zoom 12 pentru zonă mai mare

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    // Disable scroll propagation
    const container = mapContainerRef.current;
    if (container) {
      container.addEventListener('wheel', (e) => {
        e.preventDefault();
        e.stopPropagation();
      }, { passive: false });
    }

    mapRef.current = map;

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

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
              <svg width="24" height="32" viewBox="0 0 24 32" fill="none">
                <path d="M12 0C5.37258 0 0 5.37258 0 12C0 18.6274 12 32 12 32C12 32 24 18.6274 24 12C24 5.37258 18.6274 0 12 0Z" 
                  fill="${isSelected ? "#9333ea" : "#7c3aed"}" 
                  stroke="white" 
                  stroke-width="1.5"/>
              </svg>
              <div class="absolute top-1 left-1/2 -translate-x-1/2 text-white text-[10px] font-bold">
                ${salon.rating || "★"}
              </div>
            </div>
          </div>
        `,
        iconSize: [24, 32],
        iconAnchor: [12, 32],
        popupAnchor: [0, -32],
      });

      const marker = L.marker(coords, { icon: customIcon })
        .addTo(mapRef.current!)
        .on("click", () => onSalonSelect(salon));

      markersRef.current[salon.id] = marker;
    });

    if (salons.length > 0) {
      const bounds = L.latLngBounds(
        salons.map((salon) => salonCoordinates[salon.id])
      );
      mapRef.current.fitBounds(bounds, { padding: [30, 30] }); // Padding mai mare
    }
  }, [salons, onSalonSelect, selectedSalon, salonCoordinates]);

  useEffect(() => {
    if (!mapRef.current || !selectedSalon) return;

    const coords = salonCoordinates[selectedSalon.id];
    mapRef.current.setView(coords, 14, { animate: true });
  }, [selectedSalon, salonCoordinates]);

  return (
    <>
      <div 
        ref={mapContainerRef} 
        className="w-full h-full rounded-lg"
        style={{ touchAction: 'pan-y' }}
      />
      <style jsx global>{`
        .custom-marker {
          background: transparent;
          border: none;
        }
        .leaflet-container {
          font-family: inherit;
          border-radius: 0.5rem;
        }
        .leaflet-container:focus {
          outline: none;
        }
      `}</style>
    </>
  );
};

export default LeafletMapCompact;