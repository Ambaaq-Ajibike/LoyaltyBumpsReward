<?php

namespace App\Listeners;

use App\Events\PurchaseMade;
use App\Events\AchievementUnlocked;
use App\Models\Achievement;
use App\Models\UserAchievement;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class ProcessAchievements
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
    public function handle(PurchaseMade $event): void
    {
        $user = $event->purchase->user;
        $achievements = Achievement::where('is_active', true)->get();

        foreach ($achievements as $achievement) {
            // Check if user already has this achievement
            if ($user->achievements()->where('achievement_id', $achievement->id)->exists()) {
                continue;
            }

            // Check if user meets requirements
            if ($achievement->meetsRequirements($user)) {
                // Unlock achievement
                UserAchievement::create([
                    'user_id' => $user->id,
                    'achievement_id' => $achievement->id,
                    'unlocked_at' => Carbon::now(),
                ]);

                Log::info('Achievement unlocked', [
                    'user_id' => $user->id,
                    'achievement' => $achievement->name,
                ]);

                // Fire achievement unlocked event
                event(new AchievementUnlocked($user, $achievement));
            }
        }
    }
}
