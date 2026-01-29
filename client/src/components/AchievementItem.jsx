import React from 'react';
import { FiCheck, FiLock, FiShoppingCart, FiTrendingUp, FiHeart, FiDollarSign, FiStar, FiAward } from 'react-icons/fi';

const AchievementItem = ({ achievement, isUnlocked = true }) => {
  const getAchievementIcon = (name) => {
    const iconMap = {
      'First Purchase': FiShoppingCart,
      'Spender': FiTrendingUp,
      'Loyal Customer': FiHeart,
      'Big Spender': FiDollarSign,
      'Super Loyal': FiStar,
      'VIP Member': FiAward,
    };
    return iconMap[name] || FiStar;
  };

  const IconComponent = getAchievementIcon(achievement);

  return (
    <div className={`group relative flex flex-col items-center gap-4 p-5 sm:p-6 rounded-2xl sm:rounded-3xl border-2 transition-all duration-300 overflow-hidden ${
      isUnlocked 
        ? 'bg-gradient-to-br from-primary-50 to-accent-50 border-primary-200 shadow-soft hover:shadow-medium hover:-translate-y-1 cursor-pointer' 
        : 'bg-gray-50 border-gray-200 opacity-60 hover:opacity-80'
    }`}>
      
      {/* Unlock badge for unlocked items */}
      {isUnlocked && (
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-6 h-6 sm:w-7 sm:h-7 bg-primary-500 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
          <FiCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
        </div>
      )}

      <div className={`relative flex-shrink-0 w-16 h-16 sm:w-18 sm:h-18 rounded-2xl sm:rounded-3xl flex items-center justify-center transition-transform duration-300 ${
        isUnlocked 
          ? 'bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30 group-hover:scale-110 group-hover:-rotate-3' 
          : 'bg-gradient-to-br from-gray-300 to-gray-400 text-gray-500'
      }`}>
        {React.createElement(IconComponent, { className: "w-8 h-8 sm:w-9 sm:h-9" })}
      </div>

      {/* Lock icon for locked items */}
      {!isUnlocked && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 sm:w-7 sm:h-7 bg-gray-600 rounded-full flex items-center justify-center">
          <FiLock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
        </div>
      )}

      <div className="flex-1 min-w-0 text-center">
        <h4 className={`font-bold text-base sm:text-lg mb-2 ${
          isUnlocked ? 'text-gray-900' : 'text-gray-600'
        }`}>
          {achievement}
        </h4>
        <div className="flex items-center justify-center gap-2">
          <div className={`w-2 h-2 rounded-full ${
            isUnlocked ? 'bg-primary-500' : 'bg-gray-400'
          }`} />
          <span className={`text-xs sm:text-sm font-semibold ${
            isUnlocked ? 'text-primary-600' : 'text-gray-500'
          }`}>
            {isUnlocked ? 'Unlocked' : 'Locked'}
          </span>
        </div>
      </div>

      {/* Hover effect overlay */}
      {isUnlocked && (
        <div className="absolute inset-0 bg-gradient-to-t from-primary-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl sm:rounded-3xl" />
      )}
    </div>
  );
};

export default AchievementItem;
