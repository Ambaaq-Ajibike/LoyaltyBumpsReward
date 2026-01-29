<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Get the purchases for the user.
     */
    public function purchases(): HasMany
    {
        return $this->hasMany(Purchase::class);
    }

    /**
     * Get the achievements for the user.
     */
    public function achievements(): BelongsToMany
    {
        return $this->belongsToMany(Achievement::class, 'user_achievements')
                    ->withPivot('unlocked_at')
                    ->withTimestamps();
    }

    /**
     * Get the badges for the user.
     */
    public function badges(): BelongsToMany
    {
        return $this->belongsToMany(Badge::class, 'user_badges')
                    ->withPivot('unlocked_at', 'cashback_awarded')
                    ->withTimestamps();
    }

    /**
     * Get user's total spent amount.
     */
    public function getTotalSpentAttribute(): float
    {
        return (float) $this->purchases()->sum('amount');
    }

    /**
     * Get user's total purchase count.
     */
    public function getPurchaseCountAttribute(): int
    {
        return $this->purchases()->count();
    }

    /**
     * Get user's current badge.
     */
    public function getCurrentBadge(): ?Badge
    {
        return $this->badges()->orderBy('user_badges.unlocked_at', 'desc')->first();
    }

    /**
     * Get user's total points from achievements.
     */
    public function getTotalPointsAttribute(): int
    {
        return $this->achievements()->sum('points');
    }
}
