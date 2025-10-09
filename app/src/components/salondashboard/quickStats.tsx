"use client";

import { Card } from "@/components/ui/card";

export function QuickStats() {
  return (
    <Card className="p-6 bg-white shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Stats</h3>

      <div className="space-y-6">
        <div className="text-center">
          <p className="text-3xl font-bold text-purple-600 mb-1">12.5%</p>
          <p className="text-sm text-gray-500">Weekly Growth</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-purple-600 mb-1">#5</p>
          <p className="text-sm text-gray-500">Local Ranking</p>
        </div>
      </div>
    </Card>
  );
}