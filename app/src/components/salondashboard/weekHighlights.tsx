
"use client";

import { Card } from "@/components/ui/card";

interface Highlight {
  text: string;
  color: "green" | "purple";
}

export function WeekHighlights() {
  const highlights: Highlight[] = [
    { text: "5 new customers acquired", color: "green" },
    { text: "3 five-star reviews received", color: "green" },
    { text: "2 new services launched", color: "purple" },
  ];

  return (
    <Card className="p-6 bg-white shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        This Week's Highlights
      </h3>

      <div className="space-y-3">
        {highlights.map((highlight, index) => (
          <div key={index} className="flex items-start gap-2">
            <div
              className={`w-2 h-2 rounded-full mt-2 ${
                highlight.color === "green" ? "bg-green-500" : "bg-purple-500"
              }`}
            />
            <span className="text-gray-700">{highlight.text}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}