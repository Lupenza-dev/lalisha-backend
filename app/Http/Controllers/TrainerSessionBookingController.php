<?php

namespace App\Http\Controllers;

use App\Models\TrainerSessionBooking;
use Inertia\Inertia;
use Inertia\Response;

class TrainerSessionBookingController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('trainer-bookings/index', [
            'bookings' => TrainerSessionBooking::query()
                ->with(['user:id,name,email', 'trainer:id,name'])
                ->latest('scheduled_at')
                ->get(),
        ]);
    }
}
