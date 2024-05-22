<?php

namespace App\Http\Controllers;

use App\Models\Truck;
use Illuminate\Http\Request;

class AvtoparkController extends Controller
{
    public function index()
    {
        $trucks = Truck::all();

        return view('avtopark', compact('trucks'));
    }
}
