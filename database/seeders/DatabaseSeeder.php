<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $this->call(RoleSeeder::class);

        $admin = User::factory()->create([
            'name' => 'Test User',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('Admin@123'),
        ]);

        $admin->assignRole('Admin');

        $this->call([
            ProgramCategorySeeder::class,
            ProductCategorySeeder::class,
            ProgramTypeSeeder::class,
            TrainingLevelSeeder::class,
            TrainingCertificateSeeder::class,
            TrainerSeeder::class,
            TrainingProgramSeeder::class,
            ShopProductSeeder::class,
        ]);
    }
}
