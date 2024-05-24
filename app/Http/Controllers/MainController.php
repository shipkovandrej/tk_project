<?php

namespace App\Http\Controllers;

use App\Models\Cargo;
use App\Models\Info;
use Illuminate\Http\Request;

class MainController extends Controller
{
    public function index()
    {
        $cargos = Cargo::all();
        $infos = Info::all();
        return view('index', compact('cargos', 'infos'));
    }
}
