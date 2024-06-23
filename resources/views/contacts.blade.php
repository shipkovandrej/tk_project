@extends('layouts.main')
@section('title')
    <title>Контакты</title>
@stop
@section('meta')
    <meta property="og:title" content="Контакты"/>
    <meta property="og:description" content=""/>
    <meta property="og:image" content="../images/logo.png"/>
    <meta property="og:url" content="{{ Illuminate\Routing\Route::current() }}"/>
    <meta property="og:type" content="website"/>
    <meta property="og:site_name" content="Грузовое объединение"/>
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
                <li>Контакты</li>
            </ul>
        </div>
    </div>
    <div class="container h1"><h1>Контакты</h1></div>


    <div class="container">

        <div class="">
            <div>
                <ul class="contact_items">
                    <li>
                        <div class="item">
                            <div class="icon"><img src="../images/icons/contact_adress.png"/></div>

                            <div>
                                <div class="title">{{ $address }}</div>

                                <div class="name">наш адрес</div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="item">
                            <div class="icon"><img src="../images/icons/contact_phone.png"/></div>

                            <div>
                                <div class="title"><a href="tel:{{$phone_raw}}">{{ $phone }}</a></div>

                                <div class="name">наш телефон</div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="item">
                            <div class="icon"><img src="../images/icons/contact_email.png"/></div>

                            <div>
                                <div class="title"><a href="mailto:{{ $email }}">{{ $email }}</a></div>

                                <div class="name">наша почта</div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="item">
                            <div class="icon"><img src="../images/icons/contact_worktime.png"/></div>

                            <div>
                                <div class="title">Пн. - Пт.: с 9:00 до 18:00</div>

                                <div class="name">режим работы</div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>

    @php
    $contact = \App\Models\Contact::find(1);
    $coor_x = $contact->coor_x;
    $coor_y = $contact->coor_y;
    @endphp
    <div id="map">{!! $map !!}</div>

    <script type="text/javascript">
        ymaps.ready(init);
        var myMap;

        function CheckT(control) {
            if ($(control).val() == $(control).attr("rel")) $(control).val("");
        }

        function init() {
            myMap = new ymaps.Map("map", {
                center: [{{ $coor_x }}, {{ $coor_y }}],
                zoom: 16,
                controls: ["zoomControl", "fullscreenControl"]

            });

            var myPlacemark = new ymaps.Placemark([{{ $coor_x }}, {{ $coor_y }}], {balloonContent: "{{ $address }}"}, {
                iconLayout: "default#image",
                iconImageHref: "/upload/contacticons/63f8944fcdb5f.png",
                iconImageSize: [206, 206],
                iconImageOffset: [-140, -206]
            });
            myMap.geoObjects.add(myPlacemark);
            myMap.behaviors.disable('scrollZoom');


        }
    </script>
    <div class="widgetblock-contactform widgetblock feedbackcontacts" id="count_div">
        <div class="container"><h2 class="wtitle">У вас есть вопросы?</h2>
            <div class="widget-text">Текст после заголовка</div>
            <form id="page-submit" class="question-page" action="{{ route('ask') }}" method="POST">
                @csrf
                <div class="row">
                    <div class="col-md-6">
                        <div class="line-title">
                            <div class=""></div>
                        </div>
                        <ul class="ul feedback-feedbackcontacts">
                            <li><input type="text" name="name" value="{{ old('name') }}" placeholder="Ваше имя"
                                       class="input formname form-control" required>

                            </li>
                            <li>
                                <ul class="ul phonecontrol_wrapper" style="display: flex;">
                                    <li style="width:50px"><input type="text" name="phone_code" class="form-control"
                                                                  readonly="readonly" value="+7" id="phonecode_phone"
                                                                  style="width: 50px;"></li>
                                    <li style="width:calc(100% - 50px);padding-left:10px;"><input
                                            class="inputphone form-control" placeholder="Телефон" id="phone_phone"
                                            type="text" required name="phone" value="{{ old('phone') }}">
                                        <div class="phonerror_local" style="display: none;font-size: 10pt;color: red;">
                                            Номер
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
                            </li>

                            <li><textarea name="msg" placeholder="Текст сообщения"
                                          class="textarea formtexarea form-control"
                                          required>{{ old('msg') }}</textarea></li>
                        </ul>
                        @error('name')
                        <div class="alert alert-danger" role="alert">
                            {{ $message }}
                        </div>
                        @enderror

                        @error('phone')
                        <div class="alert alert-danger" role="alert">
                            {{ $message }}
                        </div>
                        @enderror
                        @error('msg')
                        <div class="alert alert-danger" role="alert">
                            {{ $message }}
                        </div>
                        @enderror

                        <div class="policy">Нажимая кнопку &laquo;Оставить заявку&raquo;, я подтверждаю свое согласие на
                            обработку персональных данных
                        </div>
                        <button class="btn btninvert">Оставить заявку</button>
                       <br>
                            @if(session()->has('ask_form_success'))
                                <div class="alert alert-success">
                                    {{ session()->get('ask_form_success') }}
                                </div>
                            @endif




                    </div>
                </div>
            </form>
            <div class="text_after"></div>
        </div>
    </div>
@endsection
