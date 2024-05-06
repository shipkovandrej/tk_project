@extends('layouts.main')
@section('title')
    <title>Газель</title>
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
                <li>Газель</li>
            </ul>
        </div>
    </div>
    <div class="container h1"><h1>Газель</h1></div>


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
                                    <li>8-35&nbsp;куб. метров</li>
                                    <li>Длина &ndash; от 2.7-6.5&nbsp;м</li>
                                    <li>Ширина &ndash; 1.7-2.35&nbsp;м</li>
                                    <li>Высота &ndash; 2.55-2.8&nbsp;м</li>
                                </ul>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-6">
                                <p><strong>Грузоподъемность</strong></p>

                                <ul>
                                    <li>1 тонна</li>
                                    <li>2 тонны</li>
                                    <li>3 тонны</li>
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
                    <a href="../module/callback/form/index.html@category=5" class="service_callback" rel="facebox">Оставить
                        заявку</a>
                </div>
            </div>
        </div>
        <div class="car_slider_bg">
            <picture>
                <source media="(min-width: 768px)"
                        srcset="https://www.tk-go.ru/upload/goods_category_photos/640061f71c050.png">
                <img src="../index.html"></picture>
            <div class="widgetblock-advantages_category_5 widgetblock features advantages">
                <div class="container"><h2 class="wtitle">Преимущества перевозки Газелью</h2>
                    <div class="widget-text"><p>Компания « Грузовое объединение» предлагает услуги по перевозке грузов на
                            Газелях из Ростова-на-Дону. Мы осуществляем перевозки как в пределах города, так и на средние и
                            дальние расстояния. </p>
                        <p>В нашем автопарке всегда есть свободные Газели различных модификаций. Этот автомобиль подойдет
                            как для перевозки небольших партий грузов (продуктов питания и напитков), так и для
                            среднегабаритных грузов, к примеру, бытовой техники или мебели.</p>
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
                                                    <div class="name">Мобильность</div>
                                                    <div class="description"><p>Газель является относительно компактным
                                                            транспортным средством, что позволяет ей легко перемещаться по
                                                            улицам и дорогам городов и населенных пунктов.</p>
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
                                                    <div class="name">Экономичность</div>
                                                    <div class="description"><p>Газель потребляет меньше топлива, чем
                                                            грузовые автомобили, что делает ее более экономичным вариантом для
                                                            перевозки небольших грузов на короткие расстояния.</p>
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
                                                    <div class="name">Скорость</div>
                                                    <div class="description"><p>Благодаря высокой маневренности, доставка
                                                            грузов может проходить быстрее, чем с помощью других транспортных
                                                            средств.</p>
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
                                                    <div class="name">Управляемость</div>
                                                    <div class="description"><p>Управлять Газелью проще, чем грузовиками,
                                                            что уменьшает риск аварий и повышает безопасность на дорогах.</p>
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

    <div class="widgetblock-faq_category_5 widgetblock faq">
        <div class="container"><h2 class="wtitle">Часто задаваемые вопросы о перевозке Газелью</h2>
            <div class="widget-text">Если вам нужны качественные услуги по перевозке грузов на Газелях из Ростова-на-Дону,
                обращайтесь в нашу компанию. Мы всегда готовы вам помочь и гарантируем быструю и безопасную доставку вашего
                груза.
            </div>
            <ul class="faqlist">
                <li>
                    <div class="">
                        <div class="question_wrapper">
                            <div class="question">1. Каковы габариты грузов, которые можно перевозить на Газелях?</div>
                            <div class="answer">Габариты грузов могут варьироваться в зависимости от модели Газели, но
                                обычно грузоподъемность составляет до 3 тонн, а длина кузова – до 6,5 метров. Но мы можем
                                обсудить конкретные параметры вашего груза и выбрать наиболее подходящий вариант.
                            </div>

                        </div>
                    </div>
                </li>
                <li>
                    <div class="">
                        <div class="question_wrapper">
                            <div class="question">2. Какова стоимость услуг по перевозке грузов на Газелях?</div>
                            <div class="answer">Стоимость доставки зависит от многих факторов, таких как расстояние, вес
                                груза и другие. Мы готовы обсудить все детали с вами и предложить наилучший вариант для
                                вашего бюджета.
                            </div>

                        </div>
                    </div>
                </li>
                <li>
                    <div class="">
                        <div class="question_wrapper">
                            <div class="question">3. Какие документы необходимы для перевозки груза Газелью?</div>
                            <div class="answer">Для перевозки груза необходимо оформить договор на оказание услуг, а также
                                предоставить документы на груз (накладную, счет-фактуру и т.д.). Мы поможем вам с
                                оформлением всех необходимых документов.
                            </div>

                        </div>
                    </div>
                </li>
                <li>
                    <div class="">
                        <div class="question_wrapper">
                            <div class="question">4. Как обезопасить груза во время перевозки?</div>
                            <div class="answer">Мы работаем только с профессиональными водителями, которые имеют большой
                                опыт работы на Газелях и следят за безопасностью груза во время перевозки. Мы также
                                проконсультируем вас по поводу правильной упаковки груза, что немаловажно, а также можем
                                предложить страхование груза на случай любых непредвиденных обстоятельств.
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
                        <div class="i_c"><img alt="Газель (1,5 тонны)"
                                              src="../cache/goods_photos/400x300x0x6400627bd392c.jpg"></div>
                        <div class="i_content">
                            <div class="p-ttl">Газель (1,5 тонны)</div>
                            <div class="p-ttl-minidesc">
                                <ul>
                                    <li>Длина - 3&nbsp;м</li>
                                    <li>Ширина - 2.&nbsp;м</li>
                                    <li>Высота - 1.5&nbsp;м</li>
                                    <li>Объем - 9&nbsp;м3</li>
                                    <li>Паллето-мест - 4&nbsp;шт</li>
                                </ul>
                            </div>
                        </div>
                        <a href="../module/callback/form/index.html@good=14" class="service_callback" rel="fancybox">Оставить
                            заявку</a>
                    </div>
                </li>
                <li>
                    <div class="good_wrapper">
                        <div class="i_c"><img alt="Газель (1,5 тонны)"
                                              src="../cache/goods_photos/400x300x0x640062a5401d2.jpg"></div>
                        <div class="i_content">
                            <div class="p-ttl">Газель (1,5 тонны)</div>
                            <div class="p-ttl-minidesc">
                                <ul>
                                    <li>Длина - 3&nbsp;м</li>
                                    <li>Ширина - 2 м</li>
                                    <li>Высота - 1.8&nbsp;м</li>
                                    <li>Объем - 14&nbsp;м3</li>
                                    <li>Паллето-мест - 6&nbsp;шт</li>
                                </ul>
                            </div>
                        </div>
                        <a href="../module/callback/form/index.html@good=15" class="service_callback" rel="fancybox">Оставить
                            заявку</a>
                    </div>
                </li>
                <li>
                    <div class="good_wrapper">
                        <div class="i_c"><img alt="Газель (2 тонны)"
                                              src="../cache/goods_photos/400x300x0x640062b290535.jpg"></div>
                        <div class="i_content">
                            <div class="p-ttl">Газель (2 тонны)</div>
                            <div class="p-ttl-minidesc">
                                <ul>
                                    <li>Длина - 6&nbsp;м</li>
                                    <li>Ширина - 2 м</li>
                                    <li>Высота - 1.8&nbsp;м</li>
                                    <li>Объем - 22&nbsp;м3</li>
                                    <li>Паллето-мест - 8&nbsp;шт</li>
                                </ul>
                            </div>
                        </div>
                        <a href="../module/callback/form/index.html@good=16" class="service_callback" rel="fancybox">Оставить
                            заявку</a>
                    </div>
                </li>
            </ul>
        </div>
    </div>

@endsection
