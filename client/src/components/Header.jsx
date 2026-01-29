import React from 'react';
import { FiAward, FiTrendingUp } from 'react-icons/fi';

const Header = ({ userName = 'Customer' }) => {
  return (
    <header className="relative bg-gradient-to-br from-primary-600 via-primary-500 to-accent-500 text-white overflow-hidden border-b border-primary-600/30">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-grid-white/[0.03] opacity-50" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/8 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent-400/10 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/2" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="relative group">
              <div className="absolute inset-0 bg-white/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300" />
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 bg-white/95 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-xl shadow-primary-900/30 group-hover:scale-110 transition-transform duration-300">
                <FiAward className="w-7 h-7 sm:w-8 sm:h-8 text-primary-600" />
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-accent-400 rounded-full border-2 border-white flex items-center justify-center shadow-lg animate-pulse-soft">
                <FiTrendingUp className="w-3 h-3 text-white" />
              </div>
            </div>
            
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold font-display tracking-tight leading-tight">
                LoyalBumps Rewards
              </h1>
              <p className="text-white/80 text-xs sm:text-sm mt-1 font-medium">
                Welcome back, <span className="text-white font-semibold">{userName}</span> 👋
              </p>
            </div>
          </div>
          
          {/* Right side decoration */}
          <div className="hidden sm:flex items-center gap-3 text-white/70 text-sm font-medium">
            <div className="w-2 h-2 bg-accent-400 rounded-full animate-pulse" />
            <span>Active Status</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

