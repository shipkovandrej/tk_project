<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Trailer extends Model
{
    use HasFactory;

    public function parameters()
    {
        return $this->hasMany(Parameter::class, 'trailer_id', 'id');
    }
}
