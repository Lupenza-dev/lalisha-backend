<?php

namespace Tests\Feature\Api\V1;

use App\Models\ProgramType;
use App\Models\Trainer;
use App\Models\TrainingLevel;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Passport\Passport;
use Tests\TestCase;

class TrainerControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_trainer_details_include_about_text(): void
    {
        Passport::actingAs(User::factory()->create());
        $type = ProgramType::create(['name' => 'Personal', 'status' => 'active']);
        $level = TrainingLevel::create(['name' => 'Expert', 'status' => 'active']);
        $trainer = Trainer::create([
            'name' => 'Sarah Trainer',
            'email' => 'sarah@example.com',
            'about' => 'Sarah builds practical strength plans around each client.',
            'program_type_id' => $type->id,
            'training_level_id' => $level->id,
            'session_price' => 50000,
            'certifications' => 'Certified Trainer',
            'achievements' => '100 clients trained',
            'availability' => 'available',
            'status' => 'active',
        ]);

        $this->getJson("/api/v1/trainers/{$trainer->id}")
            ->assertOk()
            ->assertJsonPath('data.about', 'Sarah builds practical strength plans around each client.');
    }
}
