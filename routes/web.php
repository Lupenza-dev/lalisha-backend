<?php

use App\Http\Controllers\ProgamCategoryController;
use App\Http\Controllers\ProgramTypeController;
use App\Http\Controllers\ProductCategoryController;
use App\Http\Controllers\ProgamController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\TrainingLevelController;
use App\Http\Controllers\TrainingCertificateController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::get('system-settings', [SettingController::class, 'index'])->name('system-settings');

    Route::resource('program-categories', ProgamCategoryController::class);
    Route::resource('product-categories', ProductCategoryController::class);
    Route::resource('program-types', ProgramTypeController::class);
    Route::resource('training-levels', TrainingLevelController::class);
    Route::resource('training-certificates', TrainingCertificateController::class);
    Route::resource('training-programs',ProgamController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
