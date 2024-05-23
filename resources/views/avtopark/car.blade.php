@extends('layouts.main')
@section('title')
    <title>{{ $truck->name }}</title>
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
                    <a href="{{ route('avtopark') }}" title="Автопарк">
                        <span>Автопарк</span>
                    </a> /
                </li>
                <li>{{ $truck->name }}</li>
            </ul>
        </div>
    </div>
    <div class="container h1"><h1>{{ $truck->name }}</h1></div>


    <div class="car_slider">
        <div class="container">
            <div class="whiteplate  whiteplatecar">
                <div class="text">
                    <div class="text">
                        <div class="row">
                            <div class="col-md-6">
                                <p><strong>Типы кузова</strong></p>

                                <ul>
                                    @foreach($types as $type)
                                        <li>{{ $type->name }}</li>
                                    @endforeach
                                </ul>
                            </div>

                            <div class="col-md-6">
                                <p><strong>Объем</strong></p>

                                <ul>
                                    @if(!empty(data_avg($volumes)))
                                        <li>{{ data_avg($volumes) }} куб. метров</li>
                                    @endif
                                    <li>Длина &ndash; {{ data_avg($lengths) }} м</li>
                                    <li>Ширина &ndash; {{ data_avg($widths) }} м</li>
                                    <li>Высота &ndash; {{ data_avg($heights) }} м</li>
                                </ul>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-6">
                                <p><strong>Грузоподъемность</strong></p>

                                <ul>
                                    <li>{{ data_avg($payloads) }} тонны</li>
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
                    <div class="price">от ? руб/км</div>
                    <a href="../module/callback/form/index.html@category=2" class="service_callback" rel="facebox">Оставить
                        заявку</a>
                </div>
            </div>
        </div>
        <div class="car_slider_bg">

            <img src="{{$img}}">
            <div class="widgetblock-advantages_category_2 widgetblock features advantages">
                <div class="container"><h2 class="wtitle">{{ $truck->name." - Главные преимущества" }}</h2>
                    <div class="widget-text">
                        {!! $truck->pre_text_1 !!}
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
        </div>
    </div>

    <div class="widgetblock-faq_category_2 widgetblock faq">
        <div class="container"><h2 class="wtitle">Часто задаваемые вопросы о перевозке фурой</h2>
            <div class="widget-text">
                 {!! $truck->pre_text_2 !!}
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
                @foreach($specs as $spec)
                <li>
                    <div class="good_wrapper">
                        <div class="i_c"><img alt="{{ $spec->name }}"
                                              src="{{ $spec_img }}"></div>
                        <div class="i_content">
                            <div class="p-ttl">{{ $spec->name }}</div>
                            <div class="p-ttl-minidesc">
                                <ul>
                                    <li>Длина - {{ rtrim(rtrim($spec->parameter->length,"0"),".") }} м</li>
                                    <li>Ширина - {{ rtrim(rtrim($spec->parameter->width,"0"),".") }} м</li>
                                    <li>Высота - {{ rtrim(rtrim($spec->parameter->height,"0"),".") }} м</li>
                                    @if(!empty(data_avg($volumes)))
                                        <li>Объем - {{intval($spec->parameter->volume)}} м3</li>
                                    @endif
                                    @if(!empty($spec->parameter->psp))
                                        <li>Паллето-мест - {{ $spec->parameter->psp }} шт</li>
                                    @endif

                                </ul>
                            </div>
                        </div>
                        <a href="../module/callback/form/index.html@good=3" class="service_callback" rel="fancybox">Оставить
                            заявку</a>
                    </div>
                </li>
                @endforeach

            </ul>
        </div>
    </div>

@endsection
