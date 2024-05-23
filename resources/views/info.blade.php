@extends('layouts.main')
@section('title')
    <title>Полезная информация</title>
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
            <div class="col-md-6 col-xl-3">
                <a href="{{ route('info1') }}" class="event_item">

                    <img src="../cache/events_photos/400x500x1x63f8b33b6dacb.jpg"/>
                    <span class="info_wrapper">
<span class="title">Как посчитать объем груза?</span>
<span class="anons">Этот вопрос мы часто слышим от наших клиентов, поскольку выбор транспорта и стоимость перевозки зависят напрямую от объема груза...</span></span></a>
            </div>
            <div class="col-md-6 col-xl-3">
                <a href="{{ route('info2') }}" class="event_item">

                    <img src="../cache/events_photos/400x500x1x63f8b39086d66.jpg"/>
                    <span class="info_wrapper">
<span class="title">Правила проведения погрузочно-разгрузочных работ</span>
<span
    class="anons">В целях обеспечения безопасности при выполнении погрузочно-разгрузочных работ необходимо...</span></span></a>
            </div>
            <div class="col-md-6 col-xl-3">
                <a href="{{ route('info3') }}" class="event_item">

                    <img src="../cache/events_photos/400x500x1x63f8b3e2ae50e.jpg"/>
                    <span class="info_wrapper">
<span class="title">Как определить расстояние перевозки груза?</span>
<span class="anons">Определение расстояния перевозки грузов играет важную роль при разработке плана перевозок, расчёте тарифов...</span></span></a>
            </div>
            <div class="col-md-6 col-xl-3">
                <a href="{{ route('info4') }}" class="event_item">

                    <img src="../cache/events_photos/400x500x1x63f8b3bddbeb8.jpg"/>
                    <span class="info_wrapper">
<span class="title">Перевозка груза рефрижератором</span>
<span class="anons">Рефрижераторные перевозки могут осуществляться различными видами транспорта, но при больших объемах погрузо-разгрузочных...</span></span></a>
            </div>
        </div>
    </div>

@endsection
