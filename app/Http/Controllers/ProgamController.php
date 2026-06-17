<?php

namespace App\Http\Controllers;

use App\Models\ProgramCategory;
use App\Models\ProgramType;
use App\Models\TrainingProgram;
use App\Models\TrainingProgramClip;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProgamController extends Controller
{
    public function index(): Response
    {
        $programs = TrainingProgram::query()
            ->with(['programCategory:id,name', 'programType:id,name'])
            ->withCount('clips')
            ->latest()
            ->get();

        return Inertia::render('programs/training-program', [
            'items' => $programs,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('programs/training-program-create', [
            'programCategories' => ProgramCategory::query()
                ->where('status', 'active')
                ->orderBy('name')
                ->get(['id', 'name']),
            'programTypes' => ProgramType::query()
                ->where('status', 'active')
                ->orderBy('name')
                ->get(['id', 'name']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'time_type' => 'required|in:weekly,monthly,days',
            'program_category_id' => 'required|exists:program_categories,id',
            'program_type_id' => 'required|exists:program_types,id',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'benefit' => 'required|string',
            'cover_image' => 'nullable|image|max:10240',
            'clips' => 'nullable|array',
            'clips.*.name' => 'required_with:clips.*.file|string|max:255',
            'clips.*.file' => 'required_with:clips.*.name|file|mimes:mp4,mov,webm,avi,mkv|max:102400',
        ]);

        DB::transaction(function () use ($request, $data) {
            $program = TrainingProgram::create([
                'time_type' => $data['time_type'],
                'program_category_id' => $data['program_category_id'],
                'program_type_id' => $data['program_type_id'],
                'description' => $data['description'],
                'price' => $data['price'],
                'benefit' => $data['benefit'],
                'cover_image' => $request->hasFile('cover_image')
                    ? $request->file('cover_image')->store('training-programs/covers', 'public')
                    : null,
            ]);

            foreach ($data['clips'] ?? [] as $clip) {
                if (! isset($clip['file'])) {
                    continue;
                }
                $program->clips()->create([
                    'name' => $clip['name'],
                    'clip_path' => $clip['file']->store('training-programs/clips', 'public'),
                ]);
            }
        });

        return redirect()->route('training-programs.index')
            ->with('success', 'Training program created successfully.');
    }

    public function edit(TrainingProgram $trainingProgram): Response
    {
        $trainingProgram->load('clips');

        return Inertia::render('programs/training-program-edit', [
            'program' => [
                'id' => $trainingProgram->id,
                'time_type' => $trainingProgram->time_type,
                'program_category_id' => $trainingProgram->program_category_id,
                'program_type_id' => $trainingProgram->program_type_id,
                'description' => $trainingProgram->description,
                'price' => $trainingProgram->price,
                'benefit' => $trainingProgram->benefit,
                'cover_image_url' => $trainingProgram->cover_image
                    ? Storage::disk('public')->url($trainingProgram->cover_image)
                    : null,
                'clips' => $trainingProgram->clips->map(fn ($c) => [
                    'id' => $c->id,
                    'name' => $c->name,
                    'url' => Storage::disk('public')->url($c->clip_path),
                ]),
            ],
            'programCategories' => ProgramCategory::query()
                ->where('status', 'active')
                ->orderBy('name')
                ->get(['id', 'name']),
            'programTypes' => ProgramType::query()
                ->where('status', 'active')
                ->orderBy('name')
                ->get(['id', 'name']),
        ]);
    }

    public function update(Request $request, TrainingProgram $trainingProgram): RedirectResponse
    {
        $data = $request->validate([
            'time_type' => 'required|in:weekly,monthly,days',
            'program_category_id' => 'required|exists:program_categories,id',
            'program_type_id' => 'required|exists:program_types,id',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'benefit' => 'required|string',
            'cover_image' => 'nullable|image|max:10240',
            'remove_cover' => 'nullable|boolean',
            'deleted_clip_ids' => 'nullable|array',
            'deleted_clip_ids.*' => 'integer|exists:training_program_clips,id',
            'clips' => 'nullable|array',
            'clips.*.name' => 'required_with:clips.*.file|string|max:255',
            'clips.*.file' => 'required_with:clips.*.name|file|mimes:mp4,mov,webm,avi,mkv|max:102400',
        ]);

        DB::transaction(function () use ($request, $data, $trainingProgram) {
            $payload = [
                'time_type' => $data['time_type'],
                'program_category_id' => $data['program_category_id'],
                'program_type_id' => $data['program_type_id'],
                'description' => $data['description'],
                'price' => $data['price'],
                'benefit' => $data['benefit'],
            ];

            if ($request->hasFile('cover_image')) {
                if ($trainingProgram->cover_image) {
                    Storage::disk('public')->delete($trainingProgram->cover_image);
                }
                $payload['cover_image'] = $request->file('cover_image')->store('training-programs/covers', 'public');
            } elseif ($request->boolean('remove_cover') && $trainingProgram->cover_image) {
                Storage::disk('public')->delete($trainingProgram->cover_image);
                $payload['cover_image'] = null;
            }

            $trainingProgram->update($payload);

            foreach ($data['deleted_clip_ids'] ?? [] as $clipId) {
                $clip = TrainingProgramClip::where('training_program_id', $trainingProgram->id)
                    ->find($clipId);
                if ($clip) {
                    Storage::disk('public')->delete($clip->clip_path);
                    $clip->delete();
                }
            }

            foreach ($data['clips'] ?? [] as $clip) {
                if (! isset($clip['file'])) {
                    continue;
                }
                $trainingProgram->clips()->create([
                    'name' => $clip['name'],
                    'clip_path' => $clip['file']->store('training-programs/clips', 'public'),
                ]);
            }
        });

        return redirect()->route('training-programs.index')
            ->with('success', 'Training program updated successfully.');
    }

    public function destroy(TrainingProgram $trainingProgram): RedirectResponse
    {
        DB::transaction(function () use ($trainingProgram) {
            if ($trainingProgram->cover_image) {
                Storage::disk('public')->delete($trainingProgram->cover_image);
            }
            foreach ($trainingProgram->clips as $clip) {
                Storage::disk('public')->delete($clip->clip_path);
            }
            $trainingProgram->delete();
        });

        return back()->with('success', 'Training program deleted successfully.');
    }
}
