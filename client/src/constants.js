// Badge progression constants
export const BADGE_LEVELS = {
  BRONZE: {
    name: 'Bronze',
    minPoints: 0,
    maxPoints: 1000,
    color: 'amber',
  },
  SILVER: {
    name: 'Silver',
    minPoints: 1000,
    maxPoints: 3000,
    color: 'slate',
  },
  GOLD: {
    name: 'Gold',
    minPoints: 3000,
    maxPoints: 5000,
    color: 'yellow',
  },
  PLATINUM: {
    name: 'Platinum',
    minPoints: 5000,
    maxPoints: 10000,
    color: 'blue',
  },
  DIAMOND: {
    name: 'Diamond',
    minPoints: 10000,
    maxPoints: Infinity,
    color: 'cyan',
  },
};

// Achievement types
export const ACHIEVEMENT_TYPES = {
  FIRST_PURCHASE: 'First Purchase',
  SPENDER: 'Spender',
  LOYAL_CUSTOMER: 'Loyal Customer',
  BIG_SPENDER: 'Big Spender',
  SUPER_LOYAL: 'Super Loyal',
  VIP_MEMBER: 'VIP Member',
};

// API endpoints
export const API_ENDPOINTS = {
  GET_ACHIEVEMENTS: '/api/users/:userId/achievements',
  GET_USER: '/api/users/:userId',
  UPDATE_ACHIEVEMENTS: '/api/users/:userId/achievements',
};

// UI Constants
export const ANIMATION_DURATION = {
  FAST: 150,      // ms
  NORMAL: 300,    // ms
  SLOW: 500,      // ms
};

// Pagination
export const PAGINATION = {
  PER_PAGE: 10,
  MAX_PAGES: 100,
};

// Messages
export const MESSAGES = {
  LOADING: 'Loading your achievements...',
  ERROR: 'Something went wrong. Please try again.',
  SUCCESS: 'Achievements loaded successfully!',
  NO_DATA: 'No achievements found.',
};

// Status codes
export const STATUS = {
  PENDING: 'pending',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};

// Storage keys for localStorage
export const STORAGE_KEYS = {
  USER_DATA: 'user_data',
  PREFERENCES: 'app_preferences',
  CACHE_ACHIEVEMENTS: 'cached_achievements',
};

export default {
  BADGE_LEVELS,
  ACHIEVEMENT_TYPES,
  API_ENDPOINTS,
  ANIMATION_DURATION,
  PAGINATION,
  MESSAGES,
  STATUS,
  STORAGE_KEYS,
};
