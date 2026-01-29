<?php

namespace Database\Seeders;

use App\Models\Achievement;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AchievementSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $achievements = [
            [
                'name' => 'First Purchase',
                'description' => 'Make your first purchase',
                'type' => 'first_purchase',
                'requirements' => ['purchase_count' => 1],
                'points' => 10,
                'is_active' => true,
            ],
            [
                'name' => 'Shopping Enthusiast',
                'description' => 'Make 5 purchases',
                'type' => 'purchase_count',
                'requirements' => ['purchase_count' => 5],
                'points' => 50,
                'is_active' => true,
            ],
            [
                'name' => 'Regular Customer',
                'description' => 'Make 10 purchases',
                'type' => 'purchase_count',
                'requirements' => ['purchase_count' => 10],
                'points' => 100,
                'is_active' => true,
            ],
            [
                'name' => 'VIP Customer',
                'description' => 'Make 25 purchases',
                'type' => 'purchase_count',
                'requirements' => ['purchase_count' => 25],
                'points' => 250,
                'is_active' => true,
            ],
            [
                'name' => 'Big Spender',
                'description' => 'Spend ₦10,000 in total',
                'type' => 'total_spent',
                'requirements' => ['min_amount' => 10000],
                'points' => 100,
                'is_active' => true,
            ],
            [
                'name' => 'High Roller',
                'description' => 'Spend ₦50,000 in total',
                'type' => 'total_spent',
                'requirements' => ['min_amount' => 50000],
                'points' => 500,
                'is_active' => true,
            ],
            [
                'name' => 'Platinum Spender',
                'description' => 'Spend ₦100,000 in total',
                'type' => 'total_spent',
                'requirements' => ['min_amount' => 100000],
                'points' => 1000,
                'is_active' => true,
            ],
        ];

        foreach ($achievements as $achievement) {
            Achievement::updateOrCreate(
                ['name' => $achievement['name']],
                $achievement
            );
        }
    }
}
