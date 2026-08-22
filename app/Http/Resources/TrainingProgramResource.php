<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class TrainingProgramResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'time_type' => $this->time_type,
            'price' => (float) $this->price,
            'description' => $this->description,
            'benefit' => $this->benefit,
            'status' => $this->status,
            'cover_image_url' => $this->cover_image
                ? Storage::disk('public')->url($this->cover_image)
                : null,
            'program_category' => $this->whenLoaded('programCategory', fn () => [
                'id' => $this->programCategory->id,
                'name' => $this->programCategory->name,
            ]),
            'program_type' => $this->whenLoaded('programType', fn () => [
                'id' => $this->programType->id,
                'name' => $this->programType->name,
            ]),
            'clips' => TrainingProgramClipResource::collection($this->whenLoaded('clips')),
            'clips_count' => $this->when(
                isset($this->clips_count),
                fn () => (int) $this->clips_count,
            ),
            'created_at' => $this->created_at?->toIso8601String(),
            'updated_at' => $this->updated_at?->toIso8601String(),
        ];
    }
}
