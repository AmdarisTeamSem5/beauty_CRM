// /components/layout/registration/types.ts
export interface FormData {
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
  
  export interface FormErrors {
    [key: string]: string;
  }
  
  export interface Step {
    number: number;
    title: string;
    subtitle: string;
  }
  
  export interface ServiceOption {
    key: keyof FormData['services'];
    title: string;
    description: string;
    icon: React.ReactNode;
  }