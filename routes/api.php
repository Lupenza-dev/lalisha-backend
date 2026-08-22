<?php

use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\CartController;
use App\Http\Controllers\Api\V1\CheckoutController;
use App\Http\Controllers\Api\V1\OrderController;
use App\Http\Controllers\Api\V1\ProductCategoryController;
use App\Http\Controllers\Api\V1\ProgramCategoryController;
use App\Http\Controllers\Api\V1\ProgramTypeController;
use App\Http\Controllers\Api\V1\ShopProductController;
use App\Http\Controllers\Api\V1\TrainerController;
use App\Http\Controllers\Api\V1\TrainerSessionBookingController;
use App\Http\Controllers\Api\V1\TrainingCertificateController;
use App\Http\Controllers\Api\V1\TrainingLevelController;
use App\Http\Controllers\Api\V1\TrainingProgramController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);

    Route::middleware('auth:api')->group(function () {
        Route::get('user', [AuthController::class, 'user']);
        Route::post('logout', [AuthController::class, 'logout']);
        Route::put('password', [AuthController::class, 'updatePassword']);
        Route::post('checkouts', [CheckoutController::class, 'store']);
        Route::get('orders', [OrderController::class, 'index']);
        Route::get('cart', [CartController::class, 'index']);
        Route::post('cart/items', [CartController::class, 'store']);
        Route::patch('cart/items/{cartItem}', [CartController::class, 'update']);
        Route::delete('cart/items/{cartItem}', [CartController::class, 'destroy']);
        Route::delete('cart', [CartController::class, 'clear']);
        Route::get('trainer-bookings', [TrainerSessionBookingController::class, 'index']);
        Route::post('trainer-bookings', [TrainerSessionBookingController::class, 'store']);

        Route::apiResource('program-categories', ProgramCategoryController::class);
        Route::apiResource('product-categories', ProductCategoryController::class);
        Route::apiResource('program-types', ProgramTypeController::class);
        Route::apiResource('training-levels', TrainingLevelController::class);
        Route::apiResource('training-certificates', TrainingCertificateController::class);
        Route::apiResource('training-programs', TrainingProgramController::class)
            ->only(['index', 'show']);
        Route::apiResource('shop-products', ShopProductController::class)
            ->only(['index', 'show']);
        Route::apiResource('trainers', TrainerController::class)
            ->only(['index', 'show']);
    });
});
