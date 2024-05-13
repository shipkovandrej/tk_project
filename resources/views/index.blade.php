@extends('layouts.main')
@section('title')
    <title>Грузовое объединение | Автомобильные перевозки по всей России</title>
@stop

@section('content')
    <div class="slideronmain slider-widget" data-auto="" data-pagination="1" data-dots="">
        <div class="owl-carousel owl-theme"><a href="{{ route('avtopark') }}">
                <span class="bgimageitem bgimageitembgdark">
                    <span class="bgimageitem_wrap"><picture>
                        <source media="(min-width: 768px)"
                                srcset="cache/slider/1920x0x65f442f21e7e5.jpg">
                        <source media="(min-width: 768px)"
                                srcset="cache/slider/1920x0x65f442f21e7e5.jpg" type="image/webp">
                        <source srcset="cache/slider/768x768x65f4431b289c9.jpg" type="image/webp">
                        <img src="cache/slider/768x768x65f4431b289c9.jpg">
                    </picture>
                    <div class="container"><div class="slide_text_wrapper_container"><div class="slide_text_wrapper"><div
                                    class="line1">Автомобильные перевозки</div><div
                                    class="line2">по всей территории России</div><div class="undername">Перевозка грузов из Ростова-на-Дону и области в другие города России – сложные транспортные мероприятия, требующие мастерства и профессионализма на каждом этапе их проведения.</div><div
                                    class="link link">Выбрать авто</div></div></div></div></span>
                </span></a></div>
    </div>
    <div class="widgetblock-garantee widgetblock garantee">
        <div class="container"><h2 class="wtitle">Наши гарантии и ответственность</h2>
            <div class="widget-text">Доверив перевозку Вашего груза компании «Грузовое объединение», вы сможете
                сэкономить
                свои силы, нервы и время. Поскольку мы берем на себя все заботы по оформлению нужных документов на груз,
                своевременно информируем Вас о его местонахождении. Гарантируем сохранность груза и предлагаем своим
                клиентам низкие тарифы.
            </div>
            <div class="horscroll">
                <div class="scrol-params" data-thumb="" data-auto="" data-count="4" data-pagination=""
                     data-dots=""></div>
                <ul class="horscroll-list ul">
                    <li>
                        <div class="">
                            <div class="item">
                                <div class="img"><img src="upload/html_content/63f881293a449.png"></div>
                                <div class="name">Точные сроки доставки</div>
                                <div class="desc">Гарантируем, что Ваш груз будет доставлен без повреждений и точно в
                                    срок в
                                    любую точку России
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="">
                            <div class="item">
                                <div class="img"><img src="upload/html_content/63f8814d89467.png"></div>
                                <div class="name">Гарантии сохранности груза</div>
                                <div class="desc">Обеспечим безопасность и сохранность груза во время перевозки от места
                                    отправления до места назначения
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="">
                            <div class="item">
                                <div class="img"><img src="upload/html_content/63f88162ee672.png"></div>
                                <div class="name">Современный автомобильный парк</div>
                                <div class="desc">Мы постоянно обновляем наш автопарк и используем только современные и
                                    надежные автомобили
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="">
                            <div class="item">
                                <div class="img"><img src="upload/html_content/63f881815f623.png"></div>
                                <div class="name">Любые габариты и вес груза</div>
                                <div class="desc">Мы перевозим грузы любого объема и веса, благодаря современному
                                    автопарку
                                    и опытным водителям
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="text_after"></div>
        </div>
    </div>
    <div class="widgetblock-onmainfollow widgetblock follow">
        <div class="container"><h2 class="wtitle">Популярные направления из Ростова-на-Дону</h2>
            <div class="widget-text">Мы осуществляем перевозку различных видов грузов из Ростова-на-Дону, в том числе
                крупногабаритных и тяжеловесных, в любую точку России. Если Вам нужна надежная и профессиональная
                компания
                для автоперевозки грузов - обращайтесь в «Грузовое объединение».
            </div>
            <div class="content">
                <div class="digi">
                    <div class="name">25</div>
                    <div class="ttl">Основных направлений перевозки</div>
                </div>
                <div class="cities">
                    <ul class="direction">
                        <li><a href="napravlenia/volgograd/index.html">в Волгоград</a></li>
                        <li><a href="napravlenia/voronezh/index.html">в Воронеж</a></li>
                        <li><a href="napravlenia/ekb/index.html">в Екатеринбург</a></li>
                        <li><a href="napravlenia/kazan/index.html">в Казань</a></li>
                        <li><a href="napravlenia/krasnodar/index.html">в Краснодар</a></li>
                        <li><a href="napravlenia/krasnoyarsk/index.html">в Красноярск</a></li>
                        <li><a href="napravlenia/lipeck/index.html">в Липецк</a></li>
                        <li><a href="napravlenia/mineralnye-vody/index.html">в Минеральные Воды</a></li>
                        <li><a href="napravlenia/msk/index.html">в Москву</a></li>
                        <li><a href="napravlenia/nabcheln/index.html">в Набережные Челны</a></li>
                        <li><a href="napravlenia/n-novgorod/index.html">в Нижний Новгород</a></li>
                        <li><a href="napravlenia/novorossijsk/index.html">в Новороссийск</a></li>
                        <li><a href="napravlenia/novosibirsk/index.html">в Новосибирск</a></li>
                        <li><a href="napravlenia/omsk/index.html">в Омск</a></li>
                        <li><a href="napravlenia/samara/index.html">в Самару</a></li>
                        <li><a href="napravlenia/spb/index.html">в Санкт-Петербург</a></li>
                        <li><a href="napravlenia/saratov/index.html">в Саратов</a></li>
                        <li><a href="napravlenia/sochi/index.html">в Сочи</a></li>
                        <li><a href="napravlenia/stavropol/index.html">в Ставрополь</a></li>
                        <li><a href="napravlenia/toliaty/index.html">в Тольятти</a></li>
                        <li><a href="napravlenia/tula/index.html">в Тулу</a></li>
                        <li><a href="napravlenia/tumen/index.html">в Тюмень</a></li>
                        <li><a href="napravlenia/ufa/index.html">в Уфу</a></li>
                        <li><a href="napravlenia/chelyabinsk/index.html">в Челябинск</a></li>
                    </ul>
                    <a href="module/callback/form/index.html" class="btn btninvert" rel="facebox">У меня есть груз</a>
                </div>

            </div>
            <div class="text_after"></div>
        </div>
    </div>
    <div class="widgetblock-frequently widgetblock services">
        <div class="container"><h2 class="wtitle">Часто перевозимые грузы</h2>
            <div class="widget-text">Компания «Грузовое объединение» имеет большой опыт и возможности для перевозки
                различных типов грузов, обеспечения их сохранности и своевременной доставки. Наша компания имеет большой
                парк транспортных средств, что позволяет нам гибко подходить к требованиям каждого клиента.
            </div>
            <ul class="servicelist">
                <li>
                    <div class="service_item" onclick="location.href='{{ route('cargo1') }}'">
                        <div class="img"><a class="goto" title="Перевозка опасных грузов"
                                            href="{{ route('cargo1') }}"><img
                                    src="cache/service_category_photos/500x300x1x63f8bd87002f3.jpg"
                                    alt="Перевозка опасных грузов"></a></div>
                        <span class="counter">01</span>
                        <div class="title"><img src="upload/service_category_photos/63f8b7983ef3c.png"> <span>Перевозка опасных грузов</span>
                        </div>
                        <div class="desc">Компания «Грузовое объединение» более 13 лет специализируется на перевозке
                            опасных
                            грузов. Наш автопарк...
                        </div>
                    </div>
                </li>
                <li>
                    <div class="service_item"
                         onclick="location.href='{{ route('cargo2') }}'">
                        <div class="img"><a class="goto" title="Перевозка скоропортящихся грузов"
                                            href="{{ route('cargo1') }}"><img
                                    src="cache/service_category_photos/500x300x1x63fc97e18d3bb.jpg"
                                    alt="Перевозка скоропортящихся грузов"></a></div>
                        <span class="counter">02</span>
                        <div class="title"><img src="upload/service_category_photos/63fc96cf0fa6f.png"> <span>Перевозка скоропортящихся грузов</span>
                        </div>
                        <div class="desc">Своевременная и безопасная доставка скоропортящегося груза имеет очень важное
                            значение, поэтому мы предлагаем...
                        </div>
                    </div>
                </li>
                <li>
                    <div class="service_item"
                         onclick="location.href='{{ route('cargo3') }}'">
                        <div class="img"><a class="goto" title="Перевозка фармацевтических товаров"
                                            href="{{ route('cargo3') }}"><img
                                    src="cache/service_category_photos/500x300x1x63fc9a7fe0d13.jpg"
                                    alt="Перевозка фармацевтических товаров"></a></div>
                        <span class="counter">03</span>
                        <div class="title"><img src="upload/service_category_photos/63fc9ae587ac6.png"> <span>Перевозка фармацевтических товаров</span>
                        </div>
                        <div class="desc">Компания «Грузовое объединение» специализируется на перевозке фармацевтических
                            товаров...
                        </div>
                    </div>
                </li>
                <li>
                    <div class="service_item"
                         onclick="location.href='{{ route('cargo4') }}'">
                        <div class="img"><a class="goto" title="Перевозка крупногабаритных грузов"
                                            href="{{ route('cargo4') }}"><img
                                    src="cache/service_category_photos/500x300x1x63fc9bbaefdd6.jpg"
                                    alt="Перевозка крупногабаритных грузов"></a></div>
                        <span class="counter">04</span>
                        <div class="title"><img src="upload/service_category_photos/63fc9d52bbf52.png"> <span>Перевозка крупногабаритных грузов</span>
                        </div>
                        <div class="desc">Компания «Грузовое объединение» имеет многолетний опыт в сфере автоперевозок
                            крупногабаритных грузов...
                        </div>
                    </div>
                </li>
                <li>
                    <div class="service_item" onclick="location.href='{{ route('cargo5') }}'">
                        <div class="img"><a class="goto" title="Перевозка сборных грузов "
                                            href="{{ route('cargo5') }}"><img
                                    src="cache/service_category_photos/500x300x1x63fc9fd4117f2.jpg"
                                    alt="Перевозка сборных грузов "></a></div>
                        <span class="counter">05</span>
                        <div class="title"><img src="upload/service_category_photos/63fc9fdc513e9.png"> <span>Перевозка сборных грузов </span>
                        </div>
                        <div class="desc">Компания «Грузовое объединение» предлагает широкий спектр услуг по организации
                            перевозок сборных любых...
                        </div>
                    </div>
                </li>
                <li><a href="{{ route('cargos') }}" class="more">Смотреть все типы груза, которые мы
                        перевозим</a>
                </li>
            </ul>
            <div class="text_after"></div>
        </div>
    </div>
    <div class="widgetblock-shortdigits widgetblock digits">
        <div class="container"><h2 class="wtitle">Коротко о компании в цифрах</h2>
            <div class="widget-text">Мы гордимся результатами своей многолетней работы и продолжаем улучшать их,
                предоставляя нашим клиентам высококачественные услуги, которые помогают им решить самые сложные
                логистические задачи.
            </div>
            <div class="row digitslist">
                <div class="col-md-6 col-xl-3">
                    <div class="">
                        <div class="item">
                            <div class="digit">350</div>
                            <div class="name">Автомобилей, привлеченных в парк компании</div>
                            <div class="desc"><p>В нашем автопарке более 350 единиц техники&nbsp;грузоподъемностью от 3
                                    до
                                    60 тонн</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-xl-3">
                    <div class="">
                        <div class="item">
                            <div class="digit">10</div>
                            <div class="name">Лет успешной работы на рынке перевозок</div>
                            <div class="desc"><p>Компания&nbsp;&laquo;Грузовое объединение&raquo; работает на рынке
                                    автоперевозок с 2013 года</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-xl-3">
                    <div class="">
                        <div class="item">
                            <div class="digit">1800</div>
                            <div class="name">Компаний работают с нами и довольны сотрудничеством</div>
                            <div class="desc"><p>Более 1800 компаний из всей России доверяют нам перевозку своих
                                    грузов</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-xl-3">
                    <div class="">
                        <div class="item">
                            <div class="digit">50</div>
                            <div class="name">Штатных сотрудников, работающих в компании</div>
                            <div class="desc"><p>В нашем коллективе трудятся более 50&nbsp;квалифицированных логистов и
                                    менеджеров</p>

                                <p>&nbsp;</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="text_after"></div>
        </div>
    </div>
    <div class="widgetblock-clientsandopinions widgetblock clients">
        <div class="container"><h2 class="wtitle">Клиенты и отзывы</h2>
            <div class="widget-text">Мы являемся стабильным и надежным партнером, обладаем большим опытом в области
                грузовых
                автомобильных перевозок, имеем квалифицированный персонал и современный автопарк. Со многими компаниями
                мы
                работаем на постоянной основе.
            </div>
            <div class="slideme">
                <div class="slider-params" data-thumb="" data-auto="" data-count="5" data-countmobile="2"
                     data-pagination=""
                     data-dots=""></div>
                <div class=" owl-carousel owl-theme clientslist">
                    <div>
                        <div class="">
                            <div class="item"><img src="upload/html_content/642fbce6a6a9c.jpg" alt="Глория Джинс"></div>
                        </div>
                    </div>
                    <div>
                        <div class="">
                            <div class="item"><img src="upload/html_content/642fbd54a4fe1.jpg" alt="Ай пласт"></div>
                        </div>
                    </div>
                    <div>
                        <div class="">
                            <div class="item"><img src="upload/html_content/642fbdaa93a8b.jpg" alt="Аскона"></div>
                        </div>
                    </div>
                    <div>
                        <div class="">
                            <div class="item"><img src="upload/html_content/642fbdf269c69.jpg" alt="Кока Кола"></div>
                        </div>
                    </div>
                    <div>
                        <div class="">
                            <div class="item"><img src="upload/html_content/642fbe335f48b.jpg" alt="Старый источник">
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="">
                            <div class="item"><img src="upload/html_content/642fbee4b4eb3.jpg" alt="Пеноплэкс СПБ">
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="">
                            <div class="item"><img src="upload/html_content/642fbf456289e.jpg" alt="Аквасток"></div>
                        </div>
                    </div>
                    <div>
                        <div class="">
                            <div class="item"><img src="upload/html_content/642fbf9d0b98f.jpg" alt="Грин лайн центр">
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="">
                            <div class="item"><img src="upload/html_content/642fbfe927183.jpg" alt="Агрохолдинг Степь">
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="">
                            <div class="item"><img src="upload/html_content/642fbe86dc4ab.jpg" alt="Эвьяп рус"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="text_after"></div>
        </div>
    </div>
    <section class="standartblock setclients">
        <div class="container">
            <div class="alllinks_wrapper"><a href="module/callback/form/index.html" rel="facebox">Стать нашим
                    клиентом</a>
            </div>
        </div>
    </section>
    <div class="widgetblock-getcost widgetblock getcostfeedback">
        <div class="container"><h2 class="wtitle">Расчет стоимости доставки</h2>
            <div class="widget-text">Стоимость доставки зависит от ряда факторов и рассчитывается индивидуально для
                каждого
                нашими специалистами. Оставьте заявку в форме обратной связи, и наш менеджер свяжется с вами в течении
                15
                минут.
            </div>
            <form id="page-submit" class="question-page" method="post" onsubmit="SendRequest(this);return false;">
                <div class="fb_wrapper_item">
                    <div class="feedback_place_wrapper">
                        <div>
                            <div class="lbl">Место загрузки</div>
                            <input class="form-control" type="text" name="Место загрузки"
                                   placeholder="Страна, регион, населенный пункт"></div>
                        <div>
                            <div class="lbl">Место выгрузки</div>
                            <input class="form-control" type="text" name="Место выгрузки"
                                   placeholder="Страна, регион, населенный пункт"></div>
                        <div>
                            <div class="lbl">Вес груза</div>
                            <input class="form-control" type="text" placeholder="Кг" name="Вес (кг)"></div>
                    </div>
                </div>
                <div class="fb_wrapper_item">
                    <div class="lbl">Транспорт перевозки</div>
                    <div class="feedback_transport_wrapper">
                        <div class="active"><input type="radio" name="Транспорт" value="Фура" checked="checked">Фура
                        </div>
                        <div><input type="radio" name="Транспорт" value="Автопоезд">Автопоезд</div>
                        <div><input type="radio" name="Транспорт" value="Одиночка">Одиночка</div>
                        <div><input type="radio" name="Транспорт" value="Газель">Газель</div>
                        <div><input type="radio" name="Транспорт" value="Трал">Трал</div>

                    </div>
                </div>
                <div class="fb_wrapper_item">
                    <div class="feedback_place_wrapper feedback_place_wrapper_contacts">
                        <div>
                            <div class="lbl">Контактное лицо</div>
                            <input type="text" name="Имя" value="" placeholder="Ваше имя"
                                   class="input formname form-control" required></div>
                        <div>
                            <div class="lbl">Телефон</div>
                            <ul class="ul phonecontrol_wrapper" style="display: flex;" class="ul_phone">
                                <li style="width:50px"><input type="text" name="phone_code" class="form-control"
                                                              readonly="readonly" value="+7" id="phonecode_phone"
                                                              style="width: 50px;"></li>
                                <li style="width:calc(100% - 50px);padding-left:10px;"><input
                                        class="inputphone form-control" placeholder="Телефон" id="phone_phone"
                                        type="text"
                                        required name="phone">
                                    <div class="phonerror_local" style="display: none;font-size: 10pt;color: red;">Номер
                                        телефона должен начинаться с цифры <span id="fdigitext"></span></div>
                                </li>
                            </ul>

                            <script>
                                $(document).ready(function () {
                                    $(".phonecontrol_wrapper").each(function () {
                                        fd = $(this).find(".inputphone").inputmask("(999) 999-99-99");
                                        phonerror_local = $(this).find('.phonerror_local');
                                        fd.on('paste', function (event) {
                                            var pastedData = event.originalEvent.clipboardData.getData('text');
                                            pastedData = pastedData.replace(/[\s()-]/g, '');
                                            phoneToPaste = pastedData;
                                            if (pastedData[0] == 8 || pastedData[0] == 7) {
                                                phoneToPaste = pastedData.substr(1, pastedData.length);
                                            }
                                            if (pastedData[0] == '+') {
                                                phoneToPaste = pastedData.substr(2, pastedData.length);
                                            }
                                            $(this).val(phoneToPaste);
                                        });
                                        fd.keyup(function () {
                                            fdigi = '9';
                                            if (fdigi == "") return;
                                            $("#fdigitext").html(fdigi);
                                            $val = $(this).inputmask('unmaskedvalue');
                                            if ($val != "" && $val[0] != fdigi) {
                                                $(this).val('');
                                                phonerror_local.slideDown();
                                                setTimeout(function () {
                                                    phonerror_local.slideUp()
                                                }, 2000)
                                            }
                                        })
                                    })

                                })

                            </script>
                        </div>
                    </div>
                    <button class="btn">Заказать</button>
                </div>
                <div class="policy">Нажимая кнопку &laquo;Заказать&raquo;, я подтверждаю свое согласие на обработку <a
                        href="policy/index.html" target="_blank">персональных данных</a></div>

            </form>
            <script>

                $(document).ready(function () {
                    $(".feedback_transport_wrapper div").click(function () {
                        $(".feedback_transport_wrapper div").removeClass('active');
                        $(".feedback_transport_wrapper input[type=radio]").prop('checked', false);
                        $(this).addClass('active');
                        $(this).find('input[type=radio]').prop('checked', true);
                    })
                })
            </script>
            <div class="text_after"></div>
        </div>
    </div>
    <div class="widgetblock-newsonmain widgetblock news">
        <div class="container"><h2 class="wtitle">Полезная информация</h2>
            <div class="widget-text">
            </div>
            <div class="horscroll">
                <div class="scrol-params" data-thumb="" data-auto="" data-count="4" data-pagination=""
                     data-dots=""></div>
                <ul class="horscroll-list ul">
                    <li>
                        <a href="{{ route('info1') }}" class="event_item">

                            <img src="cache/events_photos/400x500x1x63f8b33b6dacb.jpg"/>
                            <span class="info_wrapper">
<span class="title">Как посчитать объем груза?</span>
<span class="anons">Этот вопрос мы часто слышим от наших клиентов, поскольку выбор транспорта и стоимость перевозки зависят напрямую от объема груза...</span></span></a>
                    </li>
                    <li>
                        <a href="{{ route('info2') }}" class="event_item">

                            <img src="cache/events_photos/400x500x1x63f8b39086d66.jpg"/>
                            <span class="info_wrapper">
<span class="title">Правила проведения погрузочно-разгрузочных работ</span>
<span
    class="anons">В целях обеспечения безопасности при выполнении погрузочно-разгрузочных работ необходимо...</span></span></a>
                    </li>
                    <li>
                        <a href="{{ route('info3') }}" class="event_item">

                            <img src="cache/events_photos/400x500x1x63f8b3e2ae50e.jpg"/>
                            <span class="info_wrapper">
<span class="title">Как определить расстояние перевозки груза?</span>
<span class="anons">Определение расстояния перевозки грузов играет важную роль при разработке плана перевозок, расчёте тарифов...</span></span></a>
                    </li>
                    <li>
                        <a href="{{ route('info4') }}" class="event_item">

                            <img src="cache/events_photos/400x500x1x63f8b3bddbeb8.jpg"/>
                            <span class="info_wrapper">
<span class="title">Перевозка груза рефрижератором</span>
<span class="anons">Рефрижераторные перевозки могут осуществляться различными видами транспорта, но при больших объемах погрузо-разгрузочных...</span></span></a>
                    </li>
                </ul>
            </div>
            <div class="alllinks_wrapper"><a href="{{ route('info') }}">Смотреть все статьи</a></div>
            <div class="text_after"></div>
        </div>
    </div>

@endsection
