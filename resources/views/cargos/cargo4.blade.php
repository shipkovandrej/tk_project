@extends('layouts.main')
@section('title')
    <title>Перевозка крупногабаритных грузов</title>
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
                    <a href="{{ route('cargos') }}" title="Что мы перевозим">
                        <span>Что мы перевозим</span>
                    </a> /
                </li>
                <li>Перевозка крупногабаритных грузов</li>
            </ul>
        </div>
    </div>
    <div class="container h1"><h1>Перевозка крупногабаритных грузов</h1></div>


    <div class="container-big">
        <div class="service_slider">
            <picture>
                <source media="(min-width: 768px)"
                        srcset="https://www.tk-go.ru/upload/service_category_photos/63ff3ece7580f.jpg">
                <img src="../index.html"></picture>
            <div class="container">
                <div class="whiteplate">
                    <div class="text">
                        <div class="icon"><img src="../upload/service_category_photos/63fc9d52bbf52.png"></div>
                        <div class="text"><p><strong>Компания&nbsp;&laquo;Грузовое объединение&raquo;</strong>&nbsp;имеет
                                многолетний опыт в сфере автоперевозок крупногабаритных грузов. Наш автопарк оснащен&nbsp;современной
                                техникой, которая позволяет перевозить грузы любой сложности и объема.</p>

                            <p>Наша команда состоит из профессиональных водителей и опытных логистов, которые готовы
                                предложить вам индивидуальный подход к перевозке ваших грузов.</p>

                            <p>Мы предоставим&nbsp;вам комплексное решение, которое включает в себя все этапы перевозки: от
                                планирования и организации до доставки груза на конечный пункт назначения.&nbsp;Мы строго
                                соблюдаем все правила и нормативы и осуществляем контроль качества на каждом этапе
                                перевозки.</p>
                        </div>
                    </div>
                    <div class="price_call">
                        <div class="price">от 50 руб./км.</div>
                        <a href="../module/callback/form/index.html@service=5" class="service_callback" rel="facebox">Оставить
                            заявку</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="widgetblock-features_cargo_ oversized widgetblock features">
        <div class="container"><h2 class="wtitle">Особенности перевозки крупногабаритных грузов</h2>
            <div class="widget-text"><p>Услуга по перевозке крупногабаритных грузов может потребоваться, когда нужно
                    доставить крупный объект, к примеру, на стройку или производство. Это могут быть станки, строительные
                    конструкции, оборудование, грузы негабаритных размеров и др. </p>
                <p>Наша компания имеет большой опыт в перевозке крупных грузов по всей России. Мы используем специальные
                    транспортные средства и опытных водителей и обеспечиваем максимальную безопасность и надежность
                    перевозки.</p>
                <p>Каждый груз требует индивидуального подхода и наша команда готова разработать наиболее оптимальный
                    маршрут и выбрать необходимое оборудование для его перевозки. Мы также заботимся о всех необходимых
                    разрешениях и документах для перевозки крупногабаритных грузов, в том числе о перегрузке, установке и
                    разгрузке груза.</p>
            </div>
            <div class="horscroll">
                <div class="scrol-params" data-thumb="" data-auto="" data-count="4" data-pagination="" data-dots=""></div>
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
                                            <div class="name">БЕЗОПАСНОСТЬ ГРУЗА</div>
                                            <div class="description"><p>Огромный опыт позволяет нам обеспечить безопасную
                                                    перевозку крупногабаритных&nbsp;грузов</p>
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
                                            <div class="name">РАБОТАЕМ ПО ПРАВИЛАМ</div>
                                            <div class="description"><p>Мы следуем всем необходимым правилам&nbsp;и нормам
                                                    при&nbsp;перевозке&nbsp;крупногабаритных грузов</p>
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
                                            <div class="name">ОТВЕТСТВЕННЫЙ ПОДХОД</div>
                                            <div class="description"><p>Мы берем на себя ответственность за каждый этап
                                                    перевозки груза перед отправителем</p>
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
                                            <div class="name">ДОСТАВКА В СРОК</div>
                                            <div class="description"><p>Гарантируем быструю и надежную&nbsp;доставку
                                                    крупногабаритных грузов к&nbsp;месту назначения</p>
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
    <div class="widgetblock-faq_cargo_ oversized widgetblock faq">
        <div class="container"><h2 class="wtitle">Часто задаваемые вопросы о перевозке крупногабаритных грузов</h2>
            <div class="widget-text"><p>Мы гарантируем высокое качество услуг, своевременность и безопасность перевозки, а
                    также индивидуальный подход к каждому клиенту.</p>
                <p>Если вам нужна перевозка крупногабаритного груза из Ростова-на-Дону, обратитесь в логистическую компанию
                    «Грузовое объединение», и мы сделаем все возможное, чтобы ваш груз был доставлен вовремя и
                    безопасно.</p>
            </div>
            <ul class="faqlist">
                <li>
                    <div class="">
                        <div class="question_wrapper">
                            <div class="question">1. Какие грузы относятся к категории крупногабаритных?</div>
                            <div class="answer">К категории крупногабаритных грузов относятся грузы, размеры которых
                                превышают нормативы для стандартных контейнеров и транспортных средств, например, тяжелое
                                оборудование, машины, строительные конструкции и т.д.
                            </div>

                        </div>
                    </div>
                </li>
                <li>
                    <div class="">
                        <div class="question_wrapper">
                            <div class="question">2. На каком транспорте перевозят крупногабаритные грузы?</div>
                            <div class="answer">Нужно выбирать специальные транспортные средства, оборудованные для
                                перевозки таких типов грузов. Компания «Грузовое объединение» предоставляет необходимую
                                спецтехнику и оборудование для перевозки любых крупногабаритных грузов.
                            </div>

                        </div>
                    </div>
                </li>
                <li>
                    <div class="">
                        <div class="question_wrapper">
                            <div class="question">3. Какие документы нужно оформить для перевозки крупногабаритных грузов?
                            </div>
                            <div class="answer">Для перевозки крупногабаритных грузов необходимы специальные документы и
                                разрешения, которые мы оформляем для наших клиентов. Наши специалисты знают все нюансы
                                оформления документов для перевозки крупногабаритных грузов и готовы оказать помощь в этом
                                вопросе.
                            </div>

                        </div>
                    </div>
                </li>
                <li>
                    <div class="">
                        <div class="question_wrapper">
                            <div class="question">4. Каковы основные риски при перевозке крупногабаритных грузов?</div>
                            <div class="answer">Основные риски при перевозке крупногабаритных грузов связаны с неправильным
                                выбором транспортного средства, оборудования или маршрута, а также с несоблюдением правил
                                безопасности. Мы имеем многолетний опыт работы в этой области и готовы предложить свои
                                услуги по безопасной и надежной перевозке крупногабаритных грузов.
                            </div>

                        </div>
                    </div>
                </li>
                <li>
                    <div class="">
                        <div class="question_wrapper">
                            <div class="question">5. Какие услуги предоставляет ваша компания при перевозке крупногабаритных
                                грузов?
                            </div>
                            <div class="answer">Компания «Грузовое объединение» предоставляет полный спектр услуг по
                                перевозке крупногабаритных грузов: выбор оптимального транспортного средства, разработку
                                маршрута, оформление всех необходимых документов и др.
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
    <div class="widgetblock-whatelse widgetblock services">
        <div class="container"><h2 class="wtitle">Какие грузы мы еще превозим</h2>
            <div class="widget-text">Перевозка грузов в другие города России – сложные транспортные мероприятия, требующие
                мастерства и профессионализма на каждом этапе их проведения. Доверяя организацию услуг по транспортировке
                грузов Грузовое объединение, вы экономите свое время, деньги и нервы и получаете гарантию положительного.
            </div>
            <ul class="servicelist">
                <li>
                    <div class="service_item" onclick="location.href='https://www.tk-go.ru/perevozka-opasnyh-gruzov/'">
                        <div class="img"><a class="goto" title="Перевозка опасных грузов"
                                            href="{{ route('cargo1') }}"><img
                                    src="../cache/service_category_photos/500x300x1x63f8bd87002f3.jpg"
                                    alt="Перевозка опасных грузов"></a></div>
                        <span class="counter"></span>
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
                                            href="{{ route('cargo2') }}"><img
                                    src="../cache/service_category_photos/500x300x1x63fc97e18d3bb.jpg"
                                    alt="Перевозка скоропортящихся грузов"></a></div>
                        <span class="counter"></span>
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
                                            href="{{ route('cargo3') }}"><img
                                    src="../cache/service_category_photos/500x300x1x63fc9a7fe0d13.jpg"
                                    alt="Перевозка фармацевтических товаров"></a></div>
                        <span class="counter"></span>
                        <div class="title"><img src="../upload/service_category_photos/63fc9ae587ac6.png"> <span>Перевозка фармацевтических товаров</span>
                        </div>
                        <div class="desc">Компания «Грузовое объединение» специализируется на перевозке фармацевтических
                            товаров...
                        </div>
                    </div>
                </li>
                <li>
                    <div class="service_item" onclick="location.href='https://www.tk-go.ru/perevozka-sbornyh-gruzov/'">
                        <div class="img"><a class="goto" title="Перевозка сборных грузов "
                                            href="{{ route('cargo5') }}"><img
                                    src="../cache/service_category_photos/500x300x1x63fc9fd4117f2.jpg"
                                    alt="Перевозка сборных грузов "></a></div>
                        <span class="counter"></span>
                        <div class="title"><img src="../upload/service_category_photos/63fc9fdc513e9.png"> <span>Перевозка сборных грузов </span>
                        </div>
                        <div class="desc">Компания «Грузовое объединение» предлагает широкий спектр услуг по организации
                            перевозок сборных любых...
                        </div>
                    </div>
                </li>
            </ul>
            <div class="text_after"></div>
        </div>
    </div>

@endsection