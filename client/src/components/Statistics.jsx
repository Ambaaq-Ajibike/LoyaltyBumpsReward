import React from 'react';
import { FiTrendingUp, FiAward, FiGift, FiTarget } from 'react-icons/fi';

const StatCard = ({ icon: IconComponent, label, value, trend, color = 'primary' }) => {
  const colorStyles = {
    primary: {
      bg: 'bg-gradient-to-br from-primary-50 to-emerald-50',
      icon: 'bg-gradient-to-br from-primary-500 to-emerald-500',
      border: 'border-primary-200',
      text: 'text-primary-600'
    },
    accent: {
      bg: 'bg-gradient-to-br from-accent-50 to-cyan-50',
      icon: 'bg-gradient-to-br from-accent-500 to-cyan-500',
      border: 'border-accent-200',
      text: 'text-accent-600'
    },
    success: {
      bg: 'bg-gradient-to-br from-emerald-50 to-teal-50',
      icon: 'bg-gradient-to-br from-emerald-500 to-teal-500',
      border: 'border-emerald-200',
      text: 'text-emerald-600'
    },
    warning: {
      bg: 'bg-gradient-to-br from-amber-50 to-yellow-50',
      icon: 'bg-gradient-to-br from-amber-500 to-yellow-500',
      border: 'border-amber-200',
      text: 'text-amber-600'
    },
  };

  const styles = colorStyles[color];

  return (
    <div className={`rounded-2xl border-2 ${styles.border} ${styles.bg} p-7 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1 group`}>
      <div className="flex items-start justify-between mb-5">
        <div className={`p-3.5 rounded-xl ${styles.icon} text-white shadow-lg transform transition-transform duration-300 group-hover:scale-110`}>
          {React.createElement(IconComponent, { className: "w-7 h-7" })}
        </div>
        {trend && (
          <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-100 px-2.5 py-1.5 rounded-full border border-emerald-200">
            <FiTrendingUp className="w-3.5 h-3.5" />
            {trend}
          </div>
        )}
      </div>

      <p className="text-gray-600 text-sm font-semibold uppercase tracking-wide mb-2">{label}</p>
      <p className="text-4xl font-display font-bold text-gray-900">
        {value}
      </p>
    </div>
  );
};

const Statistics = () => {
  return (
    <section>
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
          <FiTrendingUp className="w-5 h-5 text-primary-600" />
        </div>
        <h2 className="text-3xl font-display font-bold text-gray-900">
          Achievement Statistics
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={FiAward}
          label="Total Achievements"
          value="12"
          trend="+2 this month"
          color="primary"
        />
        <StatCard
          icon={FiTarget}
          label="Completion Rate"
          value="75%"
          trend="+5%"
          color="accent"
        />
        <StatCard
          icon={FiGift}
          label="Rewards Earned"
          value="₦18,500"
          trend="+₦2,000"
          color="success"
        />
        <StatCard
          icon={FiTrendingUp}
          label="Badge Level"
          value="Gold"
          trend="Next: Platinum"
          color="warning"
        />
      </div>
    </section>
  );
};

export default Statistics;
