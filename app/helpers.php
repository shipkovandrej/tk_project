<?php
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

            if ($i != ($int-1)) {
                $res .= " ";
            }
        }
        $res .= "...";
        return $res;
    }
}
