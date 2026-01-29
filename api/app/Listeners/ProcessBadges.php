<?php

namespace App\Listeners;

use App\Events\AchievementUnlocked;
use App\Events\BadgeUnlocked;
use App\Models\Badge;
use App\Models\UserBadge;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class ProcessBadges
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(AchievementUnlocked $event): void
    {
        $user = $event->user;
        
        // Refresh user to get updated total points
        $user->refresh();
        
        $badges = Badge::where('is_active', true)
                      ->orderBy('required_points', 'asc')
                      ->get();

        foreach ($badges as $badge) {
            if ($badge->canUnlock($user)) {
                // Unlock badge
                UserBadge::create([
                    'user_id' => $user->id,
                    'badge_id' => $badge->id,
                    'unlocked_at' => Carbon::now(),
                    'cashback_awarded' => 0, // Will be set by cashback processor
                ]);

                Log::info('Badge unlocked', [
                    'user_id' => $user->id,
                    'badge' => $badge->name,
                ]);

                // Fire badge unlocked event
                event(new BadgeUnlocked($user, $badge));
            }
        }
    }
}
