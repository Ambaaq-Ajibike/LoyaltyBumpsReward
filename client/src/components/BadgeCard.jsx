import React from 'react';
import { FiAward, FiStar, FiCheck } from 'react-icons/fi';

const BadgeCard = ({ badge, isCurrent = false, isNext = false }) => {
  const getBadgeColor = (badge) => {
    const colors = {
      'Bronze': { 
        bg: 'bg-gradient-to-br from-orange-100 to-amber-100', 
        border: 'border-orange-300', 
        icon: 'text-orange-600', 
        glow: 'shadow-orange-500/20',
        gradient: 'from-orange-500 to-amber-500',
        accent: 'orange'
      },
      'Silver': { 
        bg: 'bg-gradient-to-br from-gray-100 to-slate-100', 
        border: 'border-gray-300', 
        icon: 'text-gray-600', 
        glow: 'shadow-gray-500/20',
        gradient: 'from-gray-400 to-slate-500',
        accent: 'gray'
      },
      'Gold': { 
        bg: 'bg-gradient-to-br from-yellow-100 to-amber-100', 
        border: 'border-yellow-300', 
        icon: 'text-yellow-600', 
        glow: 'shadow-yellow-500/20',
        gradient: 'from-yellow-500 to-amber-500',
        accent: 'yellow'
      },
      'Platinum': { 
        bg: 'bg-gradient-to-br from-blue-100 to-cyan-100', 
        border: 'border-blue-300', 
        icon: 'text-blue-600', 
        glow: 'shadow-blue-500/20',
        gradient: 'from-blue-500 to-cyan-500',
        accent: 'blue'
      },
      'Diamond': { 
        bg: 'bg-gradient-to-br from-purple-100 to-pink-100', 
        border: 'border-purple-300', 
        icon: 'text-purple-600', 
        glow: 'shadow-purple-500/20',
        gradient: 'from-purple-500 to-pink-500',
        accent: 'purple'
      },
    };
    return colors[badge] || { 
      bg: 'bg-gradient-to-br from-gray-100 to-slate-100', 
      border: 'border-gray-300', 
      icon: 'text-gray-600', 
      glow: 'shadow-gray-500/20',
      gradient: 'from-gray-400 to-slate-500',
      accent: 'gray'
    };
  };

  const colors = getBadgeColor(badge);

  return (
    <div className={`relative bg-white border-2 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 transition-all duration-300 group overflow-hidden ${
      isCurrent 
        ? `ring-4 ring-primary-500/20 shadow-strong border-primary-300 ${
            colors.accent === 'gold' ? 'ring-yellow-500/30' : ''
          }` 
        : isNext 
        ? 'ring-4 ring-accent-500/20 shadow-medium border-accent-300'
        : 'shadow-soft border-gray-200 hover:shadow-medium'
    } ${!isCurrent && !isNext ? 'hover:scale-105' : ''}`}>
      
      {/* Badge Label */}
      {isCurrent && (
        <div className="absolute -top-0 -right-0 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-xs sm:text-sm font-bold px-4 py-1.5 sm:py-2 rounded-full shadow-lg flex items-center gap-1.5 animate-pulse-soft">
          <FiCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          Current
        </div>
      )}
      {isNext && (
        <div className="absolute -top-0 -right-0 bg-gradient-to-r from-accent-500 to-cyan-500 text-white text-xs sm:text-sm font-bold px-4 py-1.5 sm:py-2 rounded-full shadow-lg flex items-center gap-1.5">
          <FiStar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          Next Goal
        </div>
      )}
      
      <div className="flex flex-col items-center text-center">
        {/* Badge Icon */}
        <div className={`relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl sm:rounded-3xl ${colors.bg} flex items-center justify-center mb-5 sm:mb-6 shadow-lg ${colors.glow} border-2 ${colors.border} group-hover:scale-110 transition-transform duration-300`}>
          <FiAward className={`w-12 h-12 sm:w-14 sm:h-14 ${colors.icon}`} />
          
          {/* Status indicator */}
          {isCurrent && (
            <div className="absolute -top-2 -right-2 w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center border-2 border-white shadow-lg animate-float">
              <FiStar className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
          )}
        </div>
        
        {/* Badge Name */}
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-3 font-display">
          {badge}
        </h3>
        
        {/* Badge Description */}
        <p className="text-xs sm:text-sm font-medium text-gray-500">
          {isCurrent && 'Your current badge'}
          {isNext && 'Your next achievement'}
          {!isCurrent && !isNext && 'Badge tier'}
        </p>
        
        {/* Additional Info */}
        {isCurrent && (
          <div className="mt-4 sm:mt-5 pt-4 sm:pt-5 border-t border-gray-200 w-full">
            <p className="text-xs text-gray-600 font-semibold">Status: Active</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BadgeCard;
