<?php

namespace Database\Seeders;

use App\Models\Badge;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BadgeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $badges = [
            [
                'name' => 'Bronze Member',
                'description' => 'Entry level membership with basic rewards',
                'required_points' => 50,
                'level' => 'bronze',
                'icon' => 'bronze-badge.png',
                'cashback_amount' => 300.00,
                'is_active' => true,
            ],
            [
                'name' => 'Silver Member',
                'description' => 'Silver membership with enhanced rewards',
                'required_points' => 200,
                'level' => 'silver',
                'icon' => 'silver-badge.png',
                'cashback_amount' => 300.00,
                'is_active' => true,
            ],
            [
                'name' => 'Gold Member',
                'description' => 'Gold membership with premium rewards',
                'required_points' => 500,
                'level' => 'gold',
                'icon' => 'gold-badge.png',
                'cashback_amount' => 300.00,
                'is_active' => true,
            ],
            [
                'name' => 'Platinum Member',
                'description' => 'Platinum membership with exclusive rewards',
                'required_points' => 1000,
                'level' => 'platinum',
                'icon' => 'platinum-badge.png',
                'cashback_amount' => 300.00,
                'is_active' => true,
            ],
            [
                'name' => 'Diamond Member',
                'description' => 'Diamond membership with ultimate rewards',
                'required_points' => 2000,
                'level' => 'diamond',
                'icon' => 'diamond-badge.png',
                'cashback_amount' => 300.00,
                'is_active' => true,
            ],
        ];

        foreach ($badges as $badge) {
            Badge::updateOrCreate(
                ['name' => $badge['name']],
                $badge
            );
        }
    }
}
