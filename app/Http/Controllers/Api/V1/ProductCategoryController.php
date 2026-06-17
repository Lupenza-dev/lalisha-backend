<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\SystemSettingResource;
use App\Models\ProductCategory;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProductCategoryController extends Controller
{
    public function index(): JsonResponse
    {
        return SystemSettingResource::collection(
            ProductCategory::query()->latest()->paginate(15)
        )->response();
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name' => 'required|string|max:255|unique:product_categories,name',
            'description' => 'nullable|string',
            'status' => 'required|in:active,inactive',
        ]);

        $item = ProductCategory::create($data);

        return (new SystemSettingResource($item))
            ->additional(['message' => 'Product category created successfully.'])
            ->response()
            ->setStatusCode(201);
    }

    public function show(ProductCategory $productCategory): JsonResponse
    {
        return (new SystemSettingResource($productCategory))->response();
    }

    public function update(Request $request, ProductCategory $productCategory): JsonResponse
    {
        $data = $request->validate([
            'name' => 'required|string|max:255|unique:product_categories,name,'.$productCategory->id,
            'description' => 'nullable|string',
            'status' => 'required|in:active,inactive',
        ]);

        $productCategory->update($data);

        return (new SystemSettingResource($productCategory))
            ->additional(['message' => 'Product category updated successfully.'])
            ->response();
    }

    public function destroy(ProductCategory $productCategory): JsonResponse
    {
        $productCategory->delete();

        return response()->json([
            'message' => 'Product category deleted successfully.',
        ]);
    }
}
