<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserBadge extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'badge_id',
        'unlocked_at',
        'cashback_awarded',
        'transaction_reference',
    ];

    protected $casts = [
        'unlocked_at' => 'datetime',
        'cashback_awarded' => 'decimal:2',
        'transaction_reference' => 'string',
    ];

    /**
     * Get the user.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the badge.
     */
    public function badge(): BelongsTo
    {
        return $this->belongsTo(Badge::class);
    }
}
