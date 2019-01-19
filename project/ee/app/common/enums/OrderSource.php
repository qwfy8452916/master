<?php
/**
 * Created by PhpStorm.
 * author: mcj
 * Date: 2018/9/7
 * Time: 14:01
 */
namespace app\common\enums;

class OrderSource
{
    const QIZUANG = 2;//齐装来源
    const OTHER = 3;//其他(营销宝来源)

    protected static $allSource = [
        2 => '齐装订单',
        3 => '其他订单',
    ];

    public static function getAllSource()
    {
        return self::$allSource;
    }

    public static function getSourceName($key){
        $status = self::$allSource;
        if(isset($status[$key])){
            return $status[$key];
        }
        return '';
    }
}