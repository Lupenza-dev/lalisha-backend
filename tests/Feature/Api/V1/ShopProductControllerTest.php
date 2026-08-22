<?php

namespace Tests\Feature\Api\V1;

use App\Models\ProductCategory;
use App\Models\ShopProduct;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Passport\Passport;
use Tests\TestCase;

class ShopProductControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_shop_products_require_authentication(): void
    {
        $this->getJson('/api/v1/shop-products')->assertUnauthorized();
    }

    public function test_authenticated_member_can_list_and_filter_active_shop_products(): void
    {
        Passport::actingAs(User::factory()->create());
        $category = ProductCategory::create([
            'name' => 'Equipment',
            'description' => 'Fitness equipment',
            'status' => 'active',
        ]);
        ShopProduct::create([
            'product_category_id' => $category->id,
            'name' => 'Yoga Mat',
            'description' => 'Non-slip mat',
            'price' => 30000,
            'has_offer' => true,
            'offer_price' => 25000,
            'status' => 'active',
        ]);
        ShopProduct::create([
            'product_category_id' => $category->id,
            'name' => 'Hidden Product',
            'description' => 'Inactive product',
            'price' => 10000,
            'status' => 'inactive',
        ]);

        $this->getJson('/api/v1/shop-products?status=active&search=Yoga')
            ->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.name', 'Yoga Mat')
            ->assertJsonPath('data.0.offer_price', 25000)
            ->assertJsonPath('data.0.product_category.name', 'Equipment')
            ->assertJsonStructure(['data', 'links', 'meta']);
    }

    public function test_authenticated_member_can_view_a_shop_product(): void
    {
        Passport::actingAs(User::factory()->create());
        $category = ProductCategory::create([
            'name' => 'Supplements',
            'description' => 'Nutrition products',
            'status' => 'active',
        ]);
        $product = ShopProduct::create([
            'product_category_id' => $category->id,
            'name' => 'Protein',
            'description' => 'Protein powder',
            'price' => 45000,
            'status' => 'active',
        ]);

        $this->getJson("/api/v1/shop-products/{$product->id}")
            ->assertOk()
            ->assertJsonPath('data.id', $product->id)
            ->assertJsonPath('data.price', 45000);
    }
}
