// page.tsx
'use client';

import React from 'react';
import { FormProvider, useFormContext } from './context/FormContext';
import Stepper from './components/Stepper';
import UploadResume from './components/UploadResume';
import BasicDetails from './components/BasicDetails';
import Skills from './components/Skills';
import Education from './components/Education';
import Summary from './components/Summary';
import Completed from './components/Completed';

const FormWrapper = () => {
  const { formState } = useFormContext();
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <Stepper />
        
        {formState.currentStep === 0 && <UploadResume />}
        {formState.currentStep === 1 && <BasicDetails />}
        {formState.currentStep === 2 && <Skills />}
        {formState.currentStep === 3 && <Education />}
        {formState.currentStep === 4 && <Summary />}
        {formState.currentStep === 5 && <Completed />}
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <FormProvider>
      <FormWrapper />
    </FormProvider>
  );
}
