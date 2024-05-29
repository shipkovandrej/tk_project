<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Method extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function trucks(){
        return $this->belongsToMany(Truck::class, 'method_trucks', 'method_id', 'truck_id')->withTimestamps();
    }
}
