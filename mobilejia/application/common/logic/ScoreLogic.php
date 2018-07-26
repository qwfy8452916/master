<?php
/**
 * 评分模块
 * Created by PhpStorm.
 * User: mcj
 * Date: 2018/6/15
 * Time: 16:50
 */

namespace app\common\logic;

use app\common\enums\UserScoreConfig;
use app\common\model\JjdgGoodsGrade;
use think\Model;

class ScoreLogic extends Model
{

    public function getUserScoreStatus($user, $code)
    {
        if (!$user) {
            return UserScoreConfig::NOT_LOGGED_IN;
        }
        $record = JjdgGoodsGrade::where(['user_id' => $user['id'],'goods_code' => $code ])->find();
        if ($record == null) {
            return UserScoreConfig::NOT_SCORE;
        } else {
            return UserScoreConfig::HAS_SCORE;
        }
        return UserScoreConfig::NOT_SCORE;
    }

    public function getGoodsScoreAvg($goods_obj){
        if($goods_obj->has_custom_score == 2){
            return $goods_obj->custom_score;
        }
        //todo 获取用户系统的真实平均值
        return $goods_obj->avg_score;
    }
}