<?php

use Illuminate\Support\Facades\Route;

Route::view('/about', 'about')->name('about');
Route::view('/avtopark', 'avtopark')->name('avtopark');
Route::view('/chto-my-perevozim', 'cargos')->name('cargos');
Route::view('/napravlenia', 'directions')->name('directions');
Route::view('/contacts', 'contacts')->name('contacts');
Route::view('/info', 'info')->name('info');
// napravlenia
