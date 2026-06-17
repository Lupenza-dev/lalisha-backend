<?php

use App\Http\Controllers\Api\V1\ProductCategoryController;
use App\Http\Controllers\Api\V1\ProgramCategoryController;
use App\Http\Controllers\Api\V1\ProgramTypeController;
use App\Http\Controllers\Api\V1\TrainerController;
use App\Http\Controllers\Api\V1\TrainingCertificateController;
use App\Http\Controllers\Api\V1\TrainingLevelController;
use App\Http\Controllers\Api\V1\TrainingProgramController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::apiResource('program-categories', ProgramCategoryController::class);
    Route::apiResource('product-categories', ProductCategoryController::class);
    Route::apiResource('program-types', ProgramTypeController::class);
    Route::apiResource('training-levels', TrainingLevelController::class);
    Route::apiResource('training-certificates', TrainingCertificateController::class);
    Route::apiResource('training-programs', TrainingProgramController::class)
        ->only(['index', 'show']);
    Route::apiResource('trainers', TrainerController::class)
        ->only(['index', 'show']);
});
