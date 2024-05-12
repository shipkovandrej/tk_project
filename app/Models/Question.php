<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;

    public function trucks(){
        return $this->belongsToMany(Truck::class, 'question_trucks', 'question_id', 'truck_id')->withTimestamps();
    }
}
