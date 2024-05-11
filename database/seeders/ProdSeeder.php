<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\Img;
use App\Models\Method;
use App\Models\Parameter;
use App\Models\Trailer;
use App\Models\Truck;
use App\Models\TruckType;
use App\Models\Type;
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
        Type::create(array(
            'name' => 'Тентованный',
        ));
        Type::create(array(
            'name' => 'Рефрижератор',
        ));
        Type::create(array(
            'name' => 'Изотермический',
        ));
        Type::create(array(
            'name' => 'Бортовой',
        ));
        Type::create(array(
            'name' => 'Без бортов',
        ));
        Type::create(array(
            'name' => 'Низкорамная площадка',
        ));

        //пикчи
        //полезная информация
        Img::create(array(
            'path' => 'public/cache/events_photos/600x600x0x63f8b33b6dacb.jpg',
        ));
        Img::create(array(
            'path' => 'public/cache/events_photos/600x600x0x63f8b39086d66.jpg',
        ));
        Img::create(array(
            'path' => 'public/cache/events_photos/600x600x0x63f8b3e2ae50e.jpg',
        ));
        Img::create(array(
            'path' => 'public/cache/events_photos/600x600x0x63f8b3bddbeb8.jpg',
        ));
        //фура
        Img::create(array(
            'path' => 'public/cache/goods_category_photos/300x300x0x64083f0f9f8da.jpg'
        ));
        //автопоезд
        Img::create(array(
            'path' => 'public/cache/goods_category_photos/300x300x0x64083e2c83cc7.jpg'
        ));
        //одиночка
        Img::create(array(
            'path' => 'public/cache/goods_category_photos/300x300x0x64083e6e9b3d1.jpg'
        ));
        //газель
        Img::create(array(
            'path' => 'public/cache/goods_category_photos/300x300x0x64083eb0efa8d.jpg'
        ));
        //трал
        Img::create(array(
            'path' => 'public/cache/goods_category_photos/300x300x0x64083d6cf4054.jpg'
        ));


        //статьи
        Article::create(array(
            'title' => 'Как посчитать объем груза?',
            'content' => 'Content1',
            'img_id' => 1,
        ));
        Article::create(array(
            'title' => 'Правила проведения погрузочно-разгрузочных работ',
            'content' => 'Content2',
            'img_id' => 2,
        ));
        Article::create(array(
            'title' => 'Как определить расстояние перевозки груза?',
            'content' => 'Content3',
            'img_id' => 3,
        ));
        Article::create(array(
            'title' => 'Перевозка груза рефрижератором',
            'content' => 'Content4',
            'img_id' => 4,
        ));

        //метод загрузки
        Method::create(array(
            'name' => 'Задний',
        ));
        Method::create(array(
            'name' => 'Боковой',
        ));
        Method::create(array(
            'name' => 'Верхний',
        ));
        Method::create(array(
            'name' => 'Аппарели',
        ));

        //Прицепы
        Trailer::create(array(
            'length' => 8,
            'width' => 2.45,
            'height' => 3,
        ));

        //параметры

        //для фуры
        Parameter::create(array(
            'payload' => 20,
            'length' => 13.4,
            'width' => 2.45,
            'height' => 2.45,
            'volume' => 82,
            'price' => 50,
            'psp' => 33,
        ));
        Parameter::create(array(
            'payload' => 22,
            'length' => 13.4,
            'width' => 2.45,
            'height' => 2.8,
            'volume' => 92,
            'price' => 50,
            'psp' => 33,
        ));
        Parameter::create(array(
            'payload' => 24,
            'length' => 13.4,
            'width' => 2.45,
            'height' => 3,
            'volume' => 100,
            'price' => 50,
            'psp' => 33,
        ));

        //для автопоезда
        Parameter::create(array(
            'payload' => 20,
            'length' => 8,
            'width' => 2.45,
            'height' => 3,
            'volume' => 120,
            'price' => 50,
            'psp' => 38,
            'trailer_id' => 1,
        ));

        //для одиночек
        Parameter::create(array(
            'payload' => 10,
            'length' => 6.5,
            'width' => 2.45,
            'height' => 2.5,
            'volume' => 40,
            'price' => 50,
            'psp' => 16,
        ));
        Parameter::create(array(
            'payload' => 10,
            'length' => 7.2,
            'width' => 2.45,
            'height' => 2.55,
            'volume' => 45,
            'price' => 50,
            'psp' => 18,
        ));
        Parameter::create(array(
            'payload' => 10,
            'length' => 8,
            'width' => 2.45,
            'height' => 2.55,
            'volume' => 50,
            'price' => 50,
            'psp' => 20,
        ));

        Parameter::create(array(
            'payload' => 3,
            'length' => 6,
            'width' => 2,
            'height' => 1.8,
            'volume' => 22,
            'price' => 50,
            'psp' => 8,
        ));
        Parameter::create(array(
            'payload' => 3,
            'length' => 4,
            'width' => 2,
            'height' => 2,
            'volume' => 16,
            'price' => 50,
            'psp' => 6,
        ));
        Parameter::create(array(
            'payload' => 5,
            'length' => 5,
            'width' => 2.45,
            'height' => 2.45,
            'volume' => 30,
            'price' => 50,
            'psp' => 12,
        ));

        Parameter::create(array(
            'payload' => 5,
            'length' => 6,
            'width' => 2.45,
            'height' => 2.45,
            'volume' => 36,
            'price' => 50,
            'psp' => 14,
        ));
        Parameter::create(array(
            'payload' => 7,
            'length' => 6.5,
            'width' => 2.45,
            'height' => 2.45,
            'volume' => 40,
            'price' => 50,
            'psp' => 16,
        ));

        //для газели
        Parameter::create(array(
            'payload' => 1.5,
            'length' => 3,
            'width' => 2,
            'height' => 1.5,
            'volume' => 9,
            'price' => 50,
            'psp' => 4,
        ));
        Parameter::create(array(
            'payload' => 1.5,
            'length' => 3,
            'width' => 2,
            'height' => 1.8,
            'volume' => 14,
            'price' => 50,
            'psp' => 6,
        ));
        Parameter::create(array(
            'payload' => 2,
            'length' => 6,
            'width' => 2,
            'height' => 1.8,
            'volume' => 22,
            'price' => 50,
            'psp' => 8,
        ));

        //для тралла
        Parameter::create(array(
            'payload' => 50,
            'length' => 11,
            'width' => 3.1,
            'height' => 3.5,
            'price' => 50,
        ));
        Parameter::create(array(
            'payload' => 60,
            'length' => 16,
            'width' => 3.1,
            'height' => 3.5,
            'price' => 50,
        ));

        //виды машин

        //фура
        Truck::create(array(
            'name' => 'Фура',
            'img_id' => 5
        ));
        //Автопоезд
        Truck::create(array(
            'name' => 'Автопоезд',
            'img_id' => 6
        ));
        //Одиночка
        Truck::create(array(
            'name' => 'Одиночка',
            'img_id' => 7
        ));
        //Газель
        Truck::create(array(
            'name' => 'Газель',
            'img_id' => 8
        ));
        //Трал
        Truck::create(array(
            'name' => 'Трал',
            'img_id' => 9
        ));


        //связка типов кузова и машин
        //truck_types

        //фура


    }
}
