@extends('layouts.main')
@section('title')
    <title>Контакты</title>
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
                                <div class="title">344095 г. Ростов-на-Дону, ул. Штахановского, 29А</div>

                                <div class="name">наш адрес</div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="item">
                            <div class="icon"><img src="../images/icons/contact_phone.png"/></div>

                            <div>
                                <div class="title"><a href="tel:+79612906666">+7 961 290‑66‑66</a></div>

                                <div class="name">телефоны</div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="item">
                            <div class="icon"><img src="../images/icons/contact_email.png"/></div>

                            <div>
                                <div class="title"><a href="mailto:zakaz@tk-go.ru">zakaz@tk-go.ru</a></div>

                                <div class="name">телефоны</div>
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

    <script src="https://api-maps.yandex.ru/2.1/?lang=ru_RU" type="text/javascript"></script>
    <div id="map"></div>

    <script type="text/javascript">
        ymaps.ready(init);
        var myMap;

        function CheckT(control) {
            if ($(control).val() == $(control).attr("rel")) $(control).val("");
        }

        function init() {
            myMap = new ymaps.Map("map", {
                center: [47.290626, 39.73271],
                zoom: 16,
                controls: ["zoomControl", "fullscreenControl"]

            });

            var myPlacemark = new ymaps.Placemark([47.290626, 39.73271], {balloonContent: "ул. Штахановского, 29А"}, {
                iconLayout: "default#image",
                iconImageHref: "https://www.tk-go.ru/upload/contacticons/63f8944fcdb5f.png",
                iconImageSize: [206, 206],
                iconImageOffset: [-140, -206]
            });
            myMap.geoObjects.add(myPlacemark);
            myMap.behaviors.disable('scrollZoom');
            //    myPlacemark.balloon.open();

        }
    </script>
    <div class="widgetblock-contactform widgetblock feedbackcontacts">
        <div class="container"><h2 class="wtitle">У вас есть вопросы?</h2>
            <div class="widget-text">Текст после заголовка</div>
            <form id="page-submit" class="question-page" method="post" onsubmit="SendRequest(this);return false;">
                <div class="row">
                    <div class="col-md-6">
                        <div class="line-title">
                            <div class=""></div>
                        </div>
                        <ul class="ul feedback-feedbackcontacts">
                            <li><input type="text" name="Имя" value="" placeholder="Ваше имя"
                                       class="input formname form-control" required></li>
                            <li>
                                <ul class="ul phonecontrol_wrapper" style="display: flex;" class="ul_phone">
                                    <li style="width:50px"><input type="text" name="phone_code" class="form-control"
                                                                  readonly="readonly" value="+7" id="phonecode_phone"
                                                                  style="width: 50px;"></li>
                                    <li style="width:calc(100% - 50px);padding-left:10px;"><input
                                            class="inputphone form-control" placeholder="Телефон" id="phone_phone"
                                            type="text" required name="phone">
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
                            </li>
                            <li><textarea name="Сообщение" value="" placeholder="Текст сообщения"
                                          class="textarea formtexarea form-control"></textarea></li>
                        </ul>
                        <input type="hidden" name="Источник" value="Форма в контактах">
                        <div class="policy">Нажимая кнопку &laquo;Оставить заявку&raquo;, я подтверждаю свое согласие на
                            обработку <a href="../policy/index.html" target="_blank">персональных данных</a></div>
                        <button class="btn btninvert">Оставить заявку</button>
                    </div>
                </div>
            </form>
            <div class="text_after"></div>
        </div>
    </div>
@endsection