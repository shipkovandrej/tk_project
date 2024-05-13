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
        Schema::create('cargo_questions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('cargo_id');
            $table->unsignedBigInteger('question_id');
            $table->timestamps();
            $table->softDeletes();

            $table->index('cargo_id', 'cargo_question_cargo_idx');
            $table->index('question_id', 'cargo_question_question_idx');

            $table->foreign('cargo_id', 'cargo_question_cargo_fk')->on('cargos')->references('id');
            $table->foreign('question_id', 'cargo_question_question_fk')->on('questions')->references('id');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cargo_questions');
    }
};
