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
    }
}
