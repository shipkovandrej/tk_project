@extends('layouts.main')
@section('title')
    <title>Что мы перевозим</title>
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
                <li>Что мы перевозим</li>
            </ul>
        </div>
    </div>
    <div class="container h1"><h1>Что мы перевозим</h1></div>


    <div class="container">
        <ul class="servicelist">

            @foreach($cargos as $cargo)
                <li>
                    <div class="service_item"
                         onclick="location.href='{{ route('cargo', ['slug' => $cargo->slug]) }}'">
                        <div class="img"><a class="goto" title="{{ $cargo->name }}"
                                            href="{{ route('cargo', ['slug' => $cargo->slug]) }}"><img
                                    src="{{ $cargo->mini_img->path }}"
                                    alt="{{ $cargo->name }}"></a></div>
                        <span class="counter">{{ $loop->index + 1 }}</span>
                        <div class="title"><img src="{{ $cargo->logo_img->path }}"> <span>{{ $cargo->name }}</span>
                        </div>
                        <div class="desc">
                            {{ card_cutter($cargo->card) }}
                        </div>
                    </div>
                </li>
            @endforeach

        </ul>
    </div>

@endsection
