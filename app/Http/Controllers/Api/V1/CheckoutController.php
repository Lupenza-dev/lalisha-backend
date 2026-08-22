<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\TrainingProgram;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class CheckoutController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'source' => ['required', 'in:cart,program'],
            'program_id' => ['nullable', 'integer', 'required_if:source,program', 'exists:training_programs,id'],
            'payment_method' => ['required', 'in:mpesa,tigopesa,airtelmoney,halopesa,bank,card'],
            'phone_number' => ['nullable', 'string', 'max:30'],
        ]);

        if (in_array($data['payment_method'], ['mpesa', 'tigopesa', 'airtelmoney', 'halopesa'], true) && empty($data['phone_number'])) {
            throw ValidationException::withMessages([
                'phone_number' => ['A phone number is required for mobile money payments.'],
            ]);
        }

        $order = DB::transaction(function () use ($request, $data): Order {
            $items = $data['source'] === 'cart'
                ? $this->cartItems($request)
                : $this->programItems($data['program_id']);

            $order = Order::create([
                'order_number' => 'ORD-'.now()->format('Ymd').'-'.Str::upper(Str::random(6)),
                'user_id' => $request->user()->id,
                'source' => $data['source'],
                'items' => $items,
                'total_quantity' => collect($items)->sum('quantity'),
                'total' => collect($items)->sum('line_total'),
                'payment_method' => $data['payment_method'],
                'phone_number' => $data['phone_number'] ?? null,
                'status' => 'pending',
            ]);

            if ($data['source'] === 'cart') {
                $request->user()->cartItems()->delete();
            }

            return $order;
        });

        return response()->json([
            'message' => 'Checkout submitted successfully.',
            'data' => $order,
        ], 201);
    }

    /** @return list<array{id: int, type: string, name: string, quantity: int, unit_price: float, line_total: float}> */
    private function cartItems(Request $request): array
    {
        $cartItems = $request->user()->cartItems()->with('shopProduct')->get();

        if ($cartItems->isEmpty()) {
            throw ValidationException::withMessages(['cart' => ['Your cart is empty.']]);
        }

        if ($cartItems->contains(fn ($item) => $item->shopProduct->status !== 'active')) {
            throw ValidationException::withMessages(['cart' => ['Your cart contains an unavailable product.']]);
        }

        return $cartItems->map(function ($item): array {
            $product = $item->shopProduct;
            $unitPrice = $product->has_offer && $product->offer_price !== null
                ? (float) $product->offer_price
                : (float) $product->price;

            return [
                'id' => $product->id,
                'type' => 'shop_product',
                'name' => $product->name,
                'quantity' => (int) $item->quantity,
                'unit_price' => $unitPrice,
                'line_total' => $unitPrice * $item->quantity,
            ];
        })->values()->all();
    }

    /** @return list<array{id: int, type: string, name: string, quantity: int, unit_price: float, line_total: float}> */
    private function programItems(int $programId): array
    {
        $program = TrainingProgram::findOrFail($programId);

        if ($program->status !== 'active') {
            throw ValidationException::withMessages(['program_id' => ['This program is not available.']]);
        }

        return [[
            'id' => $program->id,
            'type' => 'training_program',
            'name' => $program->name,
            'quantity' => 1,
            'unit_price' => (float) $program->price,
            'line_total' => (float) $program->price,
        ]];
    }
}
