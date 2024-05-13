<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Truck extends Model
{
    use HasFactory;

    public function types(){
        return $this->belongsToMany(Type::class, 'truck_types', 'truck_id', 'type_id')->withTimestamps();
    }

    public function methods(){
        return $this->belongsToMany(Method::class, 'method_trucks', 'truck_id', 'method_id')->withTimestamps();
    }

    public function questions(){
        return $this->belongsToMany(Question::class, 'question_trucks', 'truck_id', 'question_id')->withTimestamps();
    }

    public function img()
    {
        return $this->hasOne(Img::class, 'id', 'img_id');
    }

    public function specs()
    {
        return $this->hasMany(Spec::class, 'truck_id', 'id');
    }
}
