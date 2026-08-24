<?php

namespace App\Http\Controllers;

use App\Models\ProductCategory;
use App\Models\ProgramCategory;
use App\Models\ProgramType;
use App\Models\ShopProduct;
use App\Models\Trainer;
use App\Models\TrainingLevel;
use App\Models\TrainingProgram;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ExploreController extends Controller
{
    public function programs(Request $request): Response
    {
        $search = mb_substr($request->string('search')->trim()->toString(), 0, 100);

        $programs = TrainingProgram::query()
            ->select(['id', 'name', 'time_type', 'program_category_id', 'program_type_id', 'description', 'benefit', 'price', 'cover_image'])
            ->with(['programCategory:id,name', 'programType:id,name'])
            ->withCount('clips')
            ->where('status', 'active')
            ->when($search !== '', fn ($query) => $query->where(function ($query) use ($search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhere('benefit', 'like', "%{$search}%");
            }))
            ->when($request->integer('category') > 0, fn ($query) => $query->where('program_category_id', $request->integer('category')))
            ->when($request->integer('type') > 0, fn ($query) => $query->where('program_type_id', $request->integer('type')))
            ->latest()
            ->paginate(12)
            ->withQueryString()
            ->through(fn (TrainingProgram $program) => [
                'id' => $program->id,
                'name' => $program->name,
                'time_type' => $program->time_type,
                'description' => $program->description,
                'benefit' => $program->benefit,
                'price' => (float) $program->price,
                'clips_count' => $program->clips_count,
                'cover_image_url' => $program->cover_image ? Storage::disk('public')->url($program->cover_image) : null,
                'program_category' => $program->programCategory?->name,
                'program_type' => $program->programType?->name,
            ]);

        return Inertia::render('explore/programs', [
            'programs' => $programs,
            'categories' => ProgramCategory::where('status', 'active')->orderBy('name')->get(['id', 'name']),
            'programTypes' => ProgramType::where('status', 'active')->orderBy('name')->get(['id', 'name']),
            'filters' => [
                'search' => $search,
                'category' => $request->integer('category') ?: null,
                'type' => $request->integer('type') ?: null,
            ],
        ]);
    }

    public function trainers(Request $request): Response
    {
        $search = mb_substr($request->string('search')->trim()->toString(), 0, 100);
        $availability = $request->string('availability')->toString();

        if (! in_array($availability, ['available', 'unavailable'], true)) {
            $availability = '';
        }

        $trainers = Trainer::query()
            ->select(['id', 'name', 'about', 'image', 'program_type_id', 'training_level_id', 'session_price', 'certifications', 'availability'])
            ->with(['programType:id,name', 'trainingLevel:id,name'])
            ->where('status', 'active')
            ->when($search !== '', fn ($query) => $query->where(function ($query) use ($search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('about', 'like', "%{$search}%")
                    ->orWhere('certifications', 'like', "%{$search}%");
            }))
            ->when($request->integer('type') > 0, fn ($query) => $query->where('program_type_id', $request->integer('type')))
            ->when($request->integer('level') > 0, fn ($query) => $query->where('training_level_id', $request->integer('level')))
            ->when($availability !== '', fn ($query) => $query->where('availability', $availability))
            ->latest()
            ->paginate(12)
            ->withQueryString()
            ->through(fn (Trainer $trainer) => [
                'id' => $trainer->id,
                'name' => $trainer->name,
                'about' => $trainer->about,
                'image_url' => $trainer->image ? Storage::disk('public')->url($trainer->image) : null,
                'program_type' => $trainer->programType?->name,
                'training_level' => $trainer->trainingLevel?->name,
                'session_price' => (float) $trainer->session_price,
                'certifications' => $trainer->certifications,
                'availability' => $trainer->availability,
            ]);

        return Inertia::render('explore/trainers', [
            'trainers' => $trainers,
            'programTypes' => ProgramType::where('status', 'active')->orderBy('name')->get(['id', 'name']),
            'trainingLevels' => TrainingLevel::where('status', 'active')->orderBy('name')->get(['id', 'name']),
            'filters' => [
                'search' => $search,
                'type' => $request->integer('type') ?: null,
                'level' => $request->integer('level') ?: null,
                'availability' => $availability,
            ],
        ]);
    }

    public function shop(Request $request): Response
    {
        $search = mb_substr($request->string('search')->trim()->toString(), 0, 100);

        $products = ShopProduct::query()
            ->select(['id', 'product_category_id', 'name', 'description', 'price', 'has_offer', 'offer_price', 'image'])
            ->with('productCategory:id,name')
            ->where('status', 'active')
            ->when($search !== '', fn ($query) => $query->where(function ($query) use ($search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            }))
            ->when($request->integer('category') > 0, fn ($query) => $query->where('product_category_id', $request->integer('category')))
            ->when($request->boolean('offers'), fn ($query) => $query->where('has_offer', true))
            ->latest()
            ->paginate(12)
            ->withQueryString()
            ->through(fn (ShopProduct $product) => [
                'id' => $product->id,
                'name' => $product->name,
                'description' => $product->description,
                'price' => (float) $product->price,
                'has_offer' => $product->has_offer,
                'offer_price' => $product->offer_price !== null ? (float) $product->offer_price : null,
                'image_url' => $product->image ? Storage::disk('public')->url($product->image) : null,
                'product_category' => $product->productCategory?->name,
            ]);

        return Inertia::render('explore/shop', [
            'products' => $products,
            'categories' => ProductCategory::where('status', 'active')->orderBy('name')->get(['id', 'name']),
            'filters' => [
                'search' => $search,
                'category' => $request->integer('category') ?: null,
                'offers' => $request->boolean('offers'),
            ],
        ]);
    }
}
