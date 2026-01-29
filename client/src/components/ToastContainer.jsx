import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiCheckCircle, FiInfo, FiAlertCircle, FiX } from 'react-icons/fi';
import { removeToast } from '../store/slices/toastSlice';

const iconMap = {
  success: FiCheckCircle,
  error: FiAlertCircle,
  info: FiInfo,
};

const toneMap = {
  success: 'from-emerald-500/90 to-emerald-600/90 border-emerald-300 text-emerald-50',
  error: 'from-rose-500/95 to-rose-600/95 border-rose-300 text-rose-50',
  info: 'from-slate-600/95 to-slate-700/95 border-slate-300 text-slate-50',
};

const Toast = ({ toast, onDismiss }) => {
  const Icon = useMemo(() => iconMap[toast.type] || FiInfo, [toast.type]);
  const tone = toneMap[toast.type] || toneMap.info;

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => onDismiss(toast.id), toast.duration);
    return () => window.clearTimeout(timeoutId);
  }, [onDismiss, toast.duration, toast.id]);

  return (
    <div className={`flex items-start gap-3 sm:gap-4 rounded-2xl border shadow-xl shadow-black/20 px-4 sm:px-5 py-3 sm:py-4 bg-gradient-to-br backdrop-blur-md ${tone} animate-slide-up`}
         role="alert"
         aria-live="assertive">
      <div className="flex-shrink-0 mt-1">
        <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
      </div>
      <div className="flex-1 text-sm sm:text-base font-medium leading-relaxed">
        {toast.message}
      </div>
      <button onClick={() => onDismiss(toast.id)}
              className="flex-shrink-0 text-inherit/80 hover:text-white transition-colors duration-200"
              aria-label="Dismiss notification">
        <FiX className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
    </div>
  );
};

const ToastContainer = () => {
  const dispatch = useDispatch();
  const toasts = useSelector((state) => state.toast.items);

  const handleDismiss = (id) => {
    dispatch(removeToast(id));
  };

  if (!toasts.length) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 top-4 z-50 flex flex-col items-center gap-3 px-4 pointer-events-none sm:items-end sm:pr-6">
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto w-full sm:w-auto max-w-sm sm:max-w-md">
          <Toast toast={toast} onDismiss={handleDismiss} />
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
