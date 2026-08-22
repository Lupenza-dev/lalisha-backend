<?php

namespace Tests\Feature\Api\V1;

use App\Models\CartItem;
use App\Models\ProductCategory;
use App\Models\ShopProduct;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Passport\Passport;
use Tests\TestCase;

class CartControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_cart_requires_authentication(): void
    {
        $this->getJson('/api/v1/cart')->assertUnauthorized();
    }

    public function test_member_can_add_products_and_cart_totals_use_current_offer_price(): void
    {
        $user = User::factory()->create();
        Passport::actingAs($user);
        $product = $this->createProduct([
            'price' => 30000,
            'has_offer' => true,
            'offer_price' => 25000,
        ]);

        $this->postJson('/api/v1/cart/items', [
            'shop_product_id' => $product->id,
            'quantity' => 2,
        ])->assertCreated()
            ->assertJsonPath('data.0.quantity', 2)
            ->assertJsonPath('data.0.unit_price', 25000)
            ->assertJsonPath('data.0.line_total', 50000)
            ->assertJsonPath('meta.total_quantity', 2)
            ->assertJsonPath('meta.grand_total', 50000);

        $this->postJson('/api/v1/cart/items', [
            'shop_product_id' => $product->id,
        ])->assertCreated()
            ->assertJsonPath('data.0.quantity', 3);

        $this->assertDatabaseCount('cart_items', 1);
    }

    public function test_member_can_update_remove_and_clear_their_cart(): void
    {
        $user = User::factory()->create();
        Passport::actingAs($user);
        $firstItem = CartItem::create([
            'user_id' => $user->id,
            'shop_product_id' => $this->createProduct()->id,
            'quantity' => 1,
        ]);
        CartItem::create([
            'user_id' => $user->id,
            'shop_product_id' => $this->createProduct(['name' => 'Resistance Band'])->id,
            'quantity' => 2,
        ]);

        $this->patchJson("/api/v1/cart/items/{$firstItem->id}", ['quantity' => 4])
            ->assertOk()
            ->assertJsonPath('meta.total_quantity', 6);
        $this->deleteJson("/api/v1/cart/items/{$firstItem->id}")
            ->assertOk()
            ->assertJsonPath('meta.total_quantity', 2);
        $this->deleteJson('/api/v1/cart')
            ->assertOk()
            ->assertJsonCount(0, 'data');
    }

    public function test_member_cannot_modify_another_members_cart_item(): void
    {
        $owner = User::factory()->create();
        $otherUser = User::factory()->create();
        $item = CartItem::create([
            'user_id' => $owner->id,
            'shop_product_id' => $this->createProduct()->id,
            'quantity' => 1,
        ]);
        Passport::actingAs($otherUser);

        $this->patchJson("/api/v1/cart/items/{$item->id}", ['quantity' => 2])
            ->assertNotFound();
    }

    /** @param array<string, mixed> $overrides */
    private function createProduct(array $overrides = []): ShopProduct
    {
        $category = ProductCategory::firstOrCreate(
            ['name' => 'Equipment'],
            ['description' => 'Fitness equipment', 'status' => 'active'],
        );

        return ShopProduct::create(array_merge([
            'product_category_id' => $category->id,
            'name' => 'Yoga Mat',
            'description' => 'Non-slip mat',
            'price' => 30000,
            'has_offer' => false,
            'offer_price' => null,
            'status' => 'active',
        ], $overrides));
    }
}
