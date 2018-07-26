<?php
/**
 * 前台用户对商品的收藏状态，用于前端
 * Created by PhpStorm.
 * User: mcj
 * Date: 2018/6/15
 * Time: 16:07
 */
namespace app\common\enums;

class UserCollectConfig
{
    const NOT_LOGGED_IN  = 1;//用户未登陆
    const NOT_COLLECTED = 2;//用户未收藏
    const HAS_COLLECTED = 3;//用户已收藏



}