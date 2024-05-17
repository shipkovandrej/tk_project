@extends('layouts.main')
@section('title')
    <title>Перевозка опасных грузов</title>
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
                <li>Перевозка опасных грузов</li>
            </ul>
        </div>
    </div>
    <div class="container h1"><h1>Перевозка опасных грузов</h1></div>


    <div class="container-big">
        <div class="service_slider">

                <img src="upload/service_category_photos/63f8bc485abc1.jpg">
            <div class="container">
                <div class="whiteplate">
                    <div class="text">
                        <div class="icon"><img src="../upload/service_category_photos/63f8b7983ef3c.png"></div>
                        <div class="text"><p><strong>Компания &laquo;Грузовое объединение&raquo;</strong>&nbsp;более 13
                                лет
                                специализируется на перевозке опасных грузов. Наш автопарк оснащен специализированными
                                транспортными средствами, которые соответствуют всем необходимым стандартам и
                                требованиям. Наши
                                водители и менеджеры регулярно проходят курсы повышение квалификации по программе ДОПОГ.
                            </p>

                            <p>Мы предлагаем нашим клиентам индивидуальный подход и готовы предоставить консультации по
                                всем
                                вопросам, связанным с перевозкой опасных грузов.</p>

                            <p>С нами Вы можете быть уверены в том, что Ваш груз будет доставлен в целости и
                                сохранности!</p>
                        </div>
                    </div>
                    <div class="price_call">
                        <div class="price">от 50 руб./км.</div>
                        <a href="../module/callback/form/index.html@service=1" class="service_callback" rel="facebox">Оставить
                            заявку</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="widgetblock-features_cargo_danger widgetblock features">
        <div class="container"><h2 class="wtitle">Особенности перевозки опасных грузов</h2>
            <div class="widget-text"><p>К опасным грузам относят химические вещества, газы, взрывчатые вещества,
                    радиоактивные материалы, жидкости и твердые вещества, которые могут причинить ущерб жизни, здоровью
                    людей,
                    окружающей среде или имуществу при их перевозке. </p>

                <p> Дли перевозки таких грузов нужны специализированные транспортные средства, которые соответствуют
                    требованиям международных стандартов, таких как ADR, IMDG и IATA. Наши машины оснащены необходимыми
                    системами защиты от возможных аварий, а также контролем температуры и влажности для сохранности
                    груза.</p></div>
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
                                            <div class="description"><p>Огромный опыт позволяет нам обеспечить
                                                    безопасную
                                                    перевозку опасных грузов</p>
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
                                            <div class="name">Работаем по правилам</div>
                                            <div class="description"><p>Мы следуем всем необходимым&nbsp;правилам и
                                                    нормам
                                                    для перевозки опасных грузов</p>
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
                                            <div class="name">Ответственный подход</div>
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
                                            <div class="name">Доставка в срок</div>
                                            <div class="description"><p>Гарантируем быструю и эффективную доставку
                                                    опасных
                                                    грузов по месту назначения</p>
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
    <div class="widgetblock-faq_cargo_danger widgetblock faq">
        <div class="container"><h2 class="wtitle">Часто задаваемые вопросы о перевозке опасных грузов</h2>
            <div class="widget-text">Если вам требуется заказать перевозку опасных грузов из Ростова-на-Дону, обратитесь
                в
                компанию «Грузовое объединение». Мы оказываем клиентам полный спектр услуг, связанных с перевозкой
                опасных
                грузов, включая подготовку необходимых документов и сертификатов, упаковку и маркировку груза. Мы также
                предоставляем консультационную поддержку и помощь в выборе оптимального варианта перевозки.
            </div>
            <ul class="faqlist">
                <li>
                    <div class="">
                        <div class="question_wrapper">
                            <div class="question">1. Какие виды грузов относятся к опасным?</div>
                            <div class="answer">К опасным грузам относят химические вещества, газы, взрывчатые вещества,
                                радиоактивные материалы, жидкости и твердые вещества, которые могут причинить ущерб
                                жизни,
                                здоровью людей, окружающей среде или имуществу при их перевозке. В зависимости от своих
                                свойств и характеристик, опасные грузы классифицируются на 9 основных классов.
                            </div>

                        </div>
                    </div>
                </li>
                <li>
                    <div class="">
                        <div class="question_wrapper">
                            <div class="question">2. Какие документы нужны для перевозки опасных грузов?</div>
                            <div class="answer">Для перевозки опасных грузов необходимо наличие ряда документов, таких
                                как:
                                декларация опасного груза, сертификат соответствия, паспорт безопасности, план действий
                                в
                                случае аварийной ситуации и др.
                            </div>

                        </div>
                    </div>
                </li>
                <li>
                    <div class="">
                        <div class="question_wrapper">
                            <div class="question">3. Каковы требования к упаковке опасных грузов?</div>
                            <div class="answer">Упаковка опасных грузов должна соответствовать строгим международным
                                стандартам. Она должна обеспечивать максимальную защиту груза от возможных повреждений и
                                утечек, а также быть отмечена соответствующими знаками опасности.
                            </div>

                        </div>
                    </div>
                </li>
                <li>
                    <div class="">
                        <div class="question_wrapper">
                            <div class="question">4. Какие меры безопасности необходимо предпринимать при перевозке
                                опасных
                                грузов?
                            </div>
                            <div class="answer">Перевозка опасных грузов – это ответственное мероприятие, требующее
                                строгого
                                соблюдения правил и мер безопасности. В том числе, необходимо следить за температурными
                                режимами, обеспечивать соответствующую вентиляцию, обеспечить герметичность упаковки и
                                т.д.
                            </div>

                        </div>
                    </div>
                </li>
                <li>
                    <div class="">
                        <div class="question_wrapper">
                            <div class="question">5. Какие последствия могут быть в случае нарушения правил перевозки
                                опасных грузов?
                            </div>
                            <div class="answer">Нарушение правил перевозки может привести к серьезным последствиям,
                                таким
                                как аварии, загрязнение окружающей среды, ущерб здоровью людей и т.д. Кроме того,
                                нарушение
                                правил перевозки может привести к штрафам и другим юридическим последствиям, включая
                                возможную уголовную ответственность.
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
    <div class="widgetblock-whatelse widgetblock services">
        <div class="container"><h2 class="wtitle">Какие грузы мы еще превозим</h2>
            <div class="widget-text">Перевозка грузов в другие города России – сложные транспортные мероприятия,
                требующие
                мастерства и профессионализма на каждом этапе их проведения. Доверяя организацию услуг по
                транспортировке
                грузов Грузовое объединение, вы экономите свое время, деньги и нервы и получаете гарантию
                положительного.
            </div>
            <ul class="servicelist">
                <li>
                    <div class="service_item"
                         onclick="location.href='https://www.tk-go.ru/perevozka-skoroportyaschihsya-gruzov/'">
                        <div class="img"><a class="goto" title="Перевозка скоропортящихся грузов"
                                            href="{{ route('cargo2') }}"><img
                                    src="cache/service_category_photos/500x300x0x63fc97e18d3bb.jpg"
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
                                    src="cache/service_category_photos/500x300x0x63fc9a7fe0d13.jpg"
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
                    <div class="service_item"
                         onclick="location.href='https://www.tk-go.ru/perevozka-krupnogabaritnyh-gruzov/'">
                        <div class="img"><a class="goto" title="Перевозка крупногабаритных грузов"
                                            href="{{ route('cargo4') }}"><img
                                    src="cache/service_category_photos/500x300x0x63fc9bbaefdd6.jpg"
                                    alt="Перевозка крупногабаритных грузов"></a></div>
                        <span class="counter"></span>
                        <div class="title"><img src="../upload/service_category_photos/63fc9d52bbf52.png"> <span>Перевозка крупногабаритных грузов</span>
                        </div>
                        <div class="desc">Компания «Грузовое объединение» имеет многолетний опыт в сфере автоперевозок
                            крупногабаритных грузов...
                        </div>
                    </div>
                </li>
                <li>
                    <div class="service_item" onclick="location.href='https://www.tk-go.ru/perevozka-sbornyh-gruzov/'">
                        <div class="img"><a class="goto" title="Перевозка сборных грузов "
                                            href="{{ route('cargo5') }}"><img
                                    src="cache/service_category_photos/500x300x0x63fc9fd4117f2.jpg"
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
