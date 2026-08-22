<?php

namespace Tests\Feature\Api\V1;

use App\Models\ProgramType;
use App\Models\Trainer;
use App\Models\TrainerSessionBooking;
use App\Models\TrainingLevel;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Passport\Passport;
use Tests\TestCase;

class TrainerSessionBookingControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_book_an_available_trainer(): void
    {
        $user = User::factory()->create();
        Passport::actingAs($user);
        $trainer = $this->createTrainer();
        $scheduledAt = now()->addDay()->startOfHour();

        $this->postJson('/api/v1/trainer-bookings', [
            'trainer_id' => $trainer->id,
            'scheduled_at' => $scheduledAt->toIso8601String(),
            'notes' => 'Focus on strength.',
        ])->assertCreated()
            ->assertJsonPath('data.trainer_id', $trainer->id)
            ->assertJsonPath('data.session_price', '50000.00')
            ->assertJsonPath('data.status', 'pending');

        $this->assertDatabaseHas('trainer_session_bookings', [
            'user_id' => $user->id,
            'trainer_id' => $trainer->id,
            'status' => 'pending',
        ]);
    }

    public function test_unavailable_trainer_cannot_be_booked(): void
    {
        Passport::actingAs(User::factory()->create());
        $trainer = $this->createTrainer(['availability' => 'unavailable']);

        $this->postJson('/api/v1/trainer-bookings', [
            'trainer_id' => $trainer->id,
            'scheduled_at' => now()->addDay()->toIso8601String(),
        ])->assertUnprocessable()->assertJsonValidationErrors('trainer_id');
    }

    public function test_same_trainer_and_time_cannot_be_booked_twice(): void
    {
        Passport::actingAs(User::factory()->create());
        $trainer = $this->createTrainer();
        $payload = ['trainer_id' => $trainer->id, 'scheduled_at' => now()->addDay()->startOfHour()->toIso8601String()];

        $this->postJson('/api/v1/trainer-bookings', $payload)->assertCreated();
        $this->postJson('/api/v1/trainer-bookings', $payload)
            ->assertUnprocessable()->assertJsonValidationErrors('scheduled_at');
    }

    public function test_user_can_only_list_their_own_bookings(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();
        $trainer = $this->createTrainer();
        Passport::actingAs($user);

        $ownBooking = TrainerSessionBooking::create([
            'booking_number' => 'TRN-OWN',
            'user_id' => $user->id,
            'trainer_id' => $trainer->id,
            'scheduled_at' => now()->addDay(),
            'session_price' => 50000,
            'status' => 'pending',
        ]);
        TrainerSessionBooking::create([
            'booking_number' => 'TRN-OTHER',
            'user_id' => $otherUser->id,
            'trainer_id' => $trainer->id,
            'scheduled_at' => now()->addDays(2),
            'session_price' => 50000,
            'status' => 'pending',
        ]);

        $this->getJson('/api/v1/trainer-bookings')
            ->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.id', $ownBooking->id)
            ->assertJsonMissing(['booking_number' => 'TRN-OTHER']);
    }

    private function createTrainer(array $overrides = []): Trainer
    {
        $type = ProgramType::create(['name' => 'Personal', 'status' => 'active']);
        $level = TrainingLevel::create(['name' => 'Expert', 'status' => 'active']);

        return Trainer::create(array_merge([
            'name' => 'Sarah Trainer',
            'email' => 'sarah@example.com',
            'program_type_id' => $type->id,
            'training_level_id' => $level->id,
            'session_price' => 50000,
            'certifications' => 'Certified Trainer',
            'achievements' => '100 clients trained',
            'availability' => 'available',
            'status' => 'active',
        ], $overrides));
    }
}
