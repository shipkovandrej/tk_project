<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Img;
use App\Models\Parameter;
use App\Models\Trailer;
use App\Models\Truck;
use App\Models\Type;
use Illuminate\Http\Request;

class TestController extends Controller
{
    public function index()
    {
        //$posts = Post::all();
        //return view('post.index', compact('posts'));

        //$articles = Article::all();
        //return view('test', compact('articles'));
        $par = Img::find(1);
        dd($par->article);

    }
}
