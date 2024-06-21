<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class FormController extends Controller
{
    public function modal_first()
    {
        /*
                $data = request()->validate([
                    'name' => 'required|max:100|string',
                    'phone' => 'required|size:15',

                ]);
        */

        $validator = Validator::make(request()->all(), [
            'name' => 'required|max:100|string',
            'phone' => 'required',
        ]);
        $validated = $validator->validated();

        $name = $validated['name'];
        $string = $validated['phone'];
        $name = preg_replace('/[0-9]+/iu', '', $name);
        $name = strip_tags($name);

        if(empty($name)){
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
        /*
        mail_sender([
            'Тайтл' => 'Тайтл письма',
            'subject' => 'Тема письма',
            'Имя' => 'Иван Иванов',
            'Возраст' => 10,
        ]);
        */
        //Mail::raw("$phone\n$name", fn ($mail) => $mail->to('tk4client@yandex.ru')->subject("Тема"));
        $mail = mail_sender([
            'subject' => 'Заказ звонка',
            'Имя' => $name,
            'Телефон' => phone_maker($phone),
        ]);

        if($mail){
            return redirect()->back()->with('modal_1_success', 'Все прошло успешно');
        }else{
            $validator->errors()->add(
                'submit', 'Что-то пошло не так, повторите попытку позже'
            );

            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }
        /*
        $errors = $validator->errors();

        if ($errors->first()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        } else {
            return redirect()->back()->with('modal_1_success', 'Все прошло успешно');
        }
        */


        //return redirect()->route('test');
    }
}
