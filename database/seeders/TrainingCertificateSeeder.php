<?php

namespace Database\Seeders;

use App\Models\TrainingCertificate;
use Illuminate\Database\Seeder;

class TrainingCertificateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $certificates = [
            ['name' => 'Certificate of Completion', 'description' => 'Awarded upon successfully completing a training program.', 'status' => 'active'],
            ['name' => 'Certificate of Achievement', 'description' => 'Recognises outstanding performance in a program.', 'status' => 'active'],
            ['name' => 'Professional Certification', 'description' => 'Industry-recognised certification for qualified trainers and coaches.', 'status' => 'active'],
            ['name' => 'Participation Certificate', 'description' => 'Acknowledges attendance and participation in a program or event.', 'status' => 'active'],
            ['name' => 'Advanced Diploma', 'description' => 'Higher-level qualification for advanced program graduates.', 'status' => 'active'],
        ];

        foreach ($certificates as $certificate) {
            TrainingCertificate::firstOrCreate(['name' => $certificate['name']], $certificate);
        }
    }
}
