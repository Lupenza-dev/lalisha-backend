<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('trainers', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('image')->nullable();
            $table->foreignId('program_type_id')->constrained('program_types')->cascadeOnDelete();
            $table->foreignId('training_level_id')->constrained('training_levels')->cascadeOnDelete();
            $table->decimal('session_price', 10, 2)->default(0);
            $table->text('certifications');
            $table->text('achievements');
            $table->enum('availability', ['available', 'unavailable'])->default('available');
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trainers');
    }
};
