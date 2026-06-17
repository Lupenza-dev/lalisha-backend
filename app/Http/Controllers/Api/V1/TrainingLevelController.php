<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\SystemSettingResource;
use App\Models\TrainingLevel;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TrainingLevelController extends Controller
{
    public function index(): JsonResponse
    {
        return SystemSettingResource::collection(
            TrainingLevel::query()->latest()->paginate(15)
        )->response();
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name' => 'required|string|max:255|unique:training_levels,name',
            'description' => 'nullable|string',
            'status' => 'required|in:active,inactive',
        ]);

        $item = TrainingLevel::create($data);

        return (new SystemSettingResource($item))
            ->additional(['message' => 'Training level created successfully.'])
            ->response()
            ->setStatusCode(201);
    }

    public function show(TrainingLevel $trainingLevel): JsonResponse
    {
        return (new SystemSettingResource($trainingLevel))->response();
    }

    public function update(Request $request, TrainingLevel $trainingLevel): JsonResponse
    {
        $data = $request->validate([
            'name' => 'required|string|max:255|unique:training_levels,name,'.$trainingLevel->id,
            'description' => 'nullable|string',
            'status' => 'required|in:active,inactive',
        ]);

        $trainingLevel->update($data);

        return (new SystemSettingResource($trainingLevel))
            ->additional(['message' => 'Training level updated successfully.'])
            ->response();
    }

    public function destroy(TrainingLevel $trainingLevel): JsonResponse
    {
        $trainingLevel->delete();

        return response()->json([
            'message' => 'Training level deleted successfully.',
        ]);
    }
}
