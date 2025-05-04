import React from 'react';
import { useFormContext } from '../context/FormContext';

const Stepper: React.FC = () => {
  const { formState } = useFormContext();
  const { currentStep } = formState;
  
  const steps = [
    'Upload Resume',
    'Basic Information',
    'Skill Set',
    'Education',
    'Summary',
    'Completed',
  ];

  return (
    <div className="w-full py-8">
      <div className="flex items-center justify-between relative mb-8">
        {/* Connect lines */}
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200">
          <div 
            className="absolute h-0.5 bg-orange-500 transition-all duration-300" 
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>
        
        {/* Steps */}
        {steps.map((step, index) => (
          <div key={index} className="relative flex flex-col items-center z-10">
            <div className={`w-8 h-8 flex items-center justify-center rounded-full ${
              index <= currentStep ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              {index < currentStep ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                index + 1
              )}
            </div>
            <span className="text-xs mt-2">{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stepper;
