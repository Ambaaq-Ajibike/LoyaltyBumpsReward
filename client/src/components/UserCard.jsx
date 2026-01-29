import React from 'react';
import { FiUser, FiCalendar, FiZap, FiStar } from 'react-icons/fi';

const UserCard = ({ userName = 'Customer', joinDate = 'Jan 2024', tier = 'Gold' }) => {
  const getTierColor = (tier) => {
    switch (tier.toLowerCase()) {
      case 'bronze':
        return { bg: 'bg-gradient-to-br from-orange-50 to-amber-50', text: 'text-orange-700', border: 'border-orange-300', icon: 'from-orange-500 to-amber-500' };
      case 'silver':
        return { bg: 'bg-gradient-to-br from-gray-50 to-slate-50', text: 'text-slate-700', border: 'border-slate-300', icon: 'from-gray-400 to-slate-500' };
      case 'gold':
        return { bg: 'bg-gradient-to-br from-yellow-50 to-amber-50', text: 'text-yellow-700', border: 'border-yellow-300', icon: 'from-yellow-500 to-amber-500' };
      case 'platinum':
        return { bg: 'bg-gradient-to-br from-blue-50 to-cyan-50', text: 'text-blue-700', border: 'border-blue-300', icon: 'from-blue-500 to-cyan-500' };
      default:
        return { bg: 'bg-gradient-to-br from-gray-50 to-slate-50', text: 'text-gray-700', border: 'border-gray-300', icon: 'from-gray-400 to-slate-500' };
    }
  };

  const colors = getTierColor(tier);

  return (
    <div className={`rounded-2xl border-2 ${colors.border} ${colors.bg} p-7 shadow-medium hover:shadow-strong transition-all duration-300 hover:-translate-y-1`}>
      <div className="flex items-center gap-5">
        <div className="relative flex-shrink-0">
          <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${colors.icon} flex items-center justify-center shadow-lg`}>
            <FiUser className="w-10 h-10 text-white" />
          </div>
          <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br ${colors.icon} flex items-center justify-center border-2 border-white shadow-md`}>
            <FiStar className="w-4 h-4 text-white" />
          </div>
        </div>

        <div className="flex-1">
          <h3 className="font-display font-bold text-2xl text-gray-900 mb-3">
            {userName}
          </h3>
          
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-white px-3 py-1.5 rounded-lg border border-gray-200">
              <FiCalendar className="w-4 h-4" />
              <span className="font-medium">Since {joinDate}</span>
            </div>
            
            <div className={`flex items-center gap-2 text-sm font-bold ${colors.text} bg-white px-3 py-1.5 rounded-lg border-2 ${colors.border}`}>
              <FiZap className="w-4 h-4" />
              <span>{tier} Tier</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
