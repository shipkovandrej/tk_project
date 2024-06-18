<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Cargo;
use App\Models\Img;
use App\Models\Parameter;
use App\Models\Question;
use App\Models\Spec;
use App\Models\Trailer;
use App\Models\Truck;
use App\Models\Type;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class TestController extends Controller
{
    public function index()
    {
        //$posts = Post::all();
        //return view('post.index', compact('posts'));

        //$articles = Article::all();
        //return view('test', compact('articles'));
        //$res = Truck::all();
//        dd(Str::slug("Трал"));
        //dd($slug);
       //$truck = Truck::find(1);
       //dd($truck->mini_img);
        //$res = rtrim(rtrim("3.00", "0"),".");
        //Cargo::find(1)->questions()->detach(Question::find(23));
        //Question::find(23)->delete();
        //Question::find(25)->delete();
        //dd($res);
        //Question::find(23)->delete();

    }

    public function test(Truck $slug)
    {
        dd($slug);
    }
}
