import React, { useState } from 'react';
import { useFormContext } from '../context/FormContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { educationSchema } from '../utils/validationSchemas';
import { Education } from '../context/FormContext';

const EducationComponent: React.FC = () => {
  const { formState, setFormState, nextStep, prevStep } = useFormContext();
  const [isAdding, setIsAdding] = useState(false);

  const addEducation = (education: Omit<Education, 'id'>) => {
    const newEducation = {
      ...education,
      id: Date.now().toString(),
    };
    
    setFormState(prev => ({
      ...prev,
      education: [...prev.education, newEducation]
    }));
    setIsAdding(false);
  };

  const removeEducation = (id: string) => {
    setFormState(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Education Details</h2>
      
      <div className="space-y-4 mb-6">
        {formState.education.length === 0 && !isAdding && (
          <div className="p-8 text-center border-2 border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500">No education entries added yet. Add your first education entry below.</p>
          </div>
        )}
        
        {formState.education.map((edu) => (
          <div key={edu.id} className="flex justify-between p-4 border border-gray-200 rounded-lg bg-gray-50">
            <div>
              <p className="font-medium">{edu.degree}</p>
              <p className="text-sm text-gray-600">{edu.institution}</p>
              <p className="text-sm text-gray-600">{edu.year}</p>
            </div>
            <button
              onClick={() => removeEducation(edu.id)}
              className="text-red-500 hover:text-red-700"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        ))}
      </div>
      
      {isAdding ? (
        <div className="border border-gray-200 rounded-lg p-4 mb-6">
          <Formik
            initialValues={{ degree: '', institution: '', year: '' }}
            validationSchema={educationSchema}
            onSubmit={addEducation}
          >
            <Form className="space-y-4">
              <div>
                <label htmlFor="degree" className="block text-sm font-medium text-gray-700 mb-1">
                  Degree Name
                </label>
                <Field
                  type="text"
                  id="degree"
                  name="degree"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="e.g., Bachelor of Science in Computer Science"
                />
                <ErrorMessage name="degree" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              
              <div>
                <label htmlFor="institution" className="block text-sm font-medium text-gray-700 mb-1">
                  University/College
                </label>
                <Field
                  type="text"
                  id="institution"
                  name="institution"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="e.g., Harvard University"
                />
                <ErrorMessage name="institution" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              
              <div>
                <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
                  Year of Completion
                </label>
                <Field
                  type="text"
                  id="year"
                  name="year"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="YYYY"
                />
                <ErrorMessage name="year" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
                >
                  Add Education
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center text-orange-500 border border-orange-500 px-4 py-2 rounded-md hover:bg-orange-50 transition-colors mb-6"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Education
        </button>
      )}
      
      <div className="flex justify-between pt-4">
        <button
          onClick={prevStep}
          className="px-6 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
        >
          Back
        </button>
        
        <button
          onClick={nextStep}
          className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EducationComponent;
