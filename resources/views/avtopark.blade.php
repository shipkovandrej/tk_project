@extends('layouts.main')
@section('title')
    <title>Автопарк</title>
@stop
@section('meta')
    <meta property="og:title" content="Автопарк"/>
    <meta property="og:description" content=""/>
    <meta property="og:image" content="../images/logo.png"/>
    <meta property="og:url" content="{{ Illuminate\Routing\Route::current() }}"/>
    <meta property="og:type" content="website"/>
    <meta property="og:site_name" content="Грузовое объединение"/>
@stop
@section('content')
    <div class="crumble_wrapper">
        <div class="container">
            <ul class="crumble ul">
                <li>
                    <a href="{{ route('index') }}" title="Главная">
                        <span>Главная</span>
                    </a> /
                </li>
                <li>Автопарк</li>
            </ul>
        </div>
    </div>
    <div class="container h1"><h1>Автопарк</h1></div>


    <div class="container">
        <ul class="categories">
            @foreach($trucks as $truck)
            <li>
                <div class="item">
                    <div class="imagecontainer"><a href="{{ route('car', ['slug' => $truck->slug]) }}" title="{{ $truck->name }}"><img
                                src="{{ $truck->mini_img->path }}"></a></div>
                    <div class="p-ttl">{{ $truck->name }}</div>
                </div>
            </li>
            @endforeach

        </ul>
    </div>
@endsection
