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
        Schema::create('cargos', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug', 255)->unique();
            $table->text('card');
            $table->text('pre_text_1');
            $table->text('pre_text_2');
            $table->decimal('price', 6, 2);
            $table->timestamps();
            $table->softDeletes();

            $table->unsignedBigInteger('img_id');
            $table->index('img_id', 'img_idx3');
            $table->foreign('img_id', 'img_idx3')->on('imgs')->references('id')->onDelete('cascade');

            $table->unsignedBigInteger('mini_img_id');
            $table->index('mini_img_id', 'img_idx4');
            $table->foreign('mini_img_id', 'img_idx4')->on('imgs')->references('id')->onDelete('cascade');

            $table->unsignedBigInteger('logo_img_id');
            $table->index('logo_img_id', 'img_idx9');
            $table->foreign('logo_img_id', 'img_idx9')->on('imgs')->references('id')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cargos');
    }
};
