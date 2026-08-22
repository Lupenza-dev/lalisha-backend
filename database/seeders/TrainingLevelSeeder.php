<?php

namespace Database\Seeders;

use App\Models\TrainingLevel;
use Illuminate\Database\Seeder;

class TrainingLevelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $levels = [
            ['name' => 'Beginner', 'description' => 'No prior experience required. Suitable for those just starting out.', 'status' => 'active'],
            ['name' => 'Intermediate', 'description' => 'Some experience required. Builds on foundational knowledge and skills.', 'status' => 'active'],
            ['name' => 'Advanced', 'description' => 'Significant experience required. Designed for highly trained individuals.', 'status' => 'active'],
            ['name' => 'Expert', 'description' => 'Elite-level training for professional athletes and specialists.', 'status' => 'active'],
            ['name' => 'All Levels', 'description' => 'Suitable for participants of any experience level.', 'status' => 'active'],
        ];

        foreach ($levels as $level) {
            TrainingLevel::firstOrCreate(['name' => $level['name']], $level);
        }
    }
}
