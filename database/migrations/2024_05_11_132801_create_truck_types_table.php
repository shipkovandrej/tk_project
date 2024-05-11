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
        Schema::create('truck_types', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('truck_id');
            $table->unsignedBigInteger('type_id');
            $table->timestamps();
            $table->softDeletes();

            $table->index('truck_id', 'truck_type_truck_idx');
            $table->index('type_id', 'truck_type_type_idx');

            $table->foreign('truck_id', 'truck_type_truck_fk')->on('trucks')->references('id');
            $table->foreign('type_id', 'truck_type_type_fk')->on('types')->references('id');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('truck_types');
    }
};
