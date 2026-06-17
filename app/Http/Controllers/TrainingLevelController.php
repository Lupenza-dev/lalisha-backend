<?php

namespace App\Http\Controllers;

use App\Models\TrainingLevel;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TrainingLevelController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('system-settings/programs-categories/training-levels', [
            'items' => TrainingLevel::query()->latest()->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => 'required|string|max:255|unique:training_levels,name',
            'description' => 'nullable|string',
            'status' => 'required|in:active,inactive',
        ]);

        TrainingLevel::create($data);

        return back()->with('success', 'Training level created successfully.');
    }

    public function update(Request $request, TrainingLevel $trainingLevel): RedirectResponse
    {
        $data = $request->validate([
            'name' => 'required|string|max:255|unique:training_levels,name,'.$trainingLevel->id,
            'description' => 'nullable|string',
            'status' => 'required|in:active,inactive',
        ]);

        $trainingLevel->update($data);

        return back()->with('success', 'Training level updated successfully.');
    }

    public function destroy(TrainingLevel $trainingLevel): RedirectResponse
    {
        $trainingLevel->delete();

        return back()->with('success', 'Training level deleted successfully.');
    }
}
