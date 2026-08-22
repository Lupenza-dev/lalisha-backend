<?php

namespace Database\Seeders;

use App\Models\ProgramType;
use Illuminate\Database\Seeder;

class ProgramTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $types = [
            ['name' => 'Online', 'description' => 'Fully remote programs delivered via live or recorded sessions.', 'status' => 'active'],
            ['name' => 'In-Person', 'description' => 'Face-to-face training at a physical location.', 'status' => 'active'],
            ['name' => 'Hybrid', 'description' => 'Combination of online and in-person training sessions.', 'status' => 'active'],
            ['name' => 'Self-Paced', 'description' => 'Pre-recorded content accessible at the learner\'s own pace.', 'status' => 'active'],
            ['name' => 'Group', 'description' => 'Structured group sessions with multiple participants.', 'status' => 'active'],
            ['name' => 'One-on-One', 'description' => 'Private individual sessions with a dedicated trainer.', 'status' => 'active'],
        ];

        foreach ($types as $type) {
            ProgramType::firstOrCreate(['name' => $type['name']], $type);
        }
    }
}
