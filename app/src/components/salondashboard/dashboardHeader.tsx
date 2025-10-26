
"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

export function DashboardHeader() {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center gap-3 mb-4">
          <button className="text-gray-500 hover:text-gray-700 flex items-center gap-2 text-sm">
            ← Back to Home
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-2xl font-semibold text-gray-500">LB</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Luxe Beauty Studio
              </h1>
              <p className="text-gray-600">Owner: Sarah Martinez</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100 text-xs">
                  approved
                </Badge>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>4.8 (156 reviews)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" className="border-gray-300">
               Notifications
            </Button>
            <Button variant="outline" className="border-gray-300">
               Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}