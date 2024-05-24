<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Info extends Model
{
    use HasFactory;

    public function img()
    {
        return $this->hasOne(Img::class, 'id', 'img_id');
    }

    public function mini_img()
    {
        return $this->hasOne(Img::class, 'id', 'mini_img_id');
    }

    public function getRouteKeyName()
    {
        return "slug";
    }
}
