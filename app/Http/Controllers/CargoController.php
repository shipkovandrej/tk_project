<?php

namespace App\Http\Controllers;

use App\Models\Cargo;
use Illuminate\Http\Request;

class CargoController extends Controller
{
    public function index()
    {
        $cargos = Cargo::all();

        return view('cargos', compact('cargos'));
    }


    public function show(Cargo $slug){
        $cargo = $slug;
        //dd($cargo);
        $questions = $cargo->questions;

        $others = Cargo::all()->whereNotIn('id', [$cargo->id]);

        return view('cargos.cargo', compact('cargo', 'questions', 'others'));
    }
}
