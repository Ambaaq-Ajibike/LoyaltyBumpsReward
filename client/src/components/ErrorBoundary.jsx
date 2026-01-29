import React from 'react';
import { FiAlertCircle, FiRefreshCw, FiArrowRight } from 'react-icons/fi';

const ErrorBoundary = ({ error, onRetry }) => {
  return (
    <div className="relative bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-medium overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-red-100/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-100/20 rounded-full blur-3xl" />
      
      <div className="relative flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
        {/* Error Icon */}
        <div className="flex-shrink-0">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-lg">
            <FiAlertCircle className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
          </div>
        </div>
        
        {/* Error Message */}
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-xl sm:text-2xl text-gray-900 mb-3 font-display">
            Oops! Something went wrong
          </h3>
          <p className="text-sm sm:text-base text-gray-700 mb-6 leading-relaxed">
            {error || 'We encountered an error while loading your achievements. Our team has been notified. Please try again or contact support if the problem persists.'}
          </p>
          
          {/* Action Buttons */}
          {onRetry && (
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={onRetry}
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base hover:from-red-700 hover:to-red-800 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <FiRefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
                Try Again
              </button>
              
              <button
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-white text-red-600 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base border-2 border-red-200 hover:bg-red-50 transition-all duration-300 hover:border-red-300"
              >
                Contact Support
                <FiArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorBoundary;
