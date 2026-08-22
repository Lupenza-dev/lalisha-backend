<?php

namespace Database\Seeders;

use App\Models\ProductCategory;
use App\Models\ShopProduct;
use Illuminate\Database\Seeder;

class ShopProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categoryId = fn(string $name) => ProductCategory::where('name', $name)->value('id');

        $products = [
            [
                'product_category_id' => $categoryId('Supplements'),
                'name' => 'Whey Protein Isolate',
                'description' => 'High-quality whey protein isolate with 25g protein per serving. Available in chocolate and vanilla flavours.',
                'price' => 55000,
                'has_offer' => false,
                'offer_price' => null,
                'status' => 'active',
            ],
            [
                'product_category_id' => $categoryId('Supplements'),
                'name' => 'Creatine Monohydrate',
                'description' => 'Pure micronised creatine monohydrate to support strength and power output.',
                'price' => 32000,
                'has_offer' => true,
                'offer_price' => 25000,
                'status' => 'active',
            ],
            [
                'product_category_id' => $categoryId('Equipment'),
                'name' => 'Adjustable Dumbbell Set',
                'description' => 'Space-saving adjustable dumbbells ranging from 2kg to 24kg per handle.',
                'price' => 250000,
                'has_offer' => false,
                'offer_price' => null,
                'status' => 'active',
            ],
            [
                'product_category_id' => $categoryId('Equipment'),
                'name' => 'Resistance Band Set',
                'description' => 'Set of 5 resistance bands with varying tension levels for home and gym workouts.',
                'price' => 38000,
                'has_offer' => true,
                'offer_price' => 29000,
                'status' => 'active',
            ],
            [
                'product_category_id' => $categoryId('Apparel'),
                'name' => 'Performance Training Tee',
                'description' => 'Moisture-wicking athletic t-shirt with 4-way stretch fabric. Available in multiple colours.',
                'price' => 45000,
                'has_offer' => false,
                'offer_price' => null,
                'status' => 'active',
            ],
            [
                'product_category_id' => $categoryId('Recovery & Wellness'),
                'name' => 'Foam Roller Pro',
                'description' => 'High-density foam roller for deep tissue massage and muscle recovery.',
                'price' => 62000,
                'has_offer' => false,
                'offer_price' => null,
                'status' => 'active',
            ],
            [
                'product_category_id' => $categoryId('Nutrition'),
                'name' => 'Healthy Snack Box',
                'description' => 'Curated box of 12 nutritionist-approved healthy snacks for active lifestyles.',
                'price' => 35000,
                'has_offer' => true,
                'offer_price' => 27000,
                'status' => 'active',
            ],
            [
                'product_category_id' => $categoryId('Accessories'),
                'name' => 'Premium Gym Bag',
                'description' => 'Durable 40L gym bag with separate wet compartment, shoe pocket, and laptop sleeve.',
                'price' => 85000,
                'has_offer' => false,
                'offer_price' => null,
                'status' => 'active',
            ],
        ];

        foreach ($products as $product) {
            if ($product['product_category_id']) {
                ShopProduct::create($product);
            }
        }
    }
}
