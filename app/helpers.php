<?php

use Illuminate\Support\Facades\Mail;
use Symfony\Component\Mailer\Exception\TransportException;

if (!function_exists('data_avg')) {
    function data_avg($list)
    {
        $min = min($list);
        $max = max($list);
        if ($min == "0" and $max == "0") {
            return null;
        }
        return $min == $max ? $min : $min . " - " . $max;
    }
}

if (!function_exists('card_cutter')) {
    function card_cutter($str)
    {
        $str = strip_tags($str);
        $arr = explode(" ", $str);
        $res = "";
        for ($i = 0; $i < 12; $i++) {
            $res .= $arr[$i];

            if ($i != 11) {
                $res .= " ";
            }
        }
        $res .= "...";
        return $res;
    }
}

if (!function_exists('info_cutter')) {
    function info_cutter($str, $int)
    {
        $str = strip_tags($str);
        $arr = explode(" ", $str);
        $res = "";
        for ($i = 0; $i < $int; $i++) {
            $res .= $arr[$i];

            if ($i != ($int - 1)) {
                $res .= " ";
            }
        }
        $res .= "...";
        return $res;
    }
}

if (!function_exists('mail_sender')) {
    function mail_sender($arr)
    {
        $subject = 'Тема письма';
        if ($arr['subject']) {
            $subject = $arr['subject'];
            unset($arr['subject']);
        }

        if (empty($arr)) {
            $text = 'Текст письма';
        } else {
            $text = "";
            foreach ($arr as $key => $value) {
                $text .= "$key: $value\n";
            }
        }

        try {
            Mail::raw($text, fn($mail) => $mail->to('tk4client@yandex.ru')->subject($subject));
        } catch (TransportException $e) {
            return false;
        }

        return true;
    }

}

if (!function_exists('phone_maker')) {
    function phone_maker($phone)
    {
        $pattern = '/(\d{3})(\d{3})(\d{2})(\d{2})/';
        $replacement = '+7 ($1) $2-$3-$4';

        return preg_replace($pattern, $replacement, $phone);
    }
}
