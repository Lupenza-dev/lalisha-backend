<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\SystemSettingResource;
use App\Models\ProgramCategory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProgramCategoryController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = ProgramCategory::query()->latest();

        if ($request->filled('status')) {
            $query->where('status', $request->string('status'));
        }

        if ($request->boolean('has_training_programs')) {
            $query->whereHas('trainingPrograms', function (Builder $trainingPrograms) {
                $trainingPrograms->where('status', 'active');
            });
        }

        return SystemSettingResource::collection(
            $query->paginate($request->integer('per_page', 15))
        )->response();
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name' => 'required|string|max:255|unique:program_categories,name',
            'description' => 'nullable|string',
            'icon_name' => 'nullable|string|max:100',
            'status' => 'required|in:active,inactive',
        ]);

        $item = ProgramCategory::create($data);

        return (new SystemSettingResource($item))
            ->additional(['message' => 'Program category created successfully.'])
            ->response()
            ->setStatusCode(201);
    }

    public function show(ProgramCategory $programCategory): JsonResponse
    {
        return (new SystemSettingResource($programCategory))->response();
    }

    public function update(Request $request, ProgramCategory $programCategory): JsonResponse
    {
        $data = $request->validate([
            'name' => 'required|string|max:255|unique:program_categories,name,'.$programCategory->id,
            'description' => 'nullable|string',
            'icon_name' => 'nullable|string|max:100',
            'status' => 'required|in:active,inactive',
        ]);

        $programCategory->update($data);

        return (new SystemSettingResource($programCategory))
            ->additional(['message' => 'Program category updated successfully.'])
            ->response();
    }

    public function destroy(ProgramCategory $programCategory): JsonResponse
    {
        $programCategory->delete();

        return response()->json([
            'message' => 'Program category deleted successfully.',
        ]);
    }
}
