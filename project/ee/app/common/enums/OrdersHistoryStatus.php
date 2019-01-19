<?php
/**
 * Created by PhpStorm.
 * author: sp
 * Date: 2018/11/2
 * Time: 9:11
 */
namespace app\common\enums;

class OrdersHistoryStatus
{
    /**
     * 调整结构必须保持数据一致！！！
     */
    const NOT_CALL = 1;//未联系
    const HAS_CALL = 2;//已联系
    const MEASURE_WAIT = 3;//预约量房
    const HAS_MEET = 4;//已见面
    const HAS_MEASURE = 5;//已量房
    const NOT_MEASURE = 6;//未成功量房
    const DESIGN_SIGN = 7;//签订设计合同
    const BUILD_SIGN = 8;//签订装修合同
    const BUILDING = 9;//施工中
    const DELAY = 10;//延期单
    const PROJECT_OVER = 11;//已竣工
    const GIVE_OUT = 12;//废弃单


    //订单分类
    const RECEPTION = [1];//接单
    const FOLLOW = [2,3,4,5,6,7];//跟单
    const ORDER_SIGN = [8];//签单
    const ORDER_BUILDING = [9,10];//施工
    const ORDER_END = [11];//收尾
    const ORDER_OVER = [12];//完成


    protected static $allStatus = [
        1 => '未联系',
        2 => '已联系',
        3 => '预约量房',
        4 => '已见面',
        5 => '已量房',
        6 => '未成功量房',
        7 => '签订设计合同',
        8 => '签订装修合同',
        9 => '施工中',
        10 => '延期单',
        11 => '已竣工',
        12 => '废弃单',
    ];

    public static function getAllStatus()
    {
        return self::$allStatus;
    }

    public static function getStatusName($key){
        $status = self::$allStatus;
        if(isset($status[$key])){
            return $status[$key];
        }
        return '';
    }

}