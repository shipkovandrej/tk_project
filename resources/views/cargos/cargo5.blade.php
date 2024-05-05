@extends('layouts.main')
@section('title')
    <title>Перевозка сборных грузов </title>
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
                <li>Перевозка сборных грузов</li>
            </ul>
        </div>
    </div>
    <div class="container h1"><h1>Перевозка сборных грузов </h1></div>


    <div class="container-big">
        <div class="service_slider">
            <picture>
                <source media="(min-width: 768px)"
                        srcset="https://www.tk-go.ru/upload/service_category_photos/63ff3fdf9472a.jpg">
                <img src="../index.html"></picture>
            <div class="container">
                <div class="whiteplate">
                    <div class="text">
                        <div class="icon"><img src="../upload/service_category_photos/63fc9fdc513e9.png"></div>
                        <div class="text"><p><strong>Компания &laquo;Грузовое объединение&raquo;</strong> предлагает
                                широкий
                                спектр услуг по организации перевозок сборных грузов любых&nbsp;размеров и объемов:&nbsp;организацию
                                перевозки, упаковку, погрузку и выгрузку груза, а также страхование груза.</p>

                            <p>Наш автопарк&nbsp;оснащен современными грузовыми автомобилями различной вместимости, в
                                штате
                                трудятся опытные водители, это&nbsp;позволяет нам осуществлять перевозку грузов любой
                                сложности.</p>

                            <p>Мы обеспечим надежность и безопасность вашего груза на каждом этапе перевозки.
                                Гарантируем
                                быструю и надежную доставку любую точку страны!</p>
                        </div>
                    </div>
                    <div class="price_call">
                        <div class="price">от 50 руб./км.</div>
                        <a href="../module/callback/form/index.html@service=6" class="service_callback" rel="facebox">Оставить
                            заявку</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="widgetblock-features_cargo_ groupage widgetblock features">
        <div class="container"><h2 class="wtitle">Особенности перевозки сборных грузов</h2>
            <div class="widget-text"><p>Перевозка сборных грузов – это процесс доставки небольших грузов, которые
                    объединяются в одну отправку для транспортировки в одно место. Этот метод является наиболее
                    экономным и
                    эффективным для тех, кто желает доставить небольшое количество товаров без лишних затрат. </p>

                <p>При перевозке сборного груза важно правильно подобрать транспортное средство для его транспортировки
                    и
                    грамотно разместить грузы в кузове. Они должны быть уложены таким образом, чтобы не смещаться во
                    время
                    транспортировки и не наносить ущерба другим грузам.</p>
                <p>Необходимо организовать правильную погрузку и разгрузку грузов в соответствии с их количеством и
                    характеристиками. Важно использовать специальное оборудование и технику для погрузки и разгрузки
                    сборных
                    грузов, чтобы сократить время выполнения работ и снизить риски повреждения товаров.</p>
                <p>Кроме того необходимо заранее спланировать маршрут с учетом расстояния, дорожных условий и оформить
                    все
                    документы, включая декларации, таможенные документы и т.д</p>
                <p>Наши специалисты помогут выбрать клиентам наиболее удобный и доступный вариант доставки, определить
                    наилучший маршрут для доставки сборного груза, с учетом всех факторов, включая стоимость, время
                    доставки
                    и т.д.</p>
                <p>Мы также поможем вам в оформлении документов и обеспечим надежную защиту сборного груза во время
                    перевозки. Поскольку наша компания использует только надежные транспортные средства, чтобы клиенты
                    могли
                    быть уверены в сохранности своих товаров в процессе перевозки.</p></div>
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
                                            <div class="name">1. БЕЗОПАСНОСТЬ ГРУЗА</div>
                                            <div class="description"><p>Огромный опыт позволяет нам обеспечить
                                                    безопасную
                                                    перевозку сборных грузов</p>
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
                                            <div class="name">2. РАБОТАЕМ ПО ПРАВИЛАМ</div>
                                            <div class="description"><p>Мы следуем всем необходимым&nbsp;правилам и
                                                    нормам
                                                    при&nbsp;перевозке&nbsp;сборных&nbsp;грузов</p>
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
                                            <div class="name">3. ОТВЕТСТВЕННЫЙ ПОДХОД</div>
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
                                            <div class="name">4. ДОСТАВКА В СРОК</div>
                                            <div class="description"><p>Гарантируем быструю и эффективную доставку
                                                    сборных
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
    <div class="widgetblock-faq_cargo_ groupage widgetblock faq">
        <div class="container"><h2 class="wtitle">Часто задаваемые вопросы о перевозке сборных грузов</h2>
            <div class="widget-text">Если вы хотите заказать перевозку сборных грузов из Ростова-на-Дону обратитесь в
                нашу
                компанию «Грузовое объединение». Мы готовы предложить вам высокий уровень сервиса и оптимальный тарифный
                план.
            </div>
            <ul class="faqlist">
                <li>
                    <div class="">
                        <div class="question_wrapper">
                            <div class="question">1. Что такое сборный груз?</div>
                            <div class="answer">Сборный груз – это груз, который состоит из нескольких отдельных
                                посылок,
                                объединенных в одну отправку для доставки в одно место. Такой способ транспортировки
                                позволяет значительно снизить стоимость доставки для каждой из отдельных посылок.
                            </div>

                        </div>
                    </div>
                </li>
                <li>
                    <div class="">
                        <div class="question_wrapper">
                            <div class="question">2. Какие услуги вы предоставляете по перевозке сборных грузов?</div>
                            <div class="answer">Компания «Грузовое объединение» предлагает широкий спектр услуг,
                                связанных с
                                перевозкой сборных грузов. Мы организуем доставку груза от двери до двери, предоставляем
                                услуги экспедирования, таможенного оформления и грузовой страховки и др.
                            </div>

                        </div>
                    </div>
                </li>
                <li>
                    <div class="">
                        <div class="question_wrapper">
                            <div class="question">3. Какой транспорт используется для перевозки сборных грузов?</div>
                            <div class="answer">Для перевозки сборных грузов могут использоваться различные виды
                                автомобильного транспорта. Все зависит от многих факторов, таких как тип груза, место
                                отправления и доставки, сроки доставки и бюджет клиента.
                            </div>

                        </div>
                    </div>
                </li>
                <li>
                    <div class="">
                        <div class="question_wrapper">
                            <div class="question">4. Как определяется стоимость перевозки сборного груза?</div>
                            <div class="answer">Стоимость зависит от многих факторов, таких как вес и объем груза, тип
                                транспорта, расстояние между местом отправления и доставки, срок доставки, стоимость
                                дополнительных услуг (таможенное оформление и грузовая страховка).
                            </div>

                        </div>
                    </div>
                </li>
                <li>
                    <div class="">
                        <div class="question_wrapper">
                            <div class="question">5. Какие документы нужно оформить для перевозки сборных грузов?</div>
                            <div class="answer">Для перевозки сборных грузов нужны специальные документы и разрешения,
                                которые мы оформляем для наших клиентов. Специалисты нашей компании знают все нюансы
                                оформления документов и готовы оказать помощь в этом вопросе.
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
                    <div class="service_item" onclick="location.href='https://www.tk-go.ru/perevozka-opasnyh-gruzov/'">
                        <div class="img"><a class="goto" title="Перевозка опасных грузов"
                                            href="{{ route('cargo1') }}"><img
                                    src="../cache/service_category_photos/500x300x1x63f8bd87002f3.jpg"
                                    alt="Перевозка опасных грузов"></a></div>
                        <span class="counter"></span>
                        <div class="title"><img src="../upload/service_category_photos/63f8b7983ef3c.png"> <span>Перевозка опасных грузов</span>
                        </div>
                        <div class="desc">Компания «Грузовое объединение» более 13 лет специализируется на перевозке
                            опасных
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
                    <div class="service_item"
                         onclick="location.href='https://www.tk-go.ru/perevozka-krupnogabaritnyh-gruzov/'">
                        <div class="img"><a class="goto" title="Перевозка крупногабаритных грузов"
                                            href="{{ route('cargo4') }}"><img
                                    src="../cache/service_category_photos/500x300x1x63fc9bbaefdd6.jpg"
                                    alt="Перевозка крупногабаритных грузов"></a></div>
                        <span class="counter"></span>
                        <div class="title"><img src="../upload/service_category_photos/63fc9d52bbf52.png"> <span>Перевозка крупногабаритных грузов</span>
                        </div>
                        <div class="desc">Компания «Грузовое объединение» имеет многолетний опыт в сфере автоперевозок
                            крупногабаритных грузов...
                        </div>
                    </div>
                </li>
            </ul>
            <div class="text_after"></div>
        </div>
    </div>

@endsection
