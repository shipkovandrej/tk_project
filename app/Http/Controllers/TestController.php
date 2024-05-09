<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Type;
use Illuminate\Http\Request;

class TestController extends Controller
{
    public function index()
    {
        //$posts = Post::all();
        //return view('post.index', compact('posts'));

        $articles = Article::all();
        return view('test', compact('articles'));
    }
}
