<?php
/**
 * 商品收藏
 * Created by PhpStorm.
 * User: mcj
 * Date: 2018/6/15
 * Time: 16:07
 */
namespace app\common\model;

use think\Model;

class JjdgGoodsCollection extends Model
{
    protected $updateTime = false;

    /**
     * 取消收藏接口
     * @param $uid
     * @param string $gid
     * @return bool|int
     */
    public function cancelCollectById($uid,$gid = '')
    {
        if (empty($uid)){
            return false;
        }
        if (!empty($gid)){
            if (is_array($gid)){
                $gid = implode(',',$gid);
            }
            $where['goods_code'] = ['in',$gid];
        }
        $where['user_id'] = $uid;

        return model('JjdgGoodsCollection')->where($where)->delete();
    }
}