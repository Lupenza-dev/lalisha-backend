<?php

namespace App\Http\Controllers;

use App\Models\ProgramType;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProgramTypeController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('system-settings/programs-categories/program-types', [
            'items' => ProgramType::query()->latest()->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => 'required|string|max:255|unique:program_types,name',
            'description' => 'nullable|string',
            'status' => 'required|in:active,inactive',
        ]);

        ProgramType::create($data);

        return back()->with('success', 'Program type created successfully.');
    }

    public function update(Request $request, ProgramType $programType): RedirectResponse
    {
        $data = $request->validate([
            'name' => 'required|string|max:255|unique:program_types,name,'.$programType->id,
            'description' => 'nullable|string',
            'status' => 'required|in:active,inactive',
        ]);

        $programType->update($data);

        return back()->with('success', 'Program type updated successfully.');
    }

    public function destroy(ProgramType $programType): RedirectResponse
    {
        $programType->delete();

        return back()->with('success', 'Program type deleted successfully.');
    }
}
