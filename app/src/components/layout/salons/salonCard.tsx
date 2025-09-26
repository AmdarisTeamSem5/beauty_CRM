"use client";

import Image from "next/image";
import { MapPin, Clock, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export interface Salon {
  id: string;
  name?: string;
  description?: string;
  image?: string;
  rating?: number;
  priceLevel?: number;
  services?: string[];
  address: string;
  phone: string;
  distance?: string;
  availableTime?: string;
  isPartner?: boolean;
}

interface SalonCardProps {
  salon: Salon;
}

const SalonCard = ({ salon }: SalonCardProps) => {
  if (!salon) return null;

  const renderPriceLevel = (level: number) => {
    return "$".repeat(Math.max(1, Math.min(level, 4)));
  };

  return (
    <Card className="w-full max-w-sm mx-auto overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white rounded-xl pt-0">
      <div className="relative h-44 sm:h-48 w-full">
        {salon.image ? (
          <Image
            src={salon.image}
            alt={salon.name ?? "Salon Image"}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-orange-200 to-orange-300 flex items-center justify-center">
            <span className="text-orange-600 text-sm sm:text-md font-medium">
              No Image
            </span>
          </div>
        )}

        {salon.isPartner && (
          <div className="absolute top-2 left-2 bg-purple-600 text-white text-xs sm:text-sm font-semibold px-2 py-1 rounded">
            Partner
          </div>
        )}

        <button className="absolute top-2 right-2 p-2 bg-white/80 hover:bg-white rounded-full transition-colors duration-200">
          <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
        </button>

        {salon.rating && (
          <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1">
            <span className="text-yellow-500 text-sm">⭐</span>
            <span className="text-xs sm:text-sm font-semibold text-gray-800">
              {salon.rating}
            </span>
          </div>
        )}
      </div>

      <CardContent className="flex flex-col justify-between h-auto space-y-2 py-2">
        <div>
          <h3 className="text-md sm:text-md font-semibold text-gray-900 leading-tight">
            {salon.name ?? "Unnamed Salon"}
          </h3>

          <div className="flex items-center text-gray-600 text-xs sm:text-xs mt-1">
            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
            <span>{salon.address}</span>
            {salon.distance && <span className="ml-1">• {salon.distance}</span>}
          </div>

          {salon.services && salon.services.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {salon.services.slice(0, 3).map((service, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs sm:text-[0.65rem] font-medium rounded-full"
                >
                  {service}
                </span>
              ))}
              {salon.services.length > 3 && (
                <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs sm:text-[0.65rem] font-medium rounded-full">
                  +{salon.services.length - 3} more
                </span>
              )}
            </div>
          )}

          <div className="flex items-center justify-between pt-2 text-xs sm:text-sm text-gray-600">
            <div className="flex items-center">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              <span>{salon.availableTime ?? "Today at 2:30 PM"}</span>
            </div>

            {salon.priceLevel && (
              <div className="text-purple-600 font-semibold text-xs sm:text-sm">
                {renderPriceLevel(salon.priceLevel)}
              </div>
            )}
          </div>
        </div>

        <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 sm:py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 mt-2 sm:mt-4">
          <span className="text-xs sm:text-sm">View Details</span>
          <svg
            className="w-3 h-3 sm:w-4 sm:h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </button>
      </CardContent>
    </Card>
  );
};

export default SalonCard;