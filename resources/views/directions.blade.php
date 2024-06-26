@extends('layouts.main')
@section('title')
    <title>Направления перевозок</title>
@stop
@section('meta')
    <meta property="og:title" content="Направление перевозок"/>
    <meta property="og:description" content=""/>
    <meta property="og:image" content="../images/logo.png"/>
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Грузовое объединение" />
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
                <li>Направление перевозок</li>
            </ul>
        </div>
    </div>
    <div class="container h1"><h1>Направление перевозок</h1></div>


    <div class="container">
        <ul class="direction">
            <li><a href="">В Волгоград</a></li>
            <li><a href="">В Воронеж</a></li>
            <li><a href="">В Екатеринбург</a></li>
            <li><a href="">В Казань</a></li>
            <li><a href="">В Краснодар</a></li>
            <li><a href="">В Красноярск</a></li>
            <li><a href="">В Липецк</a></li>
            <li><a href="">В Минеральные Воды</a></li>
            <li><a href="">В Москву</a></li>
            <li><a href="">В Набережные Челны</a></li>
            <li><a href="">В Нижний Новгород</a></li>
            <li><a href="">В Новороссийск</a></li>
            <li><a href="">В Новосибирск</a></li>
            <li><a href="">В Омск</a></li>
            <li><a href="">В Самару</a></li>
            <li><a href="">В Санкт-Петербург</a></li>
            <li><a href="">В Саратов</a></li>
            <li><a href="">В Сочи</a></li>
            <li><a href="">В Ставрополь</a></li>
            <li><a href="">В Тольятти</a></li>
            <li><a href="">В Тулу</a></li>
            <li><a href="">В Тюмень</a></li>
            <li><a href="">В Уфу</a></li>
            <li><a href="">В Челябинск</a></li>
        </ul>
        <div class="block"></div>
    </div>

    <br>

    <div class="widgetblock-getcost widgetblock getcostfeedback" id="count_div">
        <div class="container"><h2 class="wtitle">Расчет стоимости доставки</h2>
            <div class="widget-text">Стоимость доставки зависит от ряда факторов и рассчитывается индивидуально для
                каждого
                нашими специалистами. Оставьте заявку в форме обратной связи, и наш менеджер свяжется с вами в течении
                15
                минут.
            </div>
            <!--Форма расчета -->
            <form id="page-submit" class="question-page" action="{{ route('calculation') }}" method="POST">
                @csrf
                <div class="fb_wrapper_item">
                    <div class="feedback_place_wrapper">
                        <div>
                            <div class="lbl">Место загрузки</div>
                            <input class="form-control" type="text" name="from"
                                   placeholder="Регион, населенный пункт" required value="{{ old('from') }}">
                        </div>
                        <div>
                            <div class="lbl">Место выгрузки</div>
                            <input class="form-control" type="text" name="to"
                                   placeholder="Регион, населенный пункт" required value="{{ old('to') }}">
                        </div>
                        <div>
                            <div class="lbl">Вес груза</div>
                            <input class="form-control" type="number" placeholder="Кг" name="weight" required
                                   value="{{ old('weight') }}">
                        </div>
                    </div>
                    <div class="feedback_place_wrapper_error">
                        @error('weight')
                        <div class="alert alert-danger" role="alert">
                            {{ $message }}
                        </div>
                        @enderror

                        @error('from')
                        <div class="alert alert-danger" role="alert">
                            {{ $message }}
                        </div>
                        @enderror
                    </div>


                </div>
                <div class="fb_wrapper_item">
                    <div class="lbl">Транспорт перевозки</div>
                    <div class="feedback_transport_wrapper">


                        <div class="active"><input type="radio" name="transport" value="Фура" checked="checked">Фура
                        </div>
                        <div><input type="radio" name="transport" value="Автопоезд">Автопоезд</div>
                        <div><input type="radio" name="transport" value="Одиночка">Одиночка</div>
                        <div><input type="radio" name="transport" value="Газель">Газель</div>
                        <div><input type="radio" name="transport" value="Трал">Трал</div>

                    </div>
                </div>
                <div class="fb_wrapper_item">
                    <div class="feedback_place_wrapper feedback_place_wrapper_contacts">
                        <div>
                            <div class="lbl">Контактное лицо</div>
                            <input type="text" name="name" placeholder="Ваше имя"
                                   class="input formname form-control" required value="{{ old('name') }}"></div>
                        <div>
                            <div class="lbl">Телефон</div>
                            <ul class="ul phonecontrol_wrapper" style="display: flex;" >
                                <li style="width:50px"><input type="text" name="phone_code" class="form-control"
                                                              readonly="readonly" value="+7" id="phonecode_phone"
                                                              style="width: 50px;"></li>
                                <li style="width:calc(100% - 50px);padding-left:10px;">
                                    <input
                                        class="inputphone form-control" placeholder="Телефон" id="phone_phone"
                                        type="text"
                                        required name="phone" value="{{ old('phone') }}">
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
                    <div class="feedback_place_wrapper_error">
                        @error('phone')
                        <div class="alert alert-danger" role="alert">
                            {{ $message }}
                        </div>
                        @enderror

                        @error('name')
                        <div class="alert alert-danger" role="alert">
                            {{ $message }}
                        </div>
                        @enderror
                    </div>
                    <div id="react_calc_button"></div>
                    <div class="feedback_place_wrapper_error mt-4">
                        @if(session()->has('calc_form_success'))
                            <div class="alert alert-success">
                                {{ session()->get('calc_form_success') }}
                            </div>
                        @endif
                        @error('submit')
                        <div class="alert alert-danger" role="alert">
                            {{ $message }}
                        </div>
                        @enderror
                    </div>
                </div>

                <div class="policy">Нажимая кнопку &laquo;Заказать&raquo;, я подтверждаю свое согласие на обработку персональных данных</div>

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
@endsection
