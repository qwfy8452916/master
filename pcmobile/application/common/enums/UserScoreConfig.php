<?php
/**
 * 前台用户对商品的评分状态，用于前端
 * Created by PhpStorm.
 * User: mcj
 * Date: 2018/6/15
 * Time: 16:07
 */
namespace app\common\enums;

class UserScoreConfig
{
    const NOT_LOGGED_IN  = 1;//用户未登陆
    const NOT_SCORE = 2;//用户未评分
    const HAS_SCORE = 3;//用户已评分


}