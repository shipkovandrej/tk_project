@extends('layouts.main')
@section('title')
    <title>{{ $cargo->name }}</title>
@stop

@section('content')
    <div class="crumble_wrapper">
        <div class="container">
            <ul class="crumble ul">
                <li>
                    <a href="{{ route('index') }}" title="Главная">
                        <span>Главная</span>
                    </a> /
                </li>

                <li>
                    <a href="{{ route('cargos') }}" title="{{ $cargo->name }}">
                        <span>Что мы перевозим</span>
                    </a> /
                </li>
                <li>{{ $cargo->name }}</li>
            </ul>
        </div>
    </div>
    <div class="container h1"><h1>{{ $cargo->name }}</h1></div>


    <div class="container-big">
        <div class="service_slider">

            <img src="{{ $cargo->img->path }}">
            <div class="container">
                <div class="whiteplate">
                    <div class="text">
                        <div class="icon"><img src="{{ $cargo->logo_img->path }}"></div>
                        <div class="text">
                            {!! $cargo->card !!}
                        </div>
                    </div>
                    <div class="price_call">
                        <div class="price">от {{ rtrim(rtrim($cargo->price,"0"),".") }} руб./км.</div>
                        <a href="../module/callback/form/index.html@service=1" class="service_callback" rel="facebox">Оставить
                            заявку</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="widgetblock-features_cargo_danger widgetblock features">
        <div class="container"><h2 class="wtitle">Особенности перевозки</h2>
            <div class="widget-text">
                {!! $cargo->pre_text_1 !!}
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
                                            <div class="name">Безопасность груза</div>
                                            <div class="description"><p>Огромный опыт позволяет нам обеспечить
                                                    безопасную
                                                    перевозку грузов</p>
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
                                                    для перевозки грузов</p>
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
        <div class="container"><h2 class="wtitle">Часто задаваемые вопросы</h2>
            <div class="widget-text">
                {!! $cargo->pre_text_2 !!}
            </div>
            <ul class="faqlist">
                @foreach($questions as $question)
                <li>
                    <div class="">
                        <div class="question_wrapper">
                            <div class="question">
                                {{ $loop->index + 1 }}. {{ $question->name }}
                            </div>
                            <div class="answer">
                                {{ $question->answer }}
                            </div>

                        </div>
                    </div>
                </li>
                @endforeach
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
                @foreach($others as $other)
                <li>
                    <div class="service_item"
                         onclick="location.href='{{ route('cargo', ['slug' => $other->slug]) }}'">
                        <div class="img"><a class="goto" title="{{ $other->name }}"
                                            href="{{ route('cargo', ['slug' => $other->slug]) }}"><img
                                    src="{{ $other->mini_img->path }}"
                                    alt="{{ $other->name }}"></a></div>
                        <span class="counter"></span>
                        <div class="title"><img src="{{ $other->logo_img->path }}"> <span>{{ $other->name }}</span>
                        </div>
                        <div class="desc">
                            {{ card_cutter($other->card) }}
                        </div>
                    </div>
                </li>
                @endforeach
            </ul>
            <div class="text_after"></div>
        </div>
    </div>

@endsection