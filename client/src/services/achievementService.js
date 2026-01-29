import { apiClient } from './apiClient';

export const achievementService = {
  getUserAchievements: async (userId) => {
    try {
      const response = await apiClient.get(`/users/${userId}/achievements`);
      return response.data;
    } catch (error) {
      console.error('Error fetching achievements:', error);
      throw error;
    }
  },

  simulateAchievementData: () => {
    return {
      unlocked_achievements: [],
      next_available_achievements: [],
      current_badge: '',
      next_badge: '',
      remaining_to_unlock_next_badge: 0,
      total_points: 0,
      next_badge_points_required: null,
      next_badge_cashback: null,
    };
  },
};

