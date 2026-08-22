<?php

namespace Tests\Feature\Api\V1;

use App\Models\ProgramCategory;
use App\Models\ProgramType;
use App\Models\TrainingProgram;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Passport\Passport;
use Tests\TestCase;

class TrainingProgramControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_training_program_api_returns_program_name(): void
    {
        Passport::actingAs(User::factory()->create());
        $category = ProgramCategory::create([
            'name' => 'Strength',
            'description' => 'Strength programs',
            'status' => 'active',
        ]);
        $type = ProgramType::create([
            'name' => 'Online',
            'description' => 'Online delivery',
            'status' => 'active',
        ]);
        $program = TrainingProgram::create([
            'name' => 'Complete Strength Builder',
            'time_type' => 'monthly',
            'program_category_id' => $category->id,
            'program_type_id' => $type->id,
            'description' => 'A complete strength program.',
            'price' => 75000,
            'benefit' => 'Build strength.',
            'status' => 'active',
        ]);
        ProgramCategory::create([
            'name' => 'Empty Category',
            'description' => 'No programs',
            'status' => 'active',
        ]);

        $this->getJson('/api/v1/training-programs')
            ->assertOk()
            ->assertJsonPath('data.0.name', 'Complete Strength Builder');

        $this->getJson("/api/v1/training-programs/{$program->id}")
            ->assertOk()
            ->assertJsonPath('data.name', 'Complete Strength Builder');

        $this->getJson('/api/v1/program-categories?status=active&has_training_programs=1')
            ->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.name', 'Strength');
    }
}
