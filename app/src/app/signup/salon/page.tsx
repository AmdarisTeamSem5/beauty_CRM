// /app/signup/customer/page.tsx
"use client";

import React, { useState } from 'react';
import Link from 'next/link';

// Import components
import ProgressBar from '@/components/layout/registration/progressBar';
import BasicInformationStep from '@/components/layout/registration/steps/basicInformationStep';
import LocationServicesStep from '@/components/layout/registration/steps/locationServicesStep';
import VerificationStep from '@/components/layout/registration/steps/verificationStep';
import ReviewSubmitStep from '@/components/layout/registration/steps/reviewSubmitStep';
import SuccessPage from '@/components/layout/registration/successPage';

interface FormData {
  // Step 1: Basic Information
  salonType: 'individual' | 'business';
  salonName: string;
  contactName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  
  // Step 2: Location & Services
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
  
  // Step 3: Verification
  verificationCode: string;
}

interface FormErrors {
  [key: string]: string;
}

interface Step {
  number: number;
  title: string;
  subtitle: string;
}

interface ServiceOption {
  key: keyof FormData['services'];
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function SalonOwnerRegistrationPage(): React.JSX.Element {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  const [formData, setFormData] = useState<FormData>({
    // Step 1: Basic Information
    salonType: 'individual',
    salonName: '',
    contactName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    
    // Step 2: Location & Services
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    services: {
      hairServices: false,
      nailServices: false,
      skincare: false,
      makeup: false,
      barberServices: false,
      wellness: false
    },
    
    // Step 3: Verification
    verificationCode: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const steps: Step[] = [
    { number: 1, title: 'Basic Information', subtitle: 'Tell us about your salon' },
    { number: 2, title: 'Location & Services', subtitle: 'Where are you and what do you offer?' },
    { number: 3, title: 'Verification', subtitle: 'Verify your contact information' },
    { number: 4, title: 'Review & Submit', subtitle: 'Final step before approval' }
  ];

  const serviceOptions: ServiceOption[] = [
    {
      key: 'hairServices',
      title: 'Hair Services',
      description: 'Cuts, styling, coloring, treatments',
      icon: null // Icons handled in the step components
    },
    {
      key: 'nailServices',
      title: 'Nail Services',
      description: 'Manicures, pedicures, nail art',
      icon: null
    },
    {
      key: 'skincare',
      title: 'Skincare',
      description: 'Facials, treatments, skincare',
      icon: null
    },
    {
      key: 'makeup',
      title: 'Makeup',
      description: 'Makeup application, lessons',
      icon: null
    },
    {
      key: 'barberServices',
      title: 'Barber Services',
      description: 'Men\'s cuts, shaves, grooming',
      icon: null
    },
    {
      key: 'wellness',
      title: 'Wellness',
      description: 'Massage, aromatherapy, wellness',
      icon: null
    }
  ];

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};
    
    if (step === 1) {
      if (!formData.salonName.trim()) {
        newErrors.salonName = formData.salonType === 'individual' 
          ? 'Professional name is required' 
          : 'Salon name is required';
      }
      
      // Only validate contactName for business type
      if (formData.salonType === 'business' && !formData.contactName.trim()) {
        newErrors.contactName = 'Contact name is required';
      }
      
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
      }
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    
    if (step === 2) {
      if (!formData.streetAddress.trim()) newErrors.streetAddress = 'Street address is required';
      if (!formData.city.trim()) newErrors.city = 'City is required';
      if (!formData.state.trim()) newErrors.state = 'State is required';
      if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
      
      const hasServices = Object.values(formData.services).some(service => service);
      if (!hasServices) newErrors.services = 'Please select at least one service category';
    }
    
    if (step === 3) {
      // Make verification optional for now until API is implemented
      if (formData.verificationCode.trim() && formData.verificationCode.length !== 6) {
        newErrors.verificationCode = 'Verification code must be 6 digits';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async (): Promise<void> => {
    if (validateStep(currentStep)) {
      if (currentStep === 1) {
        // Send verification email (optional for now)
        try {
          await sendVerificationEmail();
        } catch (error) {
          console.warn('Verification email failed, continuing without verification:', error);
          // Continue anyway - verification is optional for now
        }
      }
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = (): void => {
    setCurrentStep(currentStep - 1);
    setErrors({});
  };

  const handleInputChange = (field: string, value: string): void => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleServiceChange = (service: keyof FormData['services']): void => {
    setFormData(prev => ({
      ...prev,
      services: { ...prev.services, [service]: !prev.services[service] }
    }));
    // Clear services error when user selects a service
    if (errors.services) {
      setErrors(prev => ({ ...prev, services: '' }));
    }
  };

  const handleTogglePassword = (field: 'password' | 'confirmPassword'): void => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const sendVerificationEmail = async (): Promise<void> => {
    try {
      const { authenticationService } = await import("@/lib/api/authentication");
      // Note: Backend requires password for 2FA, but for registration we might skip this
      // For now, we'll skip verification during registration
      console.warn('Verification skipped during registration');
    } catch (error) {
      console.warn('Verification API not available, skipping verification');
    }
  };

  const handleSubmit = async (): Promise<void> => {
    if (!validateStep(4)) return;

    setIsSubmitting(true);
    
    try {
      const { userService } = await import("@/lib/api/users");
      const { salonService } = await import("@/lib/api/salons");

      // 1. Create user account first
      const [firstName, ...lastNameParts] = formData.contactName.split(" ");
      const lastName = lastNameParts.join(" ") || "";

      const userData = {
        email: formData.email,
        firstName: firstName || formData.contactName,
        lastName: lastName,
        phoneNumber: formData.phone,
        isBlocked: false,
      };

      const userId = await userService.create(userData);

      // 2. Create salon with the user as owner
      const address = `${formData.streetAddress}, ${formData.city}, ${formData.state} ${formData.zipCode}`;
      
      const salonData = {
        ownerId: userId,
        name: formData.salonName,
        rating: 0,
        description: `${formData.salonType} salon`,
        address: address,
        region: 0, // You may need to map state to region number
        phone: formData.phone,
        email: formData.email,
        dateTime: new Date().toISOString(),
        ratingCount: 0,
      };

      const salonId = await salonService.create(salonData);
      console.log("Salon registered successfully:", salonId);

      setCurrentStep(5); // Move to success page
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show success page if on step 5
  if (currentStep === 5) {
    return <SuccessPage />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-md mb-4">
        <Link href="/" className="text-sm text-gray-600 hover:underline">
          ← Back to Home
        </Link>
      </div>
      
      <ProgressBar currentStep={currentStep} steps={steps} />
      
      {currentStep === 1 && (
        <BasicInformationStep
          formData={formData}
          errors={errors}
          showPassword={showPassword}
          showConfirmPassword={showConfirmPassword}
          onInputChange={handleInputChange}
          onNext={handleNext}
          onTogglePassword={handleTogglePassword}
        />
      )}
      
      {currentStep === 2 && (
        <LocationServicesStep
          formData={formData}
          errors={errors}
          onInputChange={handleInputChange}
          onServiceChange={handleServiceChange}
          onNext={handleNext}
          onBack={handleBack}
        />
      )}
      
      {currentStep === 3 && (
        <VerificationStep
          formData={formData}
          errors={errors}
          onInputChange={handleInputChange}
          onNext={handleNext}
          onBack={handleBack}
          onSendVerificationEmail={sendVerificationEmail}
        />
      )}
      
      {currentStep === 4 && (
        <ReviewSubmitStep
          formData={formData}
          errors={errors}
          isSubmitting={isSubmitting}
          serviceOptions={serviceOptions}
          onSubmit={handleSubmit}
          onBack={handleBack}
        />
      )}
    </div>
  );
}