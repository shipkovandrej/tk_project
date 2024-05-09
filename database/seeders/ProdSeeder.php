<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProdSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        //Типы кузова
        DB::table('types')->insert([
            'name' => 'Тентованный',
        ]);
        DB::table('types')->insert([
            'name' => 'Рефрижератор',
        ]);
        DB::table('types')->insert([
            'name' => 'Изотермический',
        ]);
        DB::table('types')->insert([
            'name' => 'Бортовой',
        ]);
        DB::table('types')->insert([
            'name' => 'Без бортов',
        ]);
        DB::table('types')->insert([
            'name' => 'Низкорамная площадка',
        ]);

        //пикчи
        DB::table('imgs')->insert([
            'path' => 'public/cache/events_photos/600x600x0x63f8b33b6dacb.jpg',
        ]);
        DB::table('imgs')->insert([
            'path' => 'public/cache/events_photos/600x600x0x63f8b39086d66.jpg',
        ]);
        DB::table('imgs')->insert([
            'path' => 'public/cache/events_photos/600x600x0x63f8b3e2ae50e.jpg',
        ]);
        DB::table('imgs')->insert([
            'path' => 'public/cache/events_photos/600x600x0x63f8b3bddbeb8.jpg',
        ]);

        //статьи
        DB::table('articles')->insert([
            'title' => 'Как посчитать объем груза?',
            'content' => 'Content1',
            'img_id' => 1,
        ]);
        DB::table('articles')->insert([
            'title' => 'Правила проведения погрузочно-разгрузочных работ',
            'content' => 'Content2',
            'img_id' => 2,
        ]);
        DB::table('articles')->insert([
            'title' => 'Как определить расстояние перевозки груза?',
            'content' => 'Content3',
            'img_id' => 3,
        ]);
        DB::table('articles')->insert([
            'title' => 'Перевозка груза рефрижератором',
            'content' => 'Content4',
            'img_id' => 4,
        ]);
    }
}
