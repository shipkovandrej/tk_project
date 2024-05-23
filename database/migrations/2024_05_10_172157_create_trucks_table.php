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
        Schema::create('trucks', function (Blueprint $table) {
            $table->id();
            $table->string('name', 255)->unique();
            $table->string('slug', 255)->unique();
            $table->text('pre_text_1');
            $table->text('pre_text_2');
            $table->timestamps();
            $table->softDeletes();

            $table->unsignedBigInteger('img_id');
            $table->index('img_id', 'img_idx2');
            $table->foreign('img_id', 'img_idxf2')->on('imgs')->references('id');

            $table->unsignedBigInteger('mini_img_id');
            $table->index('mini_img_id', 'img_idx7');
            $table->foreign('mini_img_id', 'img_idx7')->on('imgs')->references('id');

            $table->unsignedBigInteger('spec_img_id');
            $table->index('spec_img_id', 'img_idx8');
            $table->foreign('spec_img_id', 'img_idx8')->on('imgs')->references('id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trucks');
    }
};
