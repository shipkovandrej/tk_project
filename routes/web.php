<?php

use Illuminate\Support\Facades\Route;

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
Route::view('/chto-my-perevozim', 'cargos')->name('cargos');

Route::view('/perevozka-opasnyh-gruzov', 'cargos.cargo1')->name('cargo1');
Route::view('/perevozka-skoroportyaschihsya-gruzov', 'cargos.cargo2')->name('cargo2');
Route::view('/perevozka-farmacevticheskih-tovarov', 'cargos.cargo3')->name('cargo3');
Route::view('/perevozka-krupnogabaritnyh-gruzov', 'cargos.cargo4')->name('cargo4');
Route::view('/perevozka-sbornyh-gruzov', 'cargos.cargo5')->name('cargo5');


//avtopark pages
Route::view('/avtopark', 'avtopark')->name('avtopark');

Route::view('/fura', 'avtopark.car1')->name('car1');
Route::view('/avtopoezd', 'avtopark.car2')->name('car2');
Route::view('/odinochka', 'avtopark.car3')->name('car3');
Route::view('/gazel', 'avtopark.car4')->name('car4');
Route::view('/tral', 'avtopark.car5')->name('car5');
