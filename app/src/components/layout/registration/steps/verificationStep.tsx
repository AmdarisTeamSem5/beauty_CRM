// /components/layout/registration/steps/VerificationStep.tsx
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail } from 'lucide-react';

interface VerificationStepProps {
  formData: {
    email: string;
    verificationCode: string;
  };
  errors: {
    verificationCode?: string;
  };
  onInputChange: (field: string, value: string) => void;
  onNext: () => void;
  onBack: () => void;
  onSendVerificationEmail: () => Promise<void>;
}

export default function VerificationStep({
  formData,
  errors,
  onInputChange,
  onNext,
  onBack,
  onSendVerificationEmail
}: VerificationStepProps): React.JSX.Element {
  const handleSendAgain = () => {
    onSendVerificationEmail().catch(() => {
      console.log('Verification email feature not available yet');
    });
  };

  return (
    <Card className="w-full max-w-2xl shadow-lg">
      <CardHeader className="text-center pb-6">
        <h2 className="text-2xl font-bold text-gray-900">Verify Your Information</h2>
        <p className="text-gray-500">
          We've sent a verification code to {formData.email}. Please enter it below to continue.
          <br />
          <span className="text-sm text-orange-600">(Skip for now if no email received)</span>
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="text-center">
          <Mail className="h-16 w-16 text-purple-600 mx-auto mb-4" />
          <p className="text-sm text-gray-600">
            Check your email for a 6-digit verification code and enter it below, or skip this step for now.
          </p>
        </div>

        <div className="max-w-xs mx-auto">
          <Label htmlFor="verificationCode">Verification Code (Optional)</Label>
          <Input
            id="verificationCode"
            placeholder="123456"
            className="text-center text-lg tracking-wider"
            maxLength={6}
            value={formData.verificationCode}
            onChange={(e) => onInputChange('verificationCode', e.target.value.replace(/\D/g, ''))}
          />
          {errors.verificationCode && (
            <p className="text-red-500 text-sm mt-1 text-center">{errors.verificationCode}</p>
          )}
        </div>

        <div className="text-center text-sm text-gray-500">
          Didn't receive the code?{' '}
          <button 
            type="button"
            className="text-purple-600 hover:underline"
            onClick={handleSendAgain}
          >
            Send again
          </button>
          {' or '}
          <button 
            type="button"
            className="text-purple-600 hover:underline"
            onClick={onNext}
          >
            skip verification
          </button>
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