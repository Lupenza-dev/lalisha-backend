<?php

namespace Database\Seeders;

use App\Models\ProgramCategory;
use App\Models\ProgramType;
use App\Models\TrainingProgram;
use Illuminate\Database\Seeder;

class TrainingProgramSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categoryId = fn(string $name) => ProgramCategory::where('name', $name)->value('id');
        $typeId = fn(string $name) => ProgramType::where('name', $name)->value('id');

        $programs = [
            [
                'time_type' => 'monthly',
                'program_category_id' => $categoryId('Fitness & Strength'),
                'program_type_id' => $typeId('Online'),
                'description' => 'A comprehensive monthly strength training program for all fitness levels.',
                'price' => 75000,
                'benefit' => 'Build lean muscle, increase strength, and improve overall body composition.',
                'status' => 'active',
            ],
            [
                'time_type' => 'weekly',
                'program_category_id' => $categoryId('Cardio & Endurance'),
                'program_type_id' => $typeId('Online'),
                'description' => 'High-intensity weekly cardio sessions designed to boost endurance and burn calories.',
                'price' => 35000,
                'benefit' => 'Improve cardiovascular health, stamina, and accelerate fat loss.',
                'status' => 'active',
            ],
            [
                'time_type' => 'days',
                'program_category_id' => $categoryId('Yoga & Flexibility'),
                'program_type_id' => $typeId('Self-Paced'),
                'description' => 'A 30-day yoga challenge focusing on flexibility, breathing, and mindfulness.',
                'price' => 45000,
                'benefit' => 'Increase flexibility, reduce stress, and develop a consistent yoga practice.',
                'status' => 'active',
            ],
            [
                'time_type' => 'monthly',
                'program_category_id' => $categoryId('Sports Performance'),
                'program_type_id' => $typeId('In-Person'),
                'description' => 'Monthly sport-specific conditioning for athletes seeking peak performance.',
                'price' => 120000,
                'benefit' => 'Enhance speed, agility, power, and sport-specific movement patterns.',
                'status' => 'active',
            ],
            [
                'time_type' => 'weekly',
                'program_category_id' => $categoryId('Rehabilitation'),
                'program_type_id' => $typeId('Hybrid'),
                'description' => 'Guided weekly rehabilitation sessions for injury recovery and mobility restoration.',
                'price' => 60000,
                'benefit' => 'Recover safely from injury, regain range of motion, and prevent re-injury.',
                'status' => 'active',
            ],
            [
                'time_type' => 'monthly',
                'program_category_id' => $categoryId('Mental Wellness'),
                'program_type_id' => $typeId('Online'),
                'description' => 'Monthly mindfulness and mental resilience program combining meditation and movement.',
                'price' => 40000,
                'benefit' => 'Reduce anxiety, improve focus, and build lasting mental resilience.',
                'status' => 'active',
            ],
        ];

        foreach ($programs as $program) {
            if ($program['program_category_id'] && $program['program_type_id']) {
                TrainingProgram::create($program);
            }
        }
    }
}
