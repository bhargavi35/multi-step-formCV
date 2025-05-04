import React, { useRef, useState } from 'react';
import { useFormContext } from '../context/FormContext';

const UploadResume: React.FC = () => {
  const { formState, setFormState, nextStep } = useFormContext();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleFile = (file: File) => {
    // Only allow PDF files
    if (file.type !== 'application/pdf') {
      alert('Please upload a PDF file');
      return;
    }

    const url = URL.createObjectURL(file);
    setFormState(prev => ({
      ...prev,
      resume: file,
      resumeUrl: url
    }));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeFile = () => {
    setFormState(prev => ({
      ...prev,
      resume: null,
      resumeUrl: null
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Upload Your Resume</h2>
      
      <div 
        className={`border-2 border-dashed rounded-lg p-8 text-center ${
          dragActive ? 'border-orange-500 bg-orange-50' : 'border-gray-300 hover:border-orange-500'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {formState.resume ? (
          <div className="flex flex-col items-center justify-center">
            <svg className="w-16 h-16 text-orange-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-lg font-medium mb-2">{formState.resume.name}</p>
            <button 
              onClick={removeFile}
              className="text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </div>
        ) : (
          <div>
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="text-lg mb-4">Drag & drop your resume here</p>
            <p className="text-gray-500 mb-4">or</p>
            <button 
              onClick={triggerFileInput}
              className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
            >
              Browse Files
            </button>
            <p className="text-xs text-gray-500 mt-4">Supported format: PDF</p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        )}
      </div>

      <div className="flex justify-end mt-8">
        <button
          onClick={nextStep}
          disabled={!formState.resume}
          className={`px-6 py-3 rounded-md transition-colors ${
            formState.resume 
              ? 'bg-orange-500 text-white hover:bg-orange-600' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UploadResume;
