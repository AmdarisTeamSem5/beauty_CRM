// /components/layout/registration/steps/BasicInformationStep.tsx
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Building, 
  Eye,
  EyeOff
} from 'lucide-react';

interface FormData {
  salonType: 'individual' | 'business';
  salonName: string;
  contactName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  [key: string]: string;
}

interface BasicInformationStepProps {
  formData: FormData;
  errors: FormErrors;
  showPassword: boolean;
  showConfirmPassword: boolean;
  onInputChange: (field: keyof FormData, value: string) => void;
  onNext: () => void;
  onTogglePassword: (field: 'password' | 'confirmPassword') => void;
}

export default function BasicInformationStep({
  formData,
  errors,
  showPassword,
  showConfirmPassword,
  onInputChange,
  onNext,
  onTogglePassword
}: BasicInformationStepProps): React.JSX.Element {
  return (
    <Card className="w-full max-w-2xl shadow-lg">
      <CardHeader className="text-center pb-6">
        <h2 className="text-2xl font-bold text-gray-900">Tell Us About Your Salon</h2>
        <p className="text-gray-500">Let's start with the basics - this helps us create your perfect salon profile.</p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Salon Type */}
        <div>
          <Label className="text-base font-medium">What type of business do you run?</Label>
          <div className="mt-3">
            <label className="flex items-start space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="salonType"
                value="individual"
                checked={formData.salonType === 'individual'}
                onChange={(e) => onInputChange('salonType', e.target.value as 'individual')}
                className="mt-1"
              />
              <div>
                <div className="font-medium">I'm an individual stylist or one-person salon</div>
                <div className="text-sm text-gray-500">Check this if you work independently or run a solo practice</div>
              </div>
            </label>
          </div>
        </div>

        {/* Salon Name */}
        <div>
          <Label htmlFor="salonName">Salon Name *</Label>
          <div className="relative mt-1">
            <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="salonName"
              className="pl-10"
              placeholder="e.g., Glamour Beauty Salon"
              value={formData.salonName}
              onChange={(e) => onInputChange('salonName', e.target.value)}
            />
          </div>
          {errors.salonName && <p className="text-red-500 text-sm mt-1">{errors.salonName}</p>}
        </div>

        {/* Contact Name */}
        <div>
          <Label htmlFor="contactName">Business Contact Name *</Label>
          <div className="relative mt-1">
            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="contactName"
              className="pl-10"
              placeholder="e.g., John Smith"
              value={formData.contactName}
              onChange={(e) => onInputChange('contactName', e.target.value)}
            />
          </div>
          {errors.contactName && <p className="text-red-500 text-sm mt-1">{errors.contactName}</p>}
        </div>

        {/* Email and Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="email">Email Address *</Label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                className="pl-10"
                placeholder="contact@salon.com"
                value={formData.email}
                onChange={(e) => onInputChange('email', e.target.value)}
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          
          <div>
            <Label htmlFor="phone">Phone Number *</Label>
            <div className="relative mt-1">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="phone"
                type="tel"
                className="pl-10"
                placeholder="(555) 123-4567"
                value={formData.phone}
                onChange={(e) => onInputChange('phone', e.target.value)}
              />
            </div>
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>
        </div>

        {/* Password Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="password">Password *</Label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                className="pl-10 pr-10"
                placeholder="Create a secure password"
                value={formData.password}
                onChange={(e) => onInputChange('password', e.target.value)}
              />
              <button
                type="button"
                onClick={() => onTogglePassword('password')}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
          
          <div>
            <Label htmlFor="confirmPassword">Confirm Password *</Label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                className="pl-10 pr-10"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => onInputChange('confirmPassword', e.target.value)}
              />
              <button
                type="button"
                onClick={() => onTogglePassword('confirmPassword')}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>
        </div>

        <div className="flex justify-end pt-4">
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