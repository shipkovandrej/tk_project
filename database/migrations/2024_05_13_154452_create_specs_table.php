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
        Schema::create('specs', function (Blueprint $table) {
            $table->id();
            $table->string('name');

            $table->timestamps();
            $table->softDeletes();

            $table->unsignedBigInteger('parameter_id');
            $table->index('parameter_id', 'parameter_idx4');
            $table->foreign('parameter_id', 'parameter_idxf4')->on('parameters')->references('id');

            $table->unsignedBigInteger('truck_id');
            $table->index('truck_id', 'truck_idx5');
            $table->foreign('truck_id', 'truck_idxf5')->on('trucks')->references('id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('specs');
    }
};
