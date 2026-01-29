<?php

namespace App\Listeners;

use App\Events\BadgeUnlocked;
use App\Models\UserBadge;
use App\Services\MockPaymentProvider;
use Illuminate\Support\Facades\Log;

class ProcessCashback
{
    public function __construct(private readonly MockPaymentProvider $paymentProvider)
    {
    }

    public function handle(BadgeUnlocked $event): void
    {
        $user = $event->user;
        $badge = $event->badge;

        $userBadge = UserBadge::where('user_id', $user->id)
            ->where('badge_id', $badge->id)
            ->first();

        if (! $userBadge) {
            Log::warning('Unable to locate badge unlock record for cashback', [
                'user_id' => $user->id,
                'badge_id' => $badge->id,
            ]);

            return;
        }

        if ((float) $userBadge->cashback_awarded > 0) {
            Log::info('Cashback already processed for badge', [
                'user_id' => $user->id,
                'badge_id' => $badge->id,
            ]);

            return;
        }

        $cashbackAmount = (float) ($badge->cashback_amount ?? 0);

        if ($cashbackAmount <= 0) {
            Log::info('No cashback configured for badge', [
                'user_id' => $user->id,
                'badge_id' => $badge->id,
            ]);

            return;
        }

        $paymentResponse = $this->paymentProvider->sendCashback(
            userId: $user->id,
            amount: $cashbackAmount,
            currency: 'NGN'
        );

        $userBadge->update([
            'cashback_awarded' => $cashbackAmount,
            'transaction_reference' => $paymentResponse['reference'] ?? null,
        ]);

        Log::info('Cashback processed for badge unlock', [
            'user_id' => $user->id,
            'badge' => $badge->name,
            'amount' => $cashbackAmount,
            'reference' => $paymentResponse['reference'] ?? null,
        ]);
    }
}
