import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiMail, FiLock, FiLogIn, FiAward } from 'react-icons/fi';
import { loginUser } from '../store/slices/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = credentials.email.trim();

    if (!email || !credentials.password) {
      return;
    }

    dispatch(loginUser({ email, password: credentials.password }));
  };

  const isSubmitting = status === 'loading';

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-neutral-50 to-accent-50 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-xl mx-auto">
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-strong border border-white/60 overflow-hidden">
          <div className="px-6 sm:px-10 py-8 sm:py-12">
            <div className="flex items-center gap-4 mb-8 sm:mb-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white shadow-glow-green">
                <FiAward className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold font-display text-neutral-900">Welcome to LoyalBumps</h1>
                <p className="text-neutral-500 text-sm sm:text-base">Sign in to track your loyalty rewards and achievements.</p>
              </div>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-neutral-600 mb-2">Email</label>
                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={credentials.email}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-neutral-200 bg-white px-12 py-3 text-neutral-900 placeholder-neutral-400 focus:border-primary-400 focus:ring-0 shadow-soft"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="password" className="block text-sm font-semibold text-neutral-600">Password</label>
                  <span className="text-xs text-neutral-400">Minimum 8 characters</span>
                </div>
                <div className="relative">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={credentials.password}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-neutral-200 bg-white px-12 py-3 text-neutral-900 placeholder-neutral-400 focus:border-primary-400 focus:ring-0 shadow-soft"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              {error && (
                <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600 font-medium">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary-600 to-accent-600 py-3.5 text-white font-semibold shadow-medium hover:from-primary-500 hover:to-accent-500 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300"
              >
                <FiLogIn className="w-5 h-5" />
                {isSubmitting ? 'Signing In...' : 'Sign In'}
              </button>
            </form>
          </div>

          <div className="bg-neutral-50/90 px-6 sm:px-10 py-5 border-t border-neutral-100 text-sm text-neutral-500">
            Use the same credentials you registered with in the loyalty program.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
