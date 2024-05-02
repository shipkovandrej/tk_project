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
                    <div class="imagecontainer"><a href="../fura/index.html" title="Фура"><img
                                src="../cache/goods_category_photos/300x300x0x64083f0f9f8da.jpg"></a></div>
                    <div class="p-ttl">Фура</div>
                </div>
            </li>
            <li>
                <div class="item">
                    <div class="imagecontainer"><a href="../avtopoezd/index.html" title="Автопоезд"><img
                                src="../cache/goods_category_photos/300x300x0x64083e2c83cc7.jpg"></a></div>
                    <div class="p-ttl">Автопоезд</div>
                </div>
            </li>
            <li>
                <div class="item">
                    <div class="imagecontainer"><a href="../odinochka/index.html" title="Одиночка"><img
                                src="../cache/goods_category_photos/300x300x0x64083e6e9b3d1.jpg"></a></div>
                    <div class="p-ttl">Одиночка</div>
                </div>
            </li>
            <li>
                <div class="item">
                    <div class="imagecontainer"><a href="../gazel/index.html" title="Газель"><img
                                src="../cache/goods_category_photos/300x300x0x64083eb0efa8d.jpg"></a></div>
                    <div class="p-ttl">Газель</div>
                </div>
            </li>
            <li>
                <div class="item">
                    <div class="imagecontainer"><a href="../tral/index.html" title="Трал"><img
                                src="../cache/goods_category_photos/300x300x0x64083d6cf4054.jpg"></a></div>
                    <div class="p-ttl">Трал</div>
                </div>
            </li>
        </ul>
    </div>
@endsection
