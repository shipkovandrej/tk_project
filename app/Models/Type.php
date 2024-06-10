<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Type extends Model
{
    use HasFactory;



    public function trucks(){
        return $this->belongsToMany(Truck::class, 'truck_types', 'type_id', 'truck_id')->withTimestamps();
    }
}
