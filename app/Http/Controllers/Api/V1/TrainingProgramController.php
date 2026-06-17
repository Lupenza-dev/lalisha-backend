<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\TrainingProgramResource;
use App\Models\TrainingProgram;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TrainingProgramController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = TrainingProgram::query()
            ->with(['programCategory:id,name', 'programType:id,name', 'clips'])
            ->withCount('clips')
            ->latest();

        if ($request->filled('status')) {
            $query->where('status', $request->string('status'));
        }

        if ($request->filled('program_category_id')) {
            $query->where('program_category_id', $request->integer('program_category_id'));
        }

        if ($request->filled('program_type_id')) {
            $query->where('program_type_id', $request->integer('program_type_id'));
        }

        return TrainingProgramResource::collection(
            $query->paginate($request->integer('per_page', 15))
        )->response();
    }

    public function show(TrainingProgram $trainingProgram): JsonResponse
    {
        $trainingProgram->load(['programCategory:id,name', 'programType:id,name', 'clips'])
            ->loadCount('clips');

        return (new TrainingProgramResource($trainingProgram))->response();
    }
}
