import React, { useState } from 'react';
import { useFormContext } from '../context/FormContext';

const Summary: React.FC = () => {
  const { formState, nextStep, prevStep } = useFormContext();
  const [agreed, setAgreed] = useState(false);

  const handleDownload = () => {
    if (formState.resumeUrl) {
      const a = document.createElement('a');
      a.href = formState.resumeUrl;
      a.download = formState.resume?.name || 'resume.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Summary</h2>
      
      <div className="space-y-6">
        {/* Basic Information */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
            <h3 className="font-medium">Basic Information</h3>
          </div>
          <div className="p-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">{formState.basicInfo.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{formState.basicInfo.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">{formState.basicInfo.phone}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Skills */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
            <h3 className="font-medium">Skills</h3>
          </div>
          <div className="p-4">
            {formState.skills.length === 0 ? (
              <p className="text-gray-500">No skills added.</p>
            ) : (
              <div className="space-y-4">
                {formState.skills.map((skill) => (
                  <div key={skill.id}>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-sm text-gray-600">{skill.level}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-orange-500 h-2 rounded-full" 
                        style={{ 
                          width: skill.level === 'Beginner' ? '33%' : 
                                 skill.level === 'Intermediate' ? '66%' : '100%' 
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Education */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
            <h3 className="font-medium">Education</h3>
          </div>
          <div className="p-4">
            {formState.education.length === 0 ? (
              <p className="text-gray-500">No education entries added.</p>
            ) : (
              <div className="space-y-4">
                {formState.education.map((edu) => (
                  <div key={edu.id}>
                    <p className="font-medium">{edu.degree}</p>
                    <p className="text-sm text-gray-600">{edu.institution}</p>
                    <p className="text-sm text-gray-600">Completed in {edu.year}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Resume */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
            <h3 className="font-medium">Uploaded Resume</h3>
          </div>
          <div className="p-4">
            {formState.resume ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <span>{formState.resume.name}</span>
                </div>
                <button
                  onClick={handleDownload}
                  className="px-3 py-1 text-orange-500 border border-orange-500 rounded hover:bg-orange-50 transition-colors"
                >
                  Download
                </button>
              </div>
            ) : (
              <p className="text-gray-500">No resume uploaded.</p>
            )}
          </div>
        </div>
      </div>

      {/* Disclaimer and Checkbox */}
      <div className="mt-8 bg-gray-50 p-4 rounded">
        <p className="text-sm text-gray-700 mb-2">
          <strong>By submitting this form, you confirm that all information provided is accurate and complete to the best of your knowledge.</strong> Any false or misleading information may result in disqualification from the recruitment process or termination of employment if discovered later.
        </p>
        <p className="text-sm text-gray-700 mb-4">
          Submission of this form does not guarantee an interview or employment. Your personal data will be handled confidentially and used solely for recruitment purposes in accordance with Beyonds Labs LLC Privacy Policy.
        </p>
        <label className="flex items-start space-x-2">
          <input
            type="checkbox"
            checked={agreed}
            onChange={() => setAgreed(!agreed)}
            className="mt-1 accent-orange-500"
          />
          <span className="text-sm text-gray-700">
            By submitting, you agree to our <a href="#" className="underline text-orange-500">Terms &amp; Conditions</a>.
          </span>
        </label>
      </div>
      
      <div className="flex justify-between mt-8">
        <button
          onClick={prevStep}
          className="px-6 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
        >
          Edit
        </button>
        
        <button
          onClick={nextStep}
          disabled={!agreed}
          className={`px-6 py-2 rounded-md transition-colors ${
            agreed
              ? 'bg-orange-500 text-white hover:bg-orange-600'
              : 'bg-orange-200 text-white cursor-not-allowed'
          }`}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default Summary;
