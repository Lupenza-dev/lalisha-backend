<?php

namespace App\Http\Controllers;

use App\Models\ProgramType;
use App\Models\Trainer;
use App\Models\TrainingLevel;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class TrainerController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('trainers/trainer', [
            'items' => Trainer::query()
                ->with(['programType:id,name', 'trainingLevel:id,name'])
                ->latest()
                ->get()
                ->map(fn (Trainer $t) => [
                    'id' => $t->id,
                    'name' => $t->name,
                    'email' => $t->email,
                    'about' => $t->about,
                    'image_url' => $t->image ? Storage::disk('public')->url($t->image) : null,
                    'session_price' => $t->session_price,
                    'availability' => $t->availability,
                    'status' => $t->status,
                    'program_type' => $t->programType ? ['id' => $t->programType->id, 'name' => $t->programType->name] : null,
                    'training_level' => $t->trainingLevel ? ['id' => $t->trainingLevel->id, 'name' => $t->trainingLevel->name] : null,
                ]),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('trainers/trainer-create', $this->selectOptions());
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validateData($request);

        unset($data['remove_image']);

        $data['image'] = $request->hasFile('image')
            ? $request->file('image')->store('trainers', 'public')
            : null;

        Trainer::create($data);

        return redirect()->route('trainers.index')
            ->with('success', 'Trainer created successfully.');
    }

    public function edit(Trainer $trainer): Response
    {
        return Inertia::render('trainers/trainer-edit', [
            'trainer' => [
                'id' => $trainer->id,
                'name' => $trainer->name,
                'email' => $trainer->email,
                'about' => $trainer->about,
                'program_type_id' => $trainer->program_type_id,
                'training_level_id' => $trainer->training_level_id,
                'session_price' => $trainer->session_price,
                'certifications' => $trainer->certifications,
                'achievements' => $trainer->achievements,
                'availability' => $trainer->availability,
                'status' => $trainer->status,
                'image_url' => $trainer->image ? Storage::disk('public')->url($trainer->image) : null,
            ],
            ...$this->selectOptions(),
        ]);
    }

    public function update(Request $request, Trainer $trainer): RedirectResponse
    {
        $data = $this->validateData($request, $trainer->id, true);

        if ($request->hasFile('image')) {
            if ($trainer->image) {
                Storage::disk('public')->delete($trainer->image);
            }
            $data['image'] = $request->file('image')->store('trainers', 'public');
        } elseif ($request->boolean('remove_image') && $trainer->image) {
            Storage::disk('public')->delete($trainer->image);
            $data['image'] = null;
        }

        unset($data['remove_image']);

        $trainer->update($data);

        return redirect()->route('trainers.index')
            ->with('success', 'Trainer updated successfully.');
    }

    public function destroy(Trainer $trainer): RedirectResponse
    {
        if ($trainer->image) {
            Storage::disk('public')->delete($trainer->image);
        }
        $trainer->delete();

        return back()->with('success', 'Trainer deleted successfully.');
    }

    /**
     * @return array<string, mixed>
     */
    private function selectOptions(): array
    {
        return [
            'programTypes' => ProgramType::query()
                ->where('status', 'active')
                ->orderBy('name')
                ->get(['id', 'name']),
            'trainingLevels' => TrainingLevel::query()
                ->where('status', 'active')
                ->orderBy('name')
                ->get(['id', 'name']),
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private function validateData(Request $request, ?int $ignoreId = null, bool $allowStatus = false): array
    {
        $rules = [
            'name' => 'required|string|max:255',
            'email' => ['required', 'email', 'max:255', Rule::unique('trainers', 'email')->ignore($ignoreId)],
            'about' => 'nullable|string|max:5000',
            'program_type_id' => 'required|exists:program_types,id',
            'training_level_id' => 'required|exists:training_levels,id',
            'session_price' => ['required', 'numeric', 'decimal:0,2', 'min:0', 'max:99999999.99'],
            'certifications' => 'required|string',
            'achievements' => 'required|string',
            'availability' => 'required|in:available,unavailable',
            'image' => 'nullable|image|max:10240',
            'remove_image' => 'nullable|boolean',
        ];

        if ($allowStatus) {
            $rules['status'] = 'nullable|in:active,inactive';
        }

        return $request->validate($rules);
    }
}
