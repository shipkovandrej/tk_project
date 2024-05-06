<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN""http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ru" lang="ru">
<head>
    @yield('title')
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link rel="shortcut icon" type="image/ico" href="images/icons/favicon.ico"/>

    <link rel="canonical" href="index.html"/>

    <meta property="og:title" content="О компании"/>
    <meta property="og:description" content=""/>
    <meta property="og:image" content="https://www.tk-go.ru/images/logo.png"/>
    <meta property="og:url" content="https://www.tk-go.ru/about/"/>
    <meta property="og:type" content="website"/>
    <meta property="og:site_name" content="Грузовое объединение"/>
    <link rel="apple-touch-icon" href="../images/apple-touch-icon-60x60.png"/>
    <link rel="apple-touch-icon" sizes="76x76" href="../images/apple-touch-icon-76x76.png"/>
    <link rel="apple-touch-icon" sizes="120x120" href="../images/apple-touch-icon-120x120.png"/>
    <link rel="apple-touch-icon" sizes="152x152" href="../images/apple-touch-icon-152x152.png"/>
    <base href=""/>


    @vite(['resources/css/style.css'])



    <script src="{{ asset('js/top.js') }}"></script>
    <script>
        var serverfullname = "https://www.tk-go.ru/";
        window.dataLayer = window.dataLayer || [];
    </script>

</head>
<body class="body_about">

<!--header-->
<div class="header_wrapper">
    <div class="head-line1">
        <div class="container">


            <div class="row">
                <div class="col-md-7">
                    <div class="logo_wrapper">
                        <a href="../index.html"><img class="logo" src="../images/logo.png" alt="Грузовое объединение"/></a>
                        <div class="underlogo">Автомобильные перевозки по всей России</div>
                    </div>

                </div>

                <div class="col-md-5">
                    <div class="region_callback_wrapper">
                        <div class="phone_callback"><span class="phone">+7 961 290‑66‑66</span> <a class="callback"
                                                                                                   rel="facebox"
                                                                                                   href="../module/callback/form/index.html">Заказать
                                звонок</a></div>
                        <div class="basketcontainer" style="position: relative;"><span class="basket-place"> <span
                                    class="basket"><a href="../basket/index.html" class="icon basket_icon"><span
                                            class="basket_count">0</span></a></span></span></div>
                        <div>
                            <div class="region_selector"><a href="../action/cityselector/index.html" rel="facebox">Ростов-на-Дону</a>
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
                                <li><a href="{{ route('car1') }}">Фура</a></li>
                                <li><a href="{{ route('car2') }}">Автопоезд</a></li>
                                <li><a href="{{ route('car3') }}">Одиночка</a></li>
                                <li><a href="{{ route('car4') }}">Газель</a></li>
                                <li><a href="{{ route('car5') }}">Трал</a></li>
                            </ul>
                        </li>
                        <li class="dropdown ">
                            <a href="{{ route('cargos') }}" class="dropdown-toggle">Что мы перевозим</a>
                            <ul class="">
                                <li><a href="../perevozka-opasnyh-gruzov/index.html">Перевозка опасных грузов</a></li>
                                <li><a href="../perevozka-skoroportyaschihsya-gruzov/index.html">Перевозка
                                        скоропортящихся грузов</a></li>
                                <li><a href="../perevozka-farmacevticheskih-tovarov/index.html">Перевозка
                                        фармацевтических товаров</a></li>
                                <li><a href="../perevozka-krupnogabaritnyh-gruzov/index.html">Перевозка крупногабаритных
                                        грузов</a></li>
                                <li><a href="../perevozka-sbornyh-gruzov/index.html">Перевозка сборных грузов </a></li>
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
    <div class="menu_wrapper">
        <div class="container">
            <div class="menucontent">
                <ul class="menu_top1">
                    <li class="active"><a href="{{route('about')}}">О компании</a></li>
                    <li class=""><a href="{{ route('info') }}">Полезная информация</a></li>
                    <li class="dropdown ">
                        <a href="{{ route('avtopark') }}" class="dropdown-toggle">Наш автопарк</a>
                        <ul class="">
                            <li><a href="../fura/index.html">Фура</a></li>
                            <li><a href="../avtopoezd/index.html">Автопоезд</a></li>
                            <li><a href="../odinochka/index.html">Одиночка</a></li>
                            <li><a href="../gazel/index.html">Газель</a></li>
                            <li><a href="../tral/index.html">Трал</a></li>
                        </ul>
                    </li>
                    <li class="dropdown ">
                        <a href="{{ route('cargos') }}" class="dropdown-toggle">Что мы перевозим</a>
                        <ul class="">
                            <li><a href="../perevozka-opasnyh-gruzov/index.html">Перевозка опасных грузов</a></li>
                            <li><a href="../perevozka-skoroportyaschihsya-gruzov/index.html">Перевозка скоропортящихся
                                    грузов</a></li>
                            <li><a href="../perevozka-farmacevticheskih-tovarov/index.html">Перевозка фармацевтических
                                    товаров</a></li>
                            <li><a href="../perevozka-krupnogabaritnyh-gruzov/index.html">Перевозка крупногабаритных
                                    грузов</a></li>
                            <li><a href="../perevozka-sbornyh-gruzov/index.html">Перевозка сборных грузов </a></li>
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
                    <a href="../index.html"><img class="logo" src="../images/logo.png" alt="Грузовое объединение"/></a>
                    <div class="underlogo">Автомобильные перевозки по всей России</div>
                </div>
                <ul class="footer_contacts ul">
                    <li>
                        <div class="phone bold"><a href="tel:+79612906666">+7 961 290‑66‑66</a></div>
                        <div class="phone bold"><a href="tel:+79612906666">+7 961 290‑66‑66</a></div>
                    </li>
                    <li>
                        <div><a class="callback" rel="facebox" href="../module/callback/form/index.html">Заказать
                                звонок</a></div>
                    </li>
                    <li>
                        <div class="email"><a href="https://www.tk-go.ru/zakaz@tk-go.ru">zakaz@tk-go.ru</a></div>
                    </li>
                    <li>
                        <div class="adress-footer">344095 г. Ростов-на-Дону, ул. Штахановского, 29А</div>
                    </li>
                </ul>

            </div>
            <div class="col-md-3">
                <div class="title bold">Перевозимые типы груза</div>

                <ul class="popularservicepopular menu_footer">
                    <li><a href="{{ route('cargo1') }}">Перевозка опасных грузов</a></li>
                    <li><a href="{{ route('cargo2') }}">Перевозка скоропортящихся
                            грузов</a></li>
                    <li><a href="{{ route('cargo3') }}">Перевозка фармацевтических
                            товаров</a></li>
                    <li><a href="{{ route('cargo4') }}">Перевозка крупногабаритных грузов</a>
                    </li>
                    <li><a href="{{ route('cargo5') }}">Перевозка сборных грузов </a></li>
                </ul>

            </div>
            <div class="col-md-3">
                <div class="title bold">О компании</div>

                <ul class="menu_footer">
                    <li class="active"><a href="{{ route('about')}}">О компании</a></li>
                    <li class=""><a href="{{ route('info')}}">Полезная информация</a></li>
                    <li class=""><a href="../policy/index.html">Политика конфиденциальности</a></li>
                    <li class=""><a href="{{ route('contacts')}}">Контакты</a></li>
                </ul>

            </div>
            <div class="col-md-3">
                <div class="title bold">Наш автопарк</div>

                <ul class="popularcatsfooter menu_footer">
                    <li><a href="{{ route('car1') }}">Фура</a></li>
                    <li><a href="{{ route('car2') }}">Автопоезд</a></li>
                    <li><a href="{{ route('car3') }}">Одиночка</a></li>
                    <li><a href="{{ route('car4') }}">Газель</a></li>
                    <li><a href="{{ route('car5') }}">Трал</a></li>
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
                    <div class="logo"><a href="../index.html"><img class="logo" src="../images/logo.png"
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
        <ul classs="mobile-region-selector">
            <li>
                <div class="region_selector"><a href="../action/cityselector/index.html"
                                                rel="facebox">Ростов-на-Дону</a></div>
            </li>
        </ul>
        <ul class="contacts"></ul>
    </nav>

</div>
<script src="{{ asset('js/bottom.js') }}"></script>

<a href="javascript:void(0)" onclick="ToUp()" class="toup"><img src="images/up.png"/></a>

</body>
</html>
