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

    public function mini_img()
    {
        return $this->hasOne(Img::class, 'id', 'mini_img_id');
    }

    public function logo_img()
    {
        return $this->hasOne(Img::class, 'id', 'logo_img_id');
    }

    public function questions(){
        return $this->belongsToMany(Question::class, 'cargo_questions', 'cargo_id', 'question_id')->withTimestamps();
    }

    public function getRouteKeyName()
    {
        return "slug";
    }
}
