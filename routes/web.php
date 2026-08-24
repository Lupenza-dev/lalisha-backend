<?php

use App\Http\Controllers\ExploreController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductCategoryController;
use App\Http\Controllers\ProgamCategoryController;
use App\Http\Controllers\ProgamController;
use App\Http\Controllers\ProgramTypeController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\ShopProductController;
use App\Http\Controllers\TrainerController;
use App\Http\Controllers\TrainerSessionBookingController;
use App\Http\Controllers\TrainingCertificateController;
use App\Http\Controllers\TrainingLevelController;
use App\Models\ProductCategory;
use App\Models\ProgramCategory;
use App\Models\ShopProduct;
use App\Models\Trainer;
use App\Models\TrainingProgram;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'platformStats' => [
            'programs' => TrainingProgram::where('status', 'active')->count(),
            'trainers' => Trainer::where('status', 'active')->count(),
            'products' => ShopProduct::where('status', 'active')->count(),
        ],
        'featuredPrograms' => TrainingProgram::query()
            ->select(['id', 'name', 'time_type', 'program_category_id', 'program_type_id', 'description', 'price', 'cover_image'])
            ->with(['programCategory:id,name', 'programType:id,name'])
            ->where('status', 'active')
            ->latest()
            ->limit(4)
            ->get()
            ->map(fn (TrainingProgram $program) => [
                'id' => $program->id,
                'name' => $program->name,
                'time_type' => $program->time_type,
                'description' => $program->description,
                'price' => (float) $program->price,
                'cover_image_url' => $program->cover_image
                    ? Storage::disk('public')->url($program->cover_image)
                    : null,
                'program_category' => $program->programCategory?->name,
                'program_type' => $program->programType?->name,
            ]),
        'featuredTrainers' => Trainer::query()
            ->select(['id', 'name', 'image', 'program_type_id', 'training_level_id', 'session_price', 'availability'])
            ->with(['programType:id,name', 'trainingLevel:id,name'])
            ->where('status', 'active')
            ->where('availability', 'available')
            ->latest()
            ->limit(4)
            ->get()
            ->map(fn (Trainer $trainer) => [
                'id' => $trainer->id,
                'name' => $trainer->name,
                'image_url' => $trainer->image
                    ? Storage::disk('public')->url($trainer->image)
                    : null,
                'program_type' => $trainer->programType?->name,
                'training_level' => $trainer->trainingLevel?->name,
                'session_price' => (float) $trainer->session_price,
                'availability' => $trainer->availability,
            ]),
        'featuredProducts' => ShopProduct::query()
            ->select(['id', 'product_category_id', 'name', 'description', 'price', 'has_offer', 'offer_price', 'image'])
            ->with('productCategory:id,name')
            ->where('status', 'active')
            ->latest()
            ->limit(4)
            ->get()
            ->map(fn (ShopProduct $product) => [
                'id' => $product->id,
                'name' => $product->name,
                'description' => $product->description,
                'price' => (float) $product->price,
                'has_offer' => $product->has_offer,
                'offer_price' => $product->offer_price !== null ? (float) $product->offer_price : null,
                'image_url' => $product->image
                    ? Storage::disk('public')->url($product->image)
                    : null,
                'product_category' => $product->productCategory?->name,
            ]),
    ]);
})->name('home');

Route::prefix('explore')->name('explore.')->group(function () {
    Route::get('programs', [ExploreController::class, 'programs'])->name('programs');
    Route::get('trainers', [ExploreController::class, 'trainers'])->name('trainers');
    Route::get('shop', [ExploreController::class, 'shop'])->name('shop');
});

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard', [
            'stats' => [
                'training_programs' => TrainingProgram::count(),
                'shop_products' => ShopProduct::count(),
                'trainers' => Trainer::count(),
                'available_trainers' => Trainer::where('availability', 'available')->count(),
                'program_categories' => ProgramCategory::count(),
                'product_categories' => ProductCategory::count(),
            ],
            'latestTrainers' => Trainer::query()
                ->with(['programType:id,name', 'trainingLevel:id,name'])
                ->latest()
                ->limit(5)
                ->get()
                ->map(fn (Trainer $t) => [
                    'id' => $t->id,
                    'name' => $t->name,
                    'email' => $t->email,
                    'image_url' => $t->image
                        ? Storage::disk('public')->url($t->image)
                        : null,
                    'program_type' => $t->programType?->name,
                    'training_level' => $t->trainingLevel?->name,
                    'availability' => $t->availability,
                ]),
            'latestPrograms' => TrainingProgram::query()
                ->with(['programCategory:id,name', 'programType:id,name'])
                ->latest()
                ->limit(5)
                ->get()
                ->map(fn (TrainingProgram $p) => [
                    'id' => $p->id,
                    'name' => $p->name,
                    'price' => (float) $p->price,
                    'time_type' => $p->time_type,
                    'program_category' => $p->programCategory?->name,
                    'program_type' => $p->programType?->name,
                ]),
        ]);
    })->name('dashboard');
    Route::get('system-settings', [SettingController::class, 'index'])->name('system-settings');

    Route::resource('program-categories', ProgamCategoryController::class);
    Route::resource('product-categories', ProductCategoryController::class);
    Route::resource('program-types', ProgramTypeController::class);
    Route::resource('training-levels', TrainingLevelController::class);
    Route::resource('training-certificates', TrainingCertificateController::class);
    Route::resource('training-programs', ProgamController::class);
    Route::resource('shop-products', ShopProductController::class);
    Route::resource('trainers', TrainerController::class);
    Route::get('orders', [OrderController::class, 'index'])->name('orders.index');
    Route::get('trainer-bookings', [TrainerSessionBookingController::class, 'index'])->name('trainer-bookings.index');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
