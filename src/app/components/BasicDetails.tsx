import React from 'react';
import { useFormContext } from '../context/FormContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { basicInfoSchema } from '../utils/validationSchemas';

const BasicDetails: React.FC = () => {
  const { formState, setFormState, nextStep, prevStep } = useFormContext();
  
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Basic Information</h2>
      
      <Formik
        initialValues={formState.basicInfo}
        validationSchema={basicInfoSchema}
        onSubmit={(values) => {
          setFormState(prev => ({
            ...prev,
            basicInfo: values
          }));
          nextStep();
        }}
      >
        {({ isValid, dirty }) => (
          <Form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <Field
                type="text"
                id="name"
                name="name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter your full name"
              />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter your email address"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <Field
                type="tel"
                id="phone"
                name="phone"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter your phone number"
              />
              <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            
            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
              >
                Back
              </button>
              
              <button
                type="submit"
                className={`px-6 py-2 rounded-md transition-colors ${
                  isValid && dirty
                    ? 'bg-orange-500 text-white hover:bg-orange-600'
                    : 'bg-orange-500 text-white opacity-90 hover:bg-orange-600'
                }`}
              >
                Next
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BasicDetails;
