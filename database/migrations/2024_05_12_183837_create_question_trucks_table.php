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
        Schema::create('question_trucks', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('truck_id');
            $table->unsignedBigInteger('question_id');
            $table->timestamps();
            $table->softDeletes();

            $table->index('truck_id', 'truck_question_truck_idx');
            $table->index('question_id', 'truck_question_question_idx');

            $table->foreign('truck_id', 'truck_question_truck_fk')->on('trucks')->references('id')->onDelete('cascade');
            $table->foreign('question_id', 'truck_question_question_fk')->on('questions')->references('id')->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('question_trucks');
    }
};
