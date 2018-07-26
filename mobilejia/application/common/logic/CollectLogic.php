<?php
/**
 * 收藏模块
 * Created by PhpStorm.
 * User: mcj
 * Date: 2018/6/15
 * Time: 16:50
 */

namespace app\common\logic;

use app\common\enums\UserCollectConfig;
use app\common\enums\UserScoreConfig;
use app\common\model\JjdgGoodsCollection;
use think\Model;

class CollectLogic extends Model
{


    public function getCollectNumByObj($goods_obj)
    {
        if ($goods_obj->has_custom_collect == 1) {
            return intval($goods_obj->collect_num);
        }
        return $goods_obj->custom_collect;
    }

    public function getCollectButtonStatus($goods_obj, $user = null)
    {
        if (!$user) {
            return UserCollectConfig::NOT_LOGGED_IN;
        }
        if (!empty($goods_obj->collection)) {
            return UserCollectConfig::HAS_COLLECTED;
        }
        return UserCollectConfig::NOT_COLLECTED;
    }

    public function getUserCollectStatus($user, $code)
    {
        if (!$user) {
            return UserCollectConfig::NOT_LOGGED_IN;
        }
        $record = JjdgGoodsCollection::where(['user_id' => $user['id'], 'goods_code' => $code])->find();
        if ($record == null) {
            return UserCollectConfig::NOT_COLLECTED;
        } else {
            return UserCollectConfig::HAS_COLLECTED;
        }
        return UserCollectConfig::NOT_COLLECTED;
    }

    /**
     * 获取商品收藏数量
     * @param [object]$goods_obj 商品对象
     * @return int|string
     */
    public function getGoodsCollectNum($goods_obj)
    {
        if ($goods_obj->has_custom_collect == 1) {
            return \model('JjdgGoodsCollection')->where('goods_code', $goods_obj->code)->count(1);
        }

        return $goods_obj->custom_collect;
    }
}