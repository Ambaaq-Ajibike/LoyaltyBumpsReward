import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAchievements } from '../store/slices/achievementSlice';
import { logoutUser } from '../store/slices/authSlice';
import { fetchPurchases, createPurchase } from '../store/slices/purchaseSlice';
import Header from '../components/Header';
import BadgeCard from '../components/BadgeCard';
import AchievementItem from '../components/AchievementItem';
import ProgressBar from '../components/ProgressBar';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorBoundary from '../components/ErrorBoundary';
import BikePurchaseModal from '../components/BikePurchaseModal';
import { BIKE_CATALOG } from '../data/bikes';
import { FiRefreshCw, FiAward, FiTarget, FiTrendingUp, FiArrowRight, FiLogOut, FiShoppingCart } from 'react-icons/fi';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.achievements);
  const { user } = useSelector((state) => state.auth);
  const {
    items: purchases,
    totalSpent,
    purchaseCount,
    loading: purchasesLoading,
    creating: purchaseSubmitting,
    error: purchasesError,
  } = useSelector((state) => state.purchases);
  const [isShoppingOpen, setIsShoppingOpen] = useState(false);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchAchievements());
      dispatch(fetchPurchases());
    }
  }, [dispatch, user?.id]);

  const handleRetry = () => {
    dispatch(fetchAchievements({ showSuccessToast: true }));
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handlePurchaseModalOpen = () => {
    setIsShoppingOpen(true);
  };

  const handlePurchaseModalClose = () => {
    if (!purchaseSubmitting) {
      setIsShoppingOpen(false);
    }
  };

  const handlePurchaseBike = async (bike) => {
    try {
      await dispatch(createPurchase({
        amount: bike.price,
        currency: 'NGN',
        metadata: {
          bikeId: bike.id,
          name: bike.name,
          brand: bike.brand,
          engine: bike.engine,
          image: bike.image,
        },
      })).unwrap();
      setIsShoppingOpen(false);
    } catch (error) {
    }
  };

  if (!user) {
    return null;
  }

  const formatCurrency = useMemo(() => {
    return (value) => {
      try {
        return new Intl.NumberFormat('en-NG', {
          style: 'currency',
          currency: 'NGN',
          maximumFractionDigits: 0,
        }).format(value);
      } catch (error) {
        return `₦${Number(value || 0).toLocaleString()}`;
      }
    };
  }, []);

  const targetPoints = data.next_badge_points_required ?? data.total_points ?? 0;
  const remainingPoints = Number.isFinite(data.remaining_to_unlock_next_badge)
    ? data.remaining_to_unlock_next_badge
    : 0;
  const currentPoints = targetPoints
    ? targetPoints - remainingPoints
    : data.total_points ?? 0;
  const safeCurrentPoints = currentPoints < 0 ? 0 : currentPoints;
  const safeTargetPoints = targetPoints || safeCurrentPoints || 1;
  const badgeCashback = data.next_badge_cashback ?? 0;
  const currentBadgeName = data.current_badge || 'No badge yet';
  const nextBadgeName = data.next_badge || 'Max tier achieved';
  const userName = user.name ?? 'Customer';

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <Header userName={userName} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <section className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between mb-8">
          <div className="text-sm text-gray-600">
            Signed in as <span className="font-semibold text-gray-900">{user.email}</span>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleRetry}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 bg-white text-gray-700 border border-gray-200 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-all duration-200 shadow-sm"
            >
              <FiRefreshCw className="w-4 h-4" />
              Refresh Data
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 bg-gradient-to-r from-gray-800 to-gray-600 text-white rounded-xl font-semibold text-sm hover:from-gray-700 hover:to-gray-500 transition-all duration-200 shadow-md"
            >
              <FiLogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </section>

        {error && <ErrorBoundary error={error} onRetry={handleRetry} />}

        {!error && (
          <div className="space-y-8 sm:space-y-10 lg:space-y-12 animate-fade-in">
            <section>
              <div className="flex items-center gap-3 mb-6 sm:mb-8">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
                  <FiTrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold font-display text-gray-900">
                  Your Progress
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
                <div className="group bg-white rounded-2xl p-6 sm:p-8 shadow-soft border border-gray-100 hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-primary-100 to-primary-50 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
                      <FiAward className="w-6 h-6 sm:w-7 sm:h-7 text-primary-600" />
                    </div>
                    <button onClick={handleRetry} className="text-gray-300 hover:text-gray-500 transition-colors duration-200 p-1.5 hover:bg-gray-100 rounded-lg">
                      <FiRefreshCw className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 uppercase tracking-wide font-semibold mb-2">Achievements Unlocked</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-3xl sm:text-4xl font-bold text-gray-900 font-display">{data.unlocked_achievements.length}</p>
                    <p className="text-xs sm:text-sm text-primary-600 font-medium">Total</p>
                  </div>
                </div>

                <div className="group bg-white rounded-2xl p-6 sm:p-8 shadow-soft border border-gray-100 hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-accent-100 to-accent-50 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
                      <FiTarget className="w-6 h-6 sm:w-7 sm:h-7 text-accent-600" />
                    </div>
                    <div className="px-2.5 py-1 bg-gradient-to-r from-primary-500 to-accent-500 text-white text-xs font-bold rounded-full shadow-sm">
                      Current
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 uppercase tracking-wide font-semibold mb-2">Current Badge</p>
                  <p className="text-3xl sm:text-4xl font-bold text-gray-900 font-display">{currentBadgeName}</p>
                </div>

                <div className="group bg-white rounded-2xl p-6 sm:p-8 shadow-soft border border-gray-100 hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
                      <FiTrendingUp className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" />
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 uppercase tracking-wide font-semibold mb-2">To Next Badge</p>
                  <p className="text-3xl sm:text-4xl font-bold text-gray-900 font-display">
                    {remainingPoints.toLocaleString()} pts
                  </p>
                  <p className="text-xs text-gray-500 mt-3">Points needed</p>
                </div>

                <div className="group bg-white rounded-2xl p-6 sm:p-8 shadow-soft border border-gray-100 hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-green-100 to-emerald-50 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
                      <FiShoppingCart className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-600" />
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 uppercase tracking-wide font-semibold mb-2">Purchases</p>
                  <div className="space-y-1">
                    <p className="text-2xl sm:text-3xl font-bold text-gray-900 font-display">{purchaseCount}</p>
                    <p className="text-xs sm:text-sm text-gray-500">Total spent {formatCurrency(totalSpent)}</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-medium border border-gray-100">
              <div className="flex items-center gap-3 mb-8 sm:mb-10">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
                  <FiTarget className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold font-display text-gray-900">
                  Badge Path
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8">
                <div>
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-4">Current Achievement</p>
                  <BadgeCard badge={currentBadgeName} isCurrent={true} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-4">Next Goal</p>
                  <BadgeCard badge={nextBadgeName} isNext={true} />
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-gray-25 rounded-2xl p-6 sm:p-8 border border-gray-200">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-6 font-display">
                  Progress to {data.next_badge ? data.next_badge : 'current tier'}
                </h3>
                <ProgressBar
                  current={safeCurrentPoints}
                  target={safeTargetPoints}
                  label="Achievement points"
                  unit="pts"
                />

                <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl border border-primary-200 group">
                  <div className="flex gap-3 sm:gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-500 text-white">
                        <FiAward className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm sm:text-base text-gray-700 font-medium leading-relaxed">
                        {data.next_badge ? (
                          <>
                            Keep shopping to unlock your <span className="font-bold text-primary-600">{data.next_badge} badge</span> and receive <span className="font-bold text-primary-600">₦{(badgeCashback || 300).toLocaleString()} cashback</span> plus exclusive VIP benefits!
                          </>
                        ) : (
                          <>
                            You have reached the top badge tier. Future purchases keep your rewards active and unlock seasonal perks.
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-medium border border-gray-100">
              <div className="flex items-center gap-3 mb-8 sm:mb-10">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
                  <FiTarget className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold font-display text-gray-900">
                  Achievements
                </h2>
              </div>

              <div className="mb-10 sm:mb-12">
                <div className="flex items-center gap-3 mb-6 sm:mb-8">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 font-display">Unlocked</h3>
                  <span className="bg-gradient-to-r from-primary-500 to-accent-500 text-white text-xs sm:text-sm font-bold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-md">
                    {data.unlocked_achievements.length}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                  {data.unlocked_achievements.map((achievement, index) => (
                    <div key={achievement} className="animate-slide-up" style={{ animationDelay: `${index * 50}ms` }}>
                      <AchievementItem achievement={achievement} isUnlocked={true} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 sm:pt-10 border-t border-gray-200">
                <div className="flex items-center gap-3 mb-6 sm:mb-8">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 font-display">Coming Soon</h3>
                  <span className="bg-gray-100 text-gray-700 text-xs sm:text-sm font-bold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-gray-200">
                    {data.next_available_achievements.length}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                  {data.next_available_achievements.map((achievement, index) => (
                    <div key={achievement} className="animate-slide-up" style={{ animationDelay: `${(index + data.unlocked_achievements.length) * 50}ms` }}>
                      <AchievementItem achievement={achievement} isUnlocked={false} />
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="relative bg-gradient-to-br from-primary-600 via-primary-500 to-accent-600 rounded-3xl overflow-hidden shadow-strong">
              <div className="absolute inset-0">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl" />
              </div>
              <div className="absolute inset-0 bg-grid-white/[0.03] opacity-50" />

              <div className="relative p-8 sm:p-10 lg:p-12 text-center text-white">
                <div className="mb-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-md rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto shadow-xl border border-white/20">
                    <FiAward className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </div>
                </div>

                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 font-display leading-tight">
                  Ready for More Rewards?
                </h3>
                <p className="text-white/90 text-lg sm:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
                  Continue your shopping journey and unlock incredible benefits, exclusive deals, and premium rewards.
                </p>

                <button
                  className="inline-flex items-center gap-2 px-8 sm:px-10 py-3 sm:py-4 bg-white text-primary-600 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg hover:bg-gray-50 transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg group"
                  onClick={handlePurchaseModalOpen}
                >
                  Continue Shopping
                  <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </section>

            <section className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-medium border border-gray-100">
              <div className="flex items-center gap-3 mb-8 sm:mb-10">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
                  <FiShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold font-display text-gray-900">Recent Purchases</h2>
              </div>

              {purchasesLoading ? (
                <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center text-sm text-gray-500">
                  Loading purchase history...
                </div>
              ) : purchasesError ? (
                <div className="rounded-2xl border border-rose-200 bg-rose-50 px-6 py-10 text-center text-sm text-rose-600">
                  {purchasesError}
                </div>
              ) : purchaseCount > 0 ? (
                <div className="space-y-4">
                  {purchases.slice(0, 4).map((purchase) => {
                    const purchaseMeta = purchase.metadata || {};
                    const purchaseDate = purchase.created_at ? new Date(purchase.created_at) : null;
                    return (
                      <div key={purchase.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-2xl border border-gray-200 px-5 py-4 hover:border-primary-200 transition-colors">
                        <div>
                          <p className="text-base font-semibold text-gray-900">
                            {purchaseMeta.name || 'Motorbike order'}
                          </p>
                          <p className="text-sm text-gray-500">
                            {purchaseMeta.brand ? `${purchaseMeta.brand} • ` : ''}
                            {purchaseDate ? purchaseDate.toLocaleString() : 'Just now'}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-base font-bold text-primary-600">{formatCurrency(purchase.amount)}</p>
                          <p className="text-xs text-gray-400 uppercase tracking-wide">{purchase.currency}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center text-sm text-gray-500">
                  You have not made any purchases yet. Tap Continue Shopping above to get started.
                </div>
              )}
            </section>
          </div>
        )}
      </main>

      <BikePurchaseModal
        open={isShoppingOpen}
        bikes={BIKE_CATALOG}
        onClose={handlePurchaseModalClose}
        onPurchase={handlePurchaseBike}
        isSubmitting={purchaseSubmitting}
      />
    </div>
  );
};

export default Dashboard;
