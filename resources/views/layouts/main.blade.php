<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ru" lang="ru">
<head>
    @yield('title')
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link rel="shortcut icon" type="image/ico" href="/images/icons/favicon.ico"/>

    <link rel="canonical" href="index.html"/>


    <link rel="apple-touch-icon" href="../images/apple-touch-icon-60x60.png"/>
    <link rel="apple-touch-icon" sizes="76x76" href="../images/apple-touch-icon-76x76.png"/>
    <link rel="apple-touch-icon" sizes="120x120" href="../images/apple-touch-icon-120x120.png"/>
    <link rel="apple-touch-icon" sizes="152x152" href="../images/apple-touch-icon-152x152.png"/>
    <base href=""/>

    @viteReactRefresh
    @vite(['resources/js/app.jsx'])
    @vite(['resources/css/style.css'])


    <script src="{{ asset('js/top.js') }}"></script>
    <script>
        var serverfullname = "{{ route('index') }}";
        window.dataLayer = window.dataLayer || [];
    </script>

    @php
        $trucks = \App\Models\Truck::all();
        $cargos = \App\Models\Cargo::all();
        $cargos = \App\Models\Cargo::all();
    @endphp
</head>
<body class="body_about">

<!--header-->
<div class="header_wrapper">
    <div class="head-line1">
        <div class="container">


            <div class="row">
                <div class="col-md-7">
                    <div class="logo_wrapper">
                        <a href="{{ route('index') }}"><img class="logo" src="../images/logo.png"
                                                            alt="Грузовое объединение"/></a>
                        <div class="underlogo">Автомобильные перевозки по всей России</div>
                    </div>

                </div>

                <div class="col-md-5">
                    <div class="region_callback_wrapper">
                        <div class="phone_callback">

                        </div>

                        <div>
                            <div class=phone_callback">
                                <span class="phone mr-5">{{ \App\Models\Contact::find(1)->phone }}</span>
                                <span></span>
                                <a class="callback" href="{{ route('contacts') . '#count_div' }}">Заказать звонок</a>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    </div>
    <div class="catmenu_wrapper">
        <div class="container">
            <div class="row">
                <div class="col-md-2">
                    <div class="catalog_btn_wrapper ">
                        <div class="catbtn">О компании <span></span></div>
                    </div>
                </div>
                <div class="col-md-10">
                    <ul class="menu_top2">
                        <li class="dropdown ">
                            <a href="{{ route('avtopark') }}" class="dropdown-toggle">Наш автопарк</a>
                            <ul class="">
                                @foreach($trucks as $truck)
                                    <li><a href="{{ route('car', ['slug' => $truck->slug]) }}">{{ $truck->name }}</a></li>
                                @endforeach
                            </ul>
                        </li>
                        <li class="dropdown ">
                            <a href="{{ route('cargos') }}" class="dropdown-toggle">Что мы перевозим</a>
                            <ul class="">
                                @foreach($cargos as $cargo)
                                    <li><a href="{{ route('cargo', ['slug' => $cargo->slug]) }}">{{ $cargo->name }}</a></li>
                                @endforeach
                            </ul>
                        </li>
                        <li class="dropdown ">
                            <a href="{{ route('directions') }}" class="dropdown-toggle">Направления перевозок</a>
                            <ul class="addmenu">
                                <li><a href="{{ route('directions') }}">в Волгоград</a></li>
                                <li><a href="{{ route('directions') }}">в Воронеж</a></li>
                                <li><a href="{{ route('directions') }}">в Екатеринбург</a></li>
                                <li><a href="{{ route('directions') }}">в Казань</a></li>
                                <li><a href="{{ route('directions') }}">в Краснодар</a></li>
                                <li><a href="{{ route('directions') }}">в Красноярск</a></li>
                                <li><a href="{{ route('directions') }}">в Липецк</a></li>
                                <li><a href="{{ route('directions') }}">в Минеральные Воды</a></li>
                                <li><a href="{{ route('directions') }}">в Москву</a></li>
                                <li><a href="{{ route('directions') }}">в Набережные Челны</a></li>
                                <li><a href="{{ route('directions') }}">в Нижний Новгород</a></li>
                                <li><a href="{{ route('directions') }}">в Новороссийск</a></li>
                                <li><a href="{{ route('directions') }}">в Новосибирск</a></li>
                                <li><a href="{{ route('directions') }}">в Омск</a></li>
                                <li><a href="{{ route('directions') }}">в Самару</a></li>
                                <li><a href="{{ route('directions') }}">в Санкт-Петербург</a></li>
                                <li><a href="{{ route('directions') }}">в Саратов</a></li>
                                <li><a href="{{ route('directions') }}">в Сочи</a></li>
                                <li><a href="{{ route('directions') }}">в Ставрополь</a></li>
                                <li><a href="{{ route('directions') }}">в Тольятти</a></li>
                                <li><a href="{{ route('directions') }}">в Тулу</a></li>
                                <li><a href="{{ route('directions') }}">в Тюмень</a></li>
                                <li><a href="{{ route('directions') }}">в Уфу</a></li>
                                <li><a href="{{ route('directions') }}">в Челябинск</a></li>
                            </ul>
                        </li>
                        <li class=""><a href="{{ route('contacts') }}">Контакты</a></li>
                    </ul>
                </div>

            </div>
        </div>
    </div>
    <div class="menu_wrapper">
        <div class="container">
            <div class="menucontent">
                <ul class="menu_top1">
                    <li class="active"><a href="{{route('about')}}">О компании</a></li>
                    <li class=""><a href="{{ route('infos') }}">Полезная информация</a></li>
                    <li class="dropdown ">
                        <a href="{{ route('avtopark') }}" class="dropdown-toggle">Наш автопарк</a>
                        <ul class="">
                            @foreach($trucks as $truck)
                                <li><a href="{{ route('car', ['slug' => $truck->slug]) }}">{{ $truck->name }}</a></li>
                            @endforeach
                        </ul>
                    </li>
                    <li class="dropdown ">
                        <a href="{{ route('cargos') }}" class="dropdown-toggle">Что мы перевозим</a>
                        <ul class="">
                            @foreach($cargos as $cargo)
                                <li><a href="{{ route('cargo', ['slug' => $cargo->slug]) }}">{{ $cargo->name }}</a></li>
                            @endforeach
                        </ul>
                    </li>
                    <li class="dropdown ">
                        <a href="{{ route('directions') }}" class="dropdown-toggle">Направления перевозок</a>
                        <ul class="addmenu">
                            <li><a href="../napravlenia/volgograd/index.html">в Волгоград</a></li>
                            <li><a href="../napravlenia/voronezh/index.html">в Воронеж</a></li>
                            <li><a href="../napravlenia/ekb/index.html">в Екатеринбург</a></li>
                            <li><a href="../napravlenia/kazan/index.html">в Казань</a></li>
                            <li><a href="../napravlenia/krasnodar/index.html">в Краснодар</a></li>
                            <li><a href="../napravlenia/krasnoyarsk/index.html">в Красноярск</a></li>
                            <li><a href="../napravlenia/lipeck/index.html">в Липецк</a></li>
                            <li><a href="../napravlenia/mineralnye-vody/index.html">в Минеральные Воды</a></li>
                            <li><a href="../napravlenia/msk/index.html">в Москву</a></li>
                            <li><a href="../napravlenia/nabcheln/index.html">в Набережные Челны</a></li>
                            <li><a href="../napravlenia/n-novgorod/index.html">в Нижний Новгород</a></li>
                            <li><a href="../napravlenia/novorossijsk/index.html">в Новороссийск</a></li>
                            <li><a href="../napravlenia/novosibirsk/index.html">в Новосибирск</a></li>
                            <li><a href="../napravlenia/omsk/index.html">в Омск</a></li>
                            <li><a href="../napravlenia/samara/index.html">в Самару</a></li>
                            <li><a href="../napravlenia/spb/index.html">в Санкт-Петербург</a></li>
                            <li><a href="../napravlenia/saratov/index.html">в Саратов</a></li>
                            <li><a href="../napravlenia/sochi/index.html">в Сочи</a></li>
                            <li><a href="../napravlenia/stavropol/index.html">в Ставрополь</a></li>
                            <li><a href="../napravlenia/toliaty/index.html">в Тольятти</a></li>
                            <li><a href="../napravlenia/tula/index.html">в Тулу</a></li>
                            <li><a href="../napravlenia/tumen/index.html">в Тюмень</a></li>
                            <li><a href="../napravlenia/ufa/index.html">в Уфу</a></li>
                            <li><a href="../napravlenia/chelyabinsk/index.html">в Челябинск</a></li>
                        </ul>
                    </li>
                    <li class=""><a href="{{ route('contacts') }}">Контакты</a></li>
                </ul>
            </div>
        </div>
    </div>
</div>
<!--header-->


@yield('content')


<!--footer-->
<footer>
    <div class="container">
        <div class="row">
            <div class="col-md-3">
                <div class="logo_wrapper">
                    <a href="{{ route('index') }}"><img class="logo" src="../images/logo.png"
                                                        alt="Грузовое объединение"/></a>
                    <div class="underlogo">Автомобильные перевозки по всей России</div>
                </div>
                <ul class="footer_contacts ul">
                    <li>
                        <div class="phone bold"><a href="tel:{{phone_maker_contacts(\App\Models\Contact::find(1)->phone)}}">{{ \App\Models\Contact::find(1)->phone }}</a></div>
                        <div class="phone bold"><a href="tel:{{phone_maker_contacts(\App\Models\Contact::find(1)->phone)}}">{{ \App\Models\Contact::find(1)->phone }}</a></div>
                    </li>
                    <li>
                        <div><a class="callback" rel="facebox" href="{{ route('contacts') . '#count_div' }}">Заказать
                                звонок</a></div>
                    </li>
                    <li>
                        <div class="email"><a href="mailto:{{ \App\Models\Contact::find(1)->email }}">{{ \App\Models\Contact::find(1)->email }}</a></div>
                    </li>
                    <li>
                        <div class="adress-footer">{{ \App\Models\Contact::find(1)->address }}</div>
                    </li>
                </ul>

            </div>
            <div class="col-md-3">
                <div class="title bold">Перевозимые типы груза</div>

                <ul class="popularservicepopular menu_footer">
                    @foreach($cargos as $cargo)
                        <li><a href="{{ route('cargo', ['slug' => $cargo->slug]) }}">{{ $cargo->name }}</a></li>
                    @endforeach

                </ul>

            </div>
            <div class="col-md-3">
                <div class="title bold">О компании</div>

                <ul class="menu_footer">
                    <li class="active"><a href="{{ route('about')}}">О компании</a></li>
                    <li class=""><a href="{{ route('infos')}}">Полезная информация</a></li>
                    <li class=""><a href="../policy/index.html">Политика конфиденциальности</a></li>
                    <li class=""><a href="{{ route('contacts')}}">Контакты</a></li>
                </ul>

            </div>
            <div class="col-md-3">
                <div class="title bold">Наш автопарк</div>

                <ul class="popularcatsfooter menu_footer">
                    @foreach($trucks as $truck)
                        <li><a href="{{ route('car', ['slug' => $truck->slug]) }}">{{ $truck->name }}</a></li>
                    @endforeach

                </ul>

            </div>
        </div>
    </div>

</footer>
<!--footer-->

<div class="mobilepanelexpand" style="display: none;">
    <div>
        <table>
            <tbody>
            <tr>
                <td class="ccol2">
                    <div class="logo"><a href="{{ route('index') }}"><img class="logo" src="../images/logo.png"
                                                                          alt="Грузовое объединение"/></a></div>
                </td>
                <td class="col3">
                    <ul class="top_mobile_icons">
                        <li><a href="tel:+79612906666" class="mobileicon mobileiconphone"></a></li>
                        <li class="mobileicon">
                            <div class="btn-sitenav-toggle" id="sitenav-mobile-toggle">
                                <!-- lines are for animation -->
                                <span class="line top"></span>
                                <span class="line middle"></span>
                                <span class="line bottom"></span>
                            </div>
                        </li>
                    </ul>
                </td>
            </tr>
            </tbody>
        </table>
    </div>


    <nav id="mobile-nav">
        <ul class="first-nav"></ul>
        <ul class="second-nav"></ul>

        <ul class="contacts"></ul>
    </nav>

</div>
<script src="{{ asset('js/bottom.js') }}"></script>

<a href="javascript:void(0)" onclick="ToUp()" class="toup"><img src="/images/up.png"/></a>

</body>
</html>
