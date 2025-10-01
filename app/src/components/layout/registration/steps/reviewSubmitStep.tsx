// /components/layout/registration/steps/ReviewSubmitStep.tsx
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

interface FormData {
  salonName: string;
  contactName: string;
  email: string;
  phone: string;
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

interface ServiceOption {
  key: keyof FormData['services'];
  title: string;
}

interface ReviewSubmitStepProps {
  formData: FormData;
  errors: { submit?: string };
  isSubmitting: boolean;
  serviceOptions: ServiceOption[];
  onSubmit: () => void;
  onBack: () => void;
}

export default function ReviewSubmitStep({
  formData,
  errors,
  isSubmitting,
  serviceOptions,
  onSubmit,
  onBack
}: ReviewSubmitStepProps): React.JSX.Element {
  return (
    <Card className="w-full max-w-2xl shadow-lg">
      <CardHeader className="text-center pb-6">
        <h2 className="text-2xl font-bold text-gray-900">Review & Submit</h2>
        <p className="text-gray-500">Please review your information before submitting your registration.</p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Salon Information */}
        <div className="border rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-3">Salon Information</h3>
          <div className="space-y-2 text-sm">
            <div><span className="text-gray-500">Salon Name:</span> {formData.salonName}</div>
            <div><span className="text-gray-500">Contact:</span> {formData.contactName}</div>
            <div><span className="text-gray-500">Email:</span> {formData.email}</div>
            <div><span className="text-gray-500">Phone:</span> {formData.phone}</div>
          </div>
        </div>

        {/* Location */}
        <div className="border rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-3">Location</h3>
          <div className="text-sm text-gray-600">
            {formData.streetAddress}<br />
            {formData.city}, {formData.state} {formData.zipCode}
          </div>
        </div>

        {/* Services */}
        <div className="border rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-3">Services Offered</h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(formData.services)
              .filter(([_, selected]) => selected)
              .map(([service, _]) => (
                <span key={service} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                  {serviceOptions.find(opt => opt.key === service)?.title || service}
                </span>
              ))}
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="text-sm">
              <p className="text-blue-900 font-medium">Almost there!</p>
              <p className="text-blue-700">
                By submitting this form, you agree to our terms of service and privacy policy. 
                Your registration will be reviewed within 24-48 hours.
              </p>
            </div>
          </div>
        </div>

        {errors.submit && <p className="text-red-500 text-sm">{errors.submit}</p>}

        <div className="flex justify-between pt-4">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="px-8"
            disabled={isSubmitting}
          >
            Back
          </Button>
          <Button 
            onClick={onSubmit}
            className="bg-purple-600 hover:bg-purple-700 px-8"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Registration'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}