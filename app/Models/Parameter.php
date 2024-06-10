<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Parameter extends Model
{
    use HasFactory;



    public function trailer()
    {
        return $this->belongsTo(Trailer::class, 'trailer_id', 'id');
    }

    public function spec()
    {
        return $this->hasOne(Spec::class, 'id', 'parameter_id');
    }
}
