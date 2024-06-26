@extends('layouts.main')
@section('title')
    <title>Полезная информация</title>
@stop
@section('meta')
    <meta property="og:title" content="Полезная информация"/>
    <meta property="og:description" content=""/>
    <meta property="og:image" content="../images/logo.png"/>
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Грузовое объединение" />
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
                <li>Полезная информация</li>
            </ul>
        </div>
    </div>
    <div class="container h1"><h1>Полезная информация</h1></div>


    <div class="container">
        <div class="row event-item-category articles">
            @foreach($infos as $info)
                <div class="col-md-6 col-xl-3">
                    <a href="{{ route('info', ['slug' => $info->slug]) }}" class="event_item">

                        <img src="{{ $info->img->path }}"/>
                        <span class="info_wrapper">
<span class="title">{{ $info->name }}</span>
<span class="anons">{{ info_cutter($info->content, 9) }}</span></span></a>
                </div>
            @endforeach
        </div>
    </div>

@endsection
