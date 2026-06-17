<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\TrainerResource;
use App\Models\Trainer;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TrainerController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Trainer::query()
            ->with(['programType:id,name', 'trainingLevel:id,name'])
            ->latest();

        if ($request->filled('status')) {
            $query->where('status', $request->string('status'));
        }

        if ($request->filled('availability')) {
            $query->where('availability', $request->string('availability'));
        }

        if ($request->filled('program_type_id')) {
            $query->where('program_type_id', $request->integer('program_type_id'));
        }

        if ($request->filled('training_level_id')) {
            $query->where('training_level_id', $request->integer('training_level_id'));
        }

        if ($request->filled('search')) {
            $search = $request->string('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        return TrainerResource::collection(
            $query->paginate($request->integer('per_page', 15))
        )->response();
    }

    public function show(Trainer $trainer): JsonResponse
    {
        $trainer->load(['programType:id,name', 'trainingLevel:id,name']);

        return (new TrainerResource($trainer))->response();
    }
}
