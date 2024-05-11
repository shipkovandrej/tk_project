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
}
