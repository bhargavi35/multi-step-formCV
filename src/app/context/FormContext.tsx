import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define types
export interface Skill {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Expert';
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  year: string;
}

export interface FormState {
  resume: File | null;
  resumeUrl: string | null;
  basicInfo: {
    name: string;
    email: string;
    phone: string;
  };
  skills: Skill[];
  education: Education[];
  currentStep: number;
}

interface FormContextType {
  formState: FormState;
  setFormState: React.Dispatch<React.SetStateAction<FormState>>;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
}

const initialState: FormState = {
  resume: null,
  resumeUrl: null,
  basicInfo: {
    name: '',
    email: '',
    phone: '',
  },
  skills: [],
  education: [],
  currentStep: 0,
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [formState, setFormState] = useState<FormState>(initialState);

  const nextStep = () => {
    setFormState(prev => ({
      ...prev,
      currentStep: Math.min(prev.currentStep + 1, 5)
    }));
  };

  const prevStep = () => {
    setFormState(prev => ({
      ...prev,
      currentStep: Math.max(prev.currentStep - 1, 0)
    }));
  };

  const goToStep = (step: number) => {
    setFormState(prev => ({
      ...prev,
      currentStep: Math.min(Math.max(step, 0), 5)
    }));
  };

  return (
    <FormContext.Provider value={{ formState, setFormState, nextStep, prevStep, goToStep }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};
