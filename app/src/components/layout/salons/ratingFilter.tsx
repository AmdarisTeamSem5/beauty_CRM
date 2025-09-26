import { Slider } from "@/components/ui/slider";
import { ChevronUp, ChevronDown } from "lucide-react";
import { useState } from "react";

interface RatingFilterProps {
  filters: any; 
}

export const RatingFilter = ({ filters }: RatingFilterProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [rating, setRating] = useState([0]); 

  const handleRatingChange = (value: number[]) => {
    setRating(value);
    filters.setRating?.(value[0]);
  };

  const getRatingLabel = (rating: number) => {
    if (rating === 0) return "Any";
    return `${rating} star${rating > 1 ? 's' : ''}`;
  };

  return (
    <div className="space-y-3">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          <span className="font-medium">Minimum Rating</span>
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
              value={rating}
              onValueChange={handleRatingChange}
              max={5}
              min={0}
              step={0.5}
              className="w-full"
            />
          </div>
          <div className="flex justify-between text-sm text-gray-600 px-2">
            <span>{getRatingLabel(rating[0])}</span>
            <span>5 stars</span>
          </div>
        </div>
      )}
    </div>
  );
};