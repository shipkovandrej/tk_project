<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Img extends Model
{
    use HasFactory;

    public function article()
    {
        return $this->belongsTo(Article::class, 'id', 'img_id');
    }
}
