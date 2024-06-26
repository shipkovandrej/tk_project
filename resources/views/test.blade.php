@extends('layouts.main')
@section('title')
    <title>test</title>
@stop

@section('content')

    <form action="{{ route('modal1') }}" method="POST">
        @csrf
        <div class="form-group">

            <input type="text" class="form-control mb-lg-1" id="exampleInputEmail1" aria-describedby="emailHelp"
                   placeholder="Ваше имя" required name="name" value="{{ old('name') }}">
            @error('name')
            <div class="alert alert-danger" role="alert">
                {{ $message }}
            </div>
            @enderror

            <ul class="ul phonecontrol_wrapper" style="display: flex;">
                <li style="width:50px">
                    <input type="text" name="phone_code" class="form-control"
                           readonly="readonly" value="+7" id="phonecode_phone"
                           style="width: 50px;">
                </li>
                <li style="width:calc(100% - 50px);padding-left:10px;">
                    <input
                        class="inputphone form-control" placeholder="Телефон" id="phone_phone" type="text"
                        required name="phone" value="{{ old('phone') }}">
                    @error('phone')
                    <div class="alert alert-danger" role="alert">
                        {{ $message }}
                    </div>
                    @enderror
                    <div class="phonerror_local" style="display: none;font-size: 10pt;color: red;">
                        Номер
                        телефона должен начинаться с цифры <span id="fdigitext"></span>
                    </div>
                </li>
            </ul>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" required name="check">
                <label class="form-check-label" for="defaultCheck1">
                    Подтверждаю свое согласие на обработку персональных данных
                </label>
            </div>
            <button type="submit" class="btn btn-primary" name="submit">Заказать звонок</button>
            @error('submit')
            <div class="alert alert-danger" role="alert">
                {{ $message }}
            </div>
            @enderror
            @if(session()->has('modal_1_success'))
                <div class="alert alert-success">
                    {{ session()->get('modal_1_success') }}
                </div>
            @endif
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
                            //if($val.length === 10){
                            //alert($val.length);
                            // }

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
    </form>
    @php
        $var = "test";

    @endphp
{{ $var }}


@endsection


<!--
<!doctype html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    @vite([
    'resources/css/style.css'
    ])
    @viteReactRefresh
    @vite([
    'resources/js/app.jsx'
    ])
    <script src="{{ asset('js/top.js') }}"></script>
</head>
<body>


<div style="width:500px">
    <form>
        <div class="form-group">

            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                   placeholder="Ваше имя">

        </div>
        <div class="form-group">

            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Телефон">
        </div>
        <div class="form-group">
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
        </div>
        <button type="submit" class="btn btn-primary">Заказать звонок</button>
    </form>

</div>
<script src="{{ asset('js/bottom.js') }}"></script>
</body>
</html>
-->
