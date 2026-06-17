<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\SystemSettingResource;
use App\Models\TrainingCertificate;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TrainingCertificateController extends Controller
{
    public function index(): JsonResponse
    {
        return SystemSettingResource::collection(
            TrainingCertificate::query()->latest()->paginate(15)
        )->response();
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name' => 'required|string|max:255|unique:training_certificates,name',
            'description' => 'nullable|string',
            'status' => 'required|in:active,inactive',
        ]);

        $item = TrainingCertificate::create($data);

        return (new SystemSettingResource($item))
            ->additional(['message' => 'Training certificate created successfully.'])
            ->response()
            ->setStatusCode(201);
    }

    public function show(TrainingCertificate $trainingCertificate): JsonResponse
    {
        return (new SystemSettingResource($trainingCertificate))->response();
    }

    public function update(Request $request, TrainingCertificate $trainingCertificate): JsonResponse
    {
        $data = $request->validate([
            'name' => 'required|string|max:255|unique:training_certificates,name,'.$trainingCertificate->id,
            'description' => 'nullable|string',
            'status' => 'required|in:active,inactive',
        ]);

        $trainingCertificate->update($data);

        return (new SystemSettingResource($trainingCertificate))
            ->additional(['message' => 'Training certificate updated successfully.'])
            ->response();
    }

    public function destroy(TrainingCertificate $trainingCertificate): JsonResponse
    {
        $trainingCertificate->delete();

        return response()->json([
            'message' => 'Training certificate deleted successfully.',
        ]);
    }
}
