@extends('layouts.main')
@section('title')
    <title>Автопарк</title>
@stop

@section('content')
    <div class="crumble_wrapper">
        <div class="container">
            <ul class="crumble ul">
                <li>
                    <a href="../index.html" title="Главная">
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
            <li>
                <div class="item">
                    <div class="imagecontainer"><a href="{{ route('car1') }}" title="Фура"><img
                                src="../cache/goods_category_photos/fura_mini.jpg"></a></div>
                    <div class="p-ttl">Фура</div>
                </div>
            </li>
            <li>
                <div class="item">
                    <div class="imagecontainer"><a href="{{ route('car2') }}" title="Автопоезд"><img
                                src="../cache/goods_category_photos/avtopoezd_mini.jpg"></a></div>
                    <div class="p-ttl">Автопоезд</div>
                </div>
            </li>
            <li>
                <div class="item">
                    <div class="imagecontainer"><a href="{{ route('car3') }}" title="Одиночка"><img
                                src="../cache/goods_category_photos/odinochka_mini.jpg"></a></div>
                    <div class="p-ttl">Одиночка</div>
                </div>
            </li>
            <li>
                <div class="item">
                    <div class="imagecontainer"><a href="{{ route('car4') }}" title="Газель"><img
                                src="../cache/goods_category_photos/gazel_mini.jpg"></a></div>
                    <div class="p-ttl">Газель</div>
                </div>
            </li>
            <li>
                <div class="item">
                    <div class="imagecontainer"><a href="{{ route('car5') }}" title="Трал"><img
                                src="../cache/goods_category_photos/tral_mini.jpg"></a></div>
                    <div class="p-ttl">Трал</div>
                </div>
            </li>

        </ul>
    </div>
@endsection
