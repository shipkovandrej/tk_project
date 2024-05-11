<?php

namespace App\Http\Controllers;

use App\Models\Article;
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
        for ($i = 1; $i < 5; $i++){
            $truck = Truck::find($i);
            $types = Type::find([1,2,3,4,5]);
            $truck->types()->sync($types);
        }
        $truck = Truck::find(5);
        $types = Type::find(6);
        $truck->types()->sync($types);
        dd('end');
    }
}
