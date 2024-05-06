@extends('layouts.main')
@section('title')
    <title>Трал</title>
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
                <li>Трал</li>
            </ul>
        </div>
    </div>
    <div class="container h1"><h1>Трал</h1></div>


    <div class="car_slider">
        <div class="container">
            <div class="whiteplate  whiteplatecar">
                <div class="text">
                    <div class="text">
                        <div class="row">
                            <div class="col-md-6">
                                <p><strong>Тип&nbsp;кузова</strong></p>

                                <ul>
                                    <li>Низкорамная площадка</li>
                                </ul>
                            </div>

                            <div class="col-md-6">
                                <p><strong>Объем</strong></p>

                                <ul>
                                    <li>Длина &ndash; от 9 до 42 метров (есть раздвижные тралы)</li>
                                    <li>Ширина &ndash; от 2.5 м</li>
                                    <li>Высота &ndash; от 3 м</li>
                                </ul>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-6">
                                <p><strong>Грузоподъемность</strong></p>

                                <ul>
                                    <li>20-60&nbsp;тонн</li>
                                    <li>20 тонн - стандарт</li>
                                    <li>24 тонны - исключения</li>
                                    <li>Более 24 тонн - негабарит</li>
                                </ul>
                            </div>

                            <div class="col-md-6">
                                <p><strong>Способ загрузки</strong></p>

                                <ul>
                                    <li>Задняя</li>
                                    <li>Боковая</li>
                                    <li>Верхняя</li>
                                    <li>Аппарели</li>
                                </ul>
                            </div>
                        </div>

                        <hr/>
                        <p><span style="font-size:10px;"><em>Стоимость доставки зависит от ряда факторов и рассчитывается индивидуально для каждого клиента</em></span>
                        </p>
                    </div>
                </div>
                <div class="price_call">
                    <div class="price">от 50 руб/км</div>
                    <a href="../module/callback/form/index.html@category=6" class="service_callback" rel="facebox">Оставить
                        заявку</a>
                </div>
            </div>
        </div>
        <div class="car_slider_bg">
            <picture>
                <source media="(min-width: 768px)"
                        srcset="https://www.tk-go.ru/upload/goods_category_photos/64006ae93b9b2.png">
                <img src="../index.html"></picture>
            <div class="widgetblock-advantages_category_6 widgetblock features advantages">
                <div class="container"><h2 class="wtitle">Преимущества перевозки тралом</h2>
                    <div class="widget-text"><p>Трал - это вид транспорта, который позволяет перевозить грузы любой
                            формы и
                            размера. Благодаря большой грузоподъемности и габаритам, трал может быть использован для
                            перевозки
                            самых крупногабаритных грузов, к примеру, металлоконструкции, строительную и
                            сельскохозяйственную
                            технику, контейнеры, легковой и коммерческий транспорт и т.д..</p></div>
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
                                                    <div class="name">Объемные грузы</div>
                                                    <div class="description"><p>Тралы могут использоваться&nbsp;для
                                                            перевозки&nbsp;тяжелых и крупногабаритных грузов, которые не
                                                            могут
                                                            быть перевезены другим&nbsp;транспортом.</p>
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
                                                    <div class="description"><p>Тралы оборудованы специальными
                                                            механизмами
                                                            для фиксации грузов, что обеспечивает безопасную и надежную
                                                            перевозку.</p>
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
                                                    <div class="name">Экономия времени и средств</div>
                                                    <div class="description"><p>При перевозке крупногабаритных грузов на
                                                            большие расстояния&nbsp;тралы&nbsp;могут&nbsp;значительно
                                                            сократить
                                                            количество поездок, которые необходимы для доставки
                                                            груза.</p>
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
                                                    <div class="name">Удобство</div>
                                                    <div class="description"><p>Грузы на тралах могут быть перевезены
                                                            без
                                                            необходимости разбирать или демонтировать их. Это удобно для
                                                            транспортировки крупногабаритных объектов,&nbsp;</p>
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

    <div class="widgetblock-faq_category_6 widgetblock faq">
        <div class="container"><h2 class="wtitle">Часто задаваемые вопросы о перевозке тралом</h2>
            <div class="widget-text">Наша компания предоставляет услуги по перевозке грузов тралом из Ростова-на-Дону.
                Мы
                работаем с крупными компаниями и частными лицами, предоставляем нашим клиентам полный комплекс услуг,
                связанных с перевозкой грузов тралом, включая консультации по вопросам выбора наиболее подходящего типа
                транспорта и маршрута, организацию страхования грузов и многое другое.
            </div>
            <ul class="faqlist">
                <li>
                    <div class="">
                        <div class="question_wrapper">
                            <div class="question">1. Какие грузы могут быть перевезены тралом?</div>
                            <div class="answer">Трал используют для перевозки самых разнообразных грузов, включая
                                металлоконструкции, строительное оборудование, технику, контейнеры и грузы с
                                нестандартными
                                размерами и формами.
                            </div>

                        </div>
                    </div>
                </li>
                <li>
                    <div class="">
                        <div class="question_wrapper">
                            <div class="question">2. Какие виды тралов используются для перевозки грузов?</div>
                            <div class="answer">В зависимости от характеристик груза, могут быть использованы разные
                                виды
                                тралов, включая низкорамные, высокорамные, расширяемые, модульные и др.
                            </div>

                        </div>
                    </div>
                </li>
                <li>
                    <div class="">
                        <div class="question_wrapper">
                            <div class="question">3. Как рассчитывается стоимость перевозки грузов тралом?</div>
                            <div class="answer">Стоимость перевозки грузов тралом зависит от характеристики груза,
                                расстояния перевозки, выбранного типа трала и других параметров. Наша компания
                                предлагает
                                гибкие условия оплаты и индивидуальный подход к каждому клиенту.
                            </div>

                        </div>
                    </div>
                </li>
                <li>
                    <div class="">
                        <div class="question_wrapper">
                            <div class="question">4. Какие документы нужны для перевозки грузов тралом?</div>
                            <div class="answer">Потребуется технический паспорта на груз и транспортное средство,
                                договор на
                                перевозку, страховой полис и др. Мы проконсультируем вас по всем вопросам, связанным с
                                документами.
                            </div>

                        </div>
                    </div>
                </li>
                <li>
                    <div class="">
                        <div class="question_wrapper">
                            <div class="question">5. Как обеспечивается безопасность перевозки грузов тралом?</div>
                            <div class="answer">Мы осуществляем тщательный отбор водителей, обеспечиваем перевозку
                                грузов с
                                соблюдением всех правил и нормативов, а также используем современное оборудование и
                                технику.
                                Все это позволяет нам гарантировать безопасность перевозки грузов тралом.
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
                        <div class="i_c"><img alt="Трал (50 тонн)"
                                              src="../cache/goods_photos/400x300x0x64006b7a85807.jpg">
                        </div>
                        <div class="i_content">
                            <div class="p-ttl">Трал (50 тонн)</div>
                            <div class="p-ttl-minidesc">
                                <ul>
                                    <li>Длина - 11&nbsp;м</li>
                                    <li>Ширина - 3.1&nbsp;м</li>
                                    <li>Высота - 3.5 м</li>
                                </ul>
                            </div>
                        </div>
                        <a href="../module/callback/form/index.html@good=17" class="service_callback" rel="fancybox">Оставить
                            заявку</a>
                    </div>
                </li>
                <li>
                    <div class="good_wrapper">
                        <div class="i_c"><img alt="Трал (60 тонн)"
                                              src="../cache/goods_photos/400x300x0x64006b8c441c0.jpg">
                        </div>
                        <div class="i_content">
                            <div class="p-ttl">Трал (60 тонн)</div>
                            <div class="p-ttl-minidesc">
                                <ul>
                                    <li>Длина - 16&nbsp;м</li>
                                    <li>Ширина - 3.1&nbsp;м</li>
                                    <li>Высота - 3.5 м</li>
                                </ul>
                            </div>
                        </div>
                        <a href="../module/callback/form/index.html@good=18" class="service_callback" rel="fancybox">Оставить
                            заявку</a>
                    </div>
                </li>
            </ul>
        </div>
    </div>

@endsection
