<?php
/**
 *计算日期差
 * author: mcj
 */
if (!function_exists('day_diff')) {
    function day_diff($date1, $date2)
    {
        $datetime1 = date_create($date1);
        $datetime2 = date_create($date2);
        $interval = date_diff($datetime1, $datetime2);
        return $interval->format('%R%a');
    }
}
