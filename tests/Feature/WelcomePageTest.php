<?php

namespace Tests\Feature;

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

class WelcomePageTest extends TestCase
{
    use LazilyRefreshDatabase;

    public function test_welcome_page_displays_active_programs_trainers_and_products(): void
    {
        $this->seed([
            ProgramCategorySeeder::class,
            ProductCategorySeeder::class,
            ProgramTypeSeeder::class,
            TrainingLevelSeeder::class,
            TrainingProgramSeeder::class,
            TrainerSeeder::class,
            ShopProductSeeder::class,
        ]);

        $this->get(route('home'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('welcome')
                ->where('platformStats.programs', 6)
                ->where('platformStats.trainers', 6)
                ->where('platformStats.products', 8)
                ->has('featuredPrograms', 4)
                ->has('featuredPrograms.0', fn (Assert $program) => $program
                    ->hasAll(['id', 'name', 'time_type', 'description', 'price', 'cover_image_url', 'program_category', 'program_type'])
                )
                ->has('featuredTrainers', 4)
                ->has('featuredTrainers.0', fn (Assert $trainer) => $trainer
                    ->where('availability', 'available')
                    ->hasAll(['id', 'name', 'image_url', 'program_type', 'training_level', 'session_price'])
                )
                ->has('featuredProducts', 4)
                ->has('featuredProducts.0', fn (Assert $product) => $product
                    ->hasAll(['id', 'name', 'description', 'price', 'has_offer', 'offer_price', 'image_url', 'product_category'])
                )
            );
    }
}
