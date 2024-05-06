@extends('layouts.main')
@section('title')
    <title>Автопоезд</title>
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
                <li>Автопоезд</li>
            </ul>
        </div>
    </div>
    <div class="container h1"><h1>Автопоезд</h1></div>


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
                                    <li>120 куб. метров</li>
                                    <li>Длина фургона&nbsp;&ndash; 7-9&nbsp;м</li>
                                    <li>Прицеп&nbsp;&ndash; от 7-9 м</li>
                                    <li>Высота &ndash; до 3 м</li>
                                </ul>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-6">
                                <p><strong>Грузоподъемность</strong></p>

                                <ul>
                                    <li>15-20&nbsp;тонн</li>
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
                    <a href="../module/callback/form/index.html@category=3" class="service_callback" rel="facebox">Оставить
                        заявку</a>
                </div>
            </div>
        </div>
        <div class="car_slider_bg">
            <picture>
                <source media="(min-width: 768px)"
                        srcset="https://www.tk-go.ru/upload/goods_category_photos/640055748081f.png">
                <img src="../index.html"></picture>
            <div class="widgetblock-advantages_category_3 widgetblock features advantages">
                <div class="container"><h2 class="wtitle">Преимущества перевозки автопоездом</h2>
                    <div class="widget-text"><p>Перевозка грузов автопоездом очень востребована на территории России.
                            Автопоезд - это грузовой автомобиль, состоящий из грузовика и прицепа, что позволяет увеличить
                            грузоподъемность и объем перевозимого груза. Автопоезд подходит как для перевозки небольших грузов,
                            так и для крупногабаритных.</p>
                        <p>Компания «Грузовое объединение» предлагает перевозку грузов современными автопоездами различной
                            грузоподъемности - от 15 до 20 тонн. Мы занимаемся организацией перевозок внутри страны и
                            ближнем зарубежье.</p>

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
                                                    <div class="name">Удобство погрузки/выгрузки</div>
                                                    <div class="description"><p>Кузов грузовика и прицепа&nbsp;обычно имеют
                                                            большие задние двери, которые упрощают и сокращают время&nbsp;погрузочно-разгрузочных&nbsp;работ.</p>
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
                                                    <div class="description"><p>Автопоезд обладает хорошей маневренностью,
                                                            что позволяет легко маневрировать на дорогах и перевозить грузы в
                                                            труднодоступные места.</p>
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
                                                    <div class="name">Объем груза</div>
                                                    <div class="description"><p>Автопоезд может&nbsp;перевозить крупные
                                                            объемы грузов, что делает его идеальным выбором для перевозки
                                                            различных товаров, в том числе крупногабаритных.</p>
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
                                                    <div class="name">Экономичность</div>
                                                    <div class="description"><p>Высокая&nbsp;грузоподъемность, что позволяет
                                                            автопоезду&nbsp;перевозить большие объемы грузов за раз, что&nbsp;сокращает&nbsp;число
                                                            поездок и снижает расходы на топливо.</p>
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

    <div class="widgetblock-faq_category_3 widgetblock faq">
        <div class="container"><h2 class="wtitle">Часто задаваемые вопросы о перевозке автопоездом</h2>
            <div class="widget-text"><p>Если вы хотите заказать перевозку грузов автопоездом из Ростова-на-Дону, наши
                    специалисты предоставляют полный спектр услуг по организации и проведению перевозки, в том числе оформление
                    необходимых документов и контроль перевозки на всех этапах.</p>
                <p>Наша компания обладает современным парком техники, оснащенной всем необходимым оборудованием для
                    перевозки грузов различных видов. Все наши автопоезда в хорошем состоянии и регулярно проходят
                    техническое обслуживание.</p>
            </div>
            <ul class="faqlist">
                <li>
                    <div class="">
                        <div class="question_wrapper">
                            <div class="question">1. Какие типы грузов могут быть перевезены автопоездом/сцепкой?</div>
                            <div class="answer">Автопоезда могут использоваться для перевозки различных типов грузов, а
                                именно: строительное оборудование; бытовые и промышленные товары, такие как электроника,
                                одежда, мебель и продукты питания; опасные грузы.
                            </div>

                        </div>
                    </div>
                </li>
                <li>
                    <div class="">
                        <div class="question_wrapper">
                            <div class="question">2. Каковы ограничения веса и размера груза для перевозки
                                автопоездом/сцепкой?
                            </div>
                            <div class="answer">Максимальный вес груженного автопоезда не должен превышать 44 тонн. Размеры
                                груза могут быть также ограничены шириной, высотой и длиной.
                            </div>

                        </div>
                    </div>
                </li>
                <li>
                    <div class="">
                        <div class="question_wrapper">
                            <div class="question">3. Каковы расходы на перевозку грузов автопоездом/сцепкой?</div>
                            <div class="answer">Обычно стоимость перевозки груза автопоездом рассчитывается на основе
                                множества факторов, включая расстояние, вес, размер, тип груза и уровень сервиса, который
                                требуется от перевозчика. Чтобы получить более точную цену, рекомендуем связаться с нашими
                                менеджерами. Стоит отметить, перевозка грузов автопоездом обычно считается одной из самых
                                доступных.
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
                        <div class="i_c"><img alt="Автопоезд" src="../cache/goods_photos/400x300x0x640056346dceb.jpg"></div>
                        <div class="i_content">
                            <div class="p-ttl">Автопоезд</div>
                            <div class="p-ttl-minidesc">
                                <ul>
                                    <li>Длина - 8&nbsp;м</li>
                                    <li>Ширина - 2.45 м</li>
                                    <li>Высота - 3&nbsp;м</li>
                                    <li>Длина прицепа - 8 м</li>
                                    <li>Ширина прицепа - 2.45 м</li>
                                    <li>Высота прицепа - 3 м</li>
                                    <li>Объем -&nbsp;120 м3</li>
                                    <li>Паллето-мест - 38&nbsp;шт</li>
                                </ul>
                            </div>
                        </div>
                        <a href="../module/callback/form/index.html@good=5" class="service_callback" rel="fancybox">Оставить
                            заявку</a>
                    </div>
                </li>
            </ul>
        </div>
    </div>

@endsection
