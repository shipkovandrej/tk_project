<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cargo extends Model
{
    use HasFactory;

    public function img()
    {
        return $this->hasOne(Img::class, 'id', 'img_id');
    }

    public function questions(){
        return $this->belongsToMany(Question::class, 'cargo_questions', 'cargo_id', 'question_id')->withTimestamps();
    }
}
