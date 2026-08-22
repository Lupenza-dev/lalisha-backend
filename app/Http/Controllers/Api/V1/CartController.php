<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\CartItemResource;
use App\Models\CartItem;
use App\Models\ShopProduct;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class CartController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        return $this->cartResponse($request);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'shop_product_id' => ['required', 'integer', 'exists:shop_products,id'],
            'quantity' => ['sometimes', 'integer', 'min:1', 'max:99'],
        ]);
        $product = ShopProduct::findOrFail($data['shop_product_id']);

        if ($product->status !== 'active') {
            throw ValidationException::withMessages([
                'shop_product_id' => ['This product is not currently available.'],
            ]);
        }

        $quantity = $data['quantity'] ?? 1;
        $cartItem = CartItem::firstOrNew([
            'user_id' => $request->user()->id,
            'shop_product_id' => $product->id,
        ]);
        $cartItem->quantity = min(99, ($cartItem->exists ? $cartItem->quantity : 0) + $quantity);
        $cartItem->save();

        return $this->cartResponse($request, 201);
    }

    public function update(Request $request, CartItem $cartItem): JsonResponse
    {
        $this->authorizeCartItem($request, $cartItem);
        $data = $request->validate([
            'quantity' => ['required', 'integer', 'min:1', 'max:99'],
        ]);
        $cartItem->update($data);

        return $this->cartResponse($request);
    }

    public function destroy(Request $request, CartItem $cartItem): JsonResponse
    {
        $this->authorizeCartItem($request, $cartItem);
        $cartItem->delete();

        return $this->cartResponse($request);
    }

    public function clear(Request $request): JsonResponse
    {
        $request->user()->cartItems()->delete();

        return $this->cartResponse($request);
    }

    private function authorizeCartItem(Request $request, CartItem $cartItem): void
    {
        abort_unless($cartItem->user_id === $request->user()->id, 404);
    }

    private function cartResponse(Request $request, int $status = 200): JsonResponse
    {
        $items = $request->user()->cartItems()->with('shopProduct')->latest()->get();
        $resolvedItems = CartItemResource::collection($items)->resolve($request);

        return response()->json([
            'data' => $resolvedItems,
            'meta' => [
                'total_quantity' => $items->sum('quantity'),
                'grand_total' => collect($resolvedItems)->sum('line_total'),
            ],
        ], $status);
    }
}
