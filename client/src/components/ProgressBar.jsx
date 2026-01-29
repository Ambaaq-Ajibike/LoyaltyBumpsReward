import React from 'react';
import { FiTrendingUp } from 'react-icons/fi';

const ProgressBar = ({ current, target, label, unit = '' }) => {
  const safeTarget = target > 0 ? target : 1;
  const percentage = Math.min((current / safeTarget) * 100, 100);
  const remaining = Math.max(target - current, 0);
  const formatValue = (value) => `${value.toLocaleString()}${unit ? ` ${unit}` : ''}`;

  return (
    <div className="w-full">
      {/* Header with label and percentage */}
      <div className="flex justify-between items-center mb-5 sm:mb-6">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-md">
            <FiTrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <p className="text-base sm:text-lg font-bold text-gray-900">{label}</p>
        </div>
        <div className="flex items-baseline gap-1.5 sm:gap-2">
          <span className="text-2xl sm:text-3xl font-bold text-primary-600 font-display">{percentage.toFixed(0)}%</span>
          <span className="text-xs sm:text-sm text-gray-500 font-medium">Complete</span>
        </div>
      </div>

      {/* Progress bar container */}
      <div className="relative w-full bg-gray-200 rounded-full h-4 sm:h-5 overflow-hidden shadow-inner border border-gray-300">
        {/* Progress fill */}
        <div
          className="bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 h-full rounded-full transition-all duration-700 ease-out relative overflow-hidden"
          style={{ width: `${percentage}%` }}
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
        </div>

        {/* Goal marker */}
        {percentage < 100 && (
          <div 
            className="absolute top-1/2 -translate-y-1/2 w-1 h-7 bg-primary-700 rounded-full shadow-md"
            style={{ left: `${percentage}%` }}
            title="Current Progress"
          />
        )}
      </div>

      {/* Stats below progress bar */}
      <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-primary-500 rounded-full shadow-sm" />
          <div>
            <p className="text-xs text-gray-600 font-medium uppercase tracking-wide mb-0.5">Progress</p>
            <span className="text-sm sm:text-base font-bold text-gray-900">
              {formatValue(current)} / {formatValue(target)}
            </span>
          </div>
        </div>

        {/* Remaining amount badge */}
        {remaining > 0 && (
          <div className="bg-gradient-to-r from-accent-50 to-cyan-50 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl border border-accent-200 shadow-sm">
            <p className="text-xs text-accent-700 font-semibold uppercase tracking-wide mb-0.5">Remaining</p>
            <span className="text-sm sm:text-base font-bold text-accent-600">
              {formatValue(remaining)}
            </span>
          </div>
        )}

        {/* Complete badge */}
        {remaining <= 0 && (
          <div className="bg-gradient-to-r from-emerald-50 to-green-50 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl border border-emerald-200 shadow-sm">
            <p className="text-xs text-emerald-700 font-semibold uppercase tracking-wide">
              ✓ Goal Achieved!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressBar;
