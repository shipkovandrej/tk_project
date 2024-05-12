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
        Schema::create('method_trucks', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('truck_id');
            $table->unsignedBigInteger('method_id');
            $table->timestamps();
            $table->softDeletes();

            $table->index('truck_id', 'truck_method_truck_idx');
            $table->index('method_id', 'truck_method_method_idx');

            $table->foreign('truck_id', 'truck_method_truck_fk')->on('trucks')->references('id');
            $table->foreign('method_id', 'truck_method_type_fk')->on('methods')->references('id');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('method_trucks');
    }
};
