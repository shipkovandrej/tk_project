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
}
