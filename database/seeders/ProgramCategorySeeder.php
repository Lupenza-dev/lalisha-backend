<?php

namespace Database\Seeders;

use App\Models\ProgramCategory;
use Illuminate\Database\Seeder;

class ProgramCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'Fitness & Strength', 'description' => 'Weight training, powerlifting, and functional fitness programs.', 'icon_name' => 'dumbbell', 'status' => 'active'],
            ['name' => 'Cardio & Endurance', 'description' => 'Running, cycling, and cardiovascular conditioning programs.', 'icon_name' => 'heart-pulse', 'status' => 'active'],
            ['name' => 'Yoga & Flexibility', 'description' => 'Yoga, pilates, and mobility-focused training programs.', 'icon_name' => 'activity', 'status' => 'active'],
            ['name' => 'Nutrition & Diet', 'description' => 'Meal planning, dietary guidance, and nutritional coaching.', 'icon_name' => 'salad', 'status' => 'active'],
            ['name' => 'Mental Wellness', 'description' => 'Mindfulness, stress management, and mental health programs.', 'icon_name' => 'brain', 'status' => 'active'],
            ['name' => 'Sports Performance', 'description' => 'Sport-specific conditioning and performance enhancement.', 'icon_name' => 'trophy', 'status' => 'active'],
            ['name' => 'Rehabilitation', 'description' => 'Injury recovery and physical rehabilitation programs.', 'icon_name' => 'shield-plus', 'status' => 'active'],
            ['name' => 'Kids & Youth', 'description' => 'Age-appropriate fitness programs for children and teenagers.', 'icon_name' => 'star', 'status' => 'active'],
        ];

        foreach ($categories as $category) {
            ProgramCategory::firstOrCreate(['name' => $category['name']], $category);
        }
    }
}
