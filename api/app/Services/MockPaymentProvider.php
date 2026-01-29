<?php

namespace App\Services;

use Illuminate\Support\Facades\Log;

class MockPaymentProvider
{
    public function sendCashback(int $userId, float $amount, string $currency = 'NGN'): array
    {
        $transactionReference = 'MOCK-' . $userId . '-' . now()->timestamp;

        Log::info('Mock payment provider processed cashback', [
            'user_id' => $userId,
            'amount' => $amount,
            'currency' => $currency,
            'transaction_reference' => $transactionReference,
        ]);

        return [
            'status' => 'success',
            'reference' => $transactionReference,
        ];
    }
}
