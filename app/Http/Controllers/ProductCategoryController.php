<?php

namespace App\Http\Controllers;

use App\Models\ProductCategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductCategoryController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('system-settings/programs-categories/product-categories', [
            'items' => ProductCategory::query()->latest()->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => 'required|string|max:255|unique:product_categories,name',
            'description' => 'nullable|string',
            'status' => 'required|in:active,inactive',
        ]);

        ProductCategory::create($data);

        return back()->with('success', 'Product category created successfully.');
    }

    public function update(Request $request, ProductCategory $productCategory): RedirectResponse
    {
        $data = $request->validate([
            'name' => 'required|string|max:255|unique:product_categories,name,'.$productCategory->id,
            'description' => 'nullable|string',
            'status' => 'required|in:active,inactive',
        ]);

        $productCategory->update($data);

        return back()->with('success', 'Product category updated successfully.');
    }

    public function destroy(ProductCategory $productCategory): RedirectResponse
    {
        $productCategory->delete();

        return back()->with('success', 'Product category deleted successfully.');
    }
}
