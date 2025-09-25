"use client";

import { Button } from "@/components/ui/button";
import { JoinBeautyBookModal } from "@/components/layout/landing/joinBeatyBookModal";
import { Search } from "lucide-react";

export function Hero() {
  return (
    <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-neutral-50 py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Trust Badge */}
        <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6 sm:mb-8">
          <span>⭐</span>
          <span>Trusted by 2,500+ Salons</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6">
          <span className="text-purple-600 block sm:inline">Discover & Book</span>{" "}
          <span className="block sm:inline">Your Beauty Experience</span>
        </h1>

        {/* Description */}
        <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8 sm:mb-10 px-2">
          Connect with the best beauty salons and professionals in your area. Book appointments,
          discover new services, and grow your business – all in one platform.
        </p>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for salons, services, or locations..."
                className="w-full pl-12 pr-4 py-3 sm:py-4 rounded-xl border border-gray-200 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent text-base"
              />
            </div>
            <Button 
              size="lg"
              className="bg-purple-600 hover:bg-purple-700 px-6 sm:px-8 py-3 sm:py-4 text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Search
            </Button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12 sm:mb-16">
          <JoinBeautyBookModal />
          <Button 
            variant="outline" 
            size="lg"
            className="px-6 sm:px-8 py-3 text-base font-semibold rounded-xl border-2 hover:bg-gray-50 transition-colors"
          >
            Explore Salons
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-purple-600 mb-1">
              2,500+
            </div>
            <p className="text-gray-600 text-sm sm:text-base font-medium">
              Active Salons
            </p>
          </div>
          
          <div className="text-center">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-purple-600 mb-1">
              150K+
            </div>
            <p className="text-gray-600 text-sm sm:text-base font-medium">
              Monthly Bookings
            </p>
          </div>
          
          <div className="text-center">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-purple-600 mb-1">
              4.9⭐
            </div>
            <p className="text-gray-600 text-sm sm:text-base font-medium">
              Customer Rating
            </p>
          </div>
          
          <div className="text-center">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-purple-600 mb-1">
              50+
            </div>
            <p className="text-gray-600 text-sm sm:text-base font-medium">
              Cities Covered
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}