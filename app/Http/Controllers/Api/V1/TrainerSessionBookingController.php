<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Trainer;
use App\Models\TrainerSessionBooking;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class TrainerSessionBookingController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $bookings = $request->user()->trainerSessionBookings()
            ->with('trainer:id,name,image')
            ->latest('scheduled_at')
            ->paginate($request->integer('per_page', 15));

        return response()->json($bookings);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'trainer_id' => ['required', 'integer', 'exists:trainers,id'],
            'scheduled_at' => ['required', 'date', 'after:now'],
            'notes' => ['nullable', 'string', 'max:1000'],
        ]);
        $trainer = Trainer::findOrFail($data['trainer_id']);
        $scheduledAt = Carbon::parse($data['scheduled_at'])->utc();

        if ($trainer->status !== 'active' || $trainer->availability !== 'available') {
            throw ValidationException::withMessages(['trainer_id' => ['This trainer is not currently available.']]);
        }

        $hasConflict = TrainerSessionBooking::query()
            ->where('trainer_id', $trainer->id)
            ->where('scheduled_at', $scheduledAt)
            ->whereIn('status', ['pending', 'confirmed'])
            ->exists();

        if ($hasConflict) {
            throw ValidationException::withMessages(['scheduled_at' => ['This session time is already booked.']]);
        }

        $booking = TrainerSessionBooking::create([
            'booking_number' => 'TRN-'.now()->format('Ymd').'-'.Str::upper(Str::random(6)),
            'user_id' => $request->user()->id,
            'trainer_id' => $trainer->id,
            'scheduled_at' => $scheduledAt,
            'session_price' => $trainer->session_price,
            'notes' => $data['notes'] ?? null,
            'status' => 'pending',
        ])->load('trainer:id,name,image');

        return response()->json([
            'message' => 'Trainer session booked successfully.',
            'data' => $booking,
        ], 201);
    }
}
