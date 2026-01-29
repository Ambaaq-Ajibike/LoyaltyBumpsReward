<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Achievement extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'type',
        'requirements',
        'points',
        'is_active',
    ];

    protected $casts = [
        'requirements' => 'array',
        'is_active' => 'boolean',
    ];

    /**
     * Get the users that have unlocked this achievement.
     */
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_achievements')
                    ->withPivot('unlocked_at')
                    ->withTimestamps();
    }

    /**
     * Check if a user meets the requirements for this achievement.
     */
    public function meetsRequirements(User $user): bool
    {
        switch ($this->type) {
            case 'purchase_count':
                return $user->purchase_count >= ($this->requirements['purchase_count'] ?? 0);
            case 'total_spent':
                return $user->total_spent >= ($this->requirements['min_amount'] ?? 0);
            case 'first_purchase':
                return $user->purchase_count >= 1;
            default:
                return false;
        }
    }
}
