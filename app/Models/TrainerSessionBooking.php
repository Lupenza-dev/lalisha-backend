<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TrainerSessionBooking extends Model
{
    protected $fillable = [
        'booking_number', 'user_id', 'trainer_id', 'scheduled_at',
        'session_price', 'notes', 'status',
    ];

    protected function casts(): array
    {
        return ['scheduled_at' => 'datetime', 'session_price' => 'decimal:2'];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function trainer(): BelongsTo
    {
        return $this->belongsTo(Trainer::class);
    }
}
