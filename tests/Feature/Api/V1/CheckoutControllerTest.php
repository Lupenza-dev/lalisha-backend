<?php

namespace Tests\Feature\Api\V1;

use App\Models\CartItem;
use App\Models\Order;
use App\Models\ProductCategory;
use App\Models\ProgramCategory;
use App\Models\ProgramType;
use App\Models\ShopProduct;
use App\Models\TrainingProgram;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Passport\Passport;
use Tests\TestCase;

class CheckoutControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_program_checkout_creates_a_pending_order_using_server_price(): void
    {
        $user = User::factory()->create();
        Passport::actingAs($user);
        $category = ProgramCategory::create(['name' => 'Strength', 'description' => 'Strength', 'status' => 'active']);
        $type = ProgramType::create(['name' => 'Online', 'description' => 'Online', 'status' => 'active']);
        $program = TrainingProgram::create([
            'name' => 'Strength Builder',
            'time_type' => 'monthly',
            'program_category_id' => $category->id,
            'program_type_id' => $type->id,
            'description' => 'Build strength',
            'price' => 75000,
            'benefit' => 'Get stronger',
            'status' => 'active',
        ]);

        $this->postJson('/api/v1/checkouts', [
            'source' => 'program',
            'program_id' => $program->id,
            'payment_method' => 'card',
        ])->assertCreated()
            ->assertJsonPath('data.source', 'program')
            ->assertJsonPath('data.total', '75000.00')
            ->assertJsonPath('data.status', 'pending');

        $this->assertDatabaseHas('orders', ['user_id' => $user->id, 'total' => 75000]);
    }

    public function test_cart_checkout_uses_offer_price_and_clears_cart(): void
    {
        $user = User::factory()->create();
        Passport::actingAs($user);
        $category = ProductCategory::create(['name' => 'Equipment', 'description' => 'Equipment', 'status' => 'active']);
        $product = ShopProduct::create([
            'product_category_id' => $category->id,
            'name' => 'Yoga Mat',
            'description' => 'Mat',
            'price' => 30000,
            'has_offer' => true,
            'offer_price' => 25000,
            'status' => 'active',
        ]);
        CartItem::create(['user_id' => $user->id, 'shop_product_id' => $product->id, 'quantity' => 2]);

        $this->postJson('/api/v1/checkouts', [
            'source' => 'cart',
            'payment_method' => 'mpesa',
            'phone_number' => '+255700000000',
        ])->assertCreated()
            ->assertJsonPath('data.total', '50000.00')
            ->assertJsonPath('data.total_quantity', 2);

        $this->assertDatabaseCount('cart_items', 0);
    }

    public function test_mobile_money_checkout_requires_a_phone_number(): void
    {
        Passport::actingAs(User::factory()->create());

        $this->postJson('/api/v1/checkouts', [
            'source' => 'cart',
            'payment_method' => 'mpesa',
        ])->assertUnprocessable()
            ->assertJsonValidationErrors('phone_number');
    }

    public function test_user_can_only_list_their_own_orders(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();
        Passport::actingAs($user);

        $ownOrder = $this->createOrder($user, 'ORD-OWN');
        $this->createOrder($otherUser, 'ORD-OTHER');

        $this->getJson('/api/v1/orders')
            ->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.id', $ownOrder->id)
            ->assertJsonMissing(['order_number' => 'ORD-OTHER']);
    }

    private function createOrder(User $user, string $number): Order
    {
        return Order::create([
            'order_number' => $number,
            'user_id' => $user->id,
            'source' => 'program',
            'items' => [['id' => 1, 'type' => 'training_program', 'name' => 'Strength', 'quantity' => 1, 'unit_price' => 50000, 'line_total' => 50000]],
            'total_quantity' => 1,
            'total' => 50000,
            'payment_method' => 'card',
            'status' => 'pending',
        ]);
    }
}
