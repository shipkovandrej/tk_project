<?php
if (! function_exists('data_avg')) {
    function data_avg($list) {
        $min = min($list);
        $max = max($list);

        if($min == "0" and $max =="0"){
            return null;
        }

        return $min == $max ? $min : $min." - ".$max;
    }
}
