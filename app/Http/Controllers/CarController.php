<?php

namespace App\Http\Controllers;

use App\Models\Question;
use App\Models\Truck;
use Illuminate\Http\Request;

class CarController extends Controller
{
    public function index(Truck $slug)
    {
        //$posts = Post::all();
        //return view('post.index', compact('posts'));

        //$articles = Article::all();
        //return view('test', compact('articles'));
        //$res = Truck::all();
//        dd(Str::slug("Трал"));
        //dd($slug);
        $truck = $slug;
        $img = $truck->img->path; //big img
        //$mini_img = $truck->mini_img->path; //mini img
        $spec_img = $truck->spec_img->path; //spec img
        $specs = $truck->specs;
        $volumes = [];
        $lengths = [];
        $widths = [];
        $heights = [];
        $payloads = [];

        foreach ($specs as $spec){
            $parameter = $spec->parameter;

            $volume = $parameter->volume;
            $volumes[] = doubleval($volume);

            $length = $parameter->length;
            $lengths[] = doubleval($length);

            $width = $parameter->width;
            $widths[] = doubleval($width);

            $height = $parameter->height;
            $heights[] = doubleval($height);

            $payload = $parameter->payload;
            $payloads[] = doubleval($payload);
        }

        //dd(min($volumes));
        $volumes = [
            'min' => min($volumes),
            'max' => max($volumes),
        ];

        $lengths = [
            'min' => min($lengths),
            'max' => max($lengths),
        ];

        $widths = [
            'min' => min($widths),
            'max' => max($widths),
        ];

        $heights = [
            'min' => min($heights),
            'max' => max($heights),
        ];

        $payloads = [
            'min' => min($payloads),
            'max' => max($payloads),
        ];

        $types = $truck->types;

        $questions = $truck->questions;
        $res = $specs[2]->parameter->height;
        //dd(rtrim(rtrim($res,"0"),"."));

        return view('avtopark.car', compact('volumes', 'lengths', 'widths', 'heights',
            'payloads', 'types', 'questions', 'img', 'spec_img', 'specs'));


    }
}
