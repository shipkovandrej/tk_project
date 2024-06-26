@extends('layouts.main')
@section('title')
    <title>О компании</title>
@stop
@section('meta')
    <meta property="og:title" content="О компании"/>
    <meta property="og:description" content=""/>
    <meta property="og:image" content="../images/logo.png"/>
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Грузовое объединение" />
@stop
@section('content')
<!--gray_nav-->
<div class="crumble_wrapper">
    <div class="container">
        <ul class="crumble ul">
            <li>
                <a href="{{ route('index') }}" title="Главная">
                    <span>Главная</span>
                </a> /
            </li>
            <li>О компании</li>
        </ul>
    </div>
</div>
<!--gray_nav-->

<div class="container h1"><h1>О компании</h1></div>


<section class="standartblock ">
    <div class="container"><p style="margin-bottom:11px"><span style="font-size:11pt"><span
                    style="line-height:normal"><span style="font-family:Calibri,sans-serif"><b><span
                                style="font-size:12.0pt"><span style="font-family:Roboto"><span
                                        style="color:#313f49"></span></span></span></b></span></span></span>
        </p>

        <p><img alt="" src="images/about_comp.jpg" style="width: 1250px; height: 384px;"/></p>

        <p>Логистическая компания &laquo;Грузовое объединение&raquo; основана в 2013 году. За 10 лет работы мы получили
            богатый опыт в сфере автоперевозок грузов по территории России, что позволяет нам предоставлять
            высококачественный сервис нашим клиентам.&nbsp;</p>

        <p>Головной офис компании расположен в г. Ростов-на-Дону. На сегодняшний день в нашей команде трудятся более 50&nbsp;специалистов
            высокого класса. Мы сотрудничаем с более чем 1,5 тыс. компаний из разных регионов страны.&nbsp;В их число
            входят такие крупные компании, как &laquo;Мултон Партнерс&raquo;, &laquo;Аскона&raquo;, &laquo;Агрохолдинг
            Степь&raquo;, &laquo;Холдинг Аква&raquo;, &laquo;Старый источник&raquo;, &laquo;СФТ Пакенджинг&raquo;,
            &laquo;Эвьяп Рус&raquo;, &laquo;Пеноплэкс СПБ&raquo;, &laquo;Аквасток&raquo;, &laquo;Грин Лайн Центр&raquo;,
            &laquo;СФТ Пакенджинг&raquo; и др.</p>

        <p>Мы обладаем современным автопарком, начиная от Газелей и заканчивая автопоездами и тяжелыми тралами, что
            позволяет&nbsp;нам перевозить:</p>

        <ul>
            <li><a href="../perevozka-sbornyh-gruzov/index.html" target="_blank">сборные грузы</a></li>
            <li><a href="../perevozka-skoroportyaschihsya-gruzov/index.html" target="_blank">скоропортящиеся грузы</a>
            </li>
            <li><a href="../perevozka-farmacevticheskih-tovarov/index.html" target="_blank">фармацевтические грузы</a>
            </li>
            <li><a href="../perevozka-krupnogabaritnyh-gruzov/index.html" target="_blank">крупнотоннажные грузы</a></li>
            <li><a href="../perevozka-opasnyh-gruzov/index.html" target="_blank">опасные грузы</a></li>
        </ul>

        <p>В нашей компании мы особое внимание уделяем сохранности грузов, поэтому наши&nbsp;автомобили проходят
            регулярное техническое обслуживание и всегда находятся в исправном состоянии. Кроме того весь наш&nbsp;транспорт
            оснащен&nbsp;GPS-мониторингом и современными системами безопасности, которые защитят&nbsp;грузы от
            повреждения во время транспортировки. Наши водители регулярно&nbsp;проходят курсы повышения квалификации.
            Также мы&nbsp;предоставляем услуги страхования грузов, чтобы обеспечить полную защиту вашего груза на всех
            этапах перевозки.</p>

        <p>Мы поддерживаем постоянный контакт с клиентами на всех этапах перевозки. Наша профессиональная команда
            прилагает все усилия, чтобы обеспечить быстрое и качественное обслуживание. Ваш груз будет доставлен&nbsp;в
            целости и&nbsp;сохранности и точно в срок!</p>
    </div>
</section>
@endsection




