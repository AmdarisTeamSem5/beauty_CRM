// /components/layout/registration/ProgressBar.tsx
import React from 'react';
import { CheckCircle } from 'lucide-react';

interface Step {
  number: number;
  title: string;
  subtitle: string;
}

interface ProgressBarProps {
  currentStep: number;
  steps: Step[];
}

export default function ProgressBar({ currentStep, steps }: ProgressBarProps): React.JSX.Element {
  const getCompletionPercentage = (): number => {
    return Math.round(((currentStep - 1) / (steps.length)) * 100);
  };

  return (
    <div className="w-full max-w-4xl mb-8">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-gray-500">Step {currentStep} of {steps.length}</span>
        <span className="text-sm text-gray-500">{getCompletionPercentage()}% Complete</span>
      </div>
      
      <div className="flex items-center justify-between mb-6">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 text-sm font-medium ${
                currentStep > step.number 
                  ? 'bg-purple-600 border-purple-600 text-white'
                  : currentStep === step.number
                    ? 'bg-purple-100 border-purple-600 text-purple-600'
                    : 'bg-gray-100 border-gray-300 text-gray-400'
              }`}>
                {currentStep > step.number ? <CheckCircle className="w-5 h-5" /> : step.number}
              </div>
              <div className="mt-2 text-center">
                <div className="text-sm font-medium text-gray-900">{step.title}</div>
                <div className="text-xs text-gray-500">{step.subtitle}</div>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-4 ${
                currentStep > step.number ? 'bg-purple-600' : 'bg-gray-200'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}