<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Spec extends Model
{
    use HasFactory;

    public function parameter()
    {
        return $this->hasOne(Parameter::class, 'id', 'parameter_id');
    }

    public function truck()
    {
        return $this->belongsTo(Truck::class, 'truck_id', 'id');
    }
}
