@extends('layouts.main')
@section('title')
    <title>Как посчитать объем груза?</title>
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
                <a href="{{ route('info') }}" title="Полезная информация">
                    <span>Полезная информация</span>
                </a> /
            </li>
            <li>Как посчитать объем груза?</li>
        </ul>
    </div>
</div>
<div class="container h1"><h1>Как посчитать объем груза?</h1></div>


<div class="container">
    <div class="row">
        <div class="col-md-4">
            <div class="event-image-container"><img src="../cache/events_photos/600x600x0x63f8b33b6dacb.jpg"
                                                    alt="Как посчитать объем груза?"></div>
        </div>
        <div class="col-md-8">
            <div class="event_content">
                <div><h2>Как определить общий объем груза в кубических метрах?</h2>

                    <p>Этот вопрос мы часто слышим от наших клиентов, поскольку выбор транспорта и стоимость перевозки
                        зависят напрямую от объема груза. Для грузов небольшого объема можно выбрать более экономичные
                        транспортные средства и таким образом сэкономить на доставке. Если говорить о сборных грузах,
                        стоимость доставки рассчитывается пропорционально занимаемому грузом пространству. Неправильный
                        расчет может привести к тому, что весь груз просто не поместится в транспортное средство или
                        потребуется заказать более вместительный контейнер.</p>

                    <h2>Как рассчитать объем груза для транспортной компании?</h2>

                    <p>Каждый предмет имеет свои уникальные размеры. Неоднородные предметы измеряются в нескольких
                        местах, и выбирается наибольшее из полученных значений. Если груз упакован, то измеряется его
                        упаковка, если нет - размеры груза увеличиваются примерно на 20-30%. Затем полученные числа
                        перемножаются для перевода их в кубические метры. Если товары могут быть вложены друг в друга,
                        например, пустые емкости или уголки, их объем считается как одно число.</p>

                    <p>Теперь вы можете легко понять, как рассчитать общий объем груза для перевозки. Расчетные данные
                        суммируются или умножаются на число коробок, если они имеют одинаковый объем. Затем к полученной
                        цифре добавляется 30%, чтобы учесть пространство между единицами тары. Значения, превышающие 0.5
                        м, обычно округляются в большую сторону до целого числа.</p>

                    <p>Указанные коэффициенты являются стандартными и могут существенно различаться в зависимости от
                        требуемого типа упаковки и груза.</p>

                    <p>Следует отметить, что в логистике принято использовать кубические метры, поэтому размеры,
                        измеренные в кубических сантиметрах, необходимо перевести, умножив полученное число на
                        0,000001.</p>

                    <p>При отправке сборного груза в одном транспортном средстве могут размещаться как более тяжелые,
                        так и более легкие, но габаритные грузы. Это позволяет сбалансировать вес и объем, что выгодно
                        каждому участнику в оплате.</p>

                    <p>Также важным понятием является объемный вес груза, которое часто используется при авиаперевозках
                        (в наземных перевозках также может применяться этот коэффициент). Это связано с ограниченным
                        местом в самолете, и перевозка слишком легких грузов, занимающих больше места, становится просто
                        невыгодной.</p>

                    <p>Для вычисления объемного веса груза необходимо умножить полученный объем, рассчитанный согласно
                        предыдущим расчетам, на коэффициент 167. Если результат превышает фактический вес груза,
                        стоимость транспортировки определяется исходя из объемного веса, который может отличаться в
                        зависимости от принятых регуляций.</p>

                    <p>Часто, чтобы упростить расчеты используют специальные онлайн-калькуляторы, однако точные данные
                        об объеме для перевозки можно получить, обратившись к нашим специалистам, указав тип и
                        особенности груза, а также его габариты.</p>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
