<?php

namespace App\Http\Controllers;

use App\Models\ProductCategory;
use App\Models\ShopProduct;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ShopProductController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('shop/shop-product', [
            'items' => ShopProduct::query()
                ->with('productCategory:id,name')
                ->latest()
                ->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('shop/shop-product-create', [
            'productCategories' => ProductCategory::query()
                ->where('status', 'active')
                ->orderBy('name')
                ->get(['id', 'name']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validateData($request);

        ShopProduct::create([
            'product_category_id' => $data['product_category_id'],
            'name' => $data['name'],
            'description' => $data['description'],
            'price' => $data['price'],
            'has_offer' => $data['has_offer'] ?? false,
            'offer_price' => ($data['has_offer'] ?? false) ? $data['offer_price'] : null,
            'image' => $request->hasFile('image')
                ? $request->file('image')->store('shop-products', 'public')
                : null,
        ]);

        return redirect()->route('shop-products.index')
            ->with('success', 'Shop product created successfully.');
    }

    public function edit(ShopProduct $shopProduct): Response
    {
        return Inertia::render('shop/shop-product-edit', [
            'product' => [
                'id' => $shopProduct->id,
                'product_category_id' => $shopProduct->product_category_id,
                'name' => $shopProduct->name,
                'description' => $shopProduct->description,
                'price' => $shopProduct->price,
                'has_offer' => $shopProduct->has_offer,
                'offer_price' => $shopProduct->offer_price,
                'image_url' => $shopProduct->image
                    ? Storage::disk('public')->url($shopProduct->image)
                    : null,
                'status' => $shopProduct->status,
            ],
            'productCategories' => ProductCategory::query()
                ->where('status', 'active')
                ->orderBy('name')
                ->get(['id', 'name']),
        ]);
    }

    public function update(Request $request, ShopProduct $shopProduct): RedirectResponse
    {
        $data = $this->validateData($request, true);

        $payload = [
            'product_category_id' => $data['product_category_id'],
            'name' => $data['name'],
            'description' => $data['description'],
            'price' => $data['price'],
            'has_offer' => $data['has_offer'] ?? false,
            'offer_price' => ($data['has_offer'] ?? false) ? $data['offer_price'] : null,
            'status' => $data['status'] ?? $shopProduct->status,
        ];

        if ($request->hasFile('image')) {
            if ($shopProduct->image) {
                Storage::disk('public')->delete($shopProduct->image);
            }
            $payload['image'] = $request->file('image')->store('shop-products', 'public');
        } elseif ($request->boolean('remove_image') && $shopProduct->image) {
            Storage::disk('public')->delete($shopProduct->image);
            $payload['image'] = null;
        }

        $shopProduct->update($payload);

        return redirect()->route('shop-products.index')
            ->with('success', 'Shop product updated successfully.');
    }

    public function destroy(ShopProduct $shopProduct): RedirectResponse
    {
        if ($shopProduct->image) {
            Storage::disk('public')->delete($shopProduct->image);
        }
        $shopProduct->delete();

        return back()->with('success', 'Shop product deleted successfully.');
    }

    /**
     * @return array<string, mixed>
     */
    private function validateData(Request $request, bool $allowStatus = false): array
    {
        $rules = [
            'product_category_id' => 'required|exists:product_categories,id',
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'has_offer' => 'nullable|boolean',
            'offer_price' => 'nullable|numeric|min:0|required_if:has_offer,true|lt:price',
            'image' => 'nullable|image|max:10240',
            'remove_image' => 'nullable|boolean',
        ];

        if ($allowStatus) {
            $rules['status'] = 'nullable|in:active,inactive';
        }

        return $request->validate($rules);
    }
}
