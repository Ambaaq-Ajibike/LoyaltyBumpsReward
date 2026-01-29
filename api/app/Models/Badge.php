<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Badge extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'required_points',
        'level',
        'icon',
        'cashback_amount',
        'is_active',
    ];

    protected $casts = [
        'required_points' => 'integer',
        'cashback_amount' => 'decimal:2',
        'is_active' => 'boolean',
    ];

    /**
     * Get the users that have unlocked this badge.
     */
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_badges')
                    ->withPivot('unlocked_at', 'cashback_awarded')
                    ->withTimestamps();
    }

    /**
     * Check if a user can unlock this badge.
     */
    public function canUnlock(User $user): bool
    {
        return $user->total_points >= $this->required_points &&
               !$user->badges()->where('badge_id', $this->id)->exists();
    }
}
