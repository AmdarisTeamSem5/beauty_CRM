"use client";

import { Card } from "@/components/ui/card";
import { Clock } from "lucide-react";

export function PerformanceMetrics() {
  return (
    <Card className="p-6 bg-white shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Clock className="w-5 h-5 text-gray-700" />
        <h3 className="text-lg font-semibold text-gray-900">
          Performance Metrics
        </h3>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Avg Service Time</span>
          <span className="font-semibold text-gray-900">45 min</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Customer Retention</span>
          <span className="font-semibold text-gray-900">87%</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Popular Service</span>
          <span className="font-semibold text-purple-600">
            Hair Cut & Style
          </span>
        </div>
      </div>
    </Card>
  );
}