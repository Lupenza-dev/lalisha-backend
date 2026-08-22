<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\ShopProductResource;
use App\Models\ShopProduct;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ShopProductController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = ShopProduct::query()
            ->with('productCategory:id,name')
            ->latest();

        if ($request->filled('status')) {
            $query->where('status', $request->string('status'));
        }

        if ($request->filled('product_category_id')) {
            $query->where('product_category_id', $request->integer('product_category_id'));
        }

        if ($request->filled('search')) {
            $search = $request->string('search');
            $query->where(function ($builder) use ($search) {
                $builder->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        return ShopProductResource::collection(
            $query->paginate($request->integer('per_page', 15))
        )->response();
    }

    public function show(ShopProduct $shopProduct): JsonResponse
    {
        $shopProduct->load('productCategory:id,name');

        return (new ShopProductResource($shopProduct))->response();
    }
}
