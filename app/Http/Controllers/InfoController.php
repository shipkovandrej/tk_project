<?php

namespace App\Http\Controllers;

use App\Models\Info;
use Illuminate\Http\Request;

class InfoController extends Controller
{
    public function index()
    {
        $infos = Info::all();

        return view('info', compact('infos'));
    }

    public function show(Info $slug)
    {
        $info = $slug;

        return view('info.info', compact('info'));

    }
}
