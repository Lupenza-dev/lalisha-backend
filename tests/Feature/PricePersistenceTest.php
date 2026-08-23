<?php

namespace Tests\Feature;

use App\Models\ProductCategory;
use App\Models\ProgramCategory;
use App\Models\ProgramType;
use App\Models\ShopProduct;
use App\Models\Trainer;
use App\Models\TrainingLevel;
use App\Models\TrainingProgram;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PricePersistenceTest extends TestCase
{
    use RefreshDatabase;

    public function test_trainer_price_is_stored_and_updated_without_being_changed(): void
    {
        $this->actingAs(User::factory()->create());
        $type = ProgramType::create(['name' => 'Personal', 'status' => 'active']);
        $level = TrainingLevel::create(['name' => 'Expert', 'status' => 'active']);
        $payload = [
            'name' => 'Price Test Trainer',
            'email' => 'price-trainer@example.com',
            'about' => 'Trainer biography.',
            'program_type_id' => $type->id,
            'training_level_id' => $level->id,
            'session_price' => '125000.75',
            'certifications' => 'Certified',
            'achievements' => 'Achievement',
            'availability' => 'available',
        ];

        $this->post('/trainers', $payload)->assertRedirect('/trainers');
        $trainer = Trainer::where('email', $payload['email'])->firstOrFail();
        $this->assertSame('125000.75', $trainer->session_price);

        $payload['session_price'] = '987654.32';
        $payload['status'] = 'active';
        $this->put("/trainers/{$trainer->id}", $payload)->assertRedirect('/trainers');
        $this->assertSame('987654.32', $trainer->fresh()->session_price);
    }

    public function test_program_price_is_stored_and_updated_without_being_changed(): void
    {
        $this->actingAs(User::factory()->create());
        $category = ProgramCategory::create(['name' => 'Strength', 'status' => 'active']);
        $type = ProgramType::create(['name' => 'Online', 'status' => 'active']);
        $payload = [
            'name' => 'Exact Price Program',
            'time_type' => 'monthly',
            'program_category_id' => $category->id,
            'program_type_id' => $type->id,
            'description' => 'Description',
            'price' => '225000.50',
            'benefit' => 'Benefit',
        ];

        $this->post('/training-programs', $payload)->assertRedirect('/training-programs');
        $program = TrainingProgram::where('name', $payload['name'])->firstOrFail();
        $this->assertSame('225000.50', $program->price);

        $payload['price'] = '765432.10';
        $this->put("/training-programs/{$program->id}", $payload)->assertRedirect('/training-programs');
        $this->assertSame('765432.10', $program->fresh()->price);
    }

    public function test_product_prices_are_stored_and_updated_without_being_changed(): void
    {
        $this->actingAs(User::factory()->create());
        $category = ProductCategory::create(['name' => 'Equipment', 'status' => 'active']);
        $payload = [
            'product_category_id' => $category->id,
            'name' => 'Exact Price Product',
            'description' => 'Description',
            'price' => '345000.95',
            'has_offer' => true,
            'offer_price' => '300000.45',
        ];

        $this->post('/shop-products', $payload)->assertRedirect('/shop-products');
        $product = ShopProduct::where('name', $payload['name'])->firstOrFail();
        $this->assertSame('345000.95', $product->price);
        $this->assertSame('300000.45', $product->offer_price);

        $payload['price'] = '654321.75';
        $payload['offer_price'] = '600000.25';
        $payload['status'] = 'active';
        $this->put("/shop-products/{$product->id}", $payload)->assertRedirect('/shop-products');
        $this->assertSame('654321.75', $product->fresh()->price);
        $this->assertSame('600000.25', $product->fresh()->offer_price);
    }
}
