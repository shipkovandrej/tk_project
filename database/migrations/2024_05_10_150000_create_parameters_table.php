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
        Schema::create('parameters', function (Blueprint $table) {
            $table->id();

            $table->decimal('payload', 4, 2);
            $table->decimal('length', 6, 2);
            $table->decimal('width', 3, 2);
            $table->decimal('height', 3, 2);
            $table->decimal('volume', 6, 2)->nullable();
            $table->decimal('price', 6, 2);
            $table->integer('psp')->nullable();

            $table->timestamps();
            $table->softDeletes();



            $table->unsignedBigInteger('trailer_id')->nullable();
            $table->index('trailer_id', 'trailer_idx');
            $table->foreign('trailer_id', 'trailer_idxf')->on('trailers')->references('id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('parameters');
    }
};
