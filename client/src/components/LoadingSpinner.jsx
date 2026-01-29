import React from 'react';

const LoadingSpinner = ({ fullScreen = false }) => {
  const content = (
    <div className="flex flex-col items-center justify-center gap-6 sm:gap-8">
      {/* Spinner */}
      <div className="relative w-20 h-20 sm:w-24 sm:h-24">
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-4 border-primary-100" />
        
        {/* Rotating rings */}
        <div 
          className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary-500 border-r-accent-500 animate-spin" 
          style={{ animationDuration: '1s' }}
        />
        <div 
          className="absolute inset-2 rounded-full border-4 border-transparent border-b-primary-400 border-l-accent-400 animate-spin"
          style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}
        />
        
        {/* Center dot */}
        <div className="absolute inset-1/3 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 shadow-lg" />
      </div>

      {/* Text content */}
      <div className="text-center">
        <p className="text-gray-900 font-bold text-lg sm:text-xl mb-2">Loading...</p>
        <p className="text-gray-500 text-sm sm:text-base leading-relaxed">Fetching your achievements</p>
      </div>

      {/* Animated dots */}
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
        <div className="w-2 h-2 bg-accent-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
        <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-white via-primary-50/20 to-accent-50/10 flex items-center justify-center z-50 backdrop-blur-sm">
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-8 sm:p-12">
      {content}
    </div>
  );
};

export default LoadingSpinner;
