import { ChevronUp, ChevronDown } from "lucide-react";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface OtherFilterProps {
  filters: any;
}

export const OtherFilter = ({ filters }: OtherFilterProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [partnerOnly, setPartnerOnly] = useState(false);

  const handlePartnerOnlyChange = (checked: boolean) => {
    setPartnerOnly(checked);
    filters.setPartnerOnly?.(checked);
  };

  return (
    <div className="space-y-3">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium">Other</span>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 text-gray-500" />
        ) : (
          <ChevronDown className="h-4 w-4 text-gray-500" />
        )}
      </div>
      
      {isOpen && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="partner-salons-only"
              name="partner-filter"
              checked={partnerOnly}
              onChange={(e) => handlePartnerOnlyChange(e.target.checked)}
              className="w-4 h-4 text-pink-500 border-gray-300 focus:ring-pink-500"
            />
            <Label 
              htmlFor="partner-salons-only"
              className="text-sm font-normal cursor-pointer"
            >
              Partner salons only
            </Label>
          </div>
        </div>
      )}
    </div>
  );
};