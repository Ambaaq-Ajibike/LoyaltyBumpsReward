import React, { useMemo, useState, useEffect } from 'react';
import { FiX, FiInfo, FiShoppingCart, FiZap } from 'react-icons/fi';

const formatPrice = (value) => {
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

const BikePurchaseModal = ({ open, bikes, onClose, onPurchase, isSubmitting }) => {
  const [selectedBikeId, setSelectedBikeId] = useState(null);

  useEffect(() => {
    if (!open) {
      setSelectedBikeId(null);
    }
  }, [open]);

  const selectedBike = useMemo(() => (
    bikes.find((bike) => bike.id === selectedBikeId) || null
  ), [bikes, selectedBikeId]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 py-8">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-strong overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/80 text-gray-500 hover:text-gray-900 hover:bg-white shadow-soft"
          aria-label="Close dialog"
        >
          <FiX className="w-5 h-5" />
        </button>

        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white shadow-soft">
                <FiShoppingCart className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Select Your Motorbike</h2>
                <p className="text-sm text-gray-500">Pick a bike to add a purchase and grow your rewards.</p>
              </div>
            </div>

            <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1">
              {bikes.map((bike) => {
                const isActive = selectedBikeId === bike.id;
                return (
                  <button
                    key={bike.id}
                    type="button"
                    onClick={() => setSelectedBikeId(bike.id)}
                    className={`w-full flex items-stretch gap-4 rounded-2xl border transition-all duration-200 text-left shadow-sm ${
                      isActive
                        ? 'border-primary-300 bg-primary-50/80 shadow-medium'
                        : 'border-gray-200 bg-white hover:border-primary-200 hover:shadow-soft'
                    }`}
                  >
                    <div className="relative w-32 h-32 sm:w-40 sm:h-32 overflow-hidden rounded-2xl">
                      <img
                        src={bike.image}
                        alt={`${bike.name} motorbike`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      {bike.engine === 'Electric' && (
                        <span className="absolute top-2 left-2 inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-xs font-semibold text-emerald-600">
                          <FiZap className="w-3 h-3" />
                          Electric
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col justify-between py-4 pr-4 flex-1">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold text-gray-900">{bike.name}</h3>
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">{bike.brand}</span>
                        </div>
                        <p className="mt-2 text-sm text-gray-600 leading-relaxed">{bike.description}</p>
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-500 mt-4">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="font-semibold text-gray-900">{formatPrice(bike.price)}</span>
                          <span>Engine: {bike.engine}</span>
                          <span>Range: {bike.range}</span>
                        </div>
                        <span className={`text-xs font-semibold uppercase tracking-wide ${
                          isActive ? 'text-primary-600' : 'text-gray-400'
                        }`}>
                          {isActive ? 'Selected' : 'Select' }
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-gray-50 border-l border-gray-100 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h3>
              {selectedBike ? (
                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-gray-500 uppercase font-semibold">Bike</p>
                    <p className="text-lg font-semibold text-gray-900">{selectedBike.name}</p>
                    <p className="text-sm text-gray-500">{selectedBike.brand} • {selectedBike.engine}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Unit price</span>
                    <span className="text-base font-semibold text-gray-900">{formatPrice(selectedBike.price)}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Loyalty points boost</span>
                    <span className="text-sm font-semibold text-primary-600">Eligible</span>
                  </div>

                  <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                    <span className="text-base font-semibold text-gray-900">Amount due</span>
                    <span className="text-xl font-bold text-primary-600">{formatPrice(selectedBike.price)}</span>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-4 py-8 text-center text-sm text-gray-500">
                  <FiInfo className="w-6 h-6 mx-auto mb-3 text-gray-400" />
                  Choose a motorbike from the list to continue.
                </div>
              )}
            </div>

            <div className="mt-8 space-y-3">
              <button
                onClick={() => selectedBike && onPurchase(selectedBike)}
                disabled={!selectedBike || isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary-600 to-accent-600 px-6 py-3 text-white font-semibold shadow-medium hover:from-primary-500 hover:to-accent-500 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <FiShoppingCart className="w-5 h-5" />
                {isSubmitting ? 'Processing...' : 'Complete Purchase'}
              </button>

              <button
                onClick={onClose}
                disabled={isSubmitting}
                className="w-full rounded-2xl border border-gray-300 px-6 py-3 text-gray-600 font-semibold hover:bg-gray-100 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BikePurchaseModal;
