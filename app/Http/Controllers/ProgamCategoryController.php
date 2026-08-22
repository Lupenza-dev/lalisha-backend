<?php

namespace App\Http\Controllers;

use App\Models\ProgramCategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProgamCategoryController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('system-settings/programs-categories/program-categories', [
            'items' => ProgramCategory::query()->latest()->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => 'required|string|max:255|unique:program_categories,name',
            'description' => 'nullable|string',
            'icon_name' => 'nullable|string|max:100',
            'status' => 'required|in:active,inactive',
        ]);

        ProgramCategory::create($data);

        return back()->with('success', 'Program category created successfully.');
    }

    public function update(Request $request, ProgramCategory $programCategory): RedirectResponse
    {
        $data = $request->validate([
            'name' => 'required|string|max:255|unique:program_categories,name,'.$programCategory->id,
            'description' => 'nullable|string',
            'icon_name' => 'nullable|string|max:100',
            'status' => 'required|in:active,inactive',
        ]);

        $programCategory->update($data);

        return back()->with('success', 'Program category updated successfully.');
    }

    public function destroy(ProgramCategory $programCategory): RedirectResponse
    {
        $programCategory->delete();

        return back()->with('success', 'Program category deleted successfully.');
    }
}
