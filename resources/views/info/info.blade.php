@extends('layouts.main')
@section('title')
    <title>{{ $info->name }}</title>
@stop
@section('meta')
    <meta property="og:title" content="Как определить расстояние перевозки груза?"/>
    <meta property="og:description"
          content="Полезная информация"/>
    <meta property="og:image" content="../images/logo.png"/>
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

                <li>
                    <a href="{{ route('infos') }}" title="Полезная информация">
                        <span>Полезная информация</span>
                    </a> /
                </li>
                <li>{{ $info->name }}</li>
            </ul>
        </div>
    </div>
    <div class="container h1"><h1>{{ $info->name }}</h1></div>


    <div class="container">
        <div class="row">
            <div class="col-md-4">
                <div class="event-image-container">
                    <img src="{{ $info->img->path }}" alt="{{ $info->name }}">
                </div>
            </div>
            <div class="col-md-8">
                <div class="event_content">
                    <div>
                        {!! $info->content !!}
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
