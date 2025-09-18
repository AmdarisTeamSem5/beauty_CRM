import { Slider } from "@/components/ui/slider";
import { ChevronUp, ChevronDown, MapPin } from "lucide-react";
import { useState } from "react";

interface DistanceFilterProps {
  filters: any;
}

export const DistanceFilter = ({ filters }: DistanceFilterProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [distance, setDistance] = useState([25]); 

  const handleDistanceChange = (value: number[]) => {
    setDistance(value);
    filters.setDistance?.(value[0]);
  };

  const getDistanceLabel = (distance: number) => {
    if (distance === 0) return "Any";
    return `${distance}+ mi`;
  };

  return (
    <div className="space-y-3">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          <span className="font-medium">Distance</span>
        </div>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 text-gray-500" />
        ) : (
          <ChevronDown className="h-4 w-4 text-gray-500" />
        )}
      </div>
      
      {isOpen && (
        <div className="space-y-4 pt-2">
          <div className="px-2">
            <Slider
              value={distance}
              onValueChange={handleDistanceChange}
              max={50}
              min={0}
              step={5}
              className="w-full"
            />
          </div>
          <div className="flex justify-between text-sm text-gray-600 px-2">
            <span>{getDistanceLabel(distance[0])}</span>
            <span>50+ mi</span>
          </div>
        </div>
      )}
    </div>
  );
};