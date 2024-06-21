<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Validator;

class FormController extends Controller
{
    public function modal_first()
    {

        $validator = Validator::make(request()->all(), [
            'name' => 'required|max:100|string',
            'phone' => 'required',
        ]);
        $validated = $validator->validated();

        $name = $validated['name'];
        $string = $validated['phone'];
        $name = preg_replace('/[0-9]+/iu', '', $name);
        $name = strip_tags($name);

        if (empty($name)) {
            $validator->errors()->add(
                'name', 'Введите корректное имя'
            );
        }

        $phone = preg_replace('/[\-\(\)\s_]+/', '', $string);

        if (strlen($phone) < 10) {
            $validator->errors()->add(
                'phone', 'Поле должно быть заполненным'
            );

        }

        $errors = $validator->errors();

        if ($errors->first()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        $mail = mail_sender([
            'subject' => 'Заказ звонка',
            'Имя' => $name,
            'Телефон' => phone_maker($phone),
        ]);

        if ($mail) {
            return redirect()->back()->with('modal_1_success', 'Все прошло успешно');
        } else {
            $validator->errors()->add(
                'submit', 'Что-то пошло не так, повторите попытку позlytt'
            );

            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

    }

    public function calculaiton()
    {
        $validator = Validator::make(request()->all(), [
            'from' => 'required|max:150|string',
            'to' => 'required|max:150|string',
            'weight' => 'required|numeric',
            'name' => 'required|max:100|string',
            'phone' => 'required',
            'transport' => 'required',
        ]);
        $validated = $validator->validated();

        $from = $validated['from'];
        $to = $validated['to'];
        $weight = $validated['weight'];
        $name = $validated['name'];
        $string = $validated['phone'];
        $transport = $validated['transport'];

        //dd($transport);

        $name = preg_replace('/[0-9]+/iu', '', $name);
        $name = strip_tags($name);

        if (empty($name)) {
            $validator->errors()->add(
                'name', 'Введите корректное имя'
            );
        }

        $from = preg_replace('/[0-9]+/iu', '', $from);
        $from = strip_tags($from);

        $to = preg_replace('/[0-9]+/iu', '', $to);
        $to = strip_tags($to);

        if (empty($from) || empty($to)) {
            $validator->errors()->add(
                'from', 'Введите корректые адреса'
            );
        }

        if ($weight <= 0) {
            $validator->errors()->add(
                'weight', 'Введите корректный вес'
            );
        }


        $phone = preg_replace('/[\-\(\)\s_]+/', '', $string);

        if (strlen($phone) < 10) {
            $validator->errors()->add(
                'phone', 'Телефон должен быть заполнен'
            );

        }

        $errors = $validator->errors();

        if ($errors->first()) {
            return Redirect::to(URL::route('index') . '#count_div')
                ->withErrors($validator)
                ->withInput();
        }

        dd($from, $to, $weight, $name, phone_maker($phone), $transport);
        return 1;

    }
}
