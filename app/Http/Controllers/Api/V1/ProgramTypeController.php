<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\SystemSettingResource;
use App\Models\ProgramType;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProgramTypeController extends Controller
{
    public function index(): JsonResponse
    {
        return SystemSettingResource::collection(
            ProgramType::query()->latest()->paginate(15)
        )->response();
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name' => 'required|string|max:255|unique:program_types,name',
            'description' => 'nullable|string',
            'status' => 'required|in:active,inactive',
        ]);

        $item = ProgramType::create($data);

        return (new SystemSettingResource($item))
            ->additional(['message' => 'Program type created successfully.'])
            ->response()
            ->setStatusCode(201);
    }

    public function show(ProgramType $programType): JsonResponse
    {
        return (new SystemSettingResource($programType))->response();
    }

    public function update(Request $request, ProgramType $programType): JsonResponse
    {
        $data = $request->validate([
            'name' => 'required|string|max:255|unique:program_types,name,'.$programType->id,
            'description' => 'nullable|string',
            'status' => 'required|in:active,inactive',
        ]);

        $programType->update($data);

        return (new SystemSettingResource($programType))
            ->additional(['message' => 'Program type updated successfully.'])
            ->response();
    }

    public function destroy(ProgramType $programType): JsonResponse
    {
        $programType->delete();

        return response()->json([
            'message' => 'Program type deleted successfully.',
        ]);
    }
}
