// src/components/Input.jsx
import React from 'react';

const Input = ({ label, value, onChange, className, ...props }) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <input
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  );
};

export default Input;
