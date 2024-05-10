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

        //метод загрузки
        DB::table('methods')->insert([
            'name' => 'Задний',
        ]);
        DB::table('methods')->insert([
            'name' => 'Боковой',
        ]);
        DB::table('methods')->insert([
            'name' => 'Верхний',
        ]);
        DB::table('methods')->insert([
            'name' => 'Аппарели',
        ]);

        //Прицепы
        DB::table('trailers')->insert([
            'length' => 8,
            'width' => 2.45,
            'height' => 3,
        ]);

        //параметры

        //для фуры
        DB::table('parameters')->insert([
            'payload' => 20,
            'length' => 13.4,
            'width' => 2.45,
            'height' => 2.45,
            'volume' => 82,
            'price' => 50,
            'psp' => 33,
        ]);
        DB::table('parameters')->insert([
            'payload' => 22,
            'length' => 13.4,
            'width' => 2.45,
            'height' => 2.8,
            'volume' => 92,
            'price' => 50,
            'psp' => 33,
        ]);
        DB::table('parameters')->insert([
            'payload' => 24,
            'length' => 13.4,
            'width' => 2.45,
            'height' => 3,
            'volume' => 100,
            'price' => 50,
            'psp' => 33,
        ]);

        //для автопоезда
        DB::table('parameters')->insert([
            'payload' => 20,
            'length' => 8,
            'width' => 2.45,
            'height' => 3,
            'volume' => 120,
            'price' => 50,
            'psp' => 38,
            'trailer_id' => 1,
        ]);

        //для одиночек
        DB::table('parameters')->insert([
            'payload' => 10,
            'length' => 6.5,
            'width' => 2.45,
            'height' => 2.5,
            'volume' => 40,
            'price' => 50,
            'psp' => 16,
        ]);
        DB::table('parameters')->insert([
            'payload' => 10,
            'length' => 7.2,
            'width' => 2.45,
            'height' => 2.55,
            'volume' => 45,
            'price' => 50,
            'psp' => 18,
        ]);
        DB::table('parameters')->insert([
            'payload' => 10,
            'length' => 8,
            'width' => 2.45,
            'height' => 2.55,
            'volume' => 50,
            'price' => 50,
            'psp' => 20,
        ]);

        DB::table('parameters')->insert([
            'payload' => 3,
            'length' => 6,
            'width' => 2,
            'height' => 1.8,
            'volume' => 22,
            'price' => 50,
            'psp' => 8,
        ]);
        DB::table('parameters')->insert([
            'payload' => 3,
            'length' => 4,
            'width' => 2,
            'height' => 2,
            'volume' => 16,
            'price' => 50,
            'psp' => 6,
        ]);
        DB::table('parameters')->insert([
            'payload' => 5,
            'length' => 5,
            'width' => 2.45,
            'height' => 2.45,
            'volume' => 30,
            'price' => 50,
            'psp' => 12,
        ]);

        DB::table('parameters')->insert([
            'payload' => 5,
            'length' => 6,
            'width' => 2.45,
            'height' => 2.45,
            'volume' => 36,
            'price' => 50,
            'psp' => 14,
        ]);
        DB::table('parameters')->insert([
            'payload' => 7,
            'length' => 6.5,
            'width' => 2.45,
            'height' => 2.45,
            'volume' => 40,
            'price' => 50,
            'psp' => 16,
        ]);

        //для газели
        DB::table('parameters')->insert([
            'payload' => 1.5,
            'length' => 3,
            'width' => 2,
            'height' => 1.5,
            'volume' => 9,
            'price' => 50,
            'psp' => 4,
        ]);
        DB::table('parameters')->insert([
            'payload' => 1.5,
            'length' => 3,
            'width' => 2,
            'height' => 1.8,
            'volume' => 14,
            'price' => 50,
            'psp' => 6,
        ]);
        DB::table('parameters')->insert([
            'payload' => 2,
            'length' => 6,
            'width' => 2,
            'height' => 1.8,
            'volume' => 22,
            'price' => 50,
            'psp' => 8,
        ]);

        //для тралла
        DB::table('parameters')->insert([
            'payload' => 50,
            'length' => 11,
            'width' => 3.1,
            'height' => 3.5,
            'price' => 50,
        ]);
        DB::table('parameters')->insert([
            'payload' => 60,
            'length' => 16,
            'width' => 3.1,
            'height' => 3.5,
            'price' => 50,
        ]);
    }
}
