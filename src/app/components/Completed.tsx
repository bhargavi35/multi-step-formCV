import React from 'react';

const Completed: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto p-6 text-center">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          <span className="text-orange-500">Great!</span> Thank You for Applying
        </h2>
        <p className="text-gray-600 mt-4">
          We appreciate your application. Our team will review it, and we&apos;ll reach out soon if there&apos;s a match. Stay tuned!
        </p>
      </div>
      
      <button className="mt-6 px-6 py-3 bg-orange-500 text-white font-medium rounded-md hover:bg-orange-600 transition-colors uppercase">
        Track Application
      </button>
    </div>
  );
};

export default Completed;
