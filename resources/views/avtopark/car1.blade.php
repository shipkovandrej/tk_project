@extends('layouts.main')
@section('title')
    <title>Фура</title>
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

                <li>
                    <a href="{{ route('avtopark') }}" title="Автопарк">
                        <span>Автопарк</span>
                    </a> /
                </li>
                <li>Фура</li>
            </ul>
        </div>
    </div>
    <div class="container h1"><h1>Фура</h1></div>


    <div class="car_slider">
        <div class="container">
            <div class="whiteplate  whiteplatecar">
                <div class="text">
                    <div class="text">
                        <div class="row">
                            <div class="col-md-6">
                                <p><strong>Типы кузова</strong></p>

                                <ul>
                                    <li>Тентованная</li>
                                    <li>Рефрижератор</li>
                                    <li>Изотермический</li>
                                    <li>Бортовая</li>
                                    <li>Без бортов</li>
                                </ul>
                            </div>

                            <div class="col-md-6">
                                <p><strong>Объем</strong></p>

                                <ul>
                                    <li>82-100 куб. метров</li>
                                    <li>Длина &ndash; 13.2-13.6 м</li>
                                    <li>Ширина &ndash; 2.45-2.55 м</li>
                                    <li>Высота &ndash; 2.55-3 м</li>
                                </ul>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-6">
                                <p><strong>Грузоподъемность</strong></p>

                                <ul>
                                    <li>20-24 тонны</li>
                                </ul>
                            </div>

                            <div class="col-md-6">
                                <p>&nbsp;</p>
                            </div>
                        </div>

                        <hr/>
                        <p><span style="font-size:10px;"><em>Стоимость доставки зависит от ряда факторов и рассчитывается индивидуально для каждого клиента</em></span>
                        </p>
                    </div>
                </div>
                <div class="price_call">
                    <div class="price">от 50 руб/км</div>
                    <a href="../module/callback/form/index.html@category=2" class="service_callback" rel="facebox">Оставить
                        заявку</a>
                </div>
            </div>
        </div>
        <div class="car_slider_bg">
            <picture>
                <source media="(min-width: 768px)"
                        srcset="https://www.tk-go.ru/upload/goods_category_photos/63f8c97730467.png">
                <img src="../upload/goods_category_photos/63f8c9f166b8d.png"></picture>
            <div class="widgetblock-advantages_category_2 widgetblock features advantages">
                <div class="container"><h2 class="wtitle">Преимущества перевозки грузов еврофурой</h2>
                    <div class="widget-text">Еврофуры - это транспортные средства, которые специально разработаны для
                        перевозки грузов на большие расстояния. Грузоперевозки еврофурами из Ростова-на-Дону имеют ряд
                        преимуществ по сравнению с другими типами грузовиков, а именно большую грузоподъемность и большие
                        габариты, что позволяет перевозить за один раз груз весом до 24 тонн. Благодаря таким параметрам,
                        еврофура является одним из самых удобных и востребованных видов транспорта для перевозки
                        крупногабаритных грузов, а также сыпучих, плотных и жидких материалов.

                    </div>
                    <div class="horscroll">
                        <div class="scrol-params" data-thumb="" data-auto="" data-count="4" data-pagination=""
                             data-dots=""></div>
                        <ul class="horscroll-list ul">
                            <li>
                                <div class="">
                                    <div class="item">
                                        <table>
                                            <tr>
                                                <td>
                                                    <div class="digi">1</div>
                                                </td>
                                                <td>
                                                    <div class="name">Большой объем</div>
                                                    <div class="description"><p>Еврофуры могут перевозить до 33 палет внутри
                                                            своего кузова, что позволяет транспортировать большой объем товаров
                                                            и материалов за одну поездку.</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="">
                                    <div class="item">
                                        <table>
                                            <tr>
                                                <td>
                                                    <div class="digi">2</div>
                                                </td>
                                                <td>
                                                    <div class="name">Безопасная перевозка</div>
                                                    <div class="description"><p>Еврофуры имеют системы безопасности,
                                                            включающие&nbsp;в себя устройства, фиксирующие&nbsp;груз внутри
                                                            кузова и предотвращающие&nbsp;его перемещение во время
                                                            транспортировки.</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="">
                                    <div class="item">
                                        <table>
                                            <tr>
                                                <td>
                                                    <div class="digi">3</div>
                                                </td>
                                                <td>
                                                    <div class="name">МОБИЛЬНОСТЬ</div>
                                                    <div class="description"><p>Крупные габариты Еврофуры не затрудняют ее
                                                            перемещение по загруженным дорогам городов, населенных пунктов и
                                                            трассах.</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="">
                                    <div class="item">
                                        <table>
                                            <tr>
                                                <td>
                                                    <div class="digi">4</div>
                                                </td>
                                                <td>
                                                    <div class="name">Использование пространства</div>
                                                    <div class="description"><p>Грузовые отсеки еврофуры с высотой до 2,7
                                                            метра позволяет использовать все доступное пространство и сокращает
                                                            количество пространства внутри кузова.&nbsp;</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="text_after"></div>
                </div>
            </div>
        </div>
    </div>

    <div class="widgetblock-faq_category_2 widgetblock faq">
        <div class="container"><h2 class="wtitle">Часто задаваемые вопросы о перевозке фурой</h2>
            <div class="widget-text">Если вам требуется заказать перевозку грузов фурой из Ростова-на-Дону, обратитесь в
                нашу компанию «Грузовое объединение». Мы предложим вам наилучшие условия и гарантируем высокий уровень
                сервиса.
            </div>
            <ul class="faqlist">
                <li>
                    <div class="">
                        <div class="question_wrapper">
                            <div class="question">1. Каковы размеры еврофур?</div>
                            <div class="answer">Стандартные размеры еврофур: длина - 13,6 метра, ширина - 2,45 метра, высота
                                - 2,7 метра. Грузоподъемность еврофуры - до 24 тонн.
                            </div>

                        </div>
                    </div>
                </li>
                <li>
                    <div class="">
                        <div class="question_wrapper">
                            <div class="question">2. Какие виды грузов можно перевозить на еврофурах?</div>
                            <div class="answer">Еврофуры используются для перевозки различных типов грузов, включая продукты
                                питания, строительные материалы, текстиль, химические вещества и другие товары.
                            </div>

                        </div>
                    </div>
                </li>
                <li>
                    <div class="">
                        <div class="question_wrapper">
                            <div class="question">3. Как организовать перевозку груза еврофурой?</div>
                            <div class="answer">Для организации перевозки груза на еврофуре необходимо связаться с нашими
                                специалистами. Мы поможем организовать доставку груза и предоставим информацию о стоимости и
                                сроках транспортировки
                            </div>

                        </div>
                    </div>
                </li>
                <li>
                    <div class="">
                        <div class="question_wrapper">
                            <div class="question">4. Какие документы нужны для перевозки груза на еврофуре?</div>
                            <div class="answer">Для перевозки груза на еврофуре необходимы различные документы, в том числе
                                таможенные декларации, накладные и разрешительные документы. Полный список документов может
                                различаться в зависимости от типа груза и места назначения.
                            </div>

                        </div>
                    </div>
                </li>
                <li>
                    <div class="">
                        <div class="question_wrapper">
                            <div class="question">5. Какова стоимость перевозки груза на еврофуре?</div>
                            <div class="answer">Стоимость перевозки груза на еврофуре зависит от нескольких факторов,
                                включая расстояние, тип груза и сроки доставки. Компания «Грузовое объединение» поможет
                                определить точную стоимость перевозки вашего груза.
                            </div>

                        </div>
                    </div>
                </li>
            </ul>
            <div class="text_after"></div>
        </div>
    </div>
    <div class="widgetblock-getcost widgetblock getcostfeedback">
        <div class="container"><h2 class="wtitle">Расчет стоимости доставки</h2>
            <div class="widget-text">Стоимость доставки зависит от ряда факторов и рассчитывается индивидуально для каждого
                нашими специалистами. Оставьте заявку в форме обратной связи, и наш менеджер свяжется с вами в течении 15
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
                        <div class="active"><input type="radio" name="Транспорт" value="Фура" checked="checked">Фура</div>
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
                                        class="inputphone form-control" placeholder="Телефон" id="phone_phone" type="text"
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
                        href="../policy/index.html" target="_blank">персональных данных</a></div>

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
    <div class="widgetblock widgetblock-goodlist">
        <div class="container">
            <ul class="goodsflow">
                <li>
                    <div class="good_wrapper">
                        <div class="i_c"><img alt="Еврофура (объем - 100 м3)"
                                              src="../cache/goods_photos/400x300x0x63ff55e560b8a.jpg"></div>
                        <div class="i_content">
                            <div class="p-ttl">Еврофура (объем - 100 м3)</div>
                            <div class="p-ttl-minidesc">
                                <ul>
                                    <li>Длина - 13.4 м</li>
                                    <li>Ширина - 2.45 м</li>
                                    <li>Высота - 3&nbsp;м</li>
                                    <li>Объем - 100 м3</li>
                                    <li>Паллето-мест - 33 шт</li>
                                </ul>
                            </div>
                        </div>
                        <a href="../module/callback/form/index.html@good=3" class="service_callback" rel="fancybox">Оставить
                            заявку</a>
                    </div>
                </li>
                <li>
                    <div class="good_wrapper">
                        <div class="i_c"><img alt="Еврофура (объем - 82 м3)"
                                              src="../cache/goods_photos/400x300x0x63ff55bea22c5.jpg"></div>
                        <div class="i_content">
                            <div class="p-ttl">Еврофура (объем - 82 м3)</div>
                            <div class="p-ttl-minidesc">
                                <ul>
                                    <li>Длина - 13.4&nbsp;м</li>
                                    <li>Ширина - 2.45 м</li>
                                    <li>Высота - 2.45 м</li>
                                    <li>Объем -&nbsp;82 м3</li>
                                    <li>Паллето-мест - 33 шт</li>
                                </ul>
                            </div>
                        </div>
                        <a href="../module/callback/form/index.html@good=1" class="service_callback" rel="fancybox">Оставить
                            заявку</a>
                    </div>
                </li>
                <li>
                    <div class="good_wrapper">
                        <div class="i_c"><img alt="Еврофура (объем - 92 м3)"
                                              src="../cache/goods_photos/400x300x0x63ff55d6924d9.jpg"></div>
                        <div class="i_content">
                            <div class="p-ttl">Еврофура (объем - 92 м3)</div>
                            <div class="p-ttl-minidesc">
                                <ul>
                                    <li>Длина - 13.4 м</li>
                                    <li>Ширина - 2.45 м</li>
                                    <li>Высота - 2.8&nbsp;м</li>
                                    <li>Объем - 92 м3</li>
                                    <li>Паллето-мест - 33 шт</li>
                                </ul>
                            </div>
                        </div>
                        <a href="../module/callback/form/index.html@good=2" class="service_callback" rel="fancybox">Оставить
                            заявку</a>
                    </div>
                </li>
            </ul>
        </div>
    </div>

@endsection
