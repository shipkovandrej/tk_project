<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

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
/*
    public static function boot()
    {
        parent::boot();

        static::deleting(function ($info) {
            $info->img()->delete();
            //$info->mini_img()->delete();
        });
    }
*/


}
