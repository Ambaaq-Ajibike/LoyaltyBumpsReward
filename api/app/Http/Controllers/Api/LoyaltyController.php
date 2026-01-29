<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Achievement;
use App\Models\Badge;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use OpenApi\Attributes as OA;

class LoyaltyController extends Controller
{
    #[OA\Get(
        path: '/users/{user}/achievements',
        tags: ['Loyalty'],
        summary: "Get user loyalty status",
        description: "Returns user's unlocked achievements, current badge, and progress toward next badge",
        parameters: [
            new OA\Parameter(
                name: 'user',
                in: 'path',
                description: 'User ID',
                required: true,
                schema: new OA\Schema(type: 'integer')
            )
        ],
        responses: [
            new OA\Response(
                response: 200,
                description: 'Success',
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: 'unlocked_achievements', type: 'array', items: new OA\Items(type: 'string')),
                        new OA\Property(property: 'next_available_achievements', type: 'array', items: new OA\Items(type: 'string')),
                        new OA\Property(property: 'current_badge', type: 'string'),
                        new OA\Property(property: 'next_badge', type: 'string'),
                        new OA\Property(property: 'remaining_to_unlock_next_badge', type: 'integer'),
                        new OA\Property(property: 'total_points', type: 'integer'),
                        new OA\Property(property: 'next_badge_points_required', type: 'integer', nullable: true),
                        new OA\Property(property: 'next_badge_cashback', type: 'number', format: 'float', nullable: true)
                    ]
                )
            ),
            new OA\Response(response: 404, description: 'User not found')
        ]
    )]
    public function getUserAchievements(Request $request, User $user): JsonResponse
    {
        if (! $request->user()->is($user)) {
            abort(403, 'You are not authorized to view this user.');
        }

        // Load user with relationships
        $user->load(['achievements', 'badges']);

        // Get unlocked achievements
        $unlockedAchievements = $user->achievements->pluck('name')->toArray();

        // Get next available achievements (not unlocked yet)
        $unlockedAchievementIds = $user->achievements->pluck('id')->toArray();
        $nextAvailableAchievements = Achievement::where('is_active', true)
            ->whereNotIn('id', $unlockedAchievementIds)
            ->limit(5)
            ->pluck('name')
            ->toArray();

        // Get current badge
        $currentBadge = $user->getCurrentBadge();
        $currentBadgeName = $currentBadge ? $currentBadge->name : '';

        // Get next badge and remaining points
        $userPoints = $user->total_points;
        $nextBadge = Badge::where('is_active', true)
            ->where('required_points', '>', $userPoints)
            ->orderBy('required_points', 'asc')
            ->first();

        $nextBadgeName = $nextBadge ? $nextBadge->name : '';
        $remainingPoints = $nextBadge ? max(0, $nextBadge->required_points - $userPoints) : 0;
        $nextBadgePointsRequired = $nextBadge ? $nextBadge->required_points : null;
        $nextBadgeCashback = $nextBadge ? (float) $nextBadge->cashback_amount : null;

        return response()->json([
            'unlocked_achievements' => $unlockedAchievements,
            'next_available_achievements' => $nextAvailableAchievements,
            'current_badge' => $currentBadgeName,
            'next_badge' => $nextBadgeName,
            'remaining_to_unlock_next_badge' => $remainingPoints,
            'total_points' => $userPoints,
            'next_badge_points_required' => $nextBadgePointsRequired,
            'next_badge_cashback' => $nextBadgeCashback,
        ]);
    }
}
