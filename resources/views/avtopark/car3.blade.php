@extends('layouts.main')
@section('title')
    <title>Одиночка</title>
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
                <li>Одиночка</li>
            </ul>
        </div>
    </div>
    <div class="container h1"><h1>Одиночка</h1></div>


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
                                    <li>20-60&nbsp;куб. метров</li>
                                    <li>Длина &ndash; от 4.2-9.7&nbsp;м</li>
                                    <li>Ширина &ndash; 2.45-2.55 м</li>
                                    <li>Высота &ndash; 2.55-2.8&nbsp;м</li>
                                </ul>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-6">
                                <p><strong>Грузоподъемность</strong></p>

                                <ul>
                                    <li>5-15&nbsp;тонн</li>
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
                    <a href="../module/callback/form/index.html@category=4" class="service_callback" rel="facebox">Оставить
                        заявку</a>
                </div>
            </div>
        </div>
        <div class="car_slider_bg">
            <picture>
                <source media="(min-width: 768px)"
                        srcset="https://www.tk-go.ru/upload/goods_category_photos/64005c70a3099.png">
                <img src="../upload/goods_category_photos/64005c762143f.png"></picture>
            <div class="widgetblock-advantages_category_4 widgetblock features advantages">
                <div class="container"><h2 class="wtitle">Преимущества перевозки одиночкой</h2>
                    <div class="widget-text"><p>Перевозка грузов грузовиком-одиночкой является одним из наиболее
                            распространенных способов доставки товаров в России. Одиночкой можно доставлять грузы различного
                            объема и веса, что делает этот вид транспорта идеальным для доставки как мелких товаров, так и
                            тяжелых грузов.
                        <p>
                        <p>В нашем автопарке всегда есть свободные грузовики для транспортировки грузов из Ростова-на-Дону
                            грузоподъемностью от 5 до 15 тонн. Вы можете заказать перевозку нашим грузовиком и убедиться в
                            его преимуществах самостоятельно.</p></div>
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
                                                    <div class="name">Безопасность груза</div>
                                                    <div class="description"><p>Грузовики одиночки оборудованы надежными
                                                            системами безопасности, которые способны защитить&nbsp;груз от
                                                            повреждений.&nbsp;</p>
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
                                                    <div class="name">Маневренность</div>
                                                    <div class="description"><p>Одиночки обладают высокой маневренностью,
                                                            что делает их идеальным выбором для перевозки грузов в городских
                                                            условиях.&nbsp;</p>
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
                                                    <div class="name">Экономичность</div>
                                                    <div class="description"><p>Перевозка грузов грузовиком одиночкой обычно
                                                            является более экономически выгодной по сравнению с другими видами
                                                            перевозок.</p>
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
                                                    <div class="name">Грузоподъемность</div>
                                                    <div class="description"><p>Одиночка может перевезти груз объемом до 15
                                                            тонн, что делает этот транспорт идеальным для доставки как мелких
                                                            товаров, так и тяжелых грузов.</p>
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

    <div class="widgetblock-faq_category_4 widgetblock faq">
        <div class="container"><h2 class="wtitle">Часто задаваемые вопросы о перевозке одиночкой</h2>
            <div class="widget-text">Если вам требуется перевезти груз грузовиком одиночкой из Ростова-на-Дону, обратитесь в
                нашу компанию «Грузовое объединение». Мы окажем вам профессиональную поддержку на каждом этапе
                транспортировки груза.

            </div>
            <ul class="faqlist">
                <li>
                    <div class="">
                        <div class="question_wrapper">
                            <div class="question">1. Как выбрать подходящий грузовик-одиночку для моего груза?</div>
                            <div class="answer">Выбор грузовика зависит от характеристик и объема груза. Наши специалисты
                                помогут подобрать подходящий тип грузовика.
                            </div>

                        </div>
                    </div>
                </li>
                <li>
                    <div class="">
                        <div class="question_wrapper">
                            <div class="question">2. Каковы сроки доставки груза грузовиком?</div>
                            <div class="answer">Сроки доставки зависят от расстояния и дорожных условий. Наша компания
                                гарантирует своевременную доставку вашего груза по месту назначения. Мы заблаговременно
                                прорабатываем логистику, что позволяет нам осуществить транспортировку груза точно в срок.
                            </div>

                        </div>
                    </div>
                </li>
                <li>
                    <div class="">
                        <div class="question_wrapper">
                            <div class="question">3. Как обеспечить безопасность груза во время перевозки?</div>
                            <div class="answer">Оптимальный способ обеспечить безопасность груза - это правильно упаковать
                                его, разместить в кузове грузовика и застраховать. Специалисты нашей компании всегда смогут
                                проконсультировать вас по поводу упаковки и защите груза.
                            </div>

                        </div>
                    </div>
                </li>
                <li>
                    <div class="">
                        <div class="question_wrapper">
                            <div class="question">4. Могу ли я следить за местонахождением моего груза во время перевозки?
                            </div>
                            <div class="answer">Конечно, наши специалисты всегда могут назвать точное местонахождение вашего
                                груза.
                            </div>

                        </div>
                    </div>
                </li>
                <li>
                    <div class="">
                        <div class="question_wrapper">
                            <div class="question">5. Какие документы мне нужны для организации перевозки груза грузовиком?
                            </div>
                            <div class="answer">Для перевозки грузов грузовиком-одиночкой могут потребоваться следующие
                                документы: договор перевозки, счет-фактура, накладная и таможенные документы. Обратитесь в
                                нашу компанию, чтобы узнать, какие документы необходимы в вашем конкретном случае.
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
                        <div class="i_c"><img alt="Одиночка (10 тонн)"
                                              src="../cache/goods_photos/400x300x0x64005d63d4900.jpg"></div>
                        <div class="i_content">
                            <div class="p-ttl">Одиночка (10 тонн)</div>
                            <div class="p-ttl-minidesc">
                                <ul>
                                    <li>Длина - 6.5&nbsp;м</li>
                                    <li>Ширина - 2.45 м</li>
                                    <li>Высота - &nbsp;2.5&nbsp;м</li>
                                    <li>Объем - 40&nbsp;м3</li>
                                    <li>Паллето-мест - 16&nbsp;шт</li>
                                </ul>
                            </div>
                        </div>
                        <a href="../module/callback/form/index.html@good=11" class="service_callback" rel="fancybox">Оставить
                            заявку</a>
                    </div>
                </li>
                <li>
                    <div class="good_wrapper">
                        <div class="i_c"><img alt="Одиночка (10 тонн)"
                                              src="../cache/goods_photos/400x300x0x64005d8eae188.jpg"></div>
                        <div class="i_content">
                            <div class="p-ttl">Одиночка (10 тонн)</div>
                            <div class="p-ttl-minidesc">
                                <ul>
                                    <li>Длина - 7.2&nbsp;м</li>
                                    <li>Ширина - 2.45 м</li>
                                    <li>Высота - &nbsp;2.55 м</li>
                                    <li>Объем - 45&nbsp;м3</li>
                                    <li>Паллето-мест - 18&nbsp;шт</li>
                                </ul>
                            </div>
                        </div>
                        <a href="../module/callback/form/index.html@good=12" class="service_callback" rel="fancybox">Оставить
                            заявку</a>
                    </div>
                </li>
                <li>
                    <div class="good_wrapper">
                        <div class="i_c"><img alt="Одиночка (10 тонн)"
                                              src="../cache/goods_photos/400x300x0x64005d73dfed3.jpg"></div>
                        <div class="i_content">
                            <div class="p-ttl">Одиночка (10 тонн)</div>
                            <div class="p-ttl-minidesc">
                                <ul>
                                    <li>Длина - 8&nbsp;м</li>
                                    <li>Ширина - 2.45 м</li>
                                    <li>Высота - &nbsp;2.55 м</li>
                                    <li>Объем - 50&nbsp;м3</li>
                                    <li>Паллето-мест - 20&nbsp;шт</li>
                                </ul>
                            </div>
                        </div>
                        <a href="../module/callback/form/index.html@good=13" class="service_callback" rel="fancybox">Оставить
                            заявку</a>
                    </div>
                </li>
                <li>
                    <div class="good_wrapper">
                        <div class="i_c"><img alt="Одиночка (3 тонны)"
                                              src="../cache/goods_photos/400x300x0x64005d128e214.jpg"></div>
                        <div class="i_content">
                            <div class="p-ttl">Одиночка (3 тонны)</div>
                            <div class="p-ttl-minidesc">
                                <ul>
                                    <li>Длина - 6&nbsp;м</li>
                                    <li>Ширина - 2.&nbsp;м</li>
                                    <li>Высота - 1.8&nbsp;м</li>
                                    <li>Объем - 22 м3</li>
                                    <li>Паллето-мест - 8&nbsp;шт</li>
                                </ul>
                            </div>
                        </div>
                        <a href="../module/callback/form/index.html@good=6" class="service_callback" rel="fancybox">Оставить
                            заявку</a>
                    </div>
                </li>
                <li>
                    <div class="good_wrapper">
                        <div class="i_c"><img alt="Одиночка (3 тонны)"
                                              src="../cache/goods_photos/400x300x0x64005d3d77863.jpg"></div>
                        <div class="i_content">
                            <div class="p-ttl">Одиночка (3 тонны)</div>
                            <div class="p-ttl-minidesc">
                                <ul>
                                    <li>Длина - 4&nbsp;м</li>
                                    <li>Ширина - 2&nbsp;м</li>
                                    <li>Высота - &nbsp;2 м</li>
                                    <li>Объем - 16&nbsp;м3</li>
                                    <li>Паллето-мест - 6&nbsp;шт</li>
                                </ul>
                            </div>
                        </div>
                        <a href="../module/callback/form/index.html@good=7" class="service_callback" rel="fancybox">Оставить
                            заявку</a>
                    </div>
                </li>
                <li>
                    <div class="good_wrapper">
                        <div class="i_c"><img alt="Одиночка (5 тонн)"
                                              src="../cache/goods_photos/400x300x0x64005d49cc9e9.jpg"></div>
                        <div class="i_content">
                            <div class="p-ttl">Одиночка (5 тонн)</div>
                            <div class="p-ttl-minidesc">
                                <ul>
                                    <li>Длина - 5&nbsp;м</li>
                                    <li>Ширина - 2.45 м</li>
                                    <li>Высота - &nbsp;2.45 м</li>
                                    <li>Объем - 30&nbsp;м3</li>
                                    <li>Паллето-мест - 12&nbsp;шт</li>
                                </ul>
                            </div>
                        </div>
                        <a href="../module/callback/form/index.html@good=8" class="service_callback" rel="fancybox">Оставить
                            заявку</a>
                    </div>
                </li>
                <li>
                    <div class="good_wrapper">
                        <div class="i_c"><img alt="Одиночка (5 тонн)"
                                              src="../cache/goods_photos/400x300x0x64005d57433ec.jpg"></div>
                        <div class="i_content">
                            <div class="p-ttl">Одиночка (5 тонн)</div>
                            <div class="p-ttl-minidesc">
                                <ul>
                                    <li>Длина - 6&nbsp;м</li>
                                    <li>Ширина - 2.45 м</li>
                                    <li>Высота - &nbsp;2.45 м</li>
                                    <li>Объем - 36&nbsp;м3</li>
                                    <li>Паллето-мест - 14&nbsp;шт</li>
                                </ul>
                            </div>
                        </div>
                        <a href="../module/callback/form/index.html@good=9" class="service_callback" rel="fancybox">Оставить
                            заявку</a>
                    </div>
                </li>
                <li>
                    <div class="good_wrapper">
                        <div class="i_c"><img alt="Одиночка (7 тонн)"
                                              src="../cache/goods_photos/400x300x0x64005da109dbb.jpg"></div>
                        <div class="i_content">
                            <div class="p-ttl">Одиночка (7 тонн)</div>
                            <div class="p-ttl-minidesc">
                                <ul>
                                    <li>Длина - 6.5&nbsp;м</li>
                                    <li>Ширина - 2.45 м</li>
                                    <li>Высота - &nbsp;2.45 м</li>
                                    <li>Объем - 40&nbsp;м3</li>
                                    <li>Паллето-мест - 16&nbsp;шт</li>
                                </ul>
                            </div>
                        </div>
                        <a href="../module/callback/form/index.html@good=10" class="service_callback" rel="fancybox">Оставить
                            заявку</a>
                    </div>
                </li>
            </ul>
        </div>
    </div>

@endsection
