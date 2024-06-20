<?php

use App\Http\Controllers\AvtoparkController;
use App\Http\Controllers\CarController;
use App\Http\Controllers\CargoController;
use App\Http\Controllers\FormController;
use App\Http\Controllers\InfoController;
use App\Http\Controllers\MainController;
use App\Http\Controllers\TestController;
use Illuminate\Support\Facades\Route;

//Route::view('/', 'index')->name('index');
Route::get('/', [MainController::class, 'index'])->name('index');
//Route::view('/{any?}', 'test');


Route::view('/about', 'about')->name('about');
Route::view('/napravlenia', 'directions')->name('directions');
Route::view('/contacts', 'contacts')->name('contacts');


//info pages
//Route::view('/info', 'info')->name('infos');
Route::get('/info/', [InfoController::class, 'index'])->name('infos');
Route::get('/info/{slug}', [InfoController::class, 'show'])->name('info');


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

//test page
Route::get('/test', [TestController::class, 'index'])->name('test');

Route::post('/form', [FormController::class, 'modal_first'])->name('modal1');

