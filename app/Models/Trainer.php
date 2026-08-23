<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Trainer extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'about',
        'image',
        'program_type_id',
        'training_level_id',
        'session_price',
        'certifications',
        'achievements',
        'availability',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'session_price' => 'decimal:2',
        ];
    }

    public function programType(): BelongsTo
    {
        return $this->belongsTo(ProgramType::class);
    }

    public function trainingLevel(): BelongsTo
    {
        return $this->belongsTo(TrainingLevel::class);
    }

    public function sessionBookings(): HasMany
    {
        return $this->hasMany(TrainerSessionBooking::class);
    }
}
