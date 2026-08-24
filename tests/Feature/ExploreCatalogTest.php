<?php

namespace Tests\Feature;

use App\Models\ProductCategory;
use App\Models\ProgramCategory;
use App\Models\ProgramType;
use App\Models\ShopProduct;
use App\Models\Trainer;
use App\Models\TrainingLevel;
use App\Models\TrainingProgram;
use Database\Seeders\ProductCategorySeeder;
use Database\Seeders\ProgramCategorySeeder;
use Database\Seeders\ProgramTypeSeeder;
use Database\Seeders\ShopProductSeeder;
use Database\Seeders\TrainerSeeder;
use Database\Seeders\TrainingLevelSeeder;
use Database\Seeders\TrainingProgramSeeder;
use Illuminate\Foundation\Testing\LazilyRefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class ExploreCatalogTest extends TestCase
{
    use LazilyRefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seed([
            ProgramCategorySeeder::class,
            ProductCategorySeeder::class,
            ProgramTypeSeeder::class,
            TrainingLevelSeeder::class,
            TrainingProgramSeeder::class,
            TrainerSeeder::class,
            ShopProductSeeder::class,
        ]);

        $this->createInactiveRecords();
    }

    public function test_guests_can_browse_all_public_catalogues(): void
    {
        $this->get(route('explore.programs'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('explore/programs')
                ->where('programs.total', 6)
                ->has('programs.data', 6)
                ->has('categories')
                ->has('programTypes')
            );

        $this->get(route('explore.trainers'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('explore/trainers')
                ->where('trainers.total', 6)
                ->has('trainers.data', 6)
                ->has('programTypes')
                ->has('trainingLevels')
            );

        $this->get(route('explore.shop'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('explore/shop')
                ->where('products.total', 8)
                ->has('products.data', 8)
                ->has('categories')
            );
    }

    public function test_program_catalogue_can_be_searched(): void
    {
        $this->get(route('explore.programs', ['search' => 'Mindful Movement']))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->where('filters.search', 'Mindful Movement')
                ->where('programs.total', 1)
                ->where('programs.data.0.name', 'Mindful Movement')
            );
    }

    public function test_trainer_catalogue_can_be_filtered_by_availability(): void
    {
        $this->get(route('explore.trainers', ['availability' => 'available']))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->where('filters.availability', 'available')
                ->where('trainers.total', 5)
                ->where('trainers.data', fn ($trainers) => $trainers->every(
                    fn (array $trainer) => $trainer['availability'] === 'available'
                ))
            );
    }

    public function test_shop_catalogue_can_show_offers_only(): void
    {
        $this->get(route('explore.shop', ['offers' => 1]))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->where('filters.offers', true)
                ->where('products.total', 3)
                ->where('products.data', fn ($products) => $products->every(
                    fn (array $product) => $product['has_offer'] === true
                ))
            );
    }

    private function createInactiveRecords(): void
    {
        $programCategory = ProgramCategory::firstOrFail();
        $productCategory = ProductCategory::firstOrFail();
        $programType = ProgramType::firstOrFail();
        $trainingLevel = TrainingLevel::firstOrFail();

        TrainingProgram::create([
            'name' => 'Hidden Program',
            'time_type' => 'weekly',
            'program_category_id' => $programCategory->id,
            'program_type_id' => $programType->id,
            'description' => 'This program must remain private.',
            'price' => 1000,
            'benefit' => 'Hidden benefit.',
            'status' => 'inactive',
        ]);

        Trainer::create([
            'name' => 'Hidden Trainer',
            'email' => 'hidden.trainer@example.com',
            'program_type_id' => $programType->id,
            'training_level_id' => $trainingLevel->id,
            'session_price' => 1000,
            'certifications' => 'Private certification',
            'achievements' => 'Private achievement',
            'availability' => 'available',
            'status' => 'inactive',
        ]);

        ShopProduct::create([
            'product_category_id' => $productCategory->id,
            'name' => 'Hidden Product',
            'description' => 'This product must remain private.',
            'price' => 1000,
            'has_offer' => false,
            'status' => 'inactive',
        ]);

    }
}
