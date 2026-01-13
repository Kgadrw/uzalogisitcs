'use client';

import { ReactNode, useState } from 'react';
import { HiOutlineArrowLeft, HiOutlineArrowRight, HiOutlineCheck } from 'react-icons/hi2';

interface StepFormProps {
  steps: { title: string; component: ReactNode }[];
  onSubmit: () => void;
  submitLabel?: string;
}

export default function StepForm({ steps, onSubmit, submitLabel = 'Submit' }: StepFormProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isLastStep = currentStep === steps.length - 1;

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-10 h-10 flex items-center justify-center border-2 ${
                  index <= currentStep
                    ? 'bg-primary border-primary text-secondary'
                    : 'border-primary border-opacity-30 text-primary text-opacity-50'
                }`}
              >
                {index + 1}
              </div>
              <div className="mt-2 text-sm text-primary text-opacity-70 text-center">
                {step.title}
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`h-0.5 flex-1 mx-2 ${
                  index < currentStep ? 'bg-primary' : 'bg-primary bg-opacity-20'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step content */}
      <div className="mb-6">{steps[currentStep].component}</div>

      <div className="flex justify-between">
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          className={`flex items-center gap-2 px-6 py-2 border border-primary ${
            currentStep === 0
              ? 'opacity-50 cursor-not-allowed'
              : 'text-primary hover:bg-primary hover:text-secondary'
          }`}
        >
          <HiOutlineArrowLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>
        {isLastStep ? (
          <button
            onClick={onSubmit}
            className="flex items-center gap-2 px-6 py-2 bg-primary text-secondary hover:bg-opacity-90"
          >
            <HiOutlineCheck className="w-4 h-4" />
            <span>{submitLabel}</span>
          </button>
        ) : (
          <button
            onClick={nextStep}
            className="flex items-center gap-2 px-6 py-2 bg-primary text-secondary hover:bg-opacity-90"
          >
            <span>Next</span>
            <HiOutlineArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

