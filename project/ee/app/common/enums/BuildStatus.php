<?php
/**
 * Created by PhpStorm.
 * author: mcj
 * Date: 2018/8/22
 * Time: 9:11
 */

namespace app\common\enums;

class BuildStatus
{
	const DEFAULT_STATE = 1;//无状态
	/**
     * 调整结构必须保持数据一致！！！
     */
    const START = 2;//开工大吉
    const DEMOLITION = 3;//主体拆改
    const WATER_AND_POWER = 4;//水电整改
    const WATER_PROTECT = 5;//防水
    const MUD_TILE = 6;//泥瓦
    const CARPENTRY = 7;//木工 carpentry
    const KITCHEN_AND_TOILET = 8;//厨卫吊顶 kitchen and toilet
    const PAINTER = 9;//油漆工 Painter
    const WALLPAPER = 10;//铺贴壁纸 wallpaper
    const PRODUCT_INSTALL = 11;//成品安装
    const ClEANUP = 12;//保洁
    const FURNITURE = 13;//家具进场 furniture
    const ELECTRIC_APPLIANCE = 14;//家电进场 electric appliance
    const HOME_ACCESSORIES = 15;//家居配饰 Home accessories
    const HAND_OVER = 16;//交付工程 hand over

    protected static $allStatus = [
        2 => '1.开工大吉',
        3 => '2.主体拆改',
        4 => '3.水电整改',
        5 => '4.防水施工',
        6 => '5.泥瓦工程',
        7 => '6.木工进场',
        8 => '7.厨卫吊顶',
        9 => '8.油漆粉刷',
        10 => '9.铺贴壁纸',
        11 => '10.成品安装',
        12 => '11.保洁收尾',
        13 => '12.家具进场',
        14 => '13.家电进场',
        15 => '14.家居配饰',
        16 => '15.交付工程',
    ];

    public static function getAllStatus()
    {
        return self::$allStatus;
    }

    public static function getStatusName($key)
    {
        $status = self::$allStatus;
        if (isset($status[$key])) {
            return $status[$key];
        }
        return '';
    }

}