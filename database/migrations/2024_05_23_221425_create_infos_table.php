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
        Schema::create('infos', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug', 255)->unique();
            $table->text('content');

            $table->timestamps();
            $table->softDeletes();

            $table->unsignedBigInteger('img_id');
            $table->index('img_id', 'img_idx12');
            $table->foreign('img_id', 'img_idx12')->on('imgs')->references('id')->cascadeOnDelete();

            $table->unsignedBigInteger('mini_img_id');
            $table->index('mini_img_id', 'img_idx11');
            $table->foreign('mini_img_id', 'img_idx11')->on('imgs')->references('id')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('infos');
    }
};
