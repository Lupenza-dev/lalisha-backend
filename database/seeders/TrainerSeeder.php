<?php

namespace Database\Seeders;

use App\Models\ProgramType;
use App\Models\Trainer;
use App\Models\TrainingLevel;
use Illuminate\Database\Seeder;

class TrainerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $typeId = fn(string $name) => ProgramType::where('name', $name)->value('id');
        $levelId = fn(string $name) => TrainingLevel::where('name', $name)->value('id');

        $trainers = [
            [
                'name' => 'James Okonkwo',
                'email' => 'james.okonkwo@lalisha.com',
                'program_type_id' => $typeId('In-Person'),
                'training_level_id' => $levelId('Advanced'),
                'session_price' => 120000,
                'certifications' => 'NASM Certified Personal Trainer, CrossFit Level 2 Coach',
                'achievements' => 'Former national powerlifting champion, trained 200+ athletes over 10 years.',
                'availability' => 'available',
                'status' => 'active',
            ],
            [
                'name' => 'Amira Hassan',
                'email' => 'amira.hassan@lalisha.com',
                'program_type_id' => $typeId('Online'),
                'training_level_id' => $levelId('Intermediate'),
                'session_price' => 80000,
                'certifications' => 'ACE Certified Personal Trainer, Yoga Alliance RYT-200',
                'achievements' => 'Helped 500+ clients achieve their weight loss goals through online coaching.',
                'availability' => 'available',
                'status' => 'active',
            ],
            [
                'name' => 'David Kimani',
                'email' => 'david.kimani@lalisha.com',
                'program_type_id' => $typeId('Hybrid'),
                'training_level_id' => $levelId('All Levels'),
                'session_price' => 95000,
                'certifications' => 'ISSA Certified Strength and Conditioning Specialist',
                'achievements' => 'Certified sports nutritionist with specialisation in endurance sports.',
                'availability' => 'available',
                'status' => 'active',
            ],
            [
                'name' => 'Sofia Mendes',
                'email' => 'sofia.mendes@lalisha.com',
                'program_type_id' => $typeId('Online'),
                'training_level_id' => $levelId('Beginner'),
                'session_price' => 65000,
                'certifications' => 'NASM Certified Wellness Coach, Pilates Instructor Certification',
                'achievements' => 'Specialises in postnatal fitness and rehabilitation for beginners.',
                'availability' => 'available',
                'status' => 'active',
            ],
            [
                'name' => 'Marcus Adeyemi',
                'email' => 'marcus.adeyemi@lalisha.com',
                'program_type_id' => $typeId('In-Person'),
                'training_level_id' => $levelId('Expert'),
                'session_price' => 180000,
                'certifications' => 'CSCS Certified Strength and Conditioning Specialist, Olympic Lifting Coach',
                'achievements' => 'Former professional footballer, now training elite athletes and sports teams.',
                'availability' => 'unavailable',
                'status' => 'active',
            ],
            [
                'name' => 'Lena Mbeki',
                'email' => 'lena.mbeki@lalisha.com',
                'program_type_id' => $typeId('Self-Paced'),
                'training_level_id' => $levelId('Intermediate'),
                'session_price' => 55000,
                'certifications' => 'ACE Health Coach, Mindfulness-Based Stress Reduction Practitioner',
                'achievements' => 'Created a popular self-paced mindfulness and movement program with 1,000+ completions.',
                'availability' => 'available',
                'status' => 'active',
            ],
        ];

        foreach ($trainers as $trainer) {
            if ($trainer['program_type_id'] && $trainer['training_level_id']) {
                Trainer::firstOrCreate(['email' => $trainer['email']], $trainer);
            }
        }
    }
}
