<?php

use App\Http\Controllers\AvtoparkController;
use App\Http\Controllers\CarController;
use App\Http\Controllers\CargoController;
use App\Http\Controllers\TestController;
use Illuminate\Support\Facades\Route;

Route::view('/', 'index')->name('index');
Route::view('/about', 'about')->name('about');
Route::view('/napravlenia', 'directions')->name('directions');
Route::view('/contacts', 'contacts')->name('contacts');


//info pages
Route::view('/info', 'info')->name('info');

Route::view('/kak-poschitat-ob-em-gruza', 'info.info1')->name('info1');
Route::view('/pravila-provedeniya-pogruzochno-razgruzochnyh-rabot', 'info.info2')->name('info2');
Route::view('/kak-opredelit-rasstoyanie-perevozki-gruza', 'info.info3')->name('info3');
Route::view('/perevozka-gruza-refrizheratorom', 'info.info4')->name('info4');


//cargo pages
Route::get('/chto-my-perevozim', [CargoController::class, 'index'])->name('cargos');
Route::get('/chto-my-perevozim/{slug}', [CargoController::class, 'show'])->name('cargo');

Route::view('/perevozka-opasnyh-gruzov', 'cargos.cargo1')->name('cargo1');

Route::view('/perevozka-skoroportyaschihsya-gruzov', 'cargos.cargo2')->name('cargo2');
Route::view('/perevozka-farmacevticheskih-tovarov', 'cargos.cargo3')->name('cargo3');
Route::view('/perevozka-krupnogabaritnyh-gruzov', 'cargos.cargo4')->name('cargo4');
Route::view('/perevozka-sbornyh-gruzov', 'cargos.cargo5')->name('cargo5');


//avtopark pages
Route::get('/avtopark', [AvtoparkController::class, 'index'])->name('avtopark');
Route::get('/avtopark/{slug}', [CarController::class, 'index'])->name('car');
/*
Route::view('/avtopark1/fura', 'avtopark.car1')->name('car1');
Route::view('/avtopark1/avtopoezd', 'avtopark.car2')->name('car2');
Route::view('/avtopark1/odinochka', 'avtopark.car3')->name('car3');
Route::view('/avtopark1/gazel', 'avtopark.car4')->name('car4');
Route::view('/avtopark1/tral', 'avtopark.car5')->name('car5');
*/
//test page
Route::get('/test', [TestController::class, 'index'])->name('test');


