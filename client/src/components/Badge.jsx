import React from 'react';

const Badge = ({ variant = 'primary', children, className = '' }) => {
  const variants = {
    primary: 'bg-gradient-to-r from-primary-500 to-primary-600 text-white border-0 shadow-md hover:shadow-lg hover:scale-105',
    accent: 'bg-gradient-to-r from-accent-500 to-cyan-500 text-white border-0 shadow-md hover:shadow-lg hover:scale-105',
    success: 'bg-emerald-100 text-emerald-800 border-2 border-emerald-300 shadow-sm hover:shadow-md',
    warning: 'bg-amber-100 text-amber-900 border-2 border-amber-300 shadow-sm hover:shadow-md',
    info: 'bg-blue-100 text-blue-800 border-2 border-blue-300 shadow-sm hover:shadow-md',
    secondary: 'bg-gray-200 text-gray-800 border-0 shadow-sm hover:shadow-md',
    outline: 'bg-transparent border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50',
  };

  return (
    <span className={`inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
