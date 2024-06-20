<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
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


        $phone = preg_replace('/[\-\(\)\s_]+/', '', $string);

        if(strlen($phone) < 10){
            $validator->errors()->add(
                'phone', 'Поле должно быть заполненным'
            );

        }



        $errors = $validator->errors();

        if($errors->first()){
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }else{
            return redirect()->back()->with('modal_1_success', 'Все прошло успешно');
        }



        //return redirect()->route('test');
    }
}
