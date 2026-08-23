<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class TrainerResource extends JsonResource
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
            'email' => $this->email,
            'about' => $this->about,
            'image_url' => $this->image
                ? Storage::disk('public')->url($this->image)
                : null,
            'session_price' => (float) $this->session_price,
            'certifications' => $this->certifications,
            'achievements' => $this->achievements,
            'availability' => $this->availability,
            'status' => $this->status,
            'program_type' => $this->whenLoaded('programType', fn () => [
                'id' => $this->programType->id,
                'name' => $this->programType->name,
            ]),
            'training_level' => $this->whenLoaded('trainingLevel', fn () => [
                'id' => $this->trainingLevel->id,
                'name' => $this->trainingLevel->name,
            ]),
            'created_at' => $this->created_at?->toIso8601String(),
            'updated_at' => $this->updated_at?->toIso8601String(),
        ];
    }
}
