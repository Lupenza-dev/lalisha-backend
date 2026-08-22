<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class CartItemResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $product = $this->shopProduct;
        $unitPrice = $product->has_offer && $product->offer_price !== null
            ? (float) $product->offer_price
            : (float) $product->price;

        return [
            'id' => $this->id,
            'quantity' => (int) $this->quantity,
            'unit_price' => $unitPrice,
            'line_total' => $unitPrice * $this->quantity,
            'product' => [
                'id' => $product->id,
                'name' => $product->name,
                'description' => $product->description,
                'image_url' => $product->image ? Storage::disk('public')->url($product->image) : null,
                'status' => $product->status,
            ],
        ];
    }
}
