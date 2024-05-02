@extends('layouts.main')
@section('title')
    <title>Что мы перевозим</title>
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
                <li>Что мы перевозим</li>
            </ul>
        </div>
    </div>
    <div class="container h1"><h1>Что мы перевозим</h1></div>


    <div class="container">
        <ul class="servicelist">
            <li>
                <div class="service_item" onclick="location.href='https://www.tk-go.ru/perevozka-opasnyh-gruzov/'">
                    <div class="img"><a class="goto" title="Перевозка опасных грузов"
                                        href="../perevozka-opasnyh-gruzov/index.html"><img
                                src="../cache/service_category_photos/500x300x0x63f8bd87002f3.jpg"
                                alt="Перевозка опасных грузов"></a></div>
                    <span class="counter">01</span>
                    <div class="title"><img src="../upload/service_category_photos/63f8b7983ef3c.png"> <span>Перевозка опасных грузов</span>
                    </div>
                    <div class="desc">Компания «Грузовое объединение» более 13 лет специализируется на перевозке опасных
                        грузов. Наш автопарк...
                    </div>
                </div>
            </li>
            <li>
                <div class="service_item"
                     onclick="location.href='https://www.tk-go.ru/perevozka-skoroportyaschihsya-gruzov/'">
                    <div class="img"><a class="goto" title="Перевозка скоропортящихся грузов"
                                        href="../perevozka-skoroportyaschihsya-gruzov/index.html"><img
                                src="../cache/service_category_photos/500x300x0x63fc97e18d3bb.jpg"
                                alt="Перевозка скоропортящихся грузов"></a></div>
                    <span class="counter">02</span>
                    <div class="title"><img src="../upload/service_category_photos/63fc96cf0fa6f.png"> <span>Перевозка скоропортящихся грузов</span>
                    </div>
                    <div class="desc">Своевременная и безопасная доставка скоропортящегося груза имеет очень важное
                        значение, поэтому мы предлагаем...
                    </div>
                </div>
            </li>
            <li>
                <div class="service_item"
                     onclick="location.href='https://www.tk-go.ru/perevozka-farmacevticheskih-tovarov/'">
                    <div class="img"><a class="goto" title="Перевозка фармацевтических товаров"
                                        href="../perevozka-farmacevticheskih-tovarov/index.html"><img
                                src="../cache/service_category_photos/500x300x0x63fc9a7fe0d13.jpg"
                                alt="Перевозка фармацевтических товаров"></a></div>
                    <span class="counter">03</span>
                    <div class="title"><img src="../upload/service_category_photos/63fc9ae587ac6.png"> <span>Перевозка фармацевтических товаров</span>
                    </div>
                    <div class="desc">Компания «Грузовое объединение» специализируется на перевозке фармацевтических
                        товаров...
                    </div>
                </div>
            </li>
            <li>
                <div class="service_item" onclick="location.href='https://www.tk-go.ru/perevozka-krupnogabaritnyh-gruzov/'">
                    <div class="img"><a class="goto" title="Перевозка крупногабаритных грузов"
                                        href="../perevozka-krupnogabaritnyh-gruzov/index.html"><img
                                src="../cache/service_category_photos/500x300x0x63fc9bbaefdd6.jpg"
                                alt="Перевозка крупногабаритных грузов"></a></div>
                    <span class="counter">04</span>
                    <div class="title"><img src="../upload/service_category_photos/63fc9d52bbf52.png"> <span>Перевозка крупногабаритных грузов</span>
                    </div>
                    <div class="desc">Компания «Грузовое объединение» имеет многолетний опыт в сфере автоперевозок
                        крупногабаритных грузов...
                    </div>
                </div>
            </li>
            <li>
                <div class="service_item" onclick="location.href='https://www.tk-go.ru/perevozka-sbornyh-gruzov/'">
                    <div class="img"><a class="goto" title="Перевозка сборных грузов "
                                        href="../perevozka-sbornyh-gruzov/index.html"><img
                                src="../cache/service_category_photos/500x300x0x63fc9fd4117f2.jpg"
                                alt="Перевозка сборных грузов "></a></div>
                    <span class="counter">05</span>
                    <div class="title"><img src="../upload/service_category_photos/63fc9fdc513e9.png"> <span>Перевозка сборных грузов </span>
                    </div>
                    <div class="desc">Компания «Грузовое объединение» предлагает широкий спектр услуг по организации
                        перевозок сборных любых...
                    </div>
                </div>
            </li>
        </ul>
    </div>

@endsection
