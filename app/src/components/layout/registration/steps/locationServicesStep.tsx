// /components/layout/registration/steps/LocationServicesStep.tsx
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin, Scissors, Sparkles, Heart } from 'lucide-react';

interface FormData {
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  services: {
    hairServices: boolean;
    nailServices: boolean;
    skincare: boolean;
    makeup: boolean;
    barberServices: boolean;
    wellness: boolean;
  };
}

interface FormErrors {
  [key: string]: string;
}

interface ServiceOption {
  key: keyof FormData['services'];
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface LocationServicesStepProps {
  formData: FormData;
  errors: FormErrors;
  onInputChange: (field: keyof FormData, value: string) => void;
  onServiceChange: (service: keyof FormData['services']) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function LocationServicesStep({
  formData,
  errors,
  onInputChange,
  onServiceChange,
  onNext,
  onBack
}: LocationServicesStepProps): React.JSX.Element {
  const serviceOptions: ServiceOption[] = [
    {
      key: 'hairServices',
      title: 'Hair Services',
      description: 'Cuts, styling, coloring, treatments',
      icon: <Scissors className="h-5 w-5 text-purple-600 mt-0.5" />
    },
    {
      key: 'nailServices',
      title: 'Nail Services',
      description: 'Manicures, pedicures, nail art',
      icon: <Sparkles className="h-5 w-5 text-purple-600 mt-0.5" />
    },
    {
      key: 'skincare',
      title: 'Skincare',
      description: 'Facials, treatments, skincare',
      icon: <Heart className="h-5 w-5 text-purple-600 mt-0.5" />
    },
    {
      key: 'makeup',
      title: 'Makeup',
      description: 'Makeup application, lessons',
      icon: <Sparkles className="h-5 w-5 text-purple-600 mt-0.5" />
    },
    {
      key: 'barberServices',
      title: 'Barber Services',
      description: 'Men\'s cuts, shaves, grooming',
      icon: <Scissors className="h-5 w-5 text-purple-600 mt-0.5" />
    },
    {
      key: 'wellness',
      title: 'Wellness',
      description: 'Massage, aromatherapy, wellness',
      icon: <Heart className="h-5 w-5 text-purple-600 mt-0.5" />
    }
  ];

  return (
    <Card className="w-full max-w-2xl shadow-lg">
      <CardHeader className="text-center pb-6">
        <h2 className="text-2xl font-bold text-gray-900">Location & Services</h2>
        <p className="text-gray-500">Help customers find you by providing your location and the services you offer.</p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Salon Address */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <MapPin className="h-5 w-5 text-gray-400" />
            <h3 className="text-lg font-medium">Salon Address</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="streetAddress">Street Address *</Label>
              <Input
                id="streetAddress"
                placeholder="123 Main Street"
                value={formData.streetAddress}
                onChange={(e) => onInputChange('streetAddress', e.target.value)}
              />
              {errors.streetAddress && <p className="text-red-500 text-sm mt-1">{errors.streetAddress}</p>}
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  placeholder="New York"
                  value={formData.city}
                  onChange={(e) => onInputChange('city', e.target.value)}
                />
                {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
              </div>
              
              <div>
                <Label htmlFor="state">State *</Label>
                <Input
                  id="state"
                  placeholder="NY"
                  value={formData.state}
                  onChange={(e) => onInputChange('state', e.target.value)}
                />
                {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
              </div>
              
              <div>
                <Label htmlFor="zipCode">ZIP Code *</Label>
                <Input
                  id="zipCode"
                  placeholder="10001"
                  value={formData.zipCode}
                  onChange={(e) => onInputChange('zipCode', e.target.value)}
                />
                {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Service Categories */}
        <div>
          <h3 className="text-lg font-medium mb-2">Service Categories</h3>
          <p className="text-sm text-gray-500 mb-4">Select the types of services your salon offers. This helps customers find exactly what they're looking for.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {serviceOptions.map((service) => (
              <label 
                key={service.key}
                className={`flex items-start space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                  formData.services[service.key] ? 'border-purple-200 bg-purple-50' : ''
                }`}
              >
                <input
                  type="checkbox"
                  checked={formData.services[service.key]}
                  onChange={() => onServiceChange(service.key)}
                  className="mt-1"
                />
                <div className="flex items-start space-x-2">
                  {service.icon}
                  <div>
                    <div className="font-medium">{service.title}</div>
                    <div className="text-sm text-gray-500">{service.description}</div>
                  </div>
                </div>
              </label>
            ))}
          </div>
          
          {errors.services && <p className="text-red-500 text-sm mt-2">{errors.services}</p>}
        </div>

        <div className="flex justify-between pt-4">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="px-8"
          >
            Back
          </Button>
          <Button 
            onClick={onNext}
            className="bg-purple-600 hover:bg-purple-700 px-8"
          >
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}