<?php

namespace App\Http\Controllers;

use App\Models\Question;
use App\Models\Truck;
use Illuminate\Http\Request;

class CarController extends Controller
{
    public function index(Truck $slug)
    {

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
        $price = [];

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

            $price = $parameter->price;
            $prices[] = doubleval($price);
        }


        $types = $truck->types;

        $questions = $truck->questions;

        $price = min($prices);

        return view('avtopark.car', compact('volumes', 'lengths', 'widths', 'heights',
            'payloads', 'types', 'questions', 'img', 'spec_img', 'specs', 'truck', 'price'));


    }
}
