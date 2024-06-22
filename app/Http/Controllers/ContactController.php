<?php

namespace App\Http\Controllers;

use App\Models\Contact;


class ContactController extends Controller
{
    public function index()
    {
        $phone = Contact::find(1)->phone;
        $phone_raw = phone_maker_contacts($phone);
        $address = Contact::find(1)->address;
        $email = Contact::find(1)->email;
        $map = Contact::find(1)->url;

        //$stringWithHtml = '<strong>Hello, world!</strong>';


        return view('contacts', compact('phone', 'phone_raw', 'address', 'email', 'map'));

    }
}
