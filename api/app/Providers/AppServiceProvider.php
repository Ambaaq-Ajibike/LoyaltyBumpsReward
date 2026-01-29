<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Event;
use App\Events\PurchaseMade;
use App\Events\AchievementUnlocked;
use App\Events\BadgeUnlocked;
use App\Listeners\ProcessAchievements;
use App\Listeners\ProcessBadges;
use App\Listeners\ProcessCashback;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Register event listeners
        Event::listen(
            PurchaseMade::class,
            ProcessAchievements::class,
        );

        Event::listen(
            AchievementUnlocked::class,
            ProcessBadges::class,
        );

        Event::listen(
            BadgeUnlocked::class,
            ProcessCashback::class,
        );
    }
}
