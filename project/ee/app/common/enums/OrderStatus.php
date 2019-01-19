<?php
/**
 * Created by PhpStorm.
 * author: mcj
 * Date: 2018/8/22
 * Time: 9:11
 */
namespace app\common\enums;

class OrderStatus
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
    const FOLLOW = [2,3,4,5,];//跟单
    const ORDER_SIGN = [6];//签单
    const ORDER_BUILDING = [7,8];//施工
    const ORDER_END = [9];//收尾
    const ORDER_OVER = [10,11];//完成

    //订单施工人员类型
    const WORKER_TYPE_P = 1;//项目经理
    const WORKER_TYPE_WORK = 2;//施工班组
    const WORKER_SDG = 1;//水电工
    const WORKER_WG = 2;//瓦工
    const WORKER_MG = 3;//木工
    const WORKER_YQG = 4;//油漆工

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
        12 => '废弃单'
    ];

    protected static $allShiGongStatus = [
        8 => '签订装修合同',
        9 => '施工中',
        10 => '延期单',
        11 => '已竣工'
    ];

    public static function getAllStatus()
    {
        return self::$allStatus;
    }

    public static function getAllShigongStatus()
    {
        return self::$allShiGongStatus;
    }

    public static function getStatusName($key){
        $status = self::$allStatus;
        if(isset($status[$key])){
            return $status[$key];
        }
        return '';
    }

}