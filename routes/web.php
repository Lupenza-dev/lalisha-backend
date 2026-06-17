<?php

use App\Http\Controllers\ProductCategoryController;
use App\Http\Controllers\ProgamCategoryController;
use App\Http\Controllers\ProgamController;
use App\Http\Controllers\ProgramTypeController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\ShopProductController;
use App\Http\Controllers\TrainerController;
use App\Http\Controllers\TrainingCertificateController;
use App\Http\Controllers\TrainingLevelController;
use App\Models\ProductCategory;
use App\Models\ProgramCategory;
use App\Models\ShopProduct;
use App\Models\Trainer;
use App\Models\TrainingProgram;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

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
                        ? \Illuminate\Support\Facades\Storage::disk('public')->url($t->image)
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
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
