<?php

namespace App\Http\Controllers;

use App\Models\TrainingCertificate;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TrainingCertificateController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('system-settings/programs-categories/training-certificates', [
            'items' => TrainingCertificate::query()->latest()->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => 'required|string|max:255|unique:training_certificates,name',
            'description' => 'nullable|string',
            'status' => 'required|in:active,inactive',
        ]);

        TrainingCertificate::create($data);

        return back()->with('success', 'Training certificate created successfully.');
    }

    public function update(Request $request, TrainingCertificate $trainingCertificate): RedirectResponse
    {
        $data = $request->validate([
            'name' => 'required|string|max:255|unique:training_certificates,name,'.$trainingCertificate->id,
            'description' => 'nullable|string',
            'status' => 'required|in:active,inactive',
        ]);

        $trainingCertificate->update($data);

        return back()->with('success', 'Training certificate updated successfully.');
    }

    public function destroy(TrainingCertificate $trainingCertificate): RedirectResponse
    {
        $trainingCertificate->delete();

        return back()->with('success', 'Training certificate deleted successfully.');
    }
}
