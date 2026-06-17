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
        Schema::create('training_programs', function (Blueprint $table) {
            $table->id();
            $table->enum('time_type', ['weekly', 'monthly', 'days']);
            $table->foreignId('program_category_id')->constrained('program_categories')->cascadeOnDelete();
            $table->foreignId('program_type_id')->constrained('program_types')->cascadeOnDelete();
            $table->text('description');
            $table->decimal('price', 10, 2)->default(0);
            $table->text('benefit');
            $table->string('cover_image')->nullable();
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('training_programs');
    }
};
