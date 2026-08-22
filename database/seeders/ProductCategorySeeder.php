<?php

namespace Database\Seeders;

use App\Models\ProductCategory;
use Illuminate\Database\Seeder;

class ProductCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'Supplements', 'description' => 'Protein powders, vitamins, and performance supplements.', 'status' => 'active'],
            ['name' => 'Equipment', 'description' => 'Gym and home workout equipment.', 'status' => 'active'],
            ['name' => 'Apparel', 'description' => 'Sportswear, footwear, and fitness clothing.', 'status' => 'active'],
            ['name' => 'Recovery & Wellness', 'description' => 'Foam rollers, massage tools, and recovery products.', 'status' => 'active'],
            ['name' => 'Nutrition', 'description' => 'Healthy snacks, meal replacements, and dietary foods.', 'status' => 'active'],
            ['name' => 'Accessories', 'description' => 'Gym bags, water bottles, gloves, and workout accessories.', 'status' => 'active'],
        ];

        foreach ($categories as $category) {
            ProductCategory::firstOrCreate(['name' => $category['name']], $category);
        }
    }
}
